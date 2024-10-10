import { WrapperStub } from "@/styles/globals";
import styled from "styled-components";

export const ShareContainer = styled.div``;

export const Wrapper = styled(WrapperStub)`
  border-radius: 10px;
  overflow: hidden;

  .content {
    margin-top: 40px;
  }

  .r {
    width: 50%;
  }

  .l {
    background-color: #fff;
    padding: 40px 25px;
    width: 50%;
    height: calc(100vh - 200px);
    overflow: hidden;

    .btns {
      margin-top: 18%;

      button {
        :last-child {
          color: #4f0fff;
        }
      }
    }

    ul {
      padding: 0;

      li.row {
        list-style: none;

        font-weight: 600;
        font-size: 18px;
        line-height: 28px;
        color: #515153;
        border-bottom: 1px solid #b3b3b3;

        p::after {
          content: "*";
          font-size: 18px;
          color: #a90202;
          margin-left: 7px;
        }

        :not(:first-child) {
          padding: 22px 0 10px 0;
        }

        :nth-child(2) {
          padding-bottom: 0;
        }

        display: flex;
        align-items: center;

        justify-content: space-between;

        .pt {
          display: flex;
          gap: 25px;
          width: 65%;

          button {
            all: unset;
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;

            span {
              font-size: 15px;
              color: #515153;
            }
          }

          .active {
            * {
              color: #4f0fff;
              fill: #4f0fff;
            }
            border-bottom: 2px solid #4f0fff;
          }
        }

        input {
          all: unset;
          width: 65%;
          border-bottom: 1px solid #000;

          :placeholder-shown {
            opacity: 0.4;
            font-weight: 500;
          }
        }
      }
    }
  }
`;
