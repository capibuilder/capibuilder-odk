import styled from "styled-components";

interface props {
  inline?: boolean;
  height?: string;
}

const Loading = ({ inline, height }: props) => {
  return (
    <LoadingWrapper
      style={
        inline
          ? { minHeight: "auto", display: "flex", height: height && height }
          : {
              height: height && height,
              minHeight: height && "auto",
            }
      }
    >
      <div
        style={inline ? { display: "inline-block" } : {}}
        className="la-ball-clip-rotate la-dark la-sm"
      >
        <div></div>
      </div>
    </LoadingWrapper>
  );
};

const LoadingWrapper = styled.span`
  display: block;
  min-height: 400px;
  display: grid;
  place-content: center;

  .la-ball-clip-rotate,
  .la-ball-clip-rotate > div {
    position: relative;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  .la-ball-clip-rotate {
    display: block;
    font-size: 0;
    color: #fff;
  }
  .la-ball-clip-rotate.la-dark {
    color: ${props => props.theme.primaryColor};
  }
  .la-ball-clip-rotate > div {
    display: inline-block;
    float: none;
    background-color: currentColor;
    border: 0 solid currentColor;
  }
  .la-ball-clip-rotate {
    width: 32px;
    height: 32px;
  }
  .la-ball-clip-rotate > div {
    width: 32px;
    height: 32px;
    background: transparent;
    border-width: 2px;
    border-bottom-color: transparent;
    border-radius: 100%;
    -webkit-animation: ball-clip-rotate 0.75s linear infinite;
    -moz-animation: ball-clip-rotate 0.75s linear infinite;
    -o-animation: ball-clip-rotate 0.75s linear infinite;
    animation: ball-clip-rotate 0.75s linear infinite;
  }
  .la-ball-clip-rotate.la-sm {
    width: 26px;
    height: 26px;
  }
  .la-ball-clip-rotate.la-sm > div {
    width: inherit;
    height: inherit;
    border-width: 2px;
  }
  .la-ball-clip-rotate.la-2x {
    width: 64px;
    height: 64px;
  }
  .la-ball-clip-rotate.la-2x > div {
    width: 64px;
    height: 64px;
    border-width: 4px;
  }
  .la-ball-clip-rotate.la-3x {
    width: 96px;
    height: 96px;
  }
  .la-ball-clip-rotate.la-3x > div {
    width: 96px;
    height: 96px;
    border-width: 6px;
  }
  /*
 * Animation
 */
  @-webkit-keyframes ball-clip-rotate {
    0% {
      -webkit-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    50% {
      -webkit-transform: rotate(180deg);
      transform: rotate(180deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @-moz-keyframes ball-clip-rotate {
    0% {
      -moz-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    50% {
      -moz-transform: rotate(180deg);
      transform: rotate(180deg);
    }
    100% {
      -moz-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @-o-keyframes ball-clip-rotate {
    0% {
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    50% {
      -o-transform: rotate(180deg);
      transform: rotate(180deg);
    }
    100% {
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
  @keyframes ball-clip-rotate {
    0% {
      -webkit-transform: rotate(0deg);
      -moz-transform: rotate(0deg);
      -o-transform: rotate(0deg);
      transform: rotate(0deg);
    }
    50% {
      -webkit-transform: rotate(180deg);
      -moz-transform: rotate(180deg);
      -o-transform: rotate(180deg);
      transform: rotate(180deg);
    }
    100% {
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }
`;

export default Loading;
