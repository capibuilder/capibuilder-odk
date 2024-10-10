import type { NextApiRequest, NextApiResponse } from "next";

import { deflate } from "pako";

const qrSettings = (url: string, name = "test name") => {
  return {
    general: {
      server_url: url,
      form_update_mode: "match_exactly",
      autosend: "wifi_and_cellular",
    },
    project: {
      name,
      icon: "📝",
    },
    // Collect requires the settings to have an `admin` property.
    admin: {},
  };
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url, name } = req.body;

  const data = deflate(JSON.stringify(qrSettings(url, name)));

  const base64 = Buffer.from(data).toString("base64");

  res.status(200).json({ base64 });
}
