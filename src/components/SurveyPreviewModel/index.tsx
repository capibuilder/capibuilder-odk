import React from "react";
import { SurveyPreviewOverlay, SurveyPreviewWrapper } from "./styles";

const SurveyPreviewModel = ({
  previewUrl,
  setPreviewUrl,
}: {
  previewUrl: string;
  setPreviewUrl: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <>
      <SurveyPreviewOverlay onClick={() => setPreviewUrl("")} />
      <SurveyPreviewWrapper>
        <iframe src={previewUrl}></iframe>
      </SurveyPreviewWrapper>
    </>
  );
};

export default SurveyPreviewModel;
