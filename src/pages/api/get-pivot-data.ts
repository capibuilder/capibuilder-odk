import { PIVOT_REST_API } from "@/config";
import type { NextApiRequest, NextApiResponse } from "next";

type DataProps = {
  id: number;
  projectName: string;
  projectDescription: string;
  createdAt: string;
  forms: {
    id: string;
    name: string;
    version: string;
    submissions: any[];
  }[];
};

const flattenData = (data: any, keys: string[]) => {
  return data.reduce((flattenedArray: any, item: any) => {
    const formsArray = item.forms.map((form: any) => ({
      // id: item.id,
      projectName: item.projectName,
      projectDescription: item.projectDescription,
      createdAt: item.createdAt,
      // formId: form.id,
      name: form.name,
      version: form.version,
      submissions: form.submissions,
    }));

    const emptyFields = keys.reduce((acc: any, curr) => {
      acc[curr] = "-";
      return acc;
    }, {});

    const submissionsArray = formsArray.map((form: any) =>
      form.submissions.map((submission: any) => {
        const newSubmission = Object.entries(submission).reduce(
          (acc: any, [key, value]) => {
            if (typeof value === "object") {
              acc[key] = JSON.stringify(value)
                .replace(/"/g, "")
                .replace(/:/g, ":")
                .replace(/,/g, ",")
                .replace(/{/g, "")
                .replace(/}/g, "");
            } else {
              acc[key] = value;
            }
            return acc;
          },
          {}
        );

        return {
          // id: item.id,
          projectName: item.projectName,
          projectDescription: item.projectDescription,
          createdAt: item.createdAt,
          // formId: form.id,
          name: form.name,
          version: form.version,
          ...emptyFields,
          ...newSubmission,
        };
      })
    );

    return flattenedArray.concat(submissionsArray.flat(1));
  }, [] as any);
};

const extractKeys = (data: DataProps[]) => {
  const keys = new Set<string>();

  data.flatMap(d =>
    d.forms.flatMap(f =>
      f.submissions.forEach(s => Object.keys(s).forEach(k => keys.add(k)))
    )
  );

  const constantsKeys = [
    {
      headerName: "Project Name",
      field: "projectName",
      rowGroup: true,
    },
    {
      headerName: "Project Description",
      field: "projectDescription",
    },
    {
      headerName: "Survey Name",
      field: "name",
      rowGroup: true,
    },
    {
      headerName: "Survey Version",
      field: "version",
    },
  ];

  const keysArray = Array.from(keys).map(k => ({
    headerName: k,
    field: k,
  }));

  return { data: [...constantsKeys, ...keysArray], keys: Array.from(keys) };
};

export default async function handler(
  req: NextApiRequest,
  response: NextApiResponse
) {
  try {
    const projectRes = await (await fetch(`${PIVOT_REST_API}/projects`)).json();

    const projectPromises = projectRes.projects.map(async (project: any) => {
      const formRes = await (
        await fetch(`${PIVOT_REST_API}/forms/${project.id}`)
      ).json();

      const formPromises = formRes.map(async (form: any) => {
        if (form.length === 0) return;

        try {
          const submissionRes = await (
            await fetch(
              `${PIVOT_REST_API}/submissions/${project.id}/${form.xmlFormId}`
            )
          ).json();

          const submissions = submissionRes.map((submission: any) => {
            const { meta, __id, __system, ...rest } = submission;
            return rest;
          });

          return {
            id: form.xmlFormId,
            name: form.name,
            version: form.version,
            submissions,
          };
        } catch (error) {
          // Handle error for individual form submission request
          console.error(error);
          return null;
        }
      });

      const formsData = await Promise.all(formPromises);
      const forms = Object.fromEntries(
        formsData.filter(form => form !== null).map(form => [form.id, form])
      );

      return {
        id: project.id,
        projectName: project.name,
        projectDescription: project.description,
        createdAt: project.createdAt,
        forms,
      };
    });

    const newData = await Promise.all(projectPromises);

    const modifiedData = newData.map(project => ({
      ...project,
      forms: Object.values(project.forms),
    }));

    const { data, keys } = extractKeys(modifiedData);

    return response.status(201).json({
      data: flattenData(modifiedData, keys),
      colData: data,
    });
  } catch (error: any) {
    console.error("ERROR>>", error.response?.data);

    return response.status(500).json({
      error: error.response?.data,
      data: [],
      colData: [],
    });
  }
}
