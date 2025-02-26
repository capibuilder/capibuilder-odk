import React from "react";
import styled from "styled-components";

const SectionWrapper = styled.section`
  width: 100%;
  justify-content: center;
  display: flex;
`;

const SolutionsSection = styled.section`
  width: 80%;
  flex-direction: column;
  text-align: center;
  display: flex;
`;

const SolutionHeading = styled.h3`
  font-size: 48px;
  font-weight: 600;
`;

const SolutionText = styled.p`
  color: #5e5d60;
  font-size: 20px;
  font-family: Poppins;
  line-height: 30px;
`;

const FlexWrapper = styled.div`
  justify-content: center;
  display: flex;
  gap: 60px;
  margin: 20px 0px;
`;

const FlexItem = styled.p`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: auto;
  gap: 10px;
`;

const SolutionImage = styled.svg`
  position: absolute;
  right: 0;
  top: 1720px;
`;

const SolutionComponent: React.FC = () => {
  return (
    <SectionWrapper>
      <SolutionsSection>
        <SolutionHeading>
          Complete data collection solution for nonprofits
        </SolutionHeading>
        <SolutionText>
          Whether you host the CAPIBuilder in your server or use our cloud,
          CAPIBuilder enables you to improve data quality and lets you deploy
          forms faster.
        </SolutionText>
        <FlexWrapper>
          <FlexItem>
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="17" cy="17" r="17" fill="#D8DBFB" />
              <path
                d="M13.3333 21.5833C13.5931 21.5833 13.8109 21.4953 13.9869 21.3193C14.1629 21.1433 14.2506 20.9258 14.25 20.6667V16.0833C14.25 15.8236 14.162 15.6058 13.986 15.4298C13.81 15.2538 13.5924 15.1661 13.3333 15.1667C13.0736 15.1667 12.8558 15.2547 12.6798 15.4307C12.5038 15.6067 12.4161 15.8242 12.4167 16.0833V20.6667C12.4167 20.9264 12.5047 21.1443 12.6807 21.3203C12.8567 21.4963 13.0742 21.5839 13.3333 21.5833ZM17 21.5833C17.2597 21.5833 17.4776 21.4953 17.6536 21.3193C17.8296 21.1433 17.9173 20.9258 17.9167 20.6667V13.3333C17.9167 13.0736 17.8287 12.8558 17.6527 12.6798C17.4767 12.5038 17.2591 12.4161 17 12.4167C16.7403 12.4167 16.5224 12.5047 16.3464 12.6807C16.1704 12.8567 16.0827 13.0742 16.0833 13.3333V20.6667C16.0833 20.9264 16.1713 21.1443 16.3473 21.3203C16.5233 21.4963 16.7409 21.5839 17 21.5833ZM20.6667 21.5833C20.9264 21.5833 21.1443 21.4953 21.3203 21.3193C21.4963 21.1433 21.5839 20.9258 21.5833 20.6667V18.8333C21.5833 18.5736 21.4953 18.3558 21.3193 18.1798C21.1433 18.0038 20.9258 17.9161 20.6667 17.9167C20.4069 17.9167 20.1891 18.0047 20.0131 18.1807C19.8371 18.3567 19.7494 18.5742 19.75 18.8333V20.6667C19.75 20.9264 19.838 21.1443 20.014 21.3203C20.19 21.4963 20.4076 21.5839 20.6667 21.5833ZM10.5833 25.25C10.0792 25.25 9.64742 25.0703 9.28808 24.711C8.92875 24.3517 8.74939 23.9202 8.75 23.4167V10.5833C8.75 10.0792 8.92967 9.64742 9.289 9.28808C9.64833 8.92875 10.0798 8.74939 10.5833 8.75H23.4167C23.9208 8.75 24.3526 8.92967 24.7119 9.289C25.0713 9.64833 25.2506 10.0798 25.25 10.5833V23.4167C25.25 23.9208 25.0703 24.3526 24.711 24.7119C24.3517 25.0713 23.9202 25.2506 23.4167 25.25H10.5833ZM10.5833 23.4167H23.4167V10.5833H10.5833V23.4167Z"
                fill="#6F47EB"
              />
            </svg>
            Cloud
          </FlexItem>
          <FlexItem>
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="17" cy="17" r="17" fill="#D8DBFB" />
              <path
                d="M16.505 25.1088C13.7452 24.2534 11.4328 22.3464 10.0674 19.7999C8.70211 17.2535 8.39352 14.2721 9.20833 11.5C12.0642 11.6307 14.8588 10.6444 17 8.75C19.1412 10.6444 21.9358 11.6307 24.7917 11.5C25.4138 13.6167 25.385 15.8715 24.7092 17.9717M19.75 23.4167L21.5833 25.25L25.25 21.5833"
                stroke="#6F47EB"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Slef-hosted
          </FlexItem>
          <FlexItem>
            <svg
              width="34"
              height="34"
              viewBox="0 0 34 34"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="17" cy="17" r="17" fill="#D8DBFB" />
              <g clipPath="url(#clip0_14_187)">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M20.1882 25.5965C21.9429 24.945 23.4563 23.7722 24.525 22.2355C25.5937 20.6988 26.1666 18.8718 26.1667 17C26.1667 11.9373 22.0628 7.83337 17 7.83337C11.9373 7.83337 7.83333 11.9373 7.83333 17C7.83333 22.0628 11.9373 26.1667 17 26.1667C17.9909 26.1678 18.9753 26.0081 19.915 25.6937C20.0106 25.676 20.1028 25.6432 20.1882 25.5965ZM17 9.66671C15.5262 9.6644 14.0862 10.1083 12.8695 10.94C12.8732 10.973 12.875 11.0069 12.875 11.0417V14.2684C12.8748 14.4647 12.9377 14.6559 13.0544 14.8139C13.1711 14.9718 13.3353 15.0881 13.5231 15.1456L14.7065 15.5068L14.5461 14.5461C14.4308 13.8546 14.584 13.1451 14.9743 12.5628C15.3647 11.9804 15.9627 11.5691 16.6462 11.413L17.0138 11.3295C17.1862 11.2901 17.3436 11.2016 17.4669 11.0748C17.5902 10.9479 17.6741 10.7881 17.7086 10.6145L17.8883 9.71987C17.5935 9.68437 17.2969 9.66662 17 9.66671ZM11.0417 14.2684V12.7238C10.1738 13.9321 9.69405 15.3758 9.66598 16.8632C9.63791 18.3506 10.0629 19.8114 10.8845 21.0516C11.7061 22.2919 12.8855 23.2529 14.2661 23.8071C15.6467 24.3613 17.1632 24.4825 18.6143 24.1546L18.0826 22.292C18.0396 22.1422 17.9591 22.006 17.8488 21.896L16.714 20.7602C16.5772 20.6235 16.4708 20.4595 16.4017 20.2789C16.3327 20.0983 16.3024 19.9051 16.3131 19.712C16.3237 19.5189 16.375 19.3302 16.4635 19.1583C16.552 18.9864 16.6758 18.8351 16.8268 18.7142L18.2613 17.5675C18.5348 17.3487 18.8653 17.2128 19.2136 17.1759C19.5619 17.139 19.9134 17.2027 20.2267 17.3594L21.5742 18.0331C21.979 18.2356 22.3277 18.5349 22.5891 18.9044C22.8506 19.274 23.0168 19.7024 23.0729 20.1515L23.1738 20.9591C23.7595 20.0453 24.1352 19.0128 24.2737 17.9362C24.4122 16.8596 24.3101 15.7657 23.9747 14.7334C23.6393 13.701 23.0789 12.756 22.3341 11.9664C21.5893 11.1767 20.6785 10.5623 19.6675 10.1672L19.5062 10.9748C19.4022 11.4946 19.1502 11.9732 18.7805 12.3531C18.4109 12.733 17.9393 12.998 17.4226 13.1161L17.055 13.2005C16.827 13.2524 16.6275 13.3896 16.4973 13.5839C16.3671 13.7781 16.3161 14.0148 16.3547 14.2455L16.5151 15.2061C16.5662 15.5141 16.5378 15.8299 16.4327 16.1238C16.3276 16.4177 16.1491 16.6799 15.9143 16.8856C15.6795 17.0912 15.396 17.2335 15.0908 17.2989C14.7856 17.3643 14.4687 17.3508 14.1703 17.2595L12.9878 16.8983C12.4245 16.7261 11.9314 16.3777 11.5811 15.9042C11.2307 15.4308 11.0417 14.8573 11.0417 14.2684ZM21.5503 22.7512C21.1744 23.0493 20.77 23.3097 20.3431 23.5285L19.8453 21.7887C19.7171 21.3391 19.4764 20.9296 19.1459 20.5989L18.3723 19.8261L19.4063 18.9993L20.7537 19.673C20.8888 19.7404 21.0052 19.8401 21.0925 19.9632C21.1798 20.0863 21.2354 20.2291 21.2543 20.3789L21.5503 22.7512Z"
                  fill="#6F47EB"
                />
              </g>
              <defs>
                <clipPath id="clip0_14_187">
                  <rect
                    width="22"
                    height="22"
                    fill="white"
                    transform="translate(6 6)"
                  />
                </clipPath>
              </defs>
            </svg>
            Open Source
          </FlexItem>
        </FlexWrapper>
        <SolutionImage
          width="92"
          height="463"
          viewBox="0 0 92 463"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="-11"
            y="231.538"
            width="343"
            height="343"
            rx="27"
            transform="rotate(-45 -11 231.538)"
            fill="#EFF0FC"
          />
        </SolutionImage>
      </SolutionsSection>
    </SectionWrapper>
  );
};

export default SolutionComponent;
