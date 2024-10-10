import { Switch } from "socialwell-design";
import styled from "styled-components";

export const SwitchOption = ({
  name,
  isChecked,
  onChange,
  helpText,
}: {
  name: string;
  isChecked: boolean;
  helpText?: string;
  onChange: (o: any) => void;
}) => {
  return (
    <SwitchWrapper title={helpText && helpText}>
      <div className="switch">
        <Switch
          isChecked={isChecked}
          // value={isChecked}
          onChange={onChange}
          size="md"
          label="3"
        />
      </div>
      <div className="name">{name}</div>
    </SwitchWrapper>
  );
};

export default SwitchOption;

const SwitchWrapper = styled.div`
  display: flex;
  /* justify-content: space-between; */
  gap: 10px;
  align-items: center;
  margin-block: 16px;
`;
