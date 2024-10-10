import styled from "styled-components";

export const Wrapper = styled.div`
  .content {
    margin: 5% auto 2%;
    width: 50%;
    background-color: #fff;
    border-radius: 10px;
    padding: 50px 100px;

    h2 {
      color: #7a7a88;
      font-size: 32px;
      font-style: normal;
      font-weight: 600;
    }

    form {
      margin-top: 30px;
      display: flex;
      flex-direction: column;

      input {
        height: 47px;
      }

      gap: 30px;

      button {
        padding: 23px 0;
        width: 100%;
        background-color: var(--primary-color);

        :disabled {
          cursor: not-allowed;
        }
      }
    }

    a.change-password {
      display: flex;
      align-items: center;
      color: #000;
      justify-content: center;
      gap: 20px;
      margin-top: 50px;
      color: #828282;
      transition: all 0.3s;

      svg path {
        transition: all 0.3s;
      }

      :hover {
        color: #000;

        svg {
          transition: all 0.3s;
          path {
            fill: #000;
          }
        }
      }

      font-size: 20px;
      padding: 15px;
      border: 1px solid #000;
      border-radius: 10px;
      font-weight: 500;
    }
  }
`;
