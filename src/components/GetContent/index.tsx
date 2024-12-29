import useSurveyStore from "@/context/surveyStores";
import { questionTypes } from "@/interfaces/questionTypes";
import { AiOutlineScan } from "react-icons/ai";
import { FiUploadCloud } from "react-icons/fi";
import ReactSignatureCanvas from "react-signature-canvas";
import { Input, Likert, Rating, TextArea } from "../QuestionTypes";
import Preview from "../QuestionTypes/GeoPoint";
import { LikertWithLang } from "../QuestionTypes/Likert";
import Trigger from "../QuestionTypes/Trigger";
import AddOptions, { AddLangOptions, PreviewOptions } from "./AddOptions";
import CascadingSelect from "./CascadingSelect";
import UploadMedia from "./UploadMedia";
import { GroupWrapperView } from "./styles";

const VALID_QUESTION_TYPES: questionTypes[] = [
  "shorttext",
  "longtext",
  "number",
  "date",
  "time",
  "rating",
  "group",
  "image",
  "audio",
  "video",
  "fileupload",
  "signature",
  "barcode",
  "ranking",
  "multipleselect",
  "singleselect",
  "note",
  "chooseone",
  "likert",
  "geopoint",
  "geoshape",
  "datetime",
  "trigger",
  "cascadingselect",
  "link",
];

const QuestionWithHint = ({
  children,
  hint,
}: {
  children: React.ReactNode;
  hint?: string;
}) => (
  <div>
    {hint && <div className="hint">{hint}</div>}
    {children}
  </div>
);

interface GroupField {
  questionType: questionTypes;
  typeLabel: string;
  optionType: string;
  hint?: string;
  label?: string;
  selectOptions?: any;
  groupfields?: any;
}

