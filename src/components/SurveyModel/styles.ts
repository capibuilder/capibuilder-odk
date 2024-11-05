import styled from "styled-components";

export const SurveyModelContainer = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  z-index: 2;
  align-items: center;
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: #dce4ea;
  z-index: 2;
`;

export const Title = styled.h1``;
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

  .label {
    display: flex;
    gap: 4px;
    
    .required {
      color: red;
      margin-left: 4px;
    }
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
