import styled from "styled-components";

export default function Input() {
  return (
    <Wrapper>
      <textarea rows={1} placeholder="Type your answer here" />

      <span className="help-text">Shift ⇧ + Enter ↵ to make a line break</span>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 80%;
  margin: auto;

  textarea {
    all: unset;
    display: block;
    width: 100%;
    border-bottom: 2px solid var(--placeholder-color);
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    margin-top: 10px;

    ::placeholder {
      color: var(--placeholder-color);
      font-size: 16px;
    }
  }

  .help-text {
    display: block;
    margin-top: 10px;
    font-weight: 500;
    font-size: 16px;
    line-height: 28px;
    color: #4f0fff;
  }
`;
