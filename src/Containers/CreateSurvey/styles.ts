import styled from "styled-components";

export const CreateSurveyContainer = styled.section`
  max-width: ${props => props.theme.maxWidth};
  margin: auto;
  padding: 20px;

  .c {
    margin-top: 60px;
  }
`;

export const SurveyGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  padding-top: 60px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    padding-top: 40px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    padding-top: 20px;
  }
`;

export const CreateSurveyCard = styled.div`
  width: 100%;
  padding: 15px 20px;
  text-align: center;
  background: #ffffff;
  border-radius: 10px;
  cursor: pointer;
  display: grid;
  gap: 30px;
  justify-content: center;
  align-items: center;

  :hover {
    outline: 2px solid #000;
  }

  svg {
    width: 100px;
    height: 100px;
    justify-self: center;
  }

  h2 {
    font-weight: 400;
    font-size: 32px;
    line-height: 24px;
    color: #353c3c;
  }

  p {
    font-weight: 500;
    font-size: 20px;
    line-height: 32px;
    color: #6c7373;
  }
`;

export const SurveyButtons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 24px;
  width: 80%;
  margin: auto;
`;
export const Button = styled.button`
  width: 100%;
  padding: 30px 20px;
  background: transparent;
  border: 2px solid ${props => props.theme.lightBackground};
  border-radius: 8px;
  font-weight: 600;
  letter-spacing: 0.02em;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: #fbeaf6;
    border: 2px solid ${props => props.theme.primaryColor};
    color: ${props => props.theme.primaryColor};
  }
`;

export const SurveyDrawerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100;
`;

export const SurveyDrawer = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 30%;
  height: 100vh;
  background: #fff;
  z-index: 101;
  overflow-y: auto;

  .survey-drawer-title {
    padding: 15px;
    font-size: 20px;
    font-weight: 600;
    border-bottom: 1px solid #ccc;
  }

  .survey-drawer-content {
    padding: 15px;
    display: grid;
    gap: 10px;
  }

  .btns {
    display: flex;
    justify-content: flex-end;
    padding: 15px;
    gap: 10px;

    button {
      padding: 10px 20px;
      border: 2px solid transparent;
      border-radius: 5px;
      cursor: pointer;
      font-weight: 500;

      &.primary {
        background: #703dfd;
        color: #fff;
      }

      &.secondary {
        background: #fff;
        color: #703dfd;
        border: 2px solid #703dfd;
      }
    }
  }
`;
