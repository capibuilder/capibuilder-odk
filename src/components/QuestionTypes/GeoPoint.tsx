import styled from "styled-components";

export default function Preview({ img }: { img: string }) {
  return (
    <Wrapper>
      <img src={img} alt="preview" />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  margin: auto;

  img {
    width: 100%;
    border-radius: 5px;
  }
`;
