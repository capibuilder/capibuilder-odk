import { TitleStub } from "@/styles/globals";
import styled from "styled-components";

export const PastSurveyContainer = styled.section``;
export const PastSurveyWrapper = styled.div`
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const SearchGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: ${props => props.theme.linkColor};
  border-radius: 100px;
  padding: 8px 16px;
  flex-basis: 400px;
  border: 2px solid transparent;
  border-left: 2px solid ${props => props.theme.primaryColor};
  border-right: 2px solid ${props => props.theme.primaryColor};

  input {
    width: 100%;
    padding: 8px 0;
    border: none;
    background: transparent;
    outline: none;
  }
  button {
    padding: 0;
    background: transparent;
    border: none;
    cursor: pointer;
  }
`;
export const Title = styled(TitleStub)`
  text-transform: capitalize;
`;

export const FilterGroup = styled.div`
  padding: 0 24px;
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: flex-end;

  .title {
    font-weight: 500;
    font-size: 16px;
    text-transform: capitalize;

    &--primary {
      color: ${props => props.theme.primaryColor};
    }

    &--secondary {
      color: ${props => props.theme.lightColor};
    }
  }
`;

export const SurveyCardsContainer = styled.div`
  margin-top: 48px;
  padding-inline: 24px;

  .survey-cards {
    margin-top: 24px;
    display: flex;
    flex-wrap: wrap;
    gap: 24px;
  }
`;

export const SurveyCardWrapper = styled.div`
  width: 150px;
  min-height: 100px;
  background-color: ${props => props.theme.linkColor};
  padding: 16px;
  border-radius: 8px;
  position: relative;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  }

  .title {
    font-weight: 600;
    text-transform: capitalize;
    margin-top: 16px;
    margin-bottom: 8px;
    color: ${props => props.theme.textColor};
  }

  .light-text {
    color: ${props => props.theme.lightColor};
    margin-bottom: 8px;
  }

  .star {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 18px;

    &--active {
      color: #ffdd2a;
    }

    &--disabled {
      color: ${props => props.theme.lightColor};
    }
  }
`;
