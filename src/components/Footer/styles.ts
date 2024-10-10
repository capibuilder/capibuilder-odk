import styled from "styled-components";
export const FooterTopWrapper = styled.section`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const FooterTopSection = styled.section`
  background-color: #6f47eb;
  color: #ffffff;
  border-radius: 20px;
  height: 412px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 94%;
  position: relative;
  top: 180px;
`;

export const FooterTopHeader = styled.h1`
  font-family: Inter;
  font-weight: 600;
  font-size: 48px;
  text-align: center;
`;

export const FooterTopPara = styled.p`
  font-family: Poppins;
  font-size: 20px;
  text-align: center;
  font-weight: 400;
  margin-bottom: 30px;
`;

export const FooterTopButton = styled.button`
  border-radius: 6px;
  padding: 10px 18px;
  background-color: #ffffff;
  color: #6f47eb;
  font-family: Poppins;
  font-weight: 600;
  border: none;
  margin-bottom: 14px;
`;

export const FooterTopLast = styled.p`
  color: #d8dbfb;
  font-family: Poppins;
  font-weight: 400;
  font-size: 12px;
`;

export const FooterTopLeftImage = styled.img`
  position: absolute;
  left: 0;
  bottom: 0;
`;

export const FooterTopRightImage = styled.img`
  position: absolute;
  right: 0;
  bottom: 0;
`;

export const FooterWrapper = styled.div`
  margin: 0 auto;
  padding: 0 3rem;
  height: 550px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-color: #1c1934;
  color: #ffffff;
  width: 100%;
  gap: 0;
`;

export const FooterInner = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  margin: 14px 0;
`;

export const LogoBanner = styled.div`
  width: 240px;
  font-family: Poppins;
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
`;

export const FooterLogo = styled.p`
  text-decoration: none;
`;

export const TextLogo = styled.span`
  color: #ffffff;
  font-size: 20px;
  font-weight: 400;
`;

export const LogoLeft = styled.span`
  font-weight: 600;
`;

export const FooterItems = styled.div`
  display: flex;
  width: 65%;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
`;

export const GridItems = styled.div`
  height: 100%;
  margin-top: 1rem;
`;

export const FooterTitle = styled.div`
  font-weight: bold;
  margin-bottom: 1rem;
  font-size: 1.1rem;
  text-transform: capitalize;
  color: #d8dbfb;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  display: grid;
  gap: 0.6rem;
`;

export const ListItem = styled.li`
  color: #ffffff;
  font-weight: 400;
  margin-bottom: 0.5rem;
`;

export const ItemLink = styled.a`
  color: #ffffff;
`;

export const BorderThingy = styled.div`
  padding: 0 30px;
  border-bottom: 2px solid #ffffff;
  margin: 16px 0;
`;

export const FooterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #1c1934;
  color: #ffffff;
  margin-bottom: 15px;
`;

export const FooterContent = styled.div`
  font-size: 1rem;
  font-weight: 400;
`;

export const FooterLinks = styled.div`
  display: flex;
  gap: 1rem;

  p {
    margin: 0;
    cursor: pointer;
    transition: color 0.3s;

    &:hover {
      color: #ffcc00;
    }
  }
`;
