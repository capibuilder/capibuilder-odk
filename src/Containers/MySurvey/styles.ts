import { WrapperStub } from "@/styles/globals";
import styled from "styled-components";

export const Wrapper = styled(WrapperStub)`
  .header {
    margin-bottom: 30px;
  }

  a.add-new {
    position: fixed;
    cursor: pointer;
    background-color: #7879f1;
    display: flex;
    height: 55px;
    width: 55px;
    align-items: center;
    justify-content: center;
    color: #fff;
    right: 40px;
    z-index: 11;
    bottom: 40px;
    border-radius: 50%;
    box-shadow: 1px 2px 5.800000190734863px 0px #00000040;

    &:hover {
      outline: 1px solid #fff;
    }
  }
`;

export const Table = styled.div`
  min-height: 500px;
  background-color: #fff;

  .grid {
    display: grid;
    grid-template-columns: 1.5fr 0.8fr 0.8fr 0.2fr;
    align-items: center;
  }

  .head {
    background-color: ${props => props.theme.lightColor};
    padding: 40px 25px;
    border-radius: 10px 10px 0 0;

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

export const VersionModelWrapper = styled.div`
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
  }

  .content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    z-index: 101;
    width: 500px;
    max-width: 90%;
  }
`;
