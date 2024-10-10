import styled from "styled-components";

export const StickyBannerWrapper = styled.div`
  z-index: 50;
  display: flex;
  justify-content: space-between;
  width: 100% !important;
  height: 42px;
  background-color: #6f47eb;
  color: #ffffff;
  align-items: center;
  padding: 0 40px;
`;

export const BannerContent = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
`;

export const BannerText = styled.p`
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
  font-family: Poppins;
`;

export const CrossButton = styled.svg`
  cursor: pointer;
  width: 20px;
  height: 20px;
`;
