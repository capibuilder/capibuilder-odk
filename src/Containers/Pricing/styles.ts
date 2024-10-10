import styled from "styled-components";

export const PricingContainer = styled.div``;

export const PricingWrapper = styled.div`
  padding: 25px 20px 50px;
  animation-duration: 0.6s;

  .head {
    h1 {
      text-align: center;
      font-weight: 600;
      font-size: 40px;
      line-height: 50px;
      color: #353c3c;
    }

    p {
      font-weight: 500;
      font-size: 18px;
      line-height: 24px;
      margin-top: 30px;
      color: #353c3c;
      text-align: center;

      a {
        color: #4f0fff;
      }
    }
  }

  .pricing__row {
    background-color: #fff;
    padding: 30px;
    margin-top: 70px;
    display: flex;
    gap: 100px;

    .details {
      h2 {
        font-weight: 500;
        font-size: 36px;
        line-height: 50px;
        color: #353c3c;
        margin-bottom: 10px;
      }

      span {
        font-weight: 500;
        color: #353c3c;
        display: inline-flex;
        align-items: center;
        width: 100%;
        justify-content: space-between;
        font-size: 16px;
        margin-top: 15px;

        ::after {
          content: "";
          width: 78%;
          height: 2px;
          background-color: #353c3c;
          opacity: 0.6;
          display: block;
          border-radius: 10px;
        }
      }

      ul {
        padding: 0;
        margin-top: 40px;
        display: grid;
        align-items: center;
        grid-template-columns: repeat(3, 1fr);
        row-gap: 40px;

        li {
          list-style-type: none;
          display: flex;
          gap: 15px;
          align-items: center;
          font-weight: 500;
          font-size: 20px;
          color: #353c3c;
        }
      }
    }

    .card {
      width: 27%;
      background: #4f0fff;
      padding: 20px;
      border-radius: 10px;

      span.h {
        font-weight: 600;
        font-size: 20px;
        line-height: 30px;
        color: #ffffff;
      }

      .flex {
        display: flex;
        align-items: flex-start;
        gap: 4px;
        margin-top: 30px;

        div {
          font-weight: 600;
          font-size: 32px;
          line-height: 30px;
          color: #ffffff;
        }
        span.t {
          font-size: 18px;
        }
      }
      p {
        font-weight: 400;
        font-size: 16px;
        color: #ffffff;
        margin-top: 10px;
      }
      button {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-top: 35px;
        padding: 17px;
        gap: 10px;
        background-color: #fff;
        color: #4f0fff;

        svg {
          transition: all 0.3s;
        }

        :hover {
          svg {
            margin-left: 10px;
          }
        }
      }
    }
  }

  p.help-text {
    font-weight: 500;
    font-size: 20px;
    line-height: 50px;
    color: #4f0fff;
    margin-top: 10px;
  }

  center {
    font-weight: 600;
    font-size: 36px;
    line-height: 50px;
    color: #353c3c;
    margin-top: 60px;

    span {
      font-size: 18px;
      display: block;
      font-weight: 500;
    }
  }

  .features {
    margin-top: 60px;
    display: flex;
    justify-content: space-between;

    ul.col {
      width: 25%;

      h3 {
        font-weight: 600;
        font-size: 24px;
        line-height: 50px;
        color: #353c3c;
        display: block;
        margin-bottom: 40px;
      }

      li {
        list-style: none;
        font-weight: 500;
        font-size: 20px;
        line-height: 32px;
        color: #353c3c;
        display: flex;

        align-items: center;

        svg {
          margin-right: 13px;
          margin-top: 6px;
        }

        :not(:nth-child(2)) {
          margin-top: 25px;
        }
      }
    }
  }
`;
