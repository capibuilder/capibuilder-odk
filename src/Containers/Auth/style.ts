import styled from "styled-components";

export const AuthContainer = styled.div`
  position: relative;
  width: 96%;
  margin: 0 auto;
  height: 100vh;
  display: grid;
  place-items: center;
  background-size: cover;
`;

export const AuthWrapper = styled.div`
  background: #ffffff;
  border: 1px solid var(--primary-color);
  box-shadow: 0px 0px 60px 0px rgba(0, 0, 0, 0.1);
  border-radius: 20px;
  width: 100%;
  max-width: 42rem;
  padding: 80px 80px;

  div.content {
    padding: 10px 0;
  }

  h3 {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #bdbdbd;
    align-items: center;
    text-align: center;
    margin-top: 80px;

    a {
      font-weight: 600;
      margin-left: 5px;
      color: var(--primary-color);
    }
  }

  h1 {
    font-style: normal;
    font-weight: 700;
    font-size: 48px;
    color: #353c3c;
    margin: 0;

    ::after {
      content: ".";
      color: var(--primary-color);
    }
  }

  h4 {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    margin-top: 18px;
    color: #000000;
    margin-bottom: 40px;
  }

  .formwrapper {
    /* margin-top: 80px; */

    .notif {
      font-size: 18px;
      line-height: 36px;
    }
  }

  form {
    margin-top: 20px;

    .formgroup {
      min-height: 43px;
      margin-bottom: 22px;
      position: relative;

      .password_btn {
        all: unset;
        position: absolute;
        right: 13px;
        bottom: 13px;
        display: flex;
        cursor: pointer;

        svg {
          fill: #667085;
        }
      }

      div {
        border: 1px solid #a2a2a6;
        border-radius: 4px;

        :has(+ p.error) {
          border-color: #bc0000;

          input {
            ::placeholder {
              color: #bc0000;
            }
          }
        }

        div {
          border: 0;
          :has(input:focus) {
            outline: 1px solid #000;
            border: 0;
          }
        }
      }

      label {
        display: block;
        margin-bottom: 6px;
        font-weight: 500;

        ::after {
          content: "*";
          font-size: 18px;
          color: red;
          margin-left: 5px;
        }
      }

      input {
        background: #ffffff;
        border-radius: 4px;

        font-style: normal;
        font-weight: 500;
        font-size: 14px;
        line-height: 17px;

        ::placeholder {
          color: #bdbdbd;
        }
      }
    }

    .cbd {
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 17px;
      margin: 15px 0;

      a {
        color: var(--primary-color);
      }

      label {
        display: flex;
        align-items: center;
        gap: 5px;

        ::after {
          display: none;
        }
      }
    }

    button[type="submit"] {
      margin-top: 10px;
      width: 100%;
      min-height: 44px;
      cursor: pointer;
      color: #fff;
      border: 0;
      background: var(--primary-color);
      border-radius: 6px;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;

      :disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }

    logo{
      display: flex;
      align-items: center;
      font-weight: 600;
      color: #000;

      img {
    margin-bottom: 4px;
    margin-right: 3px;
  }
  .text-logo {
    padding: 8px 16px;
    border-radius: 10px;
    font-weight: 600;
    /* background-color: ${props => props.theme.linkColor};
    color: ${props => props.theme.darkBackground}; */
    font-size: 20px;

    .light {
      color: ${props => props.theme.primaryColor};
    }
  }

    }
    

  }

  @media (max-width: 999px) {
    padding: 40px 20px;

    h1 {
      font-size: 32px;
    }

    h4 {
      margin: 20px 0 30px 0;
    }

    h3 {
      margin-top: 30px;
      font-size: 15px;
    }

    p {
      font-size: 16px;
    }
  }
`;
