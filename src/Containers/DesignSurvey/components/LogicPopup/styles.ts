import styled from "styled-components";

export const Wrapper = styled.div`
  width: 90%;
  height: 90%;
  max-height: 90%;
  background: #fff;
  padding: 40px;
  border-radius: 10px;
  overflow-y: auto;

  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 30px;
    border-bottom: 2px solid #d9d9d9;

    button.close {
      all: unset;
      margin-left: 10px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;

      svg {
        height: 25px;
        width: 25px;
      }
    }

    button.advance {
      width: auto;
      background: none;
      color: var(--primary-color);
      outline: 2px solid var(--primary-color);
      border-radius: 10px;
      padding: 8px 15px;
    }
  }

  .name {
    margin: 30px 0;

    input {
      width: 30%;
      border: none;
      outline: none;
      border-bottom: 1px solid #000;
      padding: 10px 0;
      font-weight: 500;
      font-size: 20px;
    }
  }

  .f__sts {
    display: flex;
    flex-direction: column;
    position: relative;
    padding-left: 30px;
    align-items: center;
    justify-content: space-between;
    width: max-content;

    ::before {
      content: "";
      position: absolute;
      height: 45%;
      left: 0;
      top: 5%;
      border-left: 2px solid;
      border-top: 2px solid;
      border-color: #a4a4a4;
      width: 25px;
    }
    ::after {
      content: "";
      position: absolute;
      height: 45%;
      left: 0;
      bottom: 5%;
      border-left: 2px solid;
      border-bottom: 2px solid;
      border-color: #a4a4a4;
      width: 25px;
    }
  }

  .logic {
    width: 100%;
    padding: 30px;
    background-color: #f3f2ef;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 30px;
  }

  p.t {
    font-weight: 500;
    font-size: 18px;
  }

  .condition {
    /* padding-left: 150px; */
  }
`;
