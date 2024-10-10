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
      gap: 25px;

      input {
        height: 45px;
      }

      button {
        padding: 23px 0;
        width: 100%;
        background-color: var(--primary-color);

        margin-top: 15px;

        :disabled {
          cursor: not-allowed;
        }
      }
    }

    a.change-password {
      display: block;
      color: #000;
      gap: 20px;
      margin-top: 20px;
      color: #a84787;
      transition: all 0.3s;
      text-decoration: underline;
      text-align: end;

      :hover {
        color: #000;
      }

      font-size: 18px;
      font-weight: 500;
    }
  }
`;
