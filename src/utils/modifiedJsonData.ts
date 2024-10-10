export const modifiedJsonData = (json: any) => {
  const modifyJson = (json: any, parentId: string | null = null) => {
    const data: any = {};
    const fields = addParentPathToFields(json);

    for (const key in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, key)) {
        const value = fields[key];
        if (value.parentId === parentId) {
          // Create a deep copy of the value before modifying it
          const valueCopy = { ...value };
          data[key] = valueCopy;
          const childNodes = Object.entries(fields).filter(
            ([_, v]: any) => v.parentId === key
          );
          if (childNodes.length > 0) {
            // Pass a shallow copy of the current node instead of the whole fields
            data[key].groupfields = modifyJson({ ...fields }, key);
          }
        }
      }
    }

    return data;
  };

  return modifyJson(json);
};

export const getParentDataAttributes = (
  fields: any,
  fieldId: string
): string[] => {
  if (fieldId === "content") return [];
  const dataAttributes = [];
  const field = fields[fieldId];

  if (field.parentId) {
    dataAttributes.push(...getParentDataAttributes(fields, field.parentId));
  }

  dataAttributes.push(field.dataAttribute);
  return dataAttributes;
};

const addParentPathToFields = (fields: any) => {
  for (const key in fields) {
    if (Object.prototype.hasOwnProperty.call(fields, key)) {
      const field = fields[key];
      const parentPath = getParentDataAttributes(
        fields,
        field.parentId ?? "content"
      );
      fields[key].parentPath = parentPath;
    }
  }

  return fields;
};
