import { WrapperStub } from "@/styles/globals";
import Link from "next/link";
import styled from "styled-components";

export const NavbarContainer = styled.nav`
  width: 100vw;
  min-height: 60px;
  background-color: ${props => props.theme.navBackground};
  a.sm {
    display: none;
  }

  @media print {
    display: none;
  }

  button.menu-btn {
    padding: 10px;
    background-color: transparent;
    border: none;
    display: none;
  }

  @media (max-width: 999px) {
    background-color: #fff !important;
    position: sticky;
    top: 0;
    z-index: 7;

    button.menu-btn {
      display: flex;
    }

    a.bmd {
      display: none;
    }

    a.sm {
      display: block;
    }
  }
`;

export const Wrapper = styled(WrapperStub)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 20px;
  @media (max-width: 999px) {
    padding-block: 12px;
    padding-inline: 10px;
  }
`;

export const Logo = styled(Link)`
  padding: 2px 2px 2px 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #000;

  img {
    margin-bottom: 4px;
    margin-right: 2px;
  }

  .text-logo {
    padding: 0px 0px 0px 0px;
    border-radius: 5px;
    font-weight: 600;
    /* background-color: ${props => props.theme.linkColor};
    color: ${props => props.theme.darkBackground}; */
    font-size: 20px;

    .light {
      color: ${props => props.theme.primaryColor};
    }
  }

  @media (max-width: 768px) {
    img {
      width: 170px;
    }
  }
`;
export const LeftItems = styled.div`
  display: flex;
  align-items: center;
  gap: 48px;
`;
export const RightItems = styled.div`
  display: flex;
  align-items: center;
  gap: 35px;

  .gs-btn {
    all: unset;
    display: flex;
    align-items: center;
    font-weight: 600;
    gap: 10px;
    cursor: pointer;
  }

  .lightbtn {
    padding: 10px 18px;
    background-color: #d8dbfb;
    color: #6f47eb;
    border-radius: 8px;
  }
  .darkbtn {
    padding: 10px 18px;
    background-color: #6f47eb;
    color: #ffffff;
    border-radius: 8px;
  }
  @media (max-width: 999px) {
    display: none;
  }
`;
export const NavItems = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  [active="true"] {
    color: #000;
    border-bottom: 2px solid #000;
  }

  @media (max-width: 999px) {
    position: absolute;
    top: 70px;
    background: #fff;
    width: 100%;
    left: 0;
    flex-direction: column;
    z-index: 7;
    align-items: baseline;
    gap: 10px;
    padding: 20px 0;

    a {
      display: block;
      padding: 15px 20px;
      font-size: 18px;
      width: 100%;
    }

    &::after {
      content: "";
      width: 100%;
      height: 70vh;
    }
  }
`;

export const NavItem = styled(Link)<{ active: string }>`
  color: ${props => props.theme.navLink};
  text-transform: capitalize;
  border-bottom: 2px solid transparent;
  transition: all 300ms ease-out;
  font-size: 18px;
  padding: 7px 8px;
  font-weight: 400;
`;

export const NavButton = styled(Link)`
  background-color: ${props => props.theme.linkColor};
  color: ${props => props.theme.darkBackground};
  color: #fff;
  background-color: #4f0fff;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  text-transform: capitalize;
  border-radius: 10px;
  transition: all 300ms ease-out;
  border: 2px solid transparent;

  &:hover {
    background-color: ${props => props.theme.darkBackground};
    color: ${props => props.theme.linkColor};
    /* border: 2px solid; */
  }
`;
export const Profile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  align-items: center;
  text-transform: capitalize;
  position: relative;

  span {
    color: white;
    font-size: 12px;
  }

  img {
    width: 40px;
    height: 40px;
  }

  @media (max-width: 999px) {
    display: none;
    * {
      display: none;
    }
  }
`;

export const ProfileModel = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  border-radius: 6px;
  background-color: #fff;
  width: 150px;
  overflow: hidden;
  z-index: 10;

  button {
    font-weight: 600;
    text-transform: capitalize;
    padding: 8px 16px;
    width: 100%;
    text-align: left;
    border: none;
    background-color: transparent;
    cursor: pointer;
    transition: all 200ms ease-out;

    &:hover {
      background-color: ${props => props.theme.primaryColor};
      color: ${props => props.theme.linkColor};
    }
  }
`;
