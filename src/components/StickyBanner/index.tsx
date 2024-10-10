import React, { useState } from "react";
import {
  StickyBannerWrapper,
  BannerContent,
  BannerText,
  CrossButton,
} from "./styles";

const StickyBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <StickyBannerWrapper>
          <BannerContent>
            <BannerText>
              One-click deployments in your preferred cloud coming soon |
              Announcements →
            </BannerText>
          </BannerContent>
          <CrossButton
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleClose}
            viewBox="0 0 20 20"
            fill="none"
          >
            <path
              d="M10 16.6667C6.32502 16.6667 3.33335 13.675 3.33335 9.99999C3.33335 6.32499 6.32502 3.33332 10 3.33332C13.675 3.33332 16.6667 6.32499 16.6667 9.99999C16.6667 13.675 13.675 16.6667 10 16.6667ZM10 1.66666C5.39169 1.66666 1.66669 5.39166 1.66669 9.99999C1.66669 14.6083 5.39169 18.3333 10 18.3333C14.6084 18.3333 18.3334 14.6083 18.3334 9.99999C18.3334 5.39166 14.6084 1.66666 10 1.66666ZM12.1584 6.66666L10 8.82499L7.84169 6.66666L6.66669 7.84166L8.82502 9.99999L6.66669 12.1583L7.84169 13.3333L10 11.175L12.1584 13.3333L13.3334 12.1583L11.175 9.99999L13.3334 7.84166L12.1584 6.66666Z"
              fill="white"
            />
          </CrossButton>
        </StickyBannerWrapper>
      )}
    </>
  );
};

export default StickyBanner;
