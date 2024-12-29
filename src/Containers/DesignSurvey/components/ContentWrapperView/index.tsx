import { GetContent, Loading } from "@/components";
import AutoResizableTextarea from "@/components/Custom/AutoResizableTextarea";
import LengthWarner from "@/components/Custom/LengthWarner";
import useSurveyStore from "@/context/surveyStores";
import { isModified, questionField } from "@/interfaces/questionFields";
import { modifiedJsonData } from "@/utils/modifiedJsonData";
import { getTranslation } from "@/utils/network/getTranslation";
import { useDebounce } from "@poiler/utils";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { shallow } from "zustand/shallow";
import { ContentWrapper } from "./styles";

const getAutoResizablePlaceholder = (current: any): string => {
  if (current.typeLabel === "end screen") {
    return "Enter End Screen message here.";
  } else if (current.typeLabel === "welcome screen") {
    return "Enter Welcome Screen here.";
  } else if (current.typeLabel === "statement") {
    return "Enter your Statement here.";
  } else {
    return "Enter your question here.";
  }
};

const ContentWrapperView = () => {
  const data = useSurveyStore(state => state.data, shallow);
  const addFieldData = useSurveyStore(state => state.addFieldData);
  const currentField = useSurveyStore(state => state.currentField)!;
  const [isTranslating, setIsTranslating] = useState(false);
  const [prevLabel, setPrevLabel] = useState("");
  const [prevHint, setPrevHint] = useState("");

  const thisField: questionField = modifiedJsonData(data.fields)[currentField];

  const current: questionField = !!thisField
    ? thisField
    : (data.fields[currentField] as unknown as questionField);

  const debouncedTranslate = useDebounce(
    async (type: keyof isModified, text: string) => {
      if (
        !text ||
        !data.langs ||
        !current ||
        !current?.ismodified ||
        !current.ismodified?.[type] ||
        data.langs.length < 1
      )
        return;
      setIsTranslating(true);

      const { data: translationResponse, error } = await getTranslation({
        languages: data.langs,
        text: text,
      });

      if (error) {
        return;
      }

      const translations =
        translationResponse?.translate.data[0].translations || [];

      const updatedOtherLangs: any = [...(current?.otherLangs || [])];

      translations.forEach(tr => {
        const index = updatedOtherLangs.findIndex(
          (c: any) => c?.lang === tr.to
        );
        if (index !== -1) {
          updatedOtherLangs[index][type] = tr.text;
        } else {
          updatedOtherLangs.push({ lang: tr.to, [type]: tr.text });
        }
      });

      addFieldData({
        otherLangs: updatedOtherLangs,
        ismodified: { ...current?.ismodified, [type]: false },
      });
      setIsTranslating(false);
    },
    1000
  );

  const handleInsertClick = (string: string, insertValue: string) => {
    if (current.group) {
      addFieldData({
        label: string + insertValue,
        groupLabel: string,
        ismodified: { ...current?.ismodified, label: true },
      });
    } else {
      addFieldData({
        label: string + insertValue,
        ismodified: { ...current?.ismodified, label: true },
      });
    }
  };

  useEffect(() => {
    if (current?.label && current.label !== prevLabel) {
      setPrevLabel(current.label);
      debouncedTranslate("label", current.label);
    }
  }, [current?.label, prevLabel]);

  useEffect(() => {
    if (current?.hint && current.hint !== prevHint) {
      setPrevHint(current.hint);
      debouncedTranslate("hint", current.hint);
    }
  }, [current?.hint, prevHint]);

  useEffect(() => {
    current?.requiredMsg &&
      debouncedTranslate("requiredMsg", current.requiredMsg);
  }, [current?.requiredMsg]);

  useEffect(() => {
    current?.constraintMsg &&
      debouncedTranslate("constraintMsg", current.constraintMsg);
  }, [current?.constraintMsg]);

  // useEffect(() => {
  //   current?.defaultValue &&
  //     debouncedTranslate("defaultValue", current.defaultValue);
  // }, [current?.defaultValue]);

  if (!current) {
    return <></>;
  }

  return (
    <ContentWrapper>
      {isTranslating && (
        <div className="translating">
          <Loading inline />
        </div>
      )}
      <div className="content__header">
        <div className="content__header__number">{current.questionNumber}</div>
        <div className="content__header__title">
          <div className="input-group">
            <AutoResizableTextarea
              placeholder={getAutoResizablePlaceholder(current)}
              key={current.id?.toString() + "title" || ""}
              className="title c-scrollbar"
              value={current?.label}
              onChange={e => {
                if (current.group) {
                  addFieldData({
                    label: e.target.value,
                    groupLabel: e.target.value,
                    ismodified: { ...current?.ismodified, label: true },
                  });
                } else {
                  addFieldData({
                    label: e.target.value,
                    ismodified: { ...current?.ismodified, label: true },
                  });
                }
              }}
            />
          </div>
          {current?.label && (
            <LengthWarner
              allowedLength={255}
              text={current.label || ""}
              input="title"
            />
          )}

          <>
            <div className="input-group desc">
              <AutoResizableTextarea
                key={current.id?.toString() + "desc" || ""}
                className="description c-scrollbar"
                value={current?.hint}
                onChange={e =>
                  addFieldData({
                    hint: e.target.value,
                    ismodified: { ...current?.ismodified, hint: true },
                  })
                }
                onClick={() => {
                  if (!current?.ismodified?.hint) {
                    addFieldData({
                      hint: "",
                      ismodified: { ...current?.ismodified, hint: true },
                    });
                  }
                }}
              />
            </div>
            {current?.hint && current.questionType !== "note" && (
              <LengthWarner
                allowedLength={255}
                text={current.hint || ""}
                input="description"
              />
            )}
          </>
        </div>
      </div>
      <div className="content__body">
        <GetContent
          type={current?.optionType as string}
          typeLabel={current?.typeLabel as string}
          preview={false}
          options={{}}
          groupfields={current?.groupfields}
          questionType={current.questionType}
        />
      </div>
    </ContentWrapper>
  );
};

const TagWrapper = styled.div`
  width: 400px;
  background-color: ${props => props.theme.linkColor};
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  z-index: 3000;
  max-height: 96vh;
  overflow-y: auto;
`;

export default ContentWrapperView;
