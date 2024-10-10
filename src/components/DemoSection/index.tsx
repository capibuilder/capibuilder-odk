import styled from "styled-components";
import Company from "../Companies";

const Section = styled.section`
  position: relative;
  top: -100px;
  height: 1100px;
`;

const Image = styled.img`
  width: 80%;
  margin: auto;
  display: block;
`;

const Header = styled.h3`
  font-size: 28px;
  line-height: 1.4;
  text-align: center;
  margin: 30px 0px;

  @media only screen and (max-width: 900px) {
    font-size: 20px;
  }

  @media only screen and (max-width: 600px) {
    font-size: 18px;
    line-height: 1.3;
  }
`;

const Rating = styled.div`
  width: 76%;
  margin: 0px auto;
  display: flex;
  justify-content: space-between;

  @media only screen and (max-width: 600px) {
    width: 96%;
  }

  @media only screen and (min-width: 601px) and (max-width: 900px) {
    width: 85%;
  }
`;

const SideCircle = styled.svg`
  position: relative;
  top: -300px;
  height: 400px;
  z-index: -1;
`;

const DemoComponent = () => {
  return (
    <Section>
      <Image src="/datademo.gif" alt="" />
      <div>
        <Header>Trusted by the Leading Nonprofits</Header>
        <Rating>
          <Company logo={"/sst-logo.png"} />
          <Company logo={"/wotr-logo.png"} />
          <Company logo={"/giz-logo.png"} />
          <Company logo={"/asia-logo.png"} />
          <Company logo={"/ipe-logo.png"} />
          <Company logo={"/fpo-logo.png"} />
        </Rating>
      </div>
      <SideCircle
        width="152"
        height="468"
        viewBox="0 0 152 468"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="-82" cy="234" r="194" stroke="#EFF0FC" strokeWidth="80" />
      </SideCircle>
    </Section>
  );
};

export default DemoComponent;
