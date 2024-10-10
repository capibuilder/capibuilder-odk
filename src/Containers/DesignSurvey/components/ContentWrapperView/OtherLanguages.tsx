import { GetContent } from "@/components";
import AutoResizableTextarea from "@/components/Custom/AutoResizableTextarea";
import LengthWarner from "@/components/Custom/LengthWarner";
import useSurveyStore from "@/context/surveyStores";
import { MultiLangs, questionField } from "@/interfaces/questionFields";
import { ContentWrapper } from "./styles";

interface QuestionRenderProps {
  multiLangs: MultiLangs;
  field: questionField;
}

const OtherLanguages = ({ multiLangs, field }: QuestionRenderProps) => {
  const addFieldData = useSurveyStore(state => state.addFieldData);

  const handleChange = (type: keyof questionField, data: any) => {
    if (!field.otherLangs) return;

    const updatedArray = field.otherLangs.map(item => {
      if (item.lang === multiLangs.lang) {
        return { ...item, [type]: data };
      }
      return item;
    });

    addFieldData({ otherLangs: updatedArray });
  };

  return (
    <ContentWrapper>
      <span className="language_tag">{multiLangs.lang}</span>
      <div className="content__header">
        <div className="content__header__number">{field.questionNumber}</div>
        <div className="content__header__title">
          <div className="input-group">
            <AutoResizableTextarea
              placeholder={
                "Enter title in English on the top block to auto-translate."
              }
              // type="text"
              key={field.id?.toString() + "title" || ""}
              className="title c-scrollbar"
              value={multiLangs?.label}
              onChange={e => {
                handleChange("label", e.target.value);
              }}
            />
          </div>
          {multiLangs?.label && (
            <LengthWarner
              allowedLength={255}
              text={multiLangs.label || ""}
              input="title"
            />
          )}

          <>
            <div className="input-group desc">
              <AutoResizableTextarea
                key={field.id?.toString() + "desc" || ""}
                className="description c-scrollbar"
                value={multiLangs?.hint}
                onChange={e => handleChange("hint", e.target.value)}
                placeholder={
                  "Enter description in English on the top block to auto-translate."
                }
              />
            </div>
            {multiLangs?.hint && field.questionType !== "note" && (
              <LengthWarner
                allowedLength={255}
                text={multiLangs.hint || ""}
                input="description"
              />
            )}
          </>
        </div>
      </div>
      <div className="content__body">
        <GetContent
          type={field?.optionType as string}
          typeLabel={field?.typeLabel as string}
          preview={false}
          options={{}}
          groupfields={field?.groupfields}
          lang={multiLangs.lang}
          questionType={field.questionType}
        />
      </div>
    </ContentWrapper>
  );
};

export default OtherLanguages;
