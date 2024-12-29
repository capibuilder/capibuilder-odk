import { getTranslationOptions } from "@/components/GetContent/AddOptions";
import useSurveyStore from "@/context/surveyStores";
import useKeyPress from "@/hooks/useKeyPress";
import { generateRandomId } from "@/utils/generateRandomId";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { shallow } from "zustand/shallow";
import { inputListData } from "./inputListData";
import {
  InputItem,
  InputTypeContainer,
  InputTypeListContainer,
  InputTypeWrapper,
  Overlay,
  SearchbarContainer,
} from "./styles";

interface InputTypesProps {
  open?: boolean;
  setOpen: (open: boolean) => void;
  isGrouped?: boolean;
}

const InputTypes: React.FC<InputTypesProps> = ({
  open = false,
  setOpen,
  isGrouped = false,
}) => {
  const [query, setQuery] = useState<string>("");

  const filteredInputListData = useMemo(() => {
    return inputListData.filter(item =>
      item.options.some(option =>
        option.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query]);

  useKeyPress("Escape", () => setOpen(false));

  return (
    <>
      <Overlay
        open={open}
        onClick={() => {
          setOpen(false);
          document.body.style.overflow = "unset";
        }}
      />
      <InputTypeContainer open={open}>
        <SearchBar query={query} setQuery={setQuery} />
        <InputTypeList
          inputListData={filteredInputListData}
          onClick={() => {
            setOpen(false);
            document.body.style.overflow = "unset";
          }}
          visible={open}
          isGrouped={isGrouped}
        />
      </InputTypeContainer>
    </>
  );
};

interface SearchbarProps {
  placeholder?: string;
  query: string;
  setQuery: (query: string) => void;
}

export const SearchBar: React.FC<SearchbarProps> = ({
  placeholder = "Find a question type",
  query,
  setQuery,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <SearchbarContainer>
      <div className="group">
        <input
          type="search"
          ref={inputRef}
          required
          placeholder={placeholder}
          value={query}
          onChange={e => {
            if (e.target.value !== "/") setQuery(e.target.value);
          }}
        />
      </div>
    </SearchbarContainer>
  );
};

interface InputTypeListProps {
  inputListData: {
    title: string;
    options: any[];
  }[];
  onClick: () => void;
  visible: boolean;
  isGrouped: boolean;
}

const InputTypeList: React.FC<InputTypeListProps> = ({
  inputListData,
  onClick,
  visible,
  isGrouped,
}) => {
  const { data, setData, currentField, setCurrentField, currentTabBtn } =
    useSurveyStore(state => state, shallow);

  const handleClick = useCallback(
    async (option: any) => {
      // Get current field count for numbering
      const currentFieldNumber = Object.values(data.fields).filter(
        (field: any) =>
          field.parentId ===
          (currentTabBtn === "content" ? null : currentTabBtn)
      ).length;

      const randomId = generateRandomId(5);
      const commonFieldData = {
        id: randomId,
        instanceId: generateRandomId(8),
        dataAttribute: option.value,
        tab: "content",
        parentId: currentTabBtn === "content" ? null : currentTabBtn,
        questionNumber: currentFieldNumber + 1,
        otherLangs: data?.langs?.map(v => ({
          label: "",
          lang: v,
          hint: "",
          requiredMsg: "",
          constraintMsg: "",
          defaultValue: "",
          selectOptions: [],
        })),
      };

      if (["yesNo", "likertScale"].includes(option.value)) {
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
          option.field.selectOptions,
          data.langs!
        );

        setData({
          ...data,
          fields: {
            ...data.fields,
            [`field-${randomId}`]: {
              ...option.field,
              ...commonFieldData,
              otherLangs: newOtherLangs,
            },
          },
        });
      } else {
        setData({
          ...data,
          fields: {
            ...data.fields,
            [`field-${randomId}`]: {
              ...option.field,
              ...commonFieldData,
            },
          },
        });
      }

      setCurrentField(`field-${randomId}`);
      onClick();
    },
    [data, setData, setCurrentField, currentTabBtn, onClick]
  );

  return (
    <InputTypeListContainer>
      <div className="title">Question Types & Form Structure</div>
      <InputTypeWrapper
        className="c-scrollbar"
        style={{ overflowY: visible ? "auto" : "hidden" }}
      >
        {inputListData.map((item, index) => (
          <InputItem
            style={{ opacity: visible ? "1" : "0" }}
            data-animate="slideUp"
            key={index}
          >
            <div className="title">{item.title}</div>
            <div className="options">
              {item.options.map((option, idx) => (
                <button
                  disabled={
                    isGrouped && option.field.questionType === "cascadingselect"
                  }
                  data-animate="slideUp"
                  onClick={() => handleClick(option)}
                  className="option-item"
                  key={idx}
                >
                  <span className="icon">{option.icon}</span> {option.title}
                </button>
              ))}
            </div>
          </InputItem>
        ))}
      </InputTypeWrapper>
    </InputTypeListContainer>
  );
};

export default InputTypes;
