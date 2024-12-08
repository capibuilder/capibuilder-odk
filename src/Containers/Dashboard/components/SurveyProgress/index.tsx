import {
  CloseIcon,
  DesignIcon,
  GraphIcon,
  SendIcon,
  ShareIcon,
  TickIcon,
} from "@/assets";
import {
  CloseButton,
  Icon,
  Name,
  ProgressContainer,
  ProgressItem,
  ProgressItems,
  Wrapper,
} from "./styles";

const progressItems = [
  {
    icon: TickIcon,
    name: "Create an account",
    link: "/",
  },
  {
    icon: DesignIcon,
    name: "Design a survey",
    link: "/",
  },
  {
    icon: SendIcon,
    name: "Send a survey",
    link: "/",
  },
  {
    icon: GraphIcon,
    name: "Analyse  responses",
    link: "/",
  },
  {
    icon: ShareIcon,
    name: "Share survey",
    link: "/",
  },
];

const SurveyProgress = ({ setShowProgress }: any) => {
  return (
    <ProgressContainer>
      <Wrapper>
        <CloseButton onClick={() => setShowProgress(false)}>
          <CloseIcon size="36" />
        </CloseButton>
        <ProgressItems>
          {progressItems.map((item, index) => (
            <ProgressItem href={item.link} key={index}>
              <Icon active={index === 0}>
                <item.icon />
              </Icon>
              <Name>{item.name}</Name>
            </ProgressItem>
          ))}
        </ProgressItems>
      </Wrapper>
    </ProgressContainer>
  );
};

export default SurveyProgress;
