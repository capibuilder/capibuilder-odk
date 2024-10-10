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

export const ModelWrapper = styled.div`
  width: 450px;
  height: 220px;
  background-color: ${props => props.theme.linkColor};
  padding: 48px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  z-index: 3;

  .close-btn {
    position: absolute;
    top: 16px;
    right: 16px;
  }

  .btn-group {
    width: 100%;

    button {
      width: 30%;

      :first-child {
        background: none;
        border: 2px solid ${props => props.theme.primaryColor};
        color: ${props => props.theme.primaryColor};
      }

      :hover {
        opacity: 0.9;
      }
    }
  }
`;
export const Title = styled.h1`
  font-size: 28px;
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  border: none;
  background-color: ${props => props.theme.primaryColor};
  color: ${props => props.theme.linkColor};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-transform: capitalize;
`;
