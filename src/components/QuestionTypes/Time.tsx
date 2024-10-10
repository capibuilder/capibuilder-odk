import styled from "styled-components";

export default function Input() {
  return (
    <Wrapper>
      <label htmlFor="hh">
        Hours
        <input placeholder="Hours" id="hh" type="number" max={24} min={0} />
      </label>
      <label htmlFor="mm">
        Minutes
        <input placeholder="MM" id="mm" type="number" max={60} min={0} />
      </label>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 80%;
  margin: auto;
  display: flex;
  gap: 30px;
  margin-top: 10px;

  label {
    display: flex;
    flex-direction: column;
    width: max-content;
    position: relative;
    font-size: 14px;
    font-weight: 500;

    :not(:last-child) {
      ::after {
        content: ":";
        width: 2px;
        font-size: 22px;
        position: absolute;
        right: -17px;
        bottom: 5px;
      }
    }
  }

  input {
    all: unset;
    border-bottom: 2px solid var(--placeholder-color);
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    padding: 8px 0 0px 0;
    width: 50px;
    margin-left: 2px;

    ::placeholder {
      color: var(--placeholder-color);
      font-size: 16px;
    }
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type="number"] {
    -moz-appearance: textfield;
  }
`;
