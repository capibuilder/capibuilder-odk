import styled from "styled-components";

export const HeroWrapper = styled.section`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: auto;
  padding: 120px 20px;
  background-color: #eff0fc;
  border-radius: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  width: 95%;

  .inWrap {
    width: 60%;

    h1 {
      color: #262627;
      font-size: 56px;
      margin-bottom: 30px;
      line-height: 1.2;

      @media (max-width: 1024px) {
        font-size: 48px;
      }

      @media (max-width: 768px) {
        font-size: 36px;
      }

      @media (max-width: 480px) {
        font-size: 28px;
      }
    }

    .text {
      font-size: 18px;
      color: #4e4e4e;
      margin-bottom: 40px;
      line-height: 1.5;

      @media (max-width: 768px) {
        font-size: 16px;
      }

      @media (max-width: 480px) {
        font-size: 14px;
      }
    }

    .flex {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;

      @media (max-width: 480px) {
        flex-direction: column;
      }
    }

    .darkbtn,
    .lightbtn {
      padding: 10px 20px;
      font-size: 16px;
      border-radius: 8px;
      margin: 0 10px;
      cursor: pointer;
      width: auto;

      @media (max-width: 480px) {
        margin: 10px 0;
        width: 100%;
      }
    }

    .darkbtn {
      background-color: #6f47eb;
      border: none;
      color: white;

      &:hover {
        background-color: #543cc7;
      }
    }

    .lightbtn {
      background-color: #d8dbfb;
      color: #6f47eb;
      border: none;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px 20px;
      width: 41%;

      @media (max-width: 768px) {
        width: 50%;
      }

      @media (max-width: 480px) {
        width: 100%;
      }
    }
  }

  .btmText {
    margin: 20px auto;
    gap: 30px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;

    @media (max-width: 768px) {
      gap: 20px;
    }

    @media (max-width: 480px) {
      gap: 10px;
    }
  }

  p {
    font-size: 14px;
    display: inline-flex;
    align-items: center;

    @media (max-width: 768px) {
      font-size: 12px;
    }

    svg {
      margin-right: 5px;
    }
  }
`;
