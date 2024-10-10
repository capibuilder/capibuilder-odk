import { ADMIN_EMAIL, ADMIN_PASSWORD } from "@/config";
import { odkAxios } from "@/utils/useAxios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return res.redirect("/");
  }

  const { email, name } = req.body;

  try {
    const adminResponse = await odkAxios.post("/v1/sessions", {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    });

    const config = {
      headers: {
        Authorization: `Bearer ${adminResponse.data.token}`,
      },
    };

    const projectResponse = await odkAxios.post(
      "/v1/projects",
      {
        name: name + "-demo-project",
      },
      config
    );

    const userResponse = await odkAxios.post(
      "/v1/users",
      {
        email: email,
        displayName: `${name}`,
      },
      config
    );

    await odkAxios.post(
      `/v1/projects/${projectResponse.data.id}/assignments/5/${userResponse.data.id}`,
      {},
      config
    );

    await odkAxios.post(
      `/v1/projects/${projectResponse.data.id}/app-users`,
      {
        displayName: email.split("@")[0],
      },
      config
    );

    res.status(200).json({
      message: "User created successfully",
      data: userResponse.data,
    });
  } catch (error: any) {
    res
      .status(Number(error.response.data.code) || 500)
      .json({ error: error.response.data });
  }
}
