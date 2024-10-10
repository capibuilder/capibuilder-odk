import { WrapHeader, WrapPoints } from "@/Containers/DataCollection/style";
import {
  PricePlansContainer,
  PriceTopHeader,
  PlanType,
  Cost,
  OptionalText,
  SmallHeader,
  InnerPoints,
  ButtonHolder,
  WhiteButton,
  ColoredButton,
} from "./styles";

export interface plansType {
  plantype: string;
  cost: string;
  Optionaltext?: string;
  data: data;
  buttonText: string;
  colored?: boolean;
}

export interface data {
  header: string;
  smallHeader: string;
  points: string[];
}

const PricePlans = ({
  buttonText,
  plantype,
  cost,
  colored,
  Optionaltext,
  data,
}: plansType) => {
  return (
    <PricePlansContainer>
      <PriceTopHeader>
        <PlanType>{plantype}</PlanType>
        <Cost>${cost}</Cost>
        <OptionalText>{Optionaltext}</OptionalText>
      </PriceTopHeader>
      <Wrapper
        header={data.header}
        smallHeader={data.smallHeader}
        points={data.points}
      />
      <ButtonHolder>
        {colored ? (
          <ColoredButton>{buttonText}</ColoredButton>
        ) : (
          <WhiteButton>{buttonText}</WhiteButton>
        )}
      </ButtonHolder>
    </PricePlansContainer>
  );
};

export default PricePlans;

const Wrapper = ({ header, smallHeader, points }: data) => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <WrapHeader>{header}</WrapHeader>
      <SmallHeader>{smallHeader}</SmallHeader>
      <WrapPoints>
        {points.map(point => (
          <InnerPoints key={point}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="4" y="4" width="12" height="12" rx="2" fill="#939393" />
              <path
                d="M7 9.30769L9.1 12L13 7"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {point}
          </InnerPoints>
        ))}
      </WrapPoints>
    </div>
  );
};
