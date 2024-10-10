import React from "react";
import styled from "styled-components";

interface props {
  children: React.ReactNode;
  setPerPage?: React.Dispatch<React.SetStateAction<number>>;
  perPage?: number;
  total?: number;
  hide?: boolean;
  disableControls?: boolean;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  page?: number;
}

export default function Index({
  children,
  setPerPage = () => {},
  perPage = 5,
  total,
  hide,
  setPage = () => {},
  page = 1,
  disableControls,
}: props) {
  return (
    <Wrpper>
      {children}
      {!hide && (
        <div className="controls">
          <span className="per-page">
            Show rows per page
            <select
              disabled={disableControls}
              onChange={e => {
                setPerPage(Number(e.target.value));
                setPage(1);
              }}
              value={perPage}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </span>
          <span className="page">
            {(page - 1) * perPage + 1}-{page * perPage} of {total}
            <button
              disabled={page <= 1 || disableControls}
              onClick={() => {
                setPage(v => v - 1);
              }}
            >
              {LeftArrow}
            </button>
            <button
              disabled={page * perPage > total! || disableControls}
              onClick={() => {
                setPage(v => v + 1);
              }}
            >
              {rightArrow}
            </button>
          </span>
        </div>
      )}
    </Wrpper>
  );
}

const Wrpper = styled.div`
  width: 100%;

  .controls {
    background: #fff;
    padding: 15px;
    margin-top: 2px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 10px 10px;

    button:disabled,
    select:disabled {
      cursor: not-allowed !important;
    }

    span.per-page {
      gap: 10px;
      display: flex;
      align-items: center;

      select {
        padding: 5px 10px;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
      }
    }

    span.page {
      button {
        margin-left: 10px;
        background: none;
        border: 0;
        cursor: pointer;
        padding: 7px 13px;

        :hover {
          background: grey;
        }
      }
    }
  }
`;

const LeftArrow = (
  <svg
    width="6"
    height="10"
    viewBox="0 0 6 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.21859 4.99999L5.51858 8.29999L4.57592 9.24266L0.333252 4.99999L4.57592 0.757324L5.51858 1.69999L2.21859 4.99999Z"
      fill="#353C3C"
    />
  </svg>
);
const rightArrow = (
  <svg
    width="6"
    height="10"
    viewBox="0 0 6 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.7812 4.99999L0.481201 1.69999L1.42387 0.757324L5.66653 4.99999L1.42387 9.24266L0.481201 8.29999L3.7812 4.99999Z"
      fill="#353C3C"
    />
  </svg>
);
