import { sortByCreatedAt } from "@/utils/sortForms";
import { odkAxios } from "@/utils/useAxios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return res.redirect("/");
  }
  const { projectId, token } = req.body;

  try {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await odkAxios.get(
      `/v1/projects/${projectId}/forms`,
      config
    );

    const data = sortByCreatedAt(response.data || []).map((d: any) => {
      return {
        title: d.name,
        date: new Date(d.createdAt).toLocaleString(),
        status: d.publishedAt === null ? "draft" : "published",
        enketoId: d.enketoId,
        projectId: d.projectId,
        xmlFormId: d.xmlFormId,
        draftToken: d.draftToken,
        isPublished: d.publishedAt === null ? false : true,
      };
    });

    return res.status(200).json(data);
  } catch (error: any) {
    res.status(error.response.status || 500).json({ error });
  }
}

/**
 * The function sorts an array of objects by their "createdAt" property in descending order.
 * @param {any[]} arr - an array of objects that have a "createdAt" property, which is a string
 * representing a date and time in a format that can be parsed by the Date.parse() method.
 * @returns The function `sortByCreatedAt` is returning a sorted array of objects based on their
 * `createdAt` property in descending order.
 */
