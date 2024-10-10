import { WrapperStub } from "@/styles/globals";
import styled from "styled-components";

export const SurveyResponseContainer = styled.div``;
export const Wrapper = styled(WrapperStub)`
  .heading {
    font-size: 1.5rem;
    font-weight: 600;
    background-color: ${({ theme }) => theme.linkColor};
    color: ${({ theme }) => theme.textColor};
    padding: 30px 15px;
    border-radius: 8px;
    margin-bottom: 24px;
  }
`;
