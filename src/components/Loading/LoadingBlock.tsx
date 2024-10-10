import styled, { CSSProperties } from "styled-components";

const LoadingBlock = ({ style }: { style?: CSSProperties }) => {
  return (
    <LoadingWrapper style={style}>
      <span className="spinner"></span>
    </LoadingWrapper>
  );
};

export default LoadingBlock;

const LoadingWrapper = styled.div`
  display: block;
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;

  span.spinner {
    width: 30px;
    height: 30px;
    border-width: 3px;
    border-color: transparent;
    border-top-color: ${props => props.theme.primaryColor};
    border-left-color: ${props => props.theme.primaryColor};
    border-style: solid;
    border-radius: 50%;
    animation: spinner 0.5s infinite linear;
  }

  @keyframes spinner {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
