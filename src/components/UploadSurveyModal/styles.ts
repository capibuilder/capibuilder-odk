import styled from "styled-components";

export const SurveyModelContainer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 2;
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

export const Title = styled.h1``;

export const UploadDropZone = styled.label`
  display: block;
  width: 100%;
  height: 200px;
  border-radius: 10px;
  position: relative;
  transition: all 0.3s;
  border: 1px solid #d5d4d4;
  background: #f0f0f0;

  :hover {
    background-color: #b3b3b3;
  }

  span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: block;
    font-weight: 500;
    width: 90%;
    text-align: center;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;

    img {
      user-select: none;
      margin-bottom: 7px;
    }
  }

  input {
    opacity: 0;
    width: 100%;
    height: 100%;
  }
`;
