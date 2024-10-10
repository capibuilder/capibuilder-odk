import { TitleStub } from "@/styles/globals";
import styled from "styled-components";

export const TemplateContent = styled.section`
  margin-top: 80px;
`;

export const TemplateWrapper = styled.div`
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled(TitleStub)`
  text-transform: capitalize;
`;

export const TemplateCards = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  padding-inline: 24px;
  gap: 24px;
  padding-bottom: 24px;
`;

export const TemplateCard = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;
  background-color: ${props => props.theme.linkColor};
  border-radius: 8px;
  position: relative;
  cursor: pointer;
  color: black;

  .template-card__overlay {
    width: 100%;
    height: 100%;
    position: absolute;
    border-radius: 8px;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.7);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease-in-out;

    &__button {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      background-color: ${props => props.theme.primaryColor};
      color: ${props => props.theme.linkColor};
      border: none;
      padding: 10px 15px;
      border-radius: 10px;
      text-transform: capitalize;
    }
  }

  &:hover .template-card__overlay {
    opacity: 1;
    /* pointer-events: none; */
  }

  .template-card__image {
    margin-bottom: 16px;

    img {
      width: 100%;
      height: 250px;
      border-radius: 8px;
      object-fit: cover;
    }
  }

  .template-card__content {
    display: flex;
    flex-direction: column;
    gap: 8px;

    p {
      font-size: 0.8rem;
      text-transform: capitalize;
    }

    &__avatar {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
`;
