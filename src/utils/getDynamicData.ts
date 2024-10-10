type JsonObject = {
  [key: string]: any;
};

export const getDynamicTableData = (jsonData: JsonObject[]): JsonObject[] => {
  const convertObject = (obj: JsonObject, prefix = ""): JsonObject => {
    return Object.entries(obj).reduce((result: JsonObject, [key, value]) => {
      const newKey = prefix + key;

      if (
        typeof value === "object" &&
        obj[key] !== null &&
        !Array.isArray(value)
      ) {
        const flattenedObject = convertObject(value, newKey + "__");
        for (const prop in flattenedObject) {
          result[prop] = flattenedObject[prop];
        }
      } else {
        result[newKey] = value ?? "-";
      }
      return result;
    }, {});
  };

  return jsonData.map(item => convertObject(item));
};

const getType = (value: any) => {
  const fileExtensions = [".xlsx", ".xls"];
  const downloadExtensions = [
    ".m4a",
    ".jpg",
    ".png",
    ".mp3",
    ".wav",
    ".mp4",
    ".pdf",
    ".doc",
    ".docx",
    ".ppt",
    ".pptx",
    ".json",
    ".csv",
  ];
  const regex = new RegExp(`(${fileExtensions.join("|")})`, "i");
  const downloadRegex = new RegExp(`(${downloadExtensions.join("|")})`, "i");

  if (downloadRegex.test(value)) {
    return "download";
  }

  if (regex.test(value)) {
    return "openModel";
  }

  return undefined;
};

type OutputJsonType = {
  headerName: string;
  field?: string;
  children?: OutputJsonType[];
}[];

export const getColDefData = (inputJson: any): OutputJsonType => {
  const convertObjectColDef = (obj: Record<string, any>, prefix = ""): any => {
    const objData = Object.entries(obj).map(prop => {
      const [key, value] = prop;

      const field = prefix ? `${prefix}__${key}` : `${key}`;

      if (
        typeof obj[key] === "object" &&
        obj[key] !== null &&
        !Array.isArray(obj[key])
      ) {
        const convertedData = convertObjectColDef(obj[key], field).map(
          (item: any, innerIndex: number) => ({
            ...item,
            columnGroupShow: innerIndex !== 0 ? "open" : undefined,
          })
        );

        return {
          headerName: key,
          children: convertedData,
        };
      } else {
        return {
          headerName: key,
          field: field,
          columnType: getType(value),
        };
      }
    });
    return objData;
  };

  return convertObjectColDef(inputJson);
};
