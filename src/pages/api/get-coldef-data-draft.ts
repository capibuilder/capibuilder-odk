import { getColDefData, getDynamicTableData } from "@/utils/getDynamicData";
import { odkAxios } from "@/utils/useAxios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  response: NextApiResponse
) {
  const { projectId, formId } = req.body;

  const uri = `/v1/projects/${projectId}/forms/${formId}/draft.svc/Submissions`;

  try {
    const res = await odkAxios.get(uri, {
      headers: {
        Authorization: req.headers.authorization,
      },
    });

    if (!res.data?.value || !res.data.value.length) {
      return response.status(200).json({
        colDefData: [],
        tableData: [],
      });
    }

    const jsonData = res.data.value;
    const agHeaderData = jsonData[0] ? { ...jsonData[0] } : {};

    if (agHeaderData.meta) {
      delete agHeaderData.meta.instanceID;
      delete agHeaderData.meta.entity;
    }
    if ("__id" in agHeaderData) delete agHeaderData.__id;
    if ("__system" in agHeaderData) delete agHeaderData.__system;

    const colDefData = getColDefData(agHeaderData);
    const tableData = getDynamicTableData(jsonData);

    return response.status(200).json({
      colDefData,
      tableData,
    });
  } catch (error: any) {
    console.error("API Error:", error);
    return response.status(500).json({
      message: error.message || "Internal Server Error",
      details: error.response?.data || "No details available",
    });
  }
}
