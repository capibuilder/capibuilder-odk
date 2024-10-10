import styled from "styled-components";

export const TemplateWrapper = styled.div`
  background-color: #d8dbfb;
  width: 499px;
  height: 557px;
  padding: 68px 58px;
  display: flex;
  justify-items: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  border-radius: 20px;
  gap: 10px;
`;

export const TemplateName = styled.h4`
  color: #6f47eb;
  font-family: Poppins, sans-serif;
  font-size: 20px;
  line-height: 30px;
  font-weight: 400;
`;

export const TemplateTitle = styled.h3`
  font-family: Inter, sans-serif;
  font-weight: 400;
  font-size: 48px;
  line-height: 58px;
  margin-bottom: 20px;
`;

export const TemplateText = styled.p`
  color: #5e5d6d;
  font-family: Poppins, sans-serif;
  font-size: 20px;
  line-height: 30px;
  font-weight: 400;
  margin-bottom: 60px;
`;

export const DarkButton = styled.button`
  margin-top: 20px;
  background-color: #6f47eb;
  border: none;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 8px;
  margin: 0 10px;
  cursor: pointer;
  width: auto;

  &:hover {
    background-color: #543cc7;
  }
`;
