import { CloseIcon } from "@/assets";
import useKeyPress from "@/hooks/useKeyPress";
import { CloseButton, Flex } from "socialwell-design";
import {
  Button,
  ModelWrapper,
  Overlay,
  SurveyModelContainer,
  Title,
} from "./styles";

const LinkModal = ({
  handleClose,
  title,
  onConfirm,
}: {
  handleClose: () => void;
  refresh?: () => void;
  title?: string;
  onConfirm: () => void;
}) => {
  useKeyPress("Escape", () => {
    handleClose();
  });

  return (
    <SurveyModelContainer>
      <Overlay onClick={handleClose} />
      <ModelWrapper data-animate="opacity">
        <div className="close-btn">
          <CloseButton onClick={handleClose} icon={<CloseIcon />} />
        </div>
        <Title>{title ?? "Are You Sure ?"}</Title>

        <Flex className="btn-group" justifyContent="center">
          <Button onClick={handleClose} type="button">
            No
          </Button>
          <Button onClick={onConfirm} type="button">
            Yes
          </Button>
        </Flex>
      </ModelWrapper>
    </SurveyModelContainer>
  );
};

export default LinkModal;
