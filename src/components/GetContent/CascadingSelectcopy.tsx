import useSurveyStore from "@/context/surveyStores";
import { ChangeEvent, useState } from "react";
import * as XLSX from "xlsx";
import { CascadingSelectWrapper } from "./styles";

const defaultSelectProps = {
  id: "8",
  type: "select_one",
  label: "single Select",
  typeLabel: "single Select",
  required: false,
  meta: false,
  readOnly: false,
  dataAttribute: "",
  hint: "",
  calculate: "",
  constraint: "",
  constraintMsg: "",
  relevant: "",
  requiredMsg: "",
  defaultValue: "",
  appearance: "Default",
  style: "select1",
  preload: "",
  preloadParams: "",
  selectOptions: [],
  mediatype: "",
  sliderOptions: null,
  group: false,
  groupRepeat: false,
  groupLabel: "",
  typeLroupLabel: "",
  groupfields: [],
  optionType: "select-one",
  // optionType: "dropdown",
};

export default function CascadingSelect() {
  const [tableData, setTableData] = useState("");
  const [dataKeys, setDataKeys] = useState<string[]>([]);
  const { data, currentField } = useSurveyStore();

  const setData = useSurveyStore(state => state.setData);

  const selected = data.fields[currentField!];

  const handleAdd = (opta: any[]) => {
    if (dataKeys.length === 0) return;

    const randomId = Math.floor(Math.random() * 1000000000);

    if (!currentField) return;

    const childQue = dataKeys.map((key, i) => {
      const uniqueValues = new Set();
      const selectOptions = opta
        .map(c => ({
          value: c[key],
          parentName: i > 0 ? c[dataKeys[i - 1]] : null,
          parentKey: i > 0 ? dataKeys[i - 1].replaceAll(" ", "") : null,
        }))
        .filter(value => {
          if (!uniqueValues.has(value.value)) {
            uniqueValues.add(value.value);
            return true;
          }
          return false;
        })
        .map(({ parentName, value, parentKey }) => ({
          label: value,
          value,
          parentName,
          stage: i + 1,
          parentKey,
        }));

      return {
        ...defaultSelectProps,
        id: randomId,
        dataAttribute: key.replaceAll(" ", ""),
        label: key,
        questionNumber: Object.keys(data.fields).length + 1,
        isCascading: true,
        selectOptions,
      };
    });

    setData({
      ...data,
      fields: {
        ...data.fields,
        [currentField]: {
          ...selected,
          groupfields: childQue,
        },
      },
    });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const [file]: any = e.target.files;
    const reader = new FileReader();

    reader.onload = (evt: any) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_html(ws);
      const json = XLSX.utils.sheet_to_json(ws);
      const csv = XLSX.utils.sheet_to_csv(ws, {
        blankrows: false,
      });

      setDataKeys(csv.split("\n")[0].split(","));

      handleAdd(json.slice(0, 2000));
    };
    reader.readAsBinaryString(file);
  };

  const onSubmit = (data: any) => {
    handleAdd(data.validData);
  };

  return (
    <CascadingSelectWrapper className=" c-scrollbar">
      <br />
      <input
        type="file"
        onChange={onChange}
        accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      />

      <div
        className="c-scrollbar preview-table"
        dangerouslySetInnerHTML={{ __html: tableData }}
      />
    </CascadingSelectWrapper>
  );
}

function groupData(data: any[], keys: string[]) {
  const groupedData: { [districtNameEn: string]: any[] } = {};

  for (const item of data) {
    const key1 = item[keys[0]];
    const key2 = item[keys[1]];
    const key3 = item[keys[2]];

    if (!groupedData[key1]) {
      groupedData[key1] = [];
    }

    // Check if the district already exists in the array
    const districtIndex = groupedData[key1].findIndex(
      (district: any) => district[keys[0]] === key1
    );

    if (districtIndex === -1) {
      // If the district does not exist, create a new district object
      const newDistrict: any = {
        [keys[0]]: key1,
        [keys[1]]: [],
      };
      const newBlock: any = {
        [keys[1]]: key2,
        [keys[2]]: [key3],
      };
      newDistrict[keys[1]].push(newBlock);
      groupedData[key1].push(newDistrict);
    } else {
      // If the district exists, check if the block already exists
      const blockIndex = groupedData[key1][districtIndex][keys[1]]?.findIndex(
        (block: any) => block[keys[1]] === key2
      );

      if (blockIndex === -1) {
        // If the block does not exist, create a new block object
        const newBlock = {
          [keys[1]]: key2,
          [keys[2]]: [key3],
        };
        groupedData[key1][districtIndex][keys[1]].push(newBlock);
      } else {
        // If the block exists, add the village to it
        groupedData[key1][districtIndex][keys[1]][blockIndex][keys[2]].push(
          key3
        );
      }
    }
  }

  return groupedData;
}
