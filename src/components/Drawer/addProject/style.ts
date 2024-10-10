import styled from "styled-components";

export const Wrapper = styled.div`
  --navbar-height: 80px;

  position: fixed;
  top: var(--navbar-height);
  width: 100%;
  height: calc(100vh - var(--navbar-height));
  right: 0;

  background: rgba(0, 0, 0, 0.6);
  z-index: 12;

  .content {
    width: 50%;
    background-color: #f3f2ef;
    height: 100%;
    margin-left: auto;
    overflow: auto;

    .head {
      background-color: #5d5fef;
      padding: 25px;

      h2 {
        font-size: 22px;
        font-weight: 500;
        color: #fff;
      }
    }

    form {
      padding: 25px;

      textarea {
        min-height: 200px;
      }

      input {
        height: 46px;
      }

      .ctas {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 10px;

        button {
          border-color: #000;
          font-size: 15px;

          &[type="submit"] {
            background-color: #5d5fef;
          }
        }
      }
    }
  }
`;
