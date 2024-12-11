import { WrapperStub } from "@/styles/globals";
import styled from "styled-components";

export const SurveyDashboardContainer = styled.div``;

export const Wrapper = styled(WrapperStub)`
  .header-container {
    margin-bottom: 30px;
    padding: 10px 15px;
    background-color: #fff;

    .back-link {
      display: flex;
      align-items: center;
      gap: 5px;
      margin-bottom: 15px;
      color: inherit;
      text-decoration: none;
      font-size: 16px;
      font-weight: 500;
    }

    .heading {
      font-size: 24px;
      font-weight: 600;
    }
  }
`;
