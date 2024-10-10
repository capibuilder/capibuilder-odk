import styled from "styled-components";

export default function Trigger() {
  return (
    <Wrapper>
      <label htmlFor="yes">
        <input type="radio" name="yn" id="yes" />
        OK
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
    gap: 10px;
    cursor: pointer;

    input {
      height: 18px;
      width: 18px;
    }
  }
`;
