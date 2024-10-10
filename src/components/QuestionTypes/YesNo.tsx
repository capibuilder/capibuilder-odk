import styled from "styled-components";

export default function Input() {
  return (
    <Wrapper>
      <label htmlFor="yes">
        <input type="radio" name="yn" id="yes" />
        Yes
      </label>
      <label htmlFor="no">
        <input type="radio" name="yn" id="no" />
        No
      </label>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 80%;
  margin: auto;

  label {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    gap: 15px;
    cursor: pointer;

    input {
      height: 18px;
      width: 18px;
    }
  }
`;
