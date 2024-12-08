import { WrapperStub } from "@/styles/globals";
import styled from "styled-components";

export const DashboardCardContainer = styled.section`
  margin-top: 48px;
`;
export const Wrapper = styled(WrapperStub)``;
export const CardItems = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
`;
export const CardItem = styled.div`
  border-radius: 10px;
  padding: 16px;
  background-color: ${props => props.theme.linkColor};
  display: flex;
  gap: 36px;
  align-items: center;
`;
export const Icon = styled.div``;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
export const Name = styled.div`
  color: ${props => props.theme.textColor};
  font-size: 14px;
  font-weight: 500;
  text-transform: capitalize;
`;
export const Number = styled.div`
  font-size: 24px;
  color: #7569b3;
  font-weight: 600;
`;
