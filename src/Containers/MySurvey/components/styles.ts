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
  padding: 40px 25px;
  background-color: #fff;
  position: relative;
  transition: background 0.2s;
  max-height: 110px;
  min-height: 110px;
  border-bottom: 1px solid lightgray;

  &:hover {
    background-color: lightgray;
  }

  /* :not(:last-child) {
    margin-bottom: 5px;
  } */

  span {
    font-size: 16px;
    font-weight: 500;

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

  span.status {
    font-size: 14px;
    font-weight: 600;
    text-transform: uppercase;
    width: max-content;
    padding: 7px 15px;
    color: #fff;
    border-radius: 8px;

    &[data-status="draft"] {
      background-color: var(--tag-draft-bg);
      color: var(--tag-draft);
    }
    &[data-status="live"] {
      background-color: var(--tag-published-bg);
      color: var(--tag-published);
    }
  }

  button.pop {
    all: unset;
    cursor: pointer;
  }

  ul.popup {
    position: absolute;
    right: 100px;
    border: 1px solid #000;
    border-radius: 5px;
    padding: 0;
    overflow: hidden;
    background-color: #fff;
    z-index: 3;
    /* padding: 10px 0; */

    li {
      list-style: none;
      padding: 10px 30px;
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
