import { odkAxios } from "@/utils/useAxios";
import type { NextApiRequest, NextApiResponse } from "next";

// Helper function to create column definitions from form fields
const createColDefs = (fields: any[]) => {
  return fields
    .filter(field => field.type !== 'structure') // Skip structure fields
    .map(field => ({
      field: field.name, // Use name as the field identifier
      headerName: field.name.charAt(0).toUpperCase() + field.name.slice(1), // Capitalize first letter
      flex: 1,
      sortable: true,
      filter: true,
      // Add type-specific configurations
      ...(field.type === 'int' && { 
        filter: 'agNumberColumnFilter',
        type: 'numericColumn'
      }),
      ...(field.type === 'binary' && {
        cellRenderer: 'imageCellRenderer'
      })
    }));
};

// Helper function to match submission data with column definitions
const matchDataWithColumns = (submissionsData: any[], formFields: any[]) => {
  // Get field names excluding structure fields
  const fieldNames = formFields
    .filter(field => field.type !== 'structure')
    .map(field => field.name);

  // Map submissions data to match column fields
  return submissionsData.map(row => {
    const matchedRow: any = {};
    fieldNames.forEach(fieldName => {
      matchedRow[fieldName] = row[fieldName] || null;
    });
    return matchedRow;
  });
};

export default async function handler(
  req: NextApiRequest,
  response: NextApiResponse
) {
  const { projectId, formId } = req.body;
  const fieldsUri = `/v1/projects/${projectId}/forms/${formId}/draft/fields`;
  const submissionsUri = `/v1/projects/${projectId}/forms/${formId}/draft.svc/Submissions`;
  const authHeader = req.headers.authorization;

  try {
    // Get form fields schema
    const fieldsRes = await odkAxios.get(fieldsUri, {
      headers: { Authorization: authHeader },
    });
    const formFields = fieldsRes.data || [];
    
    // Log form fields for debugging
    console.log('Form Fields:', JSON.stringify(formFields, null, 2));

    // Get submissions data
    const submissionsRes = await odkAxios.get(submissionsUri, {
      headers: { Authorization: authHeader },
    });
    const submissionsData = submissionsRes.data?.value || [];

    // Create column definitions from form fields
    const colDefData = createColDefs(formFields);

    // Match submission data with column definitions
    const matchedTableData = matchDataWithColumns(submissionsData, formFields);

    return response.status(200).json({
      colDefData,
      tableData: matchedTableData
    });

  } catch (error: any) {
    console.error("API Error:", error);
    return response.status(500).json({
      message: error.message || "Internal Server Error",
      details: error.response?.data || "No details available",
    });
  }
}
