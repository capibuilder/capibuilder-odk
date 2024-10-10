import useSurveyStore from "@/context/surveyStores";
import { useInputFocus } from "@/hooks";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface props {
  options: {
    label: string;
    value: string;
  }[];
  onClose: () => void;
}

export default function SelectAppearance({ options, onClose }: props) {
  const [input, setInput] = useState("");
  const {
    addFieldData,
    data: { fields },
    currentField,
  } = useSurveyStore();

  // const current = fields[currentField as string];
  const focusInputRef = useInputFocus();

  useEffect(() => {
    const handleClick = () => {
      onClose && onClose();
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const filtered = input
    ? options?.filter(e => {
        return e.label?.toLowerCase()?.includes(input.toLowerCase());
      })
    : options;

  return (
    <DropdownWrapper
      onClick={e => {
        e.stopPropagation();
        e.preventDefault();
      }}
      className="c-scrollbar"
    >
      <div className="search">
        <input
          ref={focusInputRef}
          type="search"
          onChange={e => {
            setInput(e.target.value);
          }}
          placeholder="Search..."
        />
      </div>
      {filtered.map((d, index) => (
        <>
          <li
            key={index}
            onClick={e => {
              addFieldData({ appearance: d.value });
            }}
            data-animate="slideUp"
          >
            {d.label}
          </li>
        </>
      ))}
    </DropdownWrapper>
  );
}

export const DropdownWrapper = styled.ul`
  position: absolute;
  top: 95%;
  left: 0;
  background-color: #fff;
  width: 100%;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 0 0 10px 0;
  border-radius: 0 0 10px 10px;
  border: 2px solid #d9d9d9;
  max-height: 350px;
  z-index: 1;
  overflow-y: overlay;
  padding-right: 3px;

  .search {
    position: sticky;
    top: 0;
    padding: 10px 5px;
    background-color: #fff;
    z-index: 2;
  }

  input {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    outline: 0;
    border: 1px solid gray;
    font-weight: 500;
  }

  li {
    list-style: none;
    padding: 10px 15px;
    font-size: 16px;
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
    text-transform: capitalize;

    :hover {
      background: lightgray;
    }

    .icon {
      line-height: 0;
      padding: 4px;
      border-radius: 5px;
    }

    b.red {
      color: red;
    }
  }
  li[aria-selected="true"] {
    cursor: not-allowed;
    opacity: 0.5;

    :hover {
      opacity: 1;
    }
  }
`;
