import { useState } from "react";
import { GrClose } from "react-icons/gr";
import { Button, Flex } from "socialwell-design";
import styled from "styled-components";

interface props {
  onCancel: () => void;
  handleSubmit: (accessType: "PUBLIC" | "INTERNAL") => void;
}

export default function SaveTemplates({ onCancel, handleSubmit }: props) {
  const [accessType, setAccessType] = useState<"PUBLIC" | "INTERNAL" | null>(
    "PUBLIC"
  );

  return (
    <Wrapper>
      <Flex alignItems="center" className="head" justifyContent="space-between">
        <h3>Template Access</h3>
        <span onClick={onCancel}>
          <GrClose />
        </span>
      </Flex>

      <span className="lb">Select access</span>

      <div className="radio">
        <label>
          <input
            type="radio"
            name="nah"
            onChange={() => {
              setAccessType("PUBLIC");
            }}
            defaultChecked
          />
          Public
        </label>
        <label>
          <input
            type="radio"
            name="nah"
            onChange={() => {
              setAccessType("INTERNAL");
            }}
          />
          Private
        </label>
      </div>

      <Flex alignItems="center" className="btns" justifyContent="flex-end">
        <Button
          name="Cancel"
          type="button"
          variant="outline"
          onClick={onCancel}
        />
        <Button
          disabled={!accessType}
          onClick={() => {
            accessType && handleSubmit(accessType);
          }}
          name="Save"
          type="button"
          variant="solid"
        />
      </Flex>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: absolute;
  right: 10%;
  z-index: 10;
  background-color: #fff;
  padding: 20px;
  top: 80%;
  width: 450px;
  border: 1px solid #d9d9d9;
  border-radius: 10px;

  .head {
    margin-bottom: 40px;

    span {
      cursor: pointer;

      padding: 8px 10px;
      display: flex;
      transition: all 0.3s;
      border-radius: 5px;
      align-items: center;

      :hover {
        background-color: lightgrey;
      }
    }

    h3 {
      margin-bottom: 0;
      font-size: 22px;
      font-weight: 600;
    }
  }

  .lb {
    display: block;
    margin-bottom: 25px;
  }

  .radio {
    display: flex;
    align-items: center;
    margin-top: 30px;

    label {
      display: flex;
      align-items: center;
      font-size: 18px;
      margin-right: 30px;
      cursor: pointer;

      input {
        width: 18px;
        height: 18px;
        margin-right: 5px;
        margin-bottom: 2px;
      }
    }
  }

  .btns {
    margin-top: 40px;

    button {
      :last-child {
        background-color: var(--primary-color);

        :disabled {
          cursor: not-allowed;
        }

        :hover {
          opacity: 0.9;
        }
      }
    }
  }
`;
