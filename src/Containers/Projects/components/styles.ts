import { WrapperStub } from "@/styles/globals";
import styled from "styled-components";

export const Wrapper = styled(WrapperStub)`
  .header {
    margin-bottom: 30px;
  }
`;

export const Table = styled.div`
  .grid {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr 1fr 1fr 0.2fr;
    align-items: center;
  }

  .head {
    background-color: ${props => props.theme.lightColor};
    padding: 40px 25px;

    span {
      color: #fff;
      font-size: 18px;
      font-weight: 600;
    }
  }
`;

export const RowWrapper = styled.div`
  background-color: #fff;
  position: relative;
  transition: background 0.2s;
  max-height: 110px;
  min-height: 110px;
  cursor: pointer;
  border-bottom: 1px solid lightgray;
  color: #000;

  /* :not(:last-child) {
    margin-bottom: 2px;
  } */

  &:hover {
    background-color: lightgray;
  }

  span.status {
    justify-self: center;
    max-width: max-content;
    height: auto;
    padding: 7px 12px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 500;
    border: 0;
    margin: auto;

    &.deleted {
      color: var(--tag-deleted);
      background-color: var(--tag-deleted-bg);
    }
    &.active {
      color: #fff;
      background-color: var(--tag-draft-bg);
    }
  }

  span {
    padding: 40px 25px;
    font-size: 16px;
    font-weight: 500;
    border-right: 2px solid lightgray;
    height: 100%;
    display: flex;
    align-items: center;

    &:nth-child(2) {
      justify-content: center;
    }

    .clipboard {
      background-color: transparent;
      border: 0;
      cursor: pointer;

      svg {
        animation: Pop 0.2s linear;
      }
    }
  }

  button.generate-btn {
    background-color: transparent;
    padding: 8px 20px;
    border: 2px solid #a84787;
    color: #a84787;
    font-weight: 600;
    border-radius: 8px;
    cursor: pointer;
  }

  span.link {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  button.pop {
    all: unset;
    cursor: pointer;
    text-align: center;
  }

  ul.popup {
    position: absolute;
    right: 50px;
    border: 1px solid #000;
    border-radius: 5px;
    padding: 0;
    overflow: hidden;
    background-color: #fff;
    /* padding: 10px 0; */
    z-index: 3;

    a {
      color: #000;
    }

    li {
      list-style: none;
      padding: 15px 30px;
      cursor: pointer;
      width: 100%;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 10px;

      :hover {
        background-color: lightgrey;
      }

      &[aria-disabled="true"] {
        opacity: 0.8;
        cursor: not-allowed;
      }

      &.delete {
        color: #d00000;
      }
    }
  }
`;
