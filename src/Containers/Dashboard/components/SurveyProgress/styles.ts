import { WrapperStub } from "@/styles/globals";
import Link from "next/link";
import styled, { css } from "styled-components";

export const ProgressContainer = styled.section`
  width: 100%;
  min-height: 200px;
  background: ${props => props.theme.lightBackground};
  margin-top: 48px;
`;

export const Wrapper = styled(WrapperStub)`
  position: relative;
`;

export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
`;

export const ProgressItems = styled.div`
  display: flex;
  gap: 24px;
  justify-content: space-around;
  align-items: center;
  margin: auto;
  width: 90%;
`;
export const ProgressItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;
export const Icon = styled.div<{ active?: boolean }>`
  width: 200px;
  height: 200px;
  background: ${props => props.theme.linkColor};
  color: ${props => props.theme.primaryColor};
  border: 3px dashed;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${props =>
    props.active &&
    css`
      border-color: transparent;
      background: ${props => props.theme.primaryColor};
      color: ${props => props.theme.linkColor};
    `}
`;
export const Name = styled.div`
  color: ${props => props.theme.primaryColor};
  font-weight: bold;
`;
