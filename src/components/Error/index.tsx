import React from "react";
import styled from "styled-components";

export default function ErrorPage({
  message,
  icon,
}: {
  icon?: React.ReactNode;
  message: string;
}) {
  return (
    <Wrapper>
      {icon}
      <p>{message}</p>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  width: 100%;
  height: calc(100vh - 85px);
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-weight: 600;
  gap: 20px;
`;
