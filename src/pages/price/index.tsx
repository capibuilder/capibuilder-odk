import Accordion from "@/components/Accordion";
import PriceHero from "@/components/DemoSection/PriceDemo";
import PriceWrapper from "@/components/PricePlans/Wrapper";
import TableContainer from "@/Containers/TableContainer";

const Pricing = () => {
  return (
    <div>
      <PriceHero />
      <PriceWrapper />
      <TableContainer />
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          margin: "60px 0px",
        }}
      >
        <div style={{ width: "80%" }}>
          <Accordion />
        </div>
      </div>
    </div>
  );
};

export default Pricing;
