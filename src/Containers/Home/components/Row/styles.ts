import styled from "styled-components";

export const RowWrapper = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  padding-inline: 20px;
  margin-top: 130px;
  display: flex;
  gap: 100px;
  align-items: center;

  .w {
    width: 50%;
  }

  .content {
    .head {
      display: flex;
      align-items: center;
      margin-bottom: 25px;

      h3 {
        font-weight: 700;
        font-size: 24px;
        line-height: 16px;
        color: #4f0fff;
        margin-right: 20px;
        /* margin-top: 40px; */
      }
    }
    h2 {
      font-weight: 600;
      font-size: 40px;
      line-height: 48px;
      color: #353c3c;
    }

    p {
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #353c3c;
      margin-top: 20px;
    }
  }

  .img {
    img {
      width: 100%;
    }
  }

  @media (max-width: 999px) {
    flex-direction: column !important;
    gap: 50px;
    margin-top: 100px;
    padding-inline: 10px;

    .w {
      width: 100%;
    }

    .content {
      .head {
        margin-bottom: 30px;

        img {
          height: 50px;
        }
      }

      h2 {
        font-size: 28px;
      }
    }
  }

  @media (max-width: 768px) {
    flex-direction: column !important;
    gap: 50px;

    .w {
      width: 100%;
    }

    .content {
      .head {
        img {
          height: 40px;
        }
      }

      h2 {
        font-size: 24px;
        line-height: normal;
      }

      p {
        font-size: 15px;
      }
    }
  }
`;
