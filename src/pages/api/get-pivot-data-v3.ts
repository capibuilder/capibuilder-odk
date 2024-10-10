import { odkAxios } from "@/utils/useAxios";
import type { NextApiRequest, NextApiResponse } from "next";

const flattenData = (data: any, keys: string[]) => {
  return data.reduce((flattenedArray: any, item: any) => {
    const emptyFields = keys.reduce((acc: any, curr) => {
      acc[curr] = "-";
      return acc;
    }, {});

    const submissionsArray = item.submissions.map((submission: any) => {
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
        id: item.id,
        // formId: form.id,
        name: item.name,
        version: item.version,
        ...emptyFields,
        ...newSubmission,
      };
    });

    return flattenedArray.concat(submissionsArray.flat(1));
  }, [] as any);
};

const extractKeys = (data: any[]) => {
  const keys = new Set<string>();

  data.flatMap(f =>
    f.submissions.forEach((s: any) => Object.keys(s).forEach(k => keys.add(k)))
  );

  const constantsKeys = [
    // {
    //   headerName: "Project Name",
    //   field: "projectName",
    //   rowGroup: true,
    // },
    // {
    //   headerName: "Project Description",
    //   field: "projectDescription",
    // },
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
  const { projectId } = req.body;
  try {
    const res = await odkAxios.get(`/v1/projects/${projectId}/forms`, {
      headers: {
        Authorization: req.headers.authorization,
      },
    });

    const formPromises = res.data.map(async (form: any) => {
      if (form.length === 0) return;

      try {
        const uri = `/v1/projects/${projectId}/forms/${form.xmlFormId}.svc/Submissions`;

        const submissionRes = await odkAxios.get(uri, {
          headers: {
            Authorization: req.headers.authorization,
          },
        });

        const submissions = submissionRes.data.value.map((submission: any) => {
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

    const { data, keys } = extractKeys(formsData.filter(Boolean));

    return response.status(201).json({
      data: flattenData(formsData.filter(Boolean), keys),
      colData: data,
    });
  } catch (error: any) {
    console.error("ERROR>>", error);

    return response.status(500).json({
      error: error,
      data: [],
      colData: [],
    });
  }
}
