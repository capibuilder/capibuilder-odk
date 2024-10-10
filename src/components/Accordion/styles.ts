import styled from "styled-components";

export const PanelContainer = styled.div<{ isActive: boolean }>`
  border: 1px solid ${({ isActive }) => (isActive ? "#000" : "#e4e4e4")};
  height: ${({ isActive }) => (isActive ? "auto" : "78px")};
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
  transition: height 0.3s ease-in-out;
  padding: 24px 32px;
`;

export const PanelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  width: 100%;
`;

export const PanelTitle = styled.h3`
  font-size: 23px;
  font-weight: 500;
  font-family: Inter;
`;

export const PanelIcon = styled.span<{ isActive: boolean }>`
  font-size: 2rem;
  transition: transform 0.3s ease;
  transform: ${({ isActive }) =>
    isActive ? "rotate(180deg)" : "rotate(0deg)"};
`;

export const PanelContent = styled.p`
  font-family: Inter;
  font-weight: 400;
  font-size: 14px;
  color: #727272;
  line-height: 27px;
  text-align: left;
`;

export const FaqContainer = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`;

export const FaqTitle = styled.h1`
  font-size: 48px;
  text-align: center;
  font-weight: 500;
  margin-top: 10px;
  font-family: Inter;
`;

export const FaqPanels = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 20px 5%;
  gap: 15px;
  @media (min-width: 768px) {
    gap: 20px;
  }
`;
