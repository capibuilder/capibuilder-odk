import { useState } from "react";
import PricePlans from ".";
import { TabSec, TabItem, Wrapper, PlanSection, PlanContainer } from "./styles";

type BillingType = "monthly" | "annually";

interface PricingData {
  free: string;
  standard: string;
  premium: string;
}

const PriceWrapper = () => {
  const [billingType, setBillingType] = useState<BillingType>("annually");

  const pricingData: { [key in BillingType]: PricingData } = {
    monthly: {
      free: "0",
      standard: "259",
      premium: "859",
    },
    annually: {
      free: "0",
      standard: "199",
      premium: "599",
    },
  };

  const handleBillingChange = (type: BillingType) => {
    setBillingType(type);
  };

  return (
    <Wrapper>
      <TabSec>
        <TabItem
          active={billingType === "monthly"}
          onClick={() => handleBillingChange("monthly")}
        >
          Billed Monthly
        </TabItem>
        <TabItem
          active={billingType === "annually"}
          onClick={() => handleBillingChange("annually")}
        >
          Billed Annually
        </TabItem>
      </TabSec>
      <PlanSection>
        <PlanContainer>
          <PricePlans
            plantype="Free"
            buttonText="Start now"
            cost={pricingData[billingType].free}
            Optionaltext=""
            data={Data[0]}
          />
          <PricePlans
            plantype="Standard"
            buttonText="Start 14 day trial"
            cost={pricingData[billingType].standard}
            colored
            Optionaltext={
              billingType === "annually" ? " billed annually" : "per month"
            }
            data={Data[1]}
          />
          <PricePlans
            plantype="Premium"
            buttonText="Start 14 day trial"
            cost={pricingData[billingType].premium}
            Optionaltext={
              billingType === "annually" ? "billed annually" : "per month"
            }
            data={Data[2]}
          />
        </PlanContainer>
      </PlanSection>
    </Wrapper>
  );
};

export default PriceWrapper;

const Data = [
  {
    header: "For individuals and teams getting started.",
    smallHeader: "Includes",
    points: [
      "Single project with up to 2 forms",
      "Form translation in up to 1 major language",
      "Limited data submissions every month",
      "Review and export of data submissions",
    ],
  },
  {
    header: "For growing nonprofits and study teams.",
    smallHeader: "Everything in Free, plus",
    points: [
      "Unlimited users and roles",
      "Unlimited projects, forms, and translations",
      "Unlimited form translations in all major languages.",
      "Daily transfer of database backup to server/Google Drive/One Drive.",
      "Priority support",
    ],
  },
  {
    header: "For large nonprofits and firms.",
    smallHeader: "Everything in Standard, plus",
    points: [
      "Custom domain with SSO integration.",
      "Separate database and API for analytics application.",
      "Daily transfer of database backup to server/Google Drive/One Drive.",
      "Less than 4 hours support",
    ],
  },
];
