import { WrapperStub } from "@/styles/globals";
import styled from "styled-components";

export const Wrapper = styled(WrapperStub)``;
export const Content = styled.div`
  width: 100%;
  height: 85vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;

  h1 {
    font-size: 3rem;
    font-weight: 700;
    line-height: 0;

    span {
      background: ${({ theme }) => theme.primaryColor};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }

  p {
    width: 60%;
    text-align: center;
    font-size: 1.3rem;
    font-weight: 400;
  }

  a {
    background-color: ${({ theme }) => theme.primaryColor};
    color: ${({ theme }) => theme.linkColor};
    padding: 12px 24px;
    border-radius: 8px;
    text-transform: capitalize;
    font-weight: 500;
    border: 2px solid;
    transition: all 0.2s ease-in-out;

    &:hover {
      background-color: ${({ theme }) => theme.linkColor};
      color: ${({ theme }) => theme.primaryColor};
      border-color: ${({ theme }) => theme.primaryColor};
    }
  }
`;
