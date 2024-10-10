import styled from "styled-components";

export default function Input({
  type = "text",
  placeholder = "Type your answer here",
}: {
  type?: "text" | "number" | "email" | "url";
  placeholder?: string;
}) {
  return (
    <Wrapper>
      <input autoComplete="off" type={type} placeholder={`${placeholder}`} />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 80%;
  margin: auto;

  :not(:first-child) {
    margin-top: 25px;
  }

  input {
    all: unset;
    width: 100%;
    border-bottom: 2px solid var(--placeholder-color);
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
    padding: 10px 0;

    ::placeholder {
      color: var(--placeholder-color);
      font-size: 16px;
    }
  }
`;
