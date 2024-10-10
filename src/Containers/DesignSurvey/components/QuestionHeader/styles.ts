import styled from "styled-components";

export const QuestionHeaderContainer = styled.div`
  height: calc(100vh - 119px);
  overflow-y: auto;
  overflow-x: hidden;
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #d9d9d9;

  .title {
    font-weight: 600;
    font-size: 20px;
    letter-spacing: 0.02em;
    text-transform: capitalize;
  }
  .option-icon {
    padding: 0;
    background-color: transparent;
    border: none;
    color: ${({ theme }) => theme.lightColor};
    cursor: pointer;
  }
`;

export const Options = styled.div`
  width: 100%;
  min-height: 150px;
  border-bottom: 1px solid #d9d9d9;
  padding: 36px 20px;

  input.defaultValue {
    margin-top: 5px;
    padding: 10px;
    border: 1px solid lightgray;
    border-radius: 5px;
    width: 100%;
  }

  .date-range-selector {
    display: flex;
    gap: 10px;

    label {
      font-weight: 500;

      input[type="date"] {
        margin-top: 5px;
        padding: 5px;
        border: 1px solid lightgray;
        border-radius: 5px;
        width: 90%;
      }
    }
  }

  .drp {
    padding: 15px;
    background: #ffffff;
    border: 1px solid #d9d9d9;
    border-radius: 10px;
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-between;
    position: relative;

    &-content[data-open="true"] {
      opacity: 1;
      pointer-events: all;
    }

    &-content {
      opacity: 0;
      pointer-events: none;
      position: absolute;
      top: calc(100% + 10px);
      left: 0;
      width: 100%;
      background: #fff;
      border-radius: 10px;
      z-index: 10;
      transition: all 0.2s ease-in-out;
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
      overflow-y: auto;
      height: 140px;

      &::-webkit-scrollbar {
        width: 5px;
      }

      &::-webkit-scrollbar-track {
        background: #f1f1f1;
      }

      &::-webkit-scrollbar-thumb {
        background: #888;
      }

      &-item {
        padding: 10px;
        cursor: pointer;

        &:hover {
          background: #f5f5f5;
        }
      }
    }
  }

  .icon {
    line-height: 0;
    padding: 4px;
    border-radius: 5px;
  }

  button {
    background-color: transparent;
    border: 1px solid lightgray;
    cursor: pointer;
  }

  .title {
    font-weight: 600;
    font-size: 20px;
    letter-spacing: 0.02em;
    text-transform: capitalize;
    margin-bottom: 16px;
  }

  .text {
    font-weight: 500;
    font-size: 18px;
    letter-spacing: 0.02em;
    text-transform: capitalize;
    /* margin-bottom: 16px; */
    position: relative;
  }
`;

export const SwitchWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  :not(:last-child) {
    margin-block: 20px;
  }

  .name {
    text-transform: capitalize;
    font-weight: 500;
  }
`;

export const Wrapper = styled.div`
  padding: 24px;

  .underline-btn {
    text-decoration: underline;
    color: ${({ theme }) => theme.primaryColor};
    cursor: pointer;
    font-weight: 400;
    font-size: 16px;
    line-height: 24px;
    background-color: transparent;
    border: none;
    text-transform: capitalize;
  }

  .remove-btn {
    cursor: pointer;
    font-weight: 400;
    background-color: transparent;
    border: none;
    position: absolute;
    top: 14px;
    right: 10px;
    color: red;
    transition: all 0.2s ease-in-out;

    &:hover {
      scale: 1.1;
    }
  }

  .compare-label {
    font-weight: 500;
    font-size: 16px;
    text-transform: uppercase;
    min-width: 150px;
    width: 150px;
    padding: 4px 8px;
    display: grid;
    place-items: center;
    background-color: ${({ theme }) => theme.primaryColor};
    color: ${({ theme }) => theme.linkColor};
  }
`;

export const MethodWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 200px;
  min-height: 100px;
  padding: 16px;
  background: #fff;
  z-index: 101;
  border-radius: 8px;
  overflow: auto;
`;

export const ModelWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  min-height: 200px;
  height: 700px;
  max-height: 96vh;
  background: #fff;
  z-index: 99;
  border-radius: 8px;
  overflow: auto;

  .model_title {
    font-size: 20px;
    font-weight: 400;
  }

  .model_text {
    font-size: 15px;
    font-weight: 400;
    color: #8c9caf;
  }

  .border-bottom {
    border-top: 1px solid #eaeaea;
    border-bottom: 1px solid #eaeaea;
  }

  .question {
    font-size: 20px;
    color: #8c9caf;
    font-weight: 500;
  }

  .switch-input {
    font-size: 14px;
    font-weight: 500;
    text-transform: capitalize;
  }

  .contraint_tabs_lists {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eaeaea;

    &__trigger {
      font-family: inherit;
      background-color: white;
      padding: 24px 20px;
      height: 45px;
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 15px;
      font-weight: 500;
      line-height: 1;
      user-select: none;
      border: none;
      border-bottom: 2px solid transparent;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      background-color: #d9d9d9;

      &:hover,
      &[data-state="active"] {
        color: #fff;
        background-color: ${props => props.theme.primaryColor};
      }
    }
  }
`;

export const ModelOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 30;
`;

export const ComparisonLogicWrapper = styled.div<{
  noPadding?: boolean;
}>`
  .comparison__logic__lists {
    border: 1px solid #eaeaea;
    border-radius: 4px;
    overflow: hidden;

    button {
      flex: 1;
      line-height: 0;
      padding: ${props => (!props.noPadding ? "8px" : "16px")} 10px;
      border: none;
      border-right: 1px solid ${props => props.theme.lightBackground};
      font-weight: 600;

      &:last-child {
        border-right: none;
      }

      &.active {
        background: ${props => props.theme.primaryColor};
        color: #fff;
      }

      &:hover {
        background: ${props => props.theme.lightBackground};

        &.active {
          background: ${props => props.theme.primaryColor};
        }
      }
    }
  }
`;

export const DropdownWrapper = styled.ul`
  position: absolute;
  top: 95%;
  left: 0;
  background-color: #fff;
  width: 100%;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 0 0 10px 0;
  border-radius: 0 0 10px 10px;
  border: 2px solid #d9d9d9;
  max-height: 350px;
  z-index: 1;
  overflow-y: overlay;
  padding-right: 3px;

  .search {
    position: sticky;
    top: 0;
    padding: 10px 5px;
    background-color: #fff;
    z-index: 2;
  }

  input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    outline: 0;
    border: 1px solid gray;
    font-weight: 500;
    border-radius: 5px;
  }

  li {
    list-style: none;
    padding: 10px 15px;
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
    text-transform: capitalize;
    cursor: pointer;

    :hover {
      background: lightgray;
    }

    .icon {
      line-height: 0;
      padding: 4px;
      border-radius: 5px;
    }

    b.red {
      color: red;
    }
  }
  li[aria-selected="true"] {
    cursor: not-allowed;
    opacity: 0.5;

    :hover {
      opacity: 1;
    }
  }
`;
