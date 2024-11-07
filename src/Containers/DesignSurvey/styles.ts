import { TitleStub } from "@/styles/globals";
import styled from "styled-components";

export const DesignSurveyContainer = styled.section`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: auto;
  height: 100vh;
  overflow: hidden;
`;
export const DesignSurveyHeader = styled.div`
  width: 100%;
  min-height: 100px;
  background-color: ${({ theme }) => theme.linkColor};
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #d9d9d9;
  position: relative;

  a.back-button {
    all: unset;
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: 5px;
    transition: all 0.3s;

    &:hover {
      background-color: #d9d9d9;
      border-radius: 2px;
    }
  }

  p {
    font-style: italic;
    user-select: none;
    color: ${({ theme }) => theme.lightColor};
  }

  .description-group {
    display: flex;
    align-items: center;

    input {
      border: none;
      width: 400px;
      outline: none;
      padding: 5px 0;
    }
  }
`;
export const Title = styled(TitleStub)`
  margin-bottom: 8px;
  user-select: none;
  display: flex;
  align-items: center;

  span {
    font-weight: 500;
    font-size: 22px;
  }

  .group {
    display: flex;
    align-items: center;
  }

  .title-btn {
    padding: 0;
    background-color: transparent;
    border: 2px solid ${({ theme }) => theme.primaryColor};
    border-radius: 8px;
    color: ${({ theme }) => theme.primaryColor};
    line-height: 0;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    margin-inline-start: 8px;

    &:hover {
      background-color: ${({ theme }) => theme.primaryColor};
      color: ${({ theme }) => theme.linkColor};
    }
  }

  input {
    border: none;
    outline: none;
    padding: 8px;
    width: auto;
    font-size: 22px;
    font-weight: 600;
  }
`;

export const Button = styled.button`
  padding: 20px;
  background-color: ${({ theme }) => theme.primaryColor};
  color: ${({ theme }) => theme.linkColor};
  border: none;
  border-radius: 8px;
  font-weight: 500;
  text-transform: capitalize;
  letter-spacing: 0.02em;
  cursor: pointer;
  line-height: 0;
`;

export const DesignSurveyWrapper = styled.div`
  display: grid;
  grid-template-columns: 350px 1fr 350px;
  position: relative;
  margin-bottom: 100px;
`;

export const Leftside = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.linkColor};
  border-right: 1px solid #d9d9d9;
`;

export const Content = styled.div`
  overflow-y: auto;
  max-height: calc(100vh - 200px);
  position: relative;
`;

export const Rightside = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.linkColor};
  border-left: 1px solid #d9d9d9;
`;
