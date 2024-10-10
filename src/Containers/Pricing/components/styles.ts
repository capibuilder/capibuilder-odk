import styled from "styled-components";

export const PricingCardWrapper = styled.div`
  width: 32%;
  padding: 30px;
  background-color: #fff;
  border-radius: 10px;

  :not(:first-child, :last-child) {
    box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.15);
    transform: scale(1.01) translateY(-40px);
  }

  color: #353c3c;

  h3 {
    font-weight: 600;
    font-size: 32px;
    text-align: center;

    + p {
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      text-align: center;
    }
  }

  span {
    font-style: normal;
    font-weight: 500;
    font-size: 36px;
    line-height: 24px;
    color: #703dfd;
    text-align: center;
    display: block;
    margin: 30px 0;

    + p {
      font-weight: 500;
      font-size: 18px;
      line-height: 30px;
      color: #354646;
    }
  }

  ul {
    margin-top: 20px;
    padding-left: 20px;

    li {
      font-style: normal;
      font-weight: 500;
      font-size: 18px;
      line-height: 35px;

      :not(:first-child) {
        margin-top: 8px;
      }
    }
  }
`;
