import styled from "styled-components";

export const UploadMediaWrapper = styled.div`
  width: 100%;
  min-height: 200px;
  border-radius: 10px;
  background-color: #f3f2ef;
  border: 1px solid #353c3c;

  label {
    width: 100%;
    min-height: inherit;
    border-radius: inherit;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    color: #353c3c;

    .upload-media__text {
      font-size: 1.2rem;
      font-weight: 500;
      margin-bottom: 8px;
    }
    .upload-media__sm-text {
      font-weight: 400;
      font-size: 14px;
    }
  }
`;

export const AddOptionWrapper = styled.div`
  width: 80%;
  margin: auto;
  /* position: relative; */

  .add-option {
    &__header {
      display: flex;
      flex-direction: column;
      gap: 15px;

      label {
        display: flex;
        align-items: center;
        gap: 5px;
      }
    }
    &__button {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 20px;

      button {
        background-color: transparent;
        border: none;
        color: ${({ theme }) => theme.primaryColor};
        font-weight: 500;
        cursor: pointer;
        text-transform: capitalize;
        font-weight: 600;
        padding-left: 0;
      }
    }
  }

  .overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 998;
  }

  .option-model {
    position: fixed;
    width: 500px;
    min-height: 100px;
    padding: 24px;
    border-radius: 10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    z-index: 999;

    .title {
      font-size: 1.2rem;
      font-weight: 500;
      text-transform: capitalize;
      margin-bottom: 16px;
    }
  }
`;

export const GroupWrapperView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .group__wrapper {
    display: flex;
    flex-direction: column;
    gap: 8px;

    :not(:first-child) {
      margin-top: 30px;
    }

    &__label {
      font-weight: 500;
      text-transform: capitalize;
      width: 80%;
      margin: auto;
    }

    &__content {
      width: 100%;
      max-width: 80%;
      margin: 10px auto;
    }
  }
`;

export const CascadingSelectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  .preview-table {
    max-height: 400px;
    overflow-y: auto;
  }

  table {
    border-collapse: separate;
    border-spacing: 0;
    color: #4a4a4d;
    border: 1px solid #cecfd5;
    min-width: 100%;
    font-size: 12px;
    font-weight: 500;

    tbody {
      tr:first-child {
        position: sticky;
        top: 0;

        background: #395870;
        background: linear-gradient(#49708f, #293f50);
        color: #fff;
        font-size: 14px;
      }
    }
  }

  th,
  td {
    padding: 10px 15px;
    vertical-align: middle;
  }
  thead {
    background: #395870;
    background: linear-gradient(#49708f, #293f50);
    color: #fff;
    font-size: 11px;
    text-transform: uppercase;
  }
  th:first-child {
    border-top-left-radius: 5px;
    text-align: left;
  }
  th:last-child {
    border-top-right-radius: 5px;
  }
  tbody tr:nth-child(even) {
    background: #f0f0f2;
  }
  td {
    border-bottom: 1px solid #cecfd5;
    border-right: 1px solid #cecfd5;
  }
  td:first-child {
    border-left: 1px solid #cecfd5;
  }
  .book-title {
    color: #395870;
    display: block;
  }
  .text-offset {
    color: #7c7c80;
    font-size: 12px;
  }
  .item-stock,
  .item-qty {
    text-align: center;
  }
  .item-price {
    text-align: right;
  }
  .item-multiple {
    display: block;
  }
  tfoot {
    text-align: right;
  }
  tfoot tr:last-child {
    background: #f0f0f2;
    color: #395870;
    font-weight: bold;
  }
  tfoot tr:last-child td:first-child {
    border-bottom-left-radius: 5px;
  }
  tfoot tr:last-child td:last-child {
    border-bottom-right-radius: 5px;
  }
`;

export const Button = styled.div`
  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.primaryColor};
  padding: 0;
  text-transform: capitalize;
  font-weight: 500;
  cursor: pointer;
  font-size: 14px;
`;
