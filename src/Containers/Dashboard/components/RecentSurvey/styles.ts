import { WrapperStub } from "@/styles/globals";
import styled from "styled-components";

export const RecentSurveyContainer = styled.section`
  margin-top: 24px;
`;
export const Wrapper = styled(WrapperStub)``;
export const SurveyTitle = styled.div`
  a {
    color: blue;
    text-transform: capitalize;
  }
`;
export const SurveyItems = styled.div`
  margin-block: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
export const SurveyItem = styled.div`
  width: 100%;
  min-height: 80px;
  padding: 48px 40px;
  padding-bottom: 24px;
  box-sizing: border-box;
  background-color: ${props => props.theme.linkColor};
  border-radius: 10px;
  position: relative;

  display: grid;
  grid-template-columns: 1fr 300px 180px 100px;
  /* justify-content: space-between;
    align-items: center; */
`;
export const TitleContent = styled.div`
  flex-basis: 60%;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .content {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .title {
    font-weight: 600;
    text-transform: capitalize;
  }

  .light-text {
    color: ${props => props.theme.lightColor};
    text-transform: capitalize;
  }

  .tags {
    position: absolute;
    top: 0;
    left: 40px;
    padding: 10px 20px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    color: #fff;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 600;

    &--draft {
      background-color: var(--tag-draft-bg);
      color: var(--tag-draft);
    }

    &--published {
      background-color: var(--tag-published-bg);
      color: var(--tag-published);
    }
  }
`;
export const LightText = styled.div`
  flex-basis: 20%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* align-items: center; */
  gap: 4px;
  color: ${props => props.theme.lightColor};
  border-left: 1px solid #d4d4d4;
  padding-inline: 36px;
  width: max-content;
  height: 80px;
  text-transform: capitalize;
`;

export const RecentOptions = styled.button`
  flex-basis: 10%;
  background-color: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #d4d4d4;
  padding-left: 48px;
  height: 80px;

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
  }
`;
export const Pagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  margin-block: 24px;
`;
export const Content = styled.div`
  color: ${props => props.theme.lightColor};
  text-transform: capitalize;
`;
