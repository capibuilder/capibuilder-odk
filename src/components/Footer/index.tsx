import React from "react";
import Link from "next/link";
import {
  FooterWrapper,
  FooterInner,
  LogoBanner,
  FooterLogo,
  FooterItems,
  FooterContainer,
  FooterContent,
  FooterLinks,
  FooterTitle,
  GridItems,
  BorderThingy,
  TextLogo,
  LogoLeft,
  List,
  ListItem,
  ItemLink,
} from "./styles";

export default function Index() {
  return (
    <FooterWrapper>
      <FooterInner>
        <LogoBanner>
          <FooterLogo>
            <TextLogo>
              <LogoLeft>CAPI</LogoLeft>Builder
            </TextLogo>
          </FooterLogo>
          <p>Form builder for nonprofit data collection using ODK</p>
        </LogoBanner>
        <FooterItems>
          <FooterItem
            title="Products"
            items={[
              { name: "CAPIBuilder", link: "/" },
              { name: "Tags", link: "/" },
              { name: "Templates", link: "/" },
            ]}
          />
          <FooterItem
            title="Support"
            items={[
              { name: "From design", link: "/" },
              { name: "Webinars", link: "/" },
              { name: "Contact us", link: "/" },
              { name: "Expert", link: "/" },
            ]}
          />
          <FooterItem
            title="Resources"
            items={[
              { name: "Community", link: "/" },
              { name: "Affiliates", link: "/" },
              { name: "Partnerships", link: "/" },
              { name: "API docs", link: "/" },
            ]}
          />
          <FooterItem
            title="Company"
            items={[
              { name: "About us", link: "/" },
              { name: "Blog", link: "/" },
            ]}
          />
        </FooterItems>
      </FooterInner>
      <BorderThingy />
      <FooterContainer>
        <FooterContent>
          &copy; {new Date().getFullYear()} SocialWell
        </FooterContent>
        <FooterLinks>
          <p>Privacy</p>
          <p>Terms</p>
        </FooterLinks>
      </FooterContainer>
    </FooterWrapper>
  );
}

const FooterItem = ({ title, items }) => (
  <GridItems>
    <FooterTitle>{title}</FooterTitle>
    <List>
      {items.map((item, index) => (
        <ListItem key={index}>
          <Link href={item.link} passHref>
            <ItemLink>{item.name}</ItemLink>
          </Link>
        </ListItem>
      ))}
    </List>
  </GridItems>
);
