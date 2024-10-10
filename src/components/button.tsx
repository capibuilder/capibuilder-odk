import { ButtonProps, Button as ButtonWrapper } from "socialwell-design";

export const Button = ({
  name,
  type,
  onClick,
}: {
  name: string;
  type: ButtonProps["type"];
  onClick: ButtonProps["onClick"];
}) => {
  return (
    <ButtonWrapper
      name={name}
      type={type}
      variant="outline"
      onClick={onClick}
    />
  );
};

const PrimaryButton = ({
  name,
  type,
  onClick,
  disabled,
}: {
  name: string;
  type: ButtonProps["type"];
  onClick: ButtonProps["onClick"];
  disabled?: boolean;
}) => {
  return (
    <ButtonWrapper
      name={name}
      variant="custom"
      type={type}
      backgroundColor="#A84787"
      borderWidth={2}
      color="#fff"
      paddingBlock={10}
      paddingInline={20}
      onClick={onClick}
      disabled={disabled}
    />
  );
};
const SecondaryButton = ({
  name,
  type,
  onClick,
}: {
  name: string;
  type: ButtonProps["type"];
  onClick: ButtonProps["onClick"];
}) => {
  return (
    <ButtonWrapper
      name={name}
      variant="custom"
      type={type}
      backgroundColor="#fff"
      borderWidth={2}
      color="#A84787"
      paddingBlock={10}
      paddingInline={20}
      onClick={onClick}
    />
  );
};

Button.Primary = PrimaryButton;
Button.Secondary = SecondaryButton;
