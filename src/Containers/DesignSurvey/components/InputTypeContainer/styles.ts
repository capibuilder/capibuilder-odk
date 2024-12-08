import styled from "styled-components";

export const InputTypeContainer = styled.div<{ open: boolean }>`
  position: fixed;
  inset: 0;
  left: ${({ open }) => (open ? "22%" : "100%")};
  background-color: #dce4ea;
  transition: left 0.5s ease-in-out;
  padding: 24px;
  z-index: 100;
`;

export const Overlay = styled.div<{ open: boolean }>`
  position: fixed;
  inset: 0;
  opacity: ${({ open }) => (open ? 1 : 0)};
  pointer-events: ${({ open }) => (open ? "all" : "none")};
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.5s ease-in-out;
  z-index: 99;
`;

export const SearchbarContainer = styled.div`
  width: 100%;
  margin-bottom: 24px;

  .group {
    width: 100%;
    display: flex;
    align-items: center;
    border: 1px solid #e5e3dd;
    border-radius: 15px;
    overflow: hidden;

    :has(input:focus) {
      outline: 2px solid grey;
      outline-offset: 1px;
    }

    input {
      padding: 16px;
      width: 100%;
      border: none;
      outline: none;
    }

    .icon {
      cursor: pointer;
      padding: 0;
      line-height: 0;
      border: none;
      background-color: transparent;
      margin-left: 8px;
    }
  }
`;
export const InputTypeListContainer = styled.div`
  width: 100%;
  height: 100%;

  .title {
    font-size: 20px;
    font-weight: 600;
    text-transform: capitalize;
  }
`;

export const InputTypeWrapper = styled.div`
  margin-top: 24px;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 48px;
  height: 80vh;
  overflow-y: auto;
  overflow-x: hidden;
  padding-bottom: 48px;
`;
export const InputItem = styled.div`
  transition: opacity 0.2s;

  .title {
    font-size: 16px;
    font-weight: 500;
    text-transform: capitalize;
    color: ${({ theme }) => theme.lightColor};
  }

  .options {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 8px;
    gap: 16px;
    text-transform: capitalize;
    margin-top: 20px;
  }

  .option-item {
    font-size: 14px;
    background-color: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    text-transform: capitalize;
    display: flex;
    align-items: center;
    gap: 10px;

    &:hover {
      color: var(--icon-bg);
    }

    .icon {
      line-height: 0;
      padding: 4px;
      border-radius: 5px;
    }
  }
`;
