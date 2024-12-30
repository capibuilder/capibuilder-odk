import { WrapperStub } from "@/styles/globals";
import styled from "styled-components";

export const Wrapper = styled(WrapperStub)`
  position: relative;

  .header {
    margin-bottom: 30px;
  }

  button.add-new {
    position: fixed;
    bottom: 40px;
    right: 40px;
    z-index: 11;
    cursor: pointer;
    background-color: #7879f1;
    display: flex;
    height: 55px;
    width: 55px;
    align-items: center;
    justify-content: center;
    color: #fff;
    border-radius: 50%;
    box-shadow: 1px 2px 5.800000190734863px 0px #00000040;

    &:hover {
      outline: 1px solid #fff;
    }
  }
`;

export const Table = styled.div`
  --grid: 2fr 0.8fr 0.8fr 0.5fr 0.4fr;
  min-height: 650px;
  background-color: #fff;

  .grid {
    display: grid;
    grid-template-columns: var(--grid);
    align-items: center;
    text-align: center;

    span {
      justify-self: center; // Add this to center the content within grid items
      width: 100%; // Add this to ensure span takes full width
    }
  }

  .head {
    background-color: ${props => props.theme.lightColor};
    /* text-align: c; */

    border-radius: 10px 10px 0 0;

    span {
      padding: 40px 25px;
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

  :not(:last-child) {
    margin-bottom: 5px;
  }

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
    font-weight: 500;
    text-transform: uppercase;
    width: max-content;
    padding: 5px 10px;
    color: #fff;
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
    /* padding: 10px 0; */
    z-index: 3;

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
