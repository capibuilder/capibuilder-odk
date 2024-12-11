import styled from "styled-components";
import { Card, PieChart } from ".";

const GetComponents = ({
  component,
  isCurrent,
  column = "2",
  columnId = "",
}: {
  component: any;
  isCurrent?: boolean;
  column?: string;
  columnId?: string;
}) => {
  return (
    <GetComponentsWrapper
      column={column}
      style={{
        border: isCurrent ? "1px solid #000" : "1px solid transparent",
      }}
    >
      {GetComponent(component) ?? (
        <div
          style={{
            display: "flex",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            textTransform: "capitalize",
          }}
        >
          select tag to add component
        </div>
      )}
    </GetComponentsWrapper>
  );
};

export const GetComponent = (component: any) => {
  let temp = null;

  if (!component.tag) return null;

  switch (component.type) {
    case "pie-chart":
      temp = <PieChart component={component} />;
      break;

    case "card":
      temp = <Card component={component} />;
      break;

    default:
      return null;
  }

  return temp;
};

export const getHeight = (column: string) => {
  switch (column) {
    case "1":
      return "400px";
    case "2":
      return "300px";
    case "3":
      return "200px";
    case "4":
      return "180px";
    default:
      return "300px";
  }
};

const GetComponentsWrapper = styled.div<{
  column: string;
}>`
  --height: ${props => getHeight(props.column)};
  min-height: var(--height);
  height: var(--height);
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 5px;
  overflow: hidden;
`;

export default GetComponents;
