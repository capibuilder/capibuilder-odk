import { FiLock } from "react-icons/fi";
import { TbMoodEmpty } from "react-icons/tb";
import styled from "styled-components";

export function NotFound() {
  return (
    <Wrapper>
      <TbMoodEmpty size={50} />
      <b>Template not found</b>
    </Wrapper>
  );
}

export function Restricted() {
  return (
    <Wrapper>
      <FiLock size={50} />
      <b>You do not have access of this template</b>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  height: calc(100vh - 80px);
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 25px;
  flex-direction: column;
`;
