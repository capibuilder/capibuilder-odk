import styled from "styled-components";

export default function Input({ messgae }: { messgae: string }) {
  return (
    <Wrapper>
      <span className="help-text">{messgae}</span>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 80%;
  margin: auto;

  span.help-text {
    display: block;
    line-height: 30px;
    color: grey;
    font-weight: 500;

    b {
      text-transform: capitalize;
    }
  }
`;
