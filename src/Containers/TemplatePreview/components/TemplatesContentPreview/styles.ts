import styled, { css } from "styled-components";

export const TemplatesPreviewWrapper = styled.div`
  padding: 24px;
  .preview__image img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    border-radius: 10px;
  }
`;

export const ContentWrapper = styled.div<{
  hideText: boolean;
}>`
  width: 100%;
  min-height: ${props => (props.hideText ? "0px" : "100px")};
  background-color: #fff;
  margin-top: 16px;
  border-radius: 10px;

  & > * {
    padding: 24px;

    @media screen and (max-width: 768px) {
      padding: 16px;
    }
  }

  .header {
    font-size: 1.3rem;
    font-weight: 500;
    text-align: justify;
    text-transform: capitalize;
    ${props =>
      !props.hideText &&
      css`
        border-bottom: 1px solid ${({ theme }) => theme.lightColor};
      `};
  }
`;
