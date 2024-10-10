import { odkAxios } from "@/utils/useAxios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { projectId, xmlFormId, token } = req.body;

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await odkAxios.get(
      `/v1/projects/${projectId}/forms/${xmlFormId}.svc/Submissions?%24top=250&%24skip=0&%24count=true&%24wkt=true`,
      config
    );

    res.status(200).json({
      count: response.data["@odata.count"],
    });
  } catch (error: any) {
    res.status(200).json({ count: 0 });
  }
}
