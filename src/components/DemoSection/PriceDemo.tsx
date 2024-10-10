import { HeroWrapper } from "../../Containers/Home/components/Hero/styles";
export default function PriceHero() {
  return (
    <HeroWrapper style={{ height: "312px" }}>
      <div className="inWrap">
        <h1>
          <span style={{ color: "#6F47EB" }}>CAPI</span>Builder Cloud Pricing
        </h1>
        <p className="text">
          Pricing that helps you to deliver your data collection projects.
        </p>
      </div>
    </HeroWrapper>
  );
}
