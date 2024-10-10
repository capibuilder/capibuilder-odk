import { normalize } from "polished";
import styled, { createGlobalStyle, css } from "styled-components";

export const theme = {
  maxWidth: "1800px",
  darkBackground: "#404040",
  navBackground: "#ffffff",
  lightBackground: "#ffffff",
  linkColor: "#fff",
  navLink: "#4A5568",
  // primaryColor: "#A84787",
  primaryColor: "#703DFD",
  textColor: "#353C3C",
  // lightColor: "#8C9CAF",
  lightColor: "#4B4B4B",
  iconBG: "#9981FA",
};

const GlobalStyles = createGlobalStyle`
${normalize()}

*,*::before,*::after{
    box-sizing: border-box;
    margin: 0;
}

body{
    background-color: #FFFFFF;
}

input:-webkit-autofill, input:-webkit-autofill:hover, input:-webkit-autofill:focus, input:-webkit-autofill:active {
    --webkit-box-shadow: 0 0 0 30px white inset !important;
    -webkit-box-shadow: 0 0 0 30px white inset !important;
    box-shadow: 0 0 0 30px white inset !important;
}

a {
    text-decoration: none;
}

button:disabled {
  opacity: 0.8;
  cursor: not-allowed;
}

.grid-link{
  width: 100%;
  padding: 10px 0;

  a{
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    text-decoration: none;
    transition: all 0.2s ease-in-out;

    &:hover{
      color: ${theme.primaryColor};
    }

    svg{
      width: 20px;
      height: 20px;
      stroke: ${theme.primaryColor};
    }
  }

}

.review-cell{
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  font-size: 14px;
  line-height: normal;
  color: #767C7C;
  text-transform: capitalize;
  padding: 4px ;
  border-radius: 4px;

  &.approved{
    background-color: #08a10b;
    color: #fff;
  }
  
  &.rejected{
    background-color: #de2a11;
    color: #fff;
  }
}


.ag-theme-alpine.custom-grid{
  --ag-border-color: #E2E8F0;
  --ag-borders: solid 2px;

  .ag-cell-value,
  .ag-center-cols-clipper,
  .ag-body-viewport {
    overflow: visible ;
    isolation:isolate;
    z-index:1;
  }
  

  .ag-row{
    z-index:1;

    &.ag-row-hover{
      z-index:99;
    }
  }
  
    .ag-root-wrapper{
    border-radius: 8px;
    overflow: visible;
    }

}
`;

export const WrapperStub = styled.div`
  max-width: ${theme.maxWidth};
  margin: auto;
  padding-inline: 20px;
  padding-block: 20px;
`;

export const TitleStub = styled.div`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: -0.02em;
  color: #353c3c;
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 2;
  z-index: 999;
`;

export const Button = styled.button<{
  secondary?: boolean;
}>`
  width: 100%;
  padding: 12px;
  border-radius: 4px;
  border: none;
  background-color: ${props => props.theme.primaryColor};
  color: ${props => props.theme.linkColor};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-transform: capitalize;

  ${props =>
    props.secondary &&
    css`
      background-color: #fff;
      color: ${props.theme.primaryColor};
      border: 2px solid ${props.theme.primaryColor};
    `}
`;

export const ModelWrapper = styled.div`
  width: 700px;
  /* min-height: 40%; */
  background-color: ${props => props.theme.linkColor};
  padding: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  z-index: 3;
  max-height: 96vh;
  overflow-y: auto;

  .head {
    h2 {
      font-weight: 500;
      font-size: 28px;
      line-height: 24px;
      color: #353c3c;
    }
  }

  span.error {
    color: red;
    font-weight: 500;
    display: block;
    margin-top: 10px;
    font-size: 16px;
  }

  hr {
    all: unset;
    margin: 25px 0;
    display: block;
    height: 2px;
    background-color: #d9d9d9;
  }

  p {
    font-weight: 500;
    font-size: 16px;
    line-height: 24px;
    color: #767c7c;
    margin: 15px auto 0;
    max-width: 550px;
  }

  .lang {
    .label {
      display: inline-block;
      font-weight: 500;
      font-size: 16px;
      line-height: 24px;
      color: #2d3748;
      box-sizing: border-box;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
`;

export default GlobalStyles;
