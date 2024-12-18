import { odkAxios } from "@/utils/useAxios";
import type { NextApiRequest, NextApiResponse } from "next";

const CARD_MAPPING = {
  "#totalSubmissions": {
    title: "Survey Submissions",
    endpoint: "/Submissions",
  },
  "#totalComments": {
    title: "Review Comments",
    endpoint: "/submissions/comments",
  },
  "#totalEnumerators": {
    title: "Enumerators",
    endpoint: "/submissions/submitters",
  },
  "#totalFormFilds": {
    title: "Total Survey Questions",
    endpoint: "/fields",
  },
} as const;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { projectId, formId } = req.body;
  const authHeader = req.headers.authorization;

  try {
    const submissionsUrl = `/v1/projects/${projectId}/forms/${formId}${CARD_MAPPING["#totalSubmissions"].endpoint}`;
    const submissionsResponse = await odkAxios.get(submissionsUrl, {
      headers: { Authorization: authHeader },
    });

    const submissions = submissionsResponse.data;

    // Fetch comments count
    const commentsCountPromises = submissions.map(async (submission: any) => {
      const instanceId = submission.instanceId;
      const commentsUrl = `/v1/projects/${projectId}/forms/${formId}/submissions/${instanceId}/comments`;
      try {
        const commentsResponse = await odkAxios.get(commentsUrl, {
          headers: { Authorization: authHeader },
        });
        return commentsResponse.data.length;
      } catch (error: any) {
        console.error(
          `Error fetching comments for ${instanceId}:`,
          error.response?.data || error.message
        );
        return 0;
      }
    });

    const commentsCounts = await Promise.all(commentsCountPromises);
    const totalComments = commentsCounts.reduce((acc, count) => acc + count, 0);

    // Fetch enumerators (submitters)
    const enumeratorsUrl = `/v1/projects/${projectId}/forms/${formId}${CARD_MAPPING["#totalEnumerators"].endpoint}`;
    const enumeratorsResponse = await odkAxios.get(enumeratorsUrl, {
      headers: { Authorization: authHeader },
    });

    const enumerators = enumeratorsResponse.data;
    const totalEnumerators = enumerators.length;

    // Fetch total form fields
    const fieldsUrl = `/v1/projects/${projectId}/forms/${formId}${CARD_MAPPING["#totalFormFilds"].endpoint}`;
    const fieldsResponse = await odkAxios.get(fieldsUrl, {
      headers: { Authorization: authHeader },
    });

    const totalFormFields = fieldsResponse.data.length;

    const results = [
      {
        tag: "#totalSubmissions",
        title: CARD_MAPPING["#totalSubmissions"].title,
        value: submissions.length,
        prefix: "",
        suffix: "",
        dailyCounts: calculateDailyCounts(submissions),
      },
      {
        tag: "#totalComments",
        title: CARD_MAPPING["#totalComments"].title,
        value: totalComments,
        prefix: "",
        suffix: "",
        dailyCounts: [],
      },
      {
        tag: "#totalEnumerators",
        title: CARD_MAPPING["#totalEnumerators"].title,
        value: totalEnumerators,
        prefix: "",
        suffix: "",
        dailyCounts: [],
      },
      {
        tag: "#totalFormFilds",
        title: CARD_MAPPING["#totalFormFilds"].title,
        value: totalFormFields,
        prefix: "",
        suffix: "",
        dailyCounts: [],
      },
    ];

    // console.log("Valid Results:", results);

    return res.status(200).json(results);
  } catch (error: any) {
    console.error("Server Error:", error);
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      details: error.response?.data || "No details available",
    });
  }
}

function calculateDailyCounts(submissions: any[]) {
  const dailyCounts = submissions.reduce((acc: any, submission: any) => {
    const date = new Date(submission.createdAt).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += 1;
    return acc;
  }, {});

  return Object.entries(dailyCounts).map(([date, count]) => ({
    date,
    count,
  }));
}
