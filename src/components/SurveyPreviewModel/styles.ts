import styled from "styled-components";

export const SurveyPreviewOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
`;
export const SurveyPreviewWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 80%;
  height: 80%;
  z-index: 11;

  iframe {
    width: 100%;
    height: 100%;
  }
`;
