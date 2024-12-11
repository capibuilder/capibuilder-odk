import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  max-width: 100%;
  height: auto;
  padding: 16px;
  box-sizing: border-box;
  overflow: hidden;

  h2 {
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    color: #808080;
    margin-bottom: 16px;
  }
`;

export const ChartContainer = styled.div`
  width: 100%;
  max-width: 100%;
  height: 400px;
  overflow: auto;
`;
