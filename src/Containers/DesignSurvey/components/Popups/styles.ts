import styled from "styled-components";

export const SurveyModelContainer = styled.div`
  position: fixed;
  inset: 0;
  z-index: 10;

  .head {
    h2 {
      font-size: 24px;
    }
  }

  .cont {
    width: 500px;
    padding: 25px;
  }

  hr {
    margin: 15px 0;
    height: 1px;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;

  select {
    padding: 8px;
    border-radius: 4px;
    border: 1px solid #d4d4d4;
  }
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
