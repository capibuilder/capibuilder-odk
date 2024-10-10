import { TbMoodSad } from "react-icons/tb";
import styled from "styled-components";

interface props {
  message?: string;
  height?: string;
}

export default function Index({
  message = "No results",
  height = "400px",
}: props) {
  return (
    <Empty style={{ height: height }}>
      <TbMoodSad fontSize={40} />

      <span>{message}</span>
    </Empty>
  );
}

export const Empty = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
  border-radius: 0 0 10px 10px;

  span {
    font-size: 18px;
    font-weight: 500;
    margin-top: 15px;
  }
`;
