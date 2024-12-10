import { odkAxios } from "@/utils/useAxios";
import type { NextApiRequest, NextApiResponse } from "next";

const CARD_MAPPING = {
  "#totalSubmissions": {
    title: "Survey Submissions",
    endpoint: "/submissions",
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

async function getCommentsCount(
  projectId: string,
  formId: string,
  authHeader: string
) {
  try {
    // First get all submissions to get their instanceIds
    const submissionsResponse = await odkAxios.get(
      `/v1/projects/${projectId}/forms/${formId}/submissions`,
      {
        headers: { Authorization: authHeader },
      }
    );

    // Get instanceIds from submissions
    const instanceIds =
      submissionsResponse.data?.map(
        (submission: any) => submission.__id || submission.instanceId
      ) || [];

    console.log("Found instanceIds:", instanceIds);

    // If no submissions, return 0 comments
    if (instanceIds.length === 0) return 0;

    // Get comments for each submission
    const commentsPromises = instanceIds.map(instanceId =>
      odkAxios.get(
        `/v1/projects/${projectId}/forms/${formId}/submissions/${instanceId}/comments`,
        {
          headers: { Authorization: authHeader },
        }
      )
    );

    const commentsResponses = await Promise.all(commentsPromises);

    // Sum up all comments
    const totalComments = commentsResponses.reduce((total, response) => {
      // Response is an array directly, not wrapped in data property
      return total + (Array.isArray(response.data) ? response.data.length : 0);
    }, 0);

    console.log("Total comments found:", totalComments);
    return totalComments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return 0;
  }
}

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
      let value = 0;

      if (tag === "#totalComments") {
        value = await getCommentsCount(projectId, formId, authHeader);
      } else {
        const response = await odkAxios.get(url, {
          headers: { Authorization: authHeader },
        });
        value = response.data?.length || 0;
      }

      return res.status(200).json({
        title: cardConfig.title,
        value,
        prefix: "",
        suffix: "",
        dailyCounts: [],
      });
    } catch (error: any) {
      console.error("ODK API Error:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        url,
      });

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
