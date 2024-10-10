import styled from "styled-components";

export const SurveyTableContainer = styled.div`
  .filter-options {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 10px;
    margin-bottom: 10px;

    a {
      line-height: 0;
    }

    .icon {
      cursor: pointer;
      color: #000;
    }
  }
  .table-overlay {
    overflow: hidden;
    border-radius: 10px;
  }

  .table {
    overflow: auto;
    height: 700px;

    input[type="checkbox"] {
      height: 20px;
      width: 20px;
    }

    .row {
      display: flex;
      justify-content: space-between;
      gap: 3px;

      span,
      div {
        :not(:has(input)) {
          min-width: 300px;
          display: block;
          padding: 20px 10px;
        }

        :has(input) {
          padding: 15px 25px;
        }
      }
    }

    .head {
      margin-top: 0;
      justify-content: space-between;
      display: grid;
      position: sticky;
      top: 0;

      span {
        padding: 15px 25px;
        font-size: 18px;
        color: #fff;
        background-color: #4b4b4b;
        text-transform: uppercase;
        text-align: center;
      }
    }
  }
`;
export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;
export const THead = styled.thead`
  tr {
    background-color: #f3ebf1;
    color: #353c3c;
    font-weight: 600;
  }

  th {
    padding: 20px;
    text-align: left;
    text-transform: capitalize;
  }
`;
export const TBody = styled.tbody`
  td {
    padding: 20px;
  }

  .name-content {
    display: flex;
    align-items: center;
    gap: 10px;

    &__details {
      display: flex;
      flex-direction: column;
      gap: 5px;
      text-transform: capitalize;

      .name {
        font-weight: 500;
      }

      .text {
        font-size: 14px;
        font-weight: 500;
        color: #718096;
      }
    }
  }

  .location {
    color: #2d3748;
  }

  .status {
    span {
      padding: 2px 5px;
      color: #fff;
      font-size: 12px;

      &.approved {
        background-color: #38a169;
      }

      &.pending {
        background-color: #ed8936;
      }

      &.rejected {
        background-color: #e53e3e;
      }
    }
  }

  .options {
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .icon {
      cursor: pointer;
    }
  }
`;
