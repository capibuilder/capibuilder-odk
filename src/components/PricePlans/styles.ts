import styled from "styled-components";

export const Wrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 80px 0px;
`;

export const TabSec = styled.div`
  border: 1px solid #e4e4e4;
  padding: 8px;
  border-radius: 8px;
  height: 53px;
  width: 276px;
  display: flex;
  gap: 13px;
  align-items: center;
`;

interface TabItemProps {
  active: boolean;
}

export const TabItem = styled.span<TabItemProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 37px;
  padding: 6px 9px;
  border-radius: 8px;
  font-family: Inter;
  font-weight: 500;
  width: 119px;
  font-size: 14px;
  color: ${props => (props.active ? "white" : "#000000")};
  background-color: ${props => (props.active ? "#6f47eb" : "transparent")};
  cursor: pointer;
  border: ${props => (props.active ? "1px solid #000000" : "none")};
  box-shadow: ${props => (props.active ? "0px 0px 0px 4px #0000000a" : "none")};
`;

export const PlanSection = styled.section`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 80px 0px;
`;

export const PlanContainer = styled.div`
  display: flex;
  gap: 50px;
  width: 100%;
  justify-content: center;
`;

export const PricePlansContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 60px 24px;
  box-sizing: border-box;
  width: 338px;
  height: 576px;
  border-radius: 10px;
  box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.06);
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.1);
    transform: scale(1.02);
  }
`;

export const PriceTopHeader = styled.div`
  display: flex;
  flex-direction: column;
`;

export const PlanType = styled.h3`
  font-family: Poppins;
  font-weight: 400;
  font-size: 24px;
  line-height: 28px;
`;

export const Cost = styled.h2`
  font-family: Inter;
  font-weight: 500;
  font-size: 32px;
`;

export const OptionalText = styled.p`
  font-family: Inter;
  font-weight: 500;
  font-size: 12px;
  line-height: 16.8px;
`;

export const SmallHeader = styled.h2`
  font-family: Poppins;
  font-size: 20px;
  font-weight: 400;
  margin: 20px 0px;
`;

export const InnerPoints = styled.div`
  padding-left: 0;
  margin-left: 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-family: Poppins;
  line-height: 18px;
  font-size: 12px;
  font-weight: 400;
  gap: 3px;
  margin-bottom: 10px;

  svg {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
  }

  span {
    flex-grow: 1;
    word-wrap: break-word;
  }
`;

export const ButtonHolder = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: flex-start;
`;

export const WhiteButton = styled.button`
  height: 40px;
  width: fit-content;
  border-radius: 4px;
  border: 2px solid rgba(111, 71, 235, 1);
  padding: 6px 12px;
  background-color: #ffffff;
  transition: background-color 0.3s ease, color 0.3s ease;
  cursor: pointer;
  margin-top: 20px;
  &:hover {
    background-color: rgba(111, 71, 235, 1);
    color: #ffffff;
  }
`;

export const ColoredButton = styled.button`
  height: 40px;
  width: fit-content;
  border-radius: 4px;
  border: none;
  padding: 8px 18px;
  background-color: #6f47eb;
  cursor: pointer;
  color: #fff;
  transition: background-color 0.3s ease, transform 0.3s ease;
  margin-top: 20px;
  &:hover {
    background-color: #ffffff;
    color: #000000;
    transform: scale(1.05);
    border: 2px solid rgba(111, 71, 235, 1);
  }
`;
