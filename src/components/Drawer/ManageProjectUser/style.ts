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
    width: 60%;
    background-color: #f3f2ef;
    height: 100%;
    margin-left: auto;
    overflow: auto;
    overflow: hidden;

    .head {
      background-color: #5d5fef;
      padding: 25px;

      h2 {
        font-size: 22px;
        font-weight: 500;
        color: #fff;
      }
    }

    .pad {
      padding: 25px;

      .search-users {
        width: 100%;
        position: relative;
        margin-bottom: 40px;

        input {
          padding: 15px 20px;
          width: 100%;
          outline: none;
          border-radius: 20px;
          border: 0.5px solid #999898;
          transition: all 0.3s;
          font-size: 16px;

          &:has(+ [data-issearching="true"]) {
            border-radius: 10px 10px 0 0;
          }
        }

        .users-dropdown {
          position: absolute;
          top: 100%;
          height: auto;
          min-height: 150px;
          max-height: 300px;
          overflow: auto;
          width: 100%;
          background-color: #fff;
          border: 0.5px solid #999898;
          border-radius: 0 0 10px 10px;
          left: 0;
          padding-left: 0;

          i {
            width: 100%;
            height: 150px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          li {
            list-style: none;
            padding: 10px 15px;
            cursor: pointer;
            border-bottom: 1px solid lightgray;
            font-weight: 500;
            display: flex;
            align-items: center;
            justify-content: space-between;

            &:hover {
              background-color: lightgray;
            }

            select {
              padding: 5px;
              outline: none;
              border: 1px solid lightgray;
              border-radius: 5px;

              option {
                font-size: 15px;
              }
            }
          }
        }

        /* &["data-isSearching"] {
        } */
      }
      .devider {
        width: 100%;
        display: flex;
        gap: 20px;

        ul.list {
          width: 100%;
          background-color: #fff;
          padding: 20px 0;
          border: 0.2px solid #000000;
          border-radius: 10px;
          transition: width 0.3s;

          &:has(+ .setting) {
            width: 40%;
          }

          li {
            list-style: none;
            font-size: 20px;
            font-weight: 600;
            line-height: 16px;
            padding: 15px 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            &:hover {
              background-color: lightgray;
            }

            button {
              all: unset;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;

              &:hover {
                color: red;
              }
            }
          }
        }

        .setting {
          width: 58%;
          background-color: #fff;
          padding: 20px 20px;
          border: 0.2px solid #000000;
          border-radius: 10px;
          height: 500px;
          transition: width 0.3s;

          h3 {
            font-size: 20px;
            font-weight: 600;
            line-height: 16px;
            padding: 15px 0;
          }

          .selection {
            margin-top: 10px;
            padding-left: 50px;

            span {
              font-size: 16px;
              font-weight: 500;
            }

            select {
              padding: 5px;
              outline: none;
              border: 1px solid lightgray;
              border-radius: 5px;

              option {
                font-size: 15px;
              }
            }
          }
        }
      }
    }
  }
`;
