import { Empty } from "@/components";
import useSurveyStore from "@/context/surveyStores";
import useInputFocus from "@/hooks/useInputFocus";
import { questionField } from "@/interfaces/questionFields";
import { questionTypes } from "@/interfaces/questionTypes";
import { combineQuestion } from "@/utils/combineQuestions";
import { useEffect, useState } from "react";
import { inputListData } from "../InputTypeContainer/inputListData";
import { DropdownWrapper } from "./styles";

export interface questionType {
  title?: string;
  value?: string;
  icon?: React.ReactNode;
  field?: questionField;
}

interface props {
  onClose?: () => void;
}

export default function QuestionDropDown({ onClose }: props) {
  const [input, setInput] = useState("");
  const { addFieldData, currentField, data } = useSurveyStore(state => state);
  const focusInputRef = useInputFocus();

  const questions: questionType[] = combineQuestion(inputListData);

  const filtered = input
    ? questions?.filter(e => {
        return e.title?.toLowerCase()?.includes(input.toLowerCase());
      })
    : questions;

  const handleFieldChange = (input: questionField) => {
    addFieldData({
      ...data.fields[currentField as string],
      ...input,
      label: data.fields[currentField as string]?.label || "",
    });
    onClose && onClose();
  };

  useEffect(() => {
    const handleClick = () => {
      onClose && onClose();
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <DropdownWrapper
      onClick={e => {
        e.stopPropagation();
        e.preventDefault();
      }}
      className="c-scrollbar"
    >
      <div className="search">
        <input
          ref={focusInputRef}
          type="search"
          onChange={e => {
            setInput(e.target.value);
          }}
          placeholder="Search..."
        />
      </div>
      {filtered?.length === 0 ? (
        <Empty message="No Result" />
      ) : (
        filtered.map((d, index) => (
          <>
            <li
              key={index}
              onClick={() => {
                handleFieldChange({
                  type: d.field?.type,
                  auditType: d.field?.auditType,
                  label: d.field?.label,
                  typeLabel: d.field?.typeLabel,
                  meta: d.field?.meta,
                  dataAttribute: d.field?.dataAttribute,
                  appearance: d.field?.appearance,
                  style: d.field?.style,
                  preload: d.field?.preload,
                  preloadParams: d.field?.preloadParams,
                  mediatype: d.field?.mediatype,
                  sliderOptions: d.field?.sliderOptions,
                  // selectOptions: d.field?.selectOptions,
                  group: d.field?.group,
                  groupLabel: d.field?.groupLabel,
                  groupfields: d.field?.groupfields,
                  optionType: d.field?.optionType,
                  questionType: d.field?.questionType as questionTypes,
                });
              }}
              data-animate="slideUp"
            >
              <span className="icon">{d.icon}</span>
              {d.title}
            </li>
          </>
        ))
      )}
    </DropdownWrapper>
  );
}
