import styled from "styled-components";

export const PastSurveyWrapper = styled.div`
  width: 70%;
  height: 500px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  padding: 30px;
  overflow-y: overlay;
  border: 1px solid #818181;
  padding-top: 0;

  .head {
    padding: 25px 0;
    border-bottom: 2px solid #d9d9d9;
    margin-bottom: 20px;

    h3 {
      font-weight: 600;
      font-size: 24px;
      line-height: 28px;
      color: #515153;
    }

    span {
      cursor: pointer;
    }
  }

  .btns {
    margin-top: 30px;
    position: sticky;
    bottom: -20px;

    button {
      width: auto;
      padding: 10px 25px;
      background: none;
      font-weight: 500;
      border: 0;
      border-radius: 10px;
      cursor: pointer;

      :last-child {
        color: #4f0fff;

        border: 2px solid #4f0fff;
      }
    }
  }

  .wrapper {
    min-height: 290px;

    ul.Choises {
      padding: 0;
      width: 50%;

      button.add {
        all: unset;
        font-weight: 600;
        color: #4f0fff;
        display: block;
        margin-top: 25px;
        cursor: pointer;
      }

      li {
        input[type="radio"],
        input[type="checkbox"] {
          height: 18px;
          width: 18px;
          cursor: pointer;
        }

        font-weight: 500;
        list-style: none;
        align-items: center;
        display: grid;
        grid-template-columns: 0.15fr 1fr 1.2fr;

        :not(:first-child) {
          margin-top: 25px;
        }

        span {
          display: flex;
          margin-left: 20px;
          width: max-content;
          cursor: pointer;
          opacity: 0.8;
        }
      }
    }

    .dropdown {
      position: sticky;
      top: 10px;
      border: 1px solid #b7b7b8;
      padding: 12px;
      border-radius: 10px 10px 0 0;
      width: 400px;
      cursor: pointer;

      span {
        font-weight: 600;
        font-size: 20px;
        line-height: 28px;
        color: #4f0fff;
      }

      ul {
        padding: 0;
        position: absolute;
        top: 100%;
        width: 100%;
        left: 0;
        border: 1px solid #b7b7b8;
        max-height: 250px;
        overflow-y: overlay;
        border-radius: 0 0 10px 10px;

        li {
          list-style: none;
          padding: 15px;
          font-weight: 500;
          color: #353c3c;

          :hover {
            background-color: lightgray;
          }
        }
      }
    }
  }

  /* input {
    width: 100%;
    border: 1px solid gray;
    outline: none;
    padding: 13px;
    border-radius: 10px;
    position: sticky;
    top: 0;
  }

  span.back {
    color: var(--primary-color);
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 20px 0;
    cursor: pointer;
  }

  ul {
    padding: 0;
    margin-top: 10px;

    li {
      padding: 15px;
      background-color: lightgrey;
      list-style: none;
      margin-block: 10px;
      font-weight: 500;
      text-transform: capitalize;
      border-radius: 5px;
    }
  } */
`;
