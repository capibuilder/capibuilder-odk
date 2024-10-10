import styled from "styled-components";

export const ContentHeaderContainer = styled.div``;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  border-bottom: 1px solid #d9d9d9;
  position: sticky;
  top: 0;
  z-index: 1;
  background: #fff;

  h3 {
    font-weight: 400;
    font-size: 20px;
    text-transform: capitalize;
  }

  button {
    padding: 0;
    background-color: transparent;
    border: 2px solid ${({ theme }) => theme.primaryColor};
    border-radius: 8px;
    color: ${({ theme }) => theme.primaryColor};
    line-height: 0;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    &:hover {
      background-color: ${({ theme }) => theme.primaryColor};
      color: ${({ theme }) => theme.linkColor};
    }
  }
`;

export const Content = styled.div`
  height: calc(100vh - 198px);
  overflow-y: auto;
`;

export const ContentItem = styled.div<{
  isActive?: boolean;
  hasError?: boolean;
}>`
  .content-wrapper,
  .group-content {
    width: 100%;
    /* padding: 24px; */
    border-bottom: 1px solid #d9d9d9;

    position: relative;

    ${({ hasError }) => hasError && "background-color: rgba(255 0 0 / 0.2);"}
    ${({ isActive }) => isActive && "background-color: rgba(0 0 0 / 0.2);"}

    .content-wrapper-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20px;
    }

    .content {
      display: flex;
      align-items: center;
      gap: 8px;

      .question {
        p {
          font-weight: 500;
        }
      }
    }

    .number {
      display: flex;
      align-items: center;
      gap: 4px;
      background-color: ${({ theme }) => theme.primaryColor};
      color: ${({ theme }) => theme.linkColor};
      padding: 4px 8px;
      border-radius: 8px;
      opacity: 0.7;
      font-size: 0.8rem;
    }

    .content-menu {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .options {
      cursor: pointer;
      line-height: 0;
      background-color: transparent;
      border: none;
      padding: 0;
    }

    .option-menu {
      position: absolute;
      right: 30px;
      top: 50px;
      background-color: #fff;
      border: 1px solid #d9d9d9;
      z-index: 1;
      overflow: hidden;
      width: 170px;

      button {
        padding: 0;
        background-color: transparent;
        border: none;
        cursor: pointer;
        transition: all 0.1s ease-in-out;
        text-transform: capitalize;
        font-weight: 500;
        text-align: left;
        padding: 12px 40px 12px 12px;
        width: 100%;

        &:hover {
          color: #fff;
          background-color: ${({ theme }) => theme.primaryColor};
        }
      }
    }
  }

  .group-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    padding-left: 40px;
  }
`;
