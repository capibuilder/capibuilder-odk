import { TitleStub } from "@/styles/globals";
import styled from "styled-components";

export const TagsContainer = styled.div``;

export const TagsWrapper = styled.div`
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
  flex-basis: 320px;
  border: 2px solid transparent;

  :has(input:focus) {
    outline: 1.5px solid ${props => props.theme.primaryColor};
  }

  input {
    width: 100%;
    padding: 8px 0;
    border: none;
    background: transparent;
    outline: none;
    font-weight: 500;
  }
  button {
    padding: 0;
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
  }
`;
export const Title = styled(TitleStub)`
  text-transform: capitalize;
`;

export const AddTag = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-inline: 24px;
  margin-bottom: 24px;

  button {
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    background-color: ${props => props.theme.primaryColor};
    color: #fff;
    cursor: pointer;
    font-weight: 600;
    text-transform: capitalize;
  }
`;

export const TagsCards = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  padding-inline: 24px;
  gap: 24px;
`;

export const TagCard = styled.div`
  width: 100%;
  min-height: 50px;
  padding: 16px;
  border-radius: 8px;
  background-color: ${props => props.theme.linkColor};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;

  h3 {
    text-transform: capitalize;
  }
  p {
    color: #6d7280;
  }

  button {
    all: unset;
    width: 35px;
    opacity: 0;
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: red;
    border-radius: 50%;
    transition: all 0.3s;
  }

  :hover {
    button {
      opacity: 1;
    }
  }
`;

export const TagGridWrapper = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 16px;
  height: 80vh;
  padding: 0 24px;
`;

export const TagSidebarWrapper = styled.div`
  background-color: white;
  padding: 8px;

  .header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-bottom: 16px;

    button {
      all: unset;
      border-radius: 8px;
      line-height: 0;
      background-color: transparent;
      cursor: pointer;
    }
  }

  .content {
    padding: 0 14px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    max-height: 80vh;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 8px;
      background-color: #f5f5f5;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background-color: #5d5fef;
    }

    .tags {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 14px;
      text-transform: capitalize;
      position: relative;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 11px;
        top: 30px;
        border-left: 2px solid #000;
      }

      .tag {
        display: flex;
        gap: 2px;
        font-weight: 500;
        align-items: center;
        transition: all 0.3s ease;

        &:hover .add-tag-btn {
          opacity: 1;
          pointer-events: all;
        }

        .add-tag-btn {
          all: unset;
          cursor: pointer;
          padding: 0;
          line-height: 0;
          background-color: transparent;
          opacity: 0;
          pointer-events: none;
          transition: all 0.3s ease;
        }
      }

      .tag-parent {
        display: flex;
        align-items: center;
        gap: 4px;
        cursor: pointer;
      }

      /* &:hover {
        color: #5d5fef;
        font-weight: 700;
      } */

      .tag-child {
        margin-left: 24px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 8px;
      }

      .active {
        color: #5d5fef;
        font-weight: 700;
      }
    }
  }
`;

export const TagContentWrapper = styled.div`
  background-color: white;
  padding: 40px;

  .no-tag {
    font-size: 1.35rem;
    font-weight: 600;
    text-transform: capitalize;
  }

  .tag {
    display: grid;
    grid-template-columns: 50ch 1fr;
    margin-bottom: 24px;

    .header {
      font-size: 1.6rem;
      font-weight: 500;
      text-transform: capitalize;
    }
  }

  .tag-parent {
    margin-top: 100px;

    .link {
      color: var(--red, #f00);
      font-size: 1.15rem;
      font-weight: 500;
      text-decoration-line: underline;
      cursor: pointer;
    }
  }
`;

export const TagDrawerOverlay = styled.div`
  --offset: 80px;
  width: 100%;
  height: calc(100vh - var(--offset));
  position: fixed;
  top: var(--offset);
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 100;
`;

export const TagDrawerWrapper = styled.div`
  --offset: 80px;
  width: 50%;
  max-width: 700px;
  height: calc(100vh - var(--offset));
  position: fixed;
  top: var(--offset);
  right: 0;
  background-color: #f3f2ef;
  box-shadow: -2px 0 10px rgba(0, 0, 0, 0.1);
  z-index: 101;

  .header {
    padding: 16px;
    background-color: #5d5fef;
    font-size: 1.5rem;
    font-weight: 500;
    text-transform: capitalize;
    color: white;
  }

  .content {
    display: flex;
    flex-direction: column;
    padding: 32px 20px;
    height: 90%;

    .form-groups {
      display: grid;
      gap: 16px;
      max-height: 400px;
      overflow-y: auto;
      margin-block-start: 32px;

      .form-group {
        display: grid;
        grid-template-columns: 15ch 0.8fr;
        align-items: flex-start;

        label {
          font-weight: 500;
          text-transform: capitalize;
          display: flex;
          gap: 8px;
        }

        input {
          padding: 8px 10px;
          border-radius: 4px;
          border: 1px solid #ddd;
          font-size: 1.1rem;
          background-color: white;
        }
      }

      button {
        justify-self: flex-start;
      }
    }

    .heading {
      font-weight: 600;
      text-transform: capitalize;
      display: flex;
      gap: 16px;

      button {
        all: unset;
        cursor: pointer;
        padding: 0;
        line-height: 0;
        background-color: transparent;
      }
    }

    .input-group {
      display: grid;
      grid-template-columns: 20ch 1fr;
      margin-block-end: 16px;

      .input-error input {
        width: 100%;
      }

      .required {
        color: red;
      }

      label {
        font-size: 1.25rem;
        font-weight: 500;
        text-transform: capitalize;
        display: flex;
        gap: 8px;
      }

      input,
      textarea {
        padding: 8px 12px;
        border-radius: 8px;
        border: 1px solid #ddd;
        font-size: 1.25rem;
        font-weight: 500;
        background-color: white;
      }
    }

    .btns {
      display: flex;
      justify-content: flex-end;
      gap: 8px;
      margin-top: auto;

      .btn {
        padding: 8px 16px;
        border-radius: 8px;
        font-size: 1.25rem;
        font-weight: 500;
        text-transform: capitalize;
        cursor: pointer;
        border: 2px solid black;

        &.primary {
          color: #fff;
          background-color: #5d5fef;
          border: 2px solid #5d5fef;
        }

        &.success {
          color: #1c9c1c;
          border: 2px solid #1c9c1c;
        }

        &.danger {
          color: #ff2204;
          border: 2px solid #ff2204;
        }
      }
    }
  }
`;
