import { WrapperStub } from "@/styles/globals";
import styled from "styled-components";

export const SurveyDashboardContainer = styled.div``;

export const Wrapper = styled(WrapperStub)`
  .header-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .back-link {
    display: flex;
    align-items: center;
    gap: 8px;
    color: ${({ theme }) => theme.textColor};
    background: ${({ theme }) => theme.linkColor};
    padding: 0 15px;
    border-radius: 8px;
    cursor: pointer;
    text-decoration: none;

    &:hover {
      opacity: 0.8;
    }
  }

  .heading {
    display: flex;
    flex-direction: column;
    font-size: 1.5rem;
    font-weight: 600;
    background-color: ${({ theme }) => theme.linkColor};
    color: ${({ theme }) => theme.textColor};
    padding: 20px 15px;
    border-radius: 8px;
    margin-bottom: 24px;
  }

  .subheading {
    font-size: 0.9rem;
    color: #666;
    margin-top: 4px;
  }
`;