const GetContent = ({
  type,
  preview,
  options,
  groupfields,
  typeLabel,
  defaultValue,
  fieldProp,
  lang,
  questionType,
}: {
  fieldProp?: any;
  type: string;
  typeLabel?: string;
  preview?: boolean;
  options?: any;
  groupfields?: any;
  defaultValue?: string;
  lang?: string;
  questionType: questionTypes;
}) => {
  const {
    currentField,
    addFieldData,
    data: { fields },
  } = useSurveyStore();

  const getCurrentField = () => {
    if (!currentField) return undefined;

    let field = fields[currentField];

    if (!field) {
      Object.values(fields).forEach((groupField: any) => {
        if (
          groupField.group &&
          groupField.groupfields &&
          groupField.groupfields[currentField]
        ) {
          field = groupField.groupfields[currentField];
        }
      });
    }

    return field;
  };

  const field = getCurrentField();

  const effectiveQuestionType = field?.questionType || questionType;

  switch (effectiveQuestionType) {
    case "shorttext":
      return (
        <QuestionWithHint hint={field?.hint}>
          {typeLabel === "email" ? (
            <Input placeholder="Type your email here" type="email" />
          ) : typeLabel === "contact info" ? (
            <Input placeholder="Enter your answer here" />
          ) : typeLabel === "website" ? (
            <Input placeholder="https://" type="url" />
          ) : (
            <Input />
          )}
        </QuestionWithHint>
      );
    case "longtext":
      return (
        <QuestionWithHint hint={field?.hint}>
          <TextArea />
        </QuestionWithHint>
      );

    case "link":
      return (
        <input
          disabled={preview}
          style={{ width: "100%", padding: "10px", resize: "vertical" }}
          type="url"
          onChange={e => {
            addFieldData({ defaultValue: e.target.value });
          }}
          value={field?.defaultValue || defaultValue}
        />
      );

    case "number":
      return typeLabel === "phone number" ? (
        <Input
          placeholder="Type your phone number (with country code) here"
          type="number"
        />
      ) : (
        <Input type="number" placeholder="Type your answer here in numbers" />
      );

    case "date":
      if (field?.appearance && field.appearance === "month-year") {
        return <Preview img="/images/preview/date-yyyy-mm.svg" />;
      } else if (field?.appearance && field.appearance === "year") {
        return <Preview img="/images/preview/date-yyyy.svg" />;
      }
      return <Preview img="/images/preview/date.svg" />;

    case "time":
      return <Preview img="/images/preview/time.svg" />;

    case "rating":
      return <Rating fieldProp={fieldProp} />;

    case "group":
      return (
        <GroupWrapper
          groupfields={groupfields}
          preview={preview}
          fieldProp={fieldProp}
        />
      );

    case "cascadingselect":
      return (
        <>
          <GroupWrapper groupfields={groupfields} />
          <CascadingSelect />
        </>
      );

    case "image":
      return (
        <UploadMedia text="Upload Image" icon={<FiUploadCloud size={60} />} />
      );
    case "audio":
      return (
        <UploadMedia text="Upload Audio" icon={<FiUploadCloud size={60} />} />
      );
    case "video":
      return (
        <UploadMedia text="Upload Video" icon={<FiUploadCloud size={60} />} />
      );
    case "fileupload":
      return (
        <UploadMedia text="Upload File" icon={<FiUploadCloud size={60} />} />
      );

    case "signature":
      return (
        <div style={{ border: "1px solid" }}>
          <ReactSignatureCanvas
            penColor="black"
            canvasProps={{ width: 700, height: 300 }}
          />
        </div>
      );
    case "barcode":
      return (
        <UploadMedia
          text="Scan Barcode"
          size=""
          icon={<AiOutlineScan size={60} />}
        />
      );

    case "ranking":
      if (preview) {
        return <PreviewOptions options={options} />;
      }

      if (lang) {
        return <AddLangOptions lang={lang} />;
      }

      return <AddOptions />;

    case "multipleselect":
      if (preview) {
        return <PreviewOptions options={options} />;
      }

      if (lang) {
        return <AddLangOptions lang={lang} />;
      }

      return <AddOptions />;

    case "singleselect":
      if (preview) {
        return <PreviewOptions options={options} type="radio" />;
      }

      if (lang) {
        return <AddLangOptions type="radio" lang={lang} />;
      }

      return <AddOptions type="radio" />;
    case "note":
      return (
        <textarea
          onChange={e => {
            addFieldData({
              hint: e.target.value,
              ismodified: { ...field?.ismodified, hint: true },
            });
          }}
          value={
            field?.otherLangs?.find(v => v.lang === lang)?.hint || field?.hint
          }
          style={{ width: "100%", padding: "10px", resize: "vertical" }}
          rows={10}
          placeholder="Enter Your Note here"
          disabled={lang !== undefined || false}
        />
      );

    case "chooseone":
      if (lang) {
        return <AddLangOptions type="radio" lang={lang} hideBtn />;
      }

      return <AddOptions type="radio" hideBtn />;

    case "likert":
      if (lang) {
        return <LikertWithLang lang={lang} />;
      }

      return <Likert />;

    case "geopoint":
      return <Preview img="/images/preview/geo-point.svg" />;
    case "geoshape":
      return <Preview img="/images/preview/geo-shape.svg" />;

    case "datetime":
      return <Preview img="/images/preview/date-time.svg" />;

    case "trigger":
      return <Trigger />;

    // case "audit":
    //   return typeLabel === "Text Audit" ? (
    //     <Audit Audittype="Text" />
    //   ) : (
    //     <Audit Audittype="Audio" />
    //   );

    default:
      return <div>no Option type for this Question yet!</div>;
  }
};

export const GroupWrapper = ({
  groupfields = {} as Record<string, GroupField>,
  preview,
  fieldProp,
}: {
  groupfields: Record<string, GroupField>;
  preview?: boolean;
  fieldProp?: any;
}) => {
  const groupFieldsArray = Object.values(groupfields);

  return (
    <GroupWrapperView>
      {groupFieldsArray.map((field: GroupField, index: number) => (
        <div className="group__wrapper" key={index}>
          <div className="group__wrapper__label">{field.label}</div>
          <div className="group__wrapper__content">
            <QuestionWithHint hint={field.hint}>
              <GetContent
                type={field.optionType}
                typeLabel={field.typeLabel}
                preview={preview}
                options={field.selectOptions}
                groupfields={field.groupfields}
                fieldProp={field}
                questionType={field.questionType}
              />
            </QuestionWithHint>
          </div>
        </div>
      ))}
    </GroupWrapperView>
  );
};

export default GetContent;
