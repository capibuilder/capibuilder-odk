import { PlusIcon } from "@/assets";
import styled from "styled-components";

export default function Input() {
  return (
    <Wrapper>
      <PlusIcon />
      <span className="help-text">Add map</span>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: max-content;
  border: 2px solid grey;
  padding: 30px 35px;
  margin-left: 10%;
  border-radius: 10px;
  text-align: center;

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
