import styled from "styled-components";
import { TemplatesContainer, TemplatesSidebar } from "../Templates/styles";

export const PreviewContainer = styled(TemplatesContainer)``;
export const PreviewSidebar = styled(TemplatesSidebar)`
  padding-inline: 36px;
  .preview {
    &__go-back__btn {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      gap: 6px;
      text-transform: capitalize;
      margin-bottom: 16px;
      font-weight: 500;
    }

    &__category {
      text-transform: capitalize;
      margin-bottom: 20px;
    }

    &__title {
      font-size: 24px;
      margin-bottom: 16px;
    }

    &__contents {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin-bottom: 36px;

      &__items {
        display: flex;
        justify-content: center;
        font-size: 20px;
        padding: 36px 24px;
        border-radius: 8px;
        box-shadow: 0px 4px 20px 0px #0000001a;
        background-color: #fff;
      }
    }

    &__button {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 16px;
      flex-direction: column;

      /* width: 70%;
      margin: 0 auto; */

      button {
        width: 100%;
        height: 45px;
      }

      &.delete {
        button {
          border: 2px solid #d00000;
          color: #d00000;

          &:hover {
            background-color: #d00000;
            color: #fff;
          }
        }
      }
    }
  }
`;
