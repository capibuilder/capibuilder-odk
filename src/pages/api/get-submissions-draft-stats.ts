import { odkAxios } from "@/utils/useAxios";
import type { NextApiRequest, NextApiResponse } from "next";

const CARD_MAPPING = {
  "#totalSubmissions": {
    title: "Survey Submissions",
    endpoint: "/draft.svc/Submissions",
  },
  // Ensure this matches the tag being sent
  // "#totalComments": {
  //   title: "Submission Comments",
  //   endpoint: "/draft.svc/Submissions/comments",
  // },
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
    console.log("Fetching from URL:", url);

    try {
      const response = await odkAxios.get(url, {
        headers: { Authorization: authHeader },
      });

      const submissions = response.data.value || [];
      const dailyCounts = submissions.reduce((acc: any, submission: any) => {
        const date = new Date(
          submission.__system.submissionDate
        ).toLocaleDateString();
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
