import styled from "styled-components";

export const ContentWrapper = styled.div`
  width: 94%;
  /* min-height: 500px; */
  margin: auto;

  max-width: 900px;
  background-color: ${({ theme }) => theme.linkColor};
  border-radius: 0 10px 10px 10px;
  border: 1.5px solid #d9d9d9;
  /* overflow-y: auto; */
  margin-bottom: 45px;
  /* position: relative; */
  &:first-child {
    border-radius: 10px;
    margin-top: 25px;

    .content__header {
      padding: 25px 30px;
    }
  }

  .content__header {
    &__number {
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #404040;
      color: #fff;
      font-size: 20px;
      border-radius: 50%;
      line-height: normal;
    }
  }

  span.language_tag {
    border: 1px solid #d9d9d9;
    padding: 4px 13px;
    position: relative;
    display: block;
    width: max-content;
    background-color: #fff;
    font-size: 14px;
    border-radius: 5px 5px 0 0;
    top: -26px;
    z-index: 1;
    left: 0;
    font-weight: 600;
    text-transform: capitalize;
  }

  .translating {
    position: absolute;
    left: 5px;
    top: 5px;

    .la-ball-clip-rotate.la-sm {
      height: 18px;
      width: 18px;
    }
  }

  .content__header {
    display: flex;
    /* align-items: center; */
    gap: 25px;
    padding: 3px 30px 25px;
    border-bottom: 2px solid #d9d9d9;

    &__title {
      width: 90%;

      h3 {
        font-size: 1.5rem;
        font-weight: 500;
        color: ${({ theme }) => theme.lightColor};
      }
      p {
        font-size: 1.1rem;
        font-style: italic;
        color: ${({ theme }) => theme.lightColor};
        margin-top: 8px;
      }

      .input-group {
        width: 100%;
        display: flex;
        align-items: flex-start;
        gap: 8px;
        background-color: #dce4ea;

        input,
        textarea {
          flex: 1;
          resize: vertical;
          border: none;
          font-size: 24px;
          font-weight: 500;
          outline: none;

          :focus {
            ::placeholder {
              color: grey;
            }
          }

          ::placeholder {
            color: var(--placeholder-color);
            font-size: 15px;
          }
        }

        .description,
        .title {
          width: 100%;
          font-size: 16px;
          border: none;
          outline: none;
          font-weight: 500;
          resize: vertical;
          background-color: #dce4ea;
        }
      }

      .desc {
        margin-top: 8px;
      }
    }

    &__image {
      margin-left: auto;
    }
  }

  .content__body {
    padding: 30px;
  }
`;
