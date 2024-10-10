import Head from "next/head";
import { PricingContainer, PricingWrapper } from "./styles";

import { plans } from "@/constant/plans";
import { Flex, Typography } from "socialwell-design";
import PricingCard from "./components/PricingCard";

export default function Index() {
  return (
    <PricingContainer>
      <Head>
        <title>Pricing</title>
      </Head>
      <PricingWrapper>
        <h1 className="page__title">Pricing</h1>

        <Typography
          content="Choose the Perfect Plan for Your Survey Needs"
          as="h2"
        />

        <Typography
          content="At Survey App, we understand the importance of gathering insightful data and making informed decisions. Our Survey App is designed to streamline the survey creation process, collect valuable responses, and provide you with comprehensive analysis tools. Whether you're conducting market research, customer satisfaction surveys, or employee feedback, we have the perfect plan to meet your needs."
          as="p"
        />
        <Flex justifyContent="space-between" className="cards">
          {plans.map((plan, index) => {
            return (
              <PricingCard
                description={plan?.desc}
                features={plan?.features}
                name={plan?.name}
                pricing={plan?.amount}
                tagline={plan?.tagLine}
                key={index}
              />
            );
          })}
        </Flex>
      </PricingWrapper>
    </PricingContainer>
  );
}
