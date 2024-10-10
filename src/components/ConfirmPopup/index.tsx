import useKeyPress from "@/hooks/useKeyPress";
import { GrClose } from "react-icons/gr";
import { Button, Flex } from "socialwell-design";
import styled from "styled-components";

interface props {
  onClose: () => void;
  onConfirm: () => void;

  title?: string;
  description?: string;
}

export default function confirmPopup({
  onClose,
  onConfirm,
  description = "",
  title = "",
}: props) {
  useKeyPress("Escape", onClose);

  return (
    <PopUp>
      <div
        data-animate="slideUp"
        className="cont popup-opened"
        onClick={e => e.stopPropagation()}
      >
        <Flex
          alignItems="center"
          justifyContent="space-between"
          className="header"
        >
          <h3>{title}</h3>
          <span onClick={onClose}>
            <GrClose />
          </span>
        </Flex>

        <p>{description}</p>
        <Flex className="cta" justifyContent="flex-end">
          <Button name="No" type="button" variant="outline" onClick={onClose} />
          <Button
            name="Yes"
            type="button"
            variant="solid"
            onClick={onConfirm}
          />
        </Flex>
      </div>
    </PopUp>
  );
}

const PopUp = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;

  .cont {
    max-width: 500px;
    background-color: #fff;
    border-radius: 10px;
    padding: 30px 20px 20px;
    width: 96%;

    .header {
      margin-bottom: 30px;

      span {
        cursor: pointer;
        padding: 8px 10px;
        display: flex;
        transition: all 0.3s;
        border-radius: 5px;
        align-items: center;

        :hover {
          background-color: lightgrey;
        }
      }

      h3 {
        margin-bottom: 0;
        font-size: 22px;
        font-weight: 600;
      }
    }
    p {
      text-align: left;
      font-size: 18px;
      font-weight: 500;
      color: #353c3c;
    }

    .cta {
      margin-top: 60px;

      button {
        width: auto;

        :last-child {
          background-color: #d00000;
        }
      }
    }
  }
`;
