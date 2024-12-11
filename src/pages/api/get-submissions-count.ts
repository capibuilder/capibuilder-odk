import { odkAxios } from "@/utils/useAxios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { projectId, formId } = req.body;
  const authHeader = req.headers.authorization;

  try {
    const response = await odkAxios.get(
      `/v1/projects/${projectId}/forms/${formId}/submissions`,
      {
        headers: { Authorization: authHeader },
      }
    );

    return res.status(200).json({
      value: response.data.length,
      dailyCounts: [], // We can add daily counts here too if needed
    });
  } catch (error: any) {
    console.error("API Error:", error);
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      details: error.response?.data || "No details available",
    });
  }
}
