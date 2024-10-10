import { GetContent } from "@/components";
import { modifiedJsonData } from "@/utils/modifiedJsonData";
import { ContentWrapper, TemplatesPreviewWrapper } from "./styles";

const TemplatesContentPreview = ({ newData, fields }: any) => {
  return (
    <TemplatesPreviewWrapper>
      <div className="preview__image">
        <img src="/card-placeholder.webp" alt="preview" />
      </div>
      <Content title={newData?.templateTitle} hideText>
        <p>{newData?.description}</p>
      </Content>
      {Object.values(modifiedJsonData(fields)).map((field: any) => (
        <Content title={field.label} key={field.id}>
          <GetContent
            type={field?.optionType}
            preview={true}
            options={field.selectOptions}
            groupfields={field.groupfields}
            questionType={field.questionType}
          />
        </Content>
      ))}
    </TemplatesPreviewWrapper>
  );
};

const Content = ({
  title,
  hideText = false,
  children,
}: {
  title: string;
  hideText?: boolean;
  children: React.ReactNode;
}) => {
  return (
    <ContentWrapper hideText={hideText}>
      <div className="header">{title}</div>
      {!hideText && <div className="content">{children}</div>}
    </ContentWrapper>
  );
};

export default TemplatesContentPreview;
