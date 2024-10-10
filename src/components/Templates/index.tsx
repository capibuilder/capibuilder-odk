import React from "react";
import {
  TemplateWrapper,
  TemplateName,
  TemplateTitle,
  TemplateText,
  DarkButton,
} from "./style";
const TemplateComponent = ({
  templateName,
  title,
  text,
}: {
  templateName: string;
  title: string;
  text: string;
}) => {
  return (
    <TemplateWrapper>
      <TemplateName>{templateName}</TemplateName>
      <TemplateTitle>{title}</TemplateTitle>
      <TemplateText>{text}</TemplateText>
      <DarkButton>Learn More</DarkButton>
    </TemplateWrapper>
  );
};

export default TemplateComponent;
