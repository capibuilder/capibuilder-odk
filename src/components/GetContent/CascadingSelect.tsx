import useSurveyStore from "@/context/surveyStores";
import { questionField } from "@/interfaces/questionFields";
import { generateRandomId } from "@/utils/generateRandomId";
import { getTranslation } from "@/utils/network/getTranslation";
import { useState } from "react";
import { ReactSpreadsheetImport } from "react-spreadsheet-import";
import { RawData } from "react-spreadsheet-import/types/types";
import { getTranslationOptions } from "./AddOptions";
import { CascadingSelectWrapper } from "./styles";

export const defaultSelectProps = {
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
  const { data, currentField } = useSurveyStore();

  const [isOpen, setIsOpen] = useState(false);
  const [dataKeys, setDataKeys] = useState<string[]>([]);

  const onClose = () => {
    setIsOpen(false);
  };

  const setData = useSurveyStore(state => state.setData);

  const selected = data.fields[
    currentField as string
  ] as unknown as questionField;

  const handleAdd = async (opta: any[]) => {
    if (dataKeys.length === 0) return;

    // const randomId = generateRandomId(5);

    if (!currentField) return;

    const childQue = await Promise.all(
      dataKeys.map(async (key, i) => {
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

        const addOptions = selectOptions.map((c: any) => ({
          label: c.label,
          value: c.value,
        }));

        const otherLangs = data?.langs!.map(v => ({
          label: "",
          lang: v,
          hint: "",
          requiredMsg: "",
          constraintMsg: "",
          defaultValue: "",
          selectOptions: [],
        }));

        const newOtherLangs = await getTranslationOptions(
          otherLangs,
          addOptions,
          data.langs!
        );

        const newOtherLangsWithLabel = await Promise.all(
          newOtherLangs.map(async v => {
            const { data: translationResponse } = await getTranslation({
              languages: [v.lang],
              text: key,
            });

            const translations =
              translationResponse?.translate.data[0].translations;

            return {
              ...v,
              label: translations?.at(0)?.text || key,
            };
          })
        );

        const randomId = generateRandomId(5);

        return {
          ...defaultSelectProps,
          id: randomId,
          dataAttribute: key.replaceAll(" ", ""),
          label: key,
          questionNumber: Object.keys(data.fields).length + 1,
          questionType: "singleselect",
          isCascading: true,
          selectOptions,
          ismodified: { label: true, selectOptions: true },
          otherLangs: newOtherLangsWithLabel,
          parentId: currentField,
        };
      })
    );

    const adde = {
      ...selected,
      parentId: null,
    };

    const newFields = childQue.reduce((acc: any, curr) => {
      acc[`field-${curr.id}`] = curr;
      return acc;
    }, {});

    setData({
      ...data,
      fields: {
        ...data.fields,
        [currentField]: adde,
        ...newFields,
      },
    });
  };

  const onSubmit = (data: any) => {
    handleAdd(data.validData);
  };

  return (
    <CascadingSelectWrapper className=" c-scrollbar">
      <>
        <button onClick={() => setIsOpen(true)}>Open</button>
        <ReactSpreadsheetImport
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={onSubmit}
          autoMapHeaders
          parseRaw
          selectHeaderStepHook={async (
            headerValues: RawData,
            data: RawData[]
          ): Promise<{ headerValues: RawData; data: RawData[] }> => {
            setDataKeys(headerValues as string[]);

            return {
              data,
              headerValues,
            };
          }}
          fields={dataKeys.map(key => ({
            label: key,
            key: key,
            alternateMatches: [key, key?.replaceAll(" ", "")],
            fieldType: {
              type: "input",
            },
            validations: [
              {
                rule: "required",
                errorMessage: key + " is required",
                level: "error",
              },
            ],
          }))}
        />
      </>
    </CascadingSelectWrapper>
  );
}
