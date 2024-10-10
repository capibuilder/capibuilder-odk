import { theme } from "@/styles/globals";
import { Button } from "socialwell-design";

const PrimaryButton = ({
  name,
  onClick,
  loading,
  secondary,
  ghost,
}: {
  name: string;
  onClick: () => void;
  loading?: boolean;
  secondary?: boolean;
  ghost?: boolean;
}) => {
  return (
    <Button
      variant="custom"
      backgroundColor={secondary || ghost ? "transparent" : theme.primaryColor}
      color={
        secondary
          ? theme.primaryColor
          : ghost
          ? theme.primaryColor
          : theme.linkColor
      }
      borderWidth={secondary ? 2 : 0}
      paddingBlock={10}
      paddingInline={20}
      name={name}
      type="button"
      onClick={onClick}
      loading={loading}
      loadingIconColor={theme.primaryColor}
      loadingIconSize="20"
    />
  );
};

export default PrimaryButton;
