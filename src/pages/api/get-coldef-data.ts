import { getColDefData, getDynamicTableData } from "@/utils/getDynamicData";
import { odkAxios } from "@/utils/useAxios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  response: NextApiResponse
) {
  const { projectId, formId } = req.body;

  const uri = `/v1/projects/${projectId}/forms/${formId}.svc/Submissions`;

  try {
    const res = await odkAxios.get(uri, {
      headers: {
        Authorization: req.headers.authorization,
      },
    });

    const jsonData = res.data.value;

    const agHeaderData = { ...jsonData[0] };

    // delete meta from this object
    delete agHeaderData.meta.instanceID;
    delete agHeaderData.meta.entity;
    delete agHeaderData.__id;
    delete agHeaderData.__system;

    const colDefData = getColDefData(agHeaderData);
    const tableData = getDynamicTableData(jsonData);

    return response.status(201).json({
      colDefData,
      tableData,
    });
    console.log("data from Submision by day", tableData);
  } catch (error: any) {
    console.error("ERROR>>", error.response.data);

    return response.status(500).json({
      message: error.message,
      colDefData: [],
      tableData: [],
    });
  }
}
