import { odkAxios } from "@/utils/useAxios";
import type { NextApiRequest, NextApiResponse } from "next";

const CARD_MAPPING = {
  "#totalSubmissions": {
    title: "Survey Submissions",
    endpoint: "/Submissions",
  },
  "#totalComments": {
    title: "Submission Comments",
    endpoint: "/submissions/comments",
  },
  "#totalAudits": {
    title: "Audits Available",
    endpoint: "/submissions/audits",
  },
  "#totalEnumerators": {
    title: "Enumerators",
    endpoint: "/submissions/submitters",
  },
} as const;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { projectId, formId, tag } = req.body;
  const authHeader = req.headers.authorization;

  try {
    const cardConfig = CARD_MAPPING[tag as keyof typeof CARD_MAPPING];

    if (!cardConfig) {
      console.error("Invalid tag:", tag);
      return res.status(400).json({ error: "Invalid tag" });
    }

    const url = `/v1/projects/${projectId}/forms/${formId}${cardConfig.endpoint}`;
    console.log("Constructed URL:", url);

    try {
      const response = await odkAxios.get(url, {
        headers: { Authorization: authHeader },
      });

      console.log("Full API Response:", response.data);

      if (tag === "#totalSubmissions") {
        const submissions = Array.isArray(response.data) ? response.data : [];
        const dailyCounts = submissions.reduce((acc: any, submission: any) => {
          const date = new Date(submission.createdAt).toLocaleDateString();
          if (!acc[date]) {
            acc[date] = 0;
          }
          acc[date] += 1;
          return acc;
        }, {});

        return res.status(200).json({
          title: cardConfig.title,
          value: submissions.length,
          prefix: "",
          suffix: "",
          dailyCounts: Object.entries(dailyCounts).map(([date, count]) => ({
            date,
            count,
          })),
        });
      } else if (tag === "#totalEnumerators") {
        // Process enumerators data
        const enumerators = Array.isArray(response.data) ? response.data : [];
        return res.status(200).json({
          title: cardConfig.title,
          value: enumerators.length,
          prefix: "",
          suffix: "",
          dailyCounts: [], // Adjust as needed
        });
      } else {
        // Handle other tags if necessary
        return res.status(200).json({
          title: cardConfig.title,
          value: response.data.length || 0,
          prefix: "",
          suffix: "",
          dailyCounts: [],
        });
      }
    } catch (error: any) {
      console.error("ODK API Error occurred");

      if (error.response?.status === 404) {
        return res.status(404).json({
          message: "Resource not found",
          details: error.response.data,
        });
      }

      throw error;
    }
  } catch (error: any) {
    console.error("Server Error:", error);
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      details: error.response?.data || "No details available",
    });
  }
}
