import { TitleStub } from "@/styles/globals";
import styled from "styled-components";

export const TemplatesContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: grid;
  grid-template-columns: 350px 1fr;

  @media screen and (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const TemplatesSidebar = styled.div`
  /* background-color: ${({ theme }) => theme.linkColor}; */
  padding-top: 36px;

  h1 {
    margin: 0;

    font-weight: 500;
    font-size: 32px;
    padding: 10px 20px;
  }
  h3 {
    margin: 10px 0;
    padding: 15px 20px;
    font-weight: 500;
    font-size: 20px;
  }

  .filter-menu {
    display: flex;
    flex-direction: column;
    width: 100%;

    position: sticky;
    top: 0;
    max-height: 99vh;
    overflow-y: auto;

    &__item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 15px 20px;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;

      &.active,
      &:hover {
        background-color: ${({ theme }) => theme.lightBackground};
      }
    }

    span {
      font-weight: 600;
      font-size: 14px;

      &:first-child {
        text-transform: capitalize;
      }
    }
  }
`;

export const Title = styled(TitleStub)`
  margin-bottom: 48px;
  text-align: center;
`;

export const TemplatesContent = styled.div`
  outline: 2px solid;
`;
