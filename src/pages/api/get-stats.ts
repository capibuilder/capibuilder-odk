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

    const publishedcount: number =
      response.data.filter((survey: any) => survey.publishedAt !== null)
        .length || 0;

    res.status(200).json({
      published: publishedcount,
      draft: response.data.length - publishedcount,
    });
  } catch (error: any) {
    res.status(500).json({ error });
  }
}

/**
 * The function sorts an array of objects by their "createdAt" property in descending order.
 * @param {any[]} arr - an array of objects that have a "createdAt" property, which is a string
 * representing a date and time in a format that can be parsed by the Date.parse() method.
 * @returns The function `sortByCreatedAt` is returning a sorted array of objects based on their
 * `createdAt` property in descending order.
 */

// function sortByCreatedAt(arr: any[]) {
//   return arr.sort((a, b) => {
//     const dateA = Date.parse(a.createdAt);
//     const dateB = Date.parse(b.createdAt);
//     return dateB - dateA;
//   });
// }
