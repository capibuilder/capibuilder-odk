import { ReactNode } from "react";
import {
  PanelContainer,
  PanelHeader,
  PanelTitle,
  PanelIcon,
  PanelContent,
} from "./styles";

interface PanelProps {
  title: string;
  children: ReactNode;
  isActive: boolean;
  onShow: () => void;
}

const Panel = ({ title, children, isActive, onShow }: PanelProps) => {
  return (
    <PanelContainer isActive={isActive}>
      <PanelHeader onClick={onShow}>
        <PanelTitle>{title}</PanelTitle>
        <PanelIcon isActive={isActive}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.5 9L12 16.5L4.5 9"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </PanelIcon>
      </PanelHeader>
      {isActive && <PanelContent>{children}</PanelContent>}
    </PanelContainer>
  );
};

export default Panel;
