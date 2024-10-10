import React from "react";
import {
  FooterTopWrapper,
  FooterTopSection,
  FooterTopHeader,
  FooterTopPara,
  FooterTopButton,
  FooterTopLast,
  FooterTopLeftImage,
  FooterTopRightImage,
} from "./styles";

const FooterTop = () => {
  return (
    <FooterTopWrapper>
      <FooterTopSection>
        <FooterTopHeader>Start building a survey form for free</FooterTopHeader>
        <FooterTopPara>
          Use the CAPIBuilder Cloud to create your survey form for free!
        </FooterTopPara>
        <FooterTopButton>Get started for free</FooterTopButton>
        <FooterTopLast>No credit card required</FooterTopLast>
        <FooterTopLeftImage src="/assets/svg/circleLeft.svg" />
        <FooterTopRightImage src="/assets/svg/circleRight.svg" />
      </FooterTopSection>
    </FooterTopWrapper>
  );
};

export default FooterTop;
