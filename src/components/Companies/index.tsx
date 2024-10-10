import React from "react";
import styled from "styled-components";

const Logo = styled.img`
  height: 70px;
  max-width: 180px;
  width: auto;
  filter: grayscale(100%);

  @media only screen and (max-width: 600px) {
    height: 30px;
    max-width: 100px;
    width: auto;
  }

  @media only screen and (min-width: 601px) and (max-width: 900px) {
    height: 60px;
    max-width: 140px;
    width: auto;
  }
`;

const CompanyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

const Company = ({ logo }: { logo: string }) => {
  return (
    <CompanyContainer>
      <Logo src={logo} alt="Logo" />
    </CompanyContainer>
  );
};

export default Company;
