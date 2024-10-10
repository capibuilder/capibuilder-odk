import Head from "next/head";
import { PricingContainer, PricingWrapper } from "./styles";

import { RuppesIcon } from "@/assets";
import { Button } from "@/styles/globals";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function Index() {
  return (
    <PricingContainer>
      <Head>
        <title>Pricing</title>
      </Head>
      <PricingWrapper data-animate="slideUp">
        <div className="head">
          <h1>Simple, transparent pricing</h1>

          <p>
            Experience the Freedom of Our Free Plan: Explore Powerful Features
            at No Cost! <Link href={""}>Free Plan</Link>
          </p>
        </div>

        <div className="pricing__row">
          <div className="details">
            <h2>Team Plan</h2>
            <span>EVERYTHING INCLUDED</span>

            <ul>
              <li>{CheckMark} Unlimited Forms</li>
              <li>{CheckMark} Different User Roles</li>
              <li>{CheckMark} 24x7 Access to Professional Support</li>
              <li>{CheckMark} Unlimited Responses</li>
              <li>{CheckMark} Survey Dashboard</li>
            </ul>
          </div>
          <div className="card">
            <span className="h">One Plan</span>
            <div className="flex">
              <RuppesIcon />
              <div>
                1,550<span className="t">/month/user</span>
              </div>
            </div>
            <p>Starting at 3 users, billed annually</p>
            <Button>
              Get Started <FiArrowRight />
            </Button>
          </div>
        </div>

        <p className="help-text">
          <i>
            For enterprise and/or advanced offline inquiries, please contact
            <a href="mailto:hi@socialwell.net"> hi@socialwell.net</a>
          </i>
        </p>

        <center>
          Everything you need
          <span>Here are some of our most noteworthy features.</span>
        </center>

        <div className="features">
          {data.map(feature => (
            <ul key={feature.name} className="col">
              <h3>{feature.name}</h3>
              {feature.options.map((o: string) => (
                <li key={0}>
                  <svg
                    width="17"
                    height="14"
                    viewBox="0 0 17 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6.49219 12.7578C6.30469 12.9453 6.03906 13.1016 5.80469 13.1016C5.57031 13.1016 5.30469 12.9375 5.10938 12.75L0.734375 8.375L2.125 6.98438L5.8125 10.6719L15.5625 0.851562L16.9297 2.26562L6.49219 12.7578Z"
                      fill="black"
                    />
                  </svg>
                  <span>{o}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>

        {/* <Flex justifyContent="space-between" className="cards">
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
        </Flex> */}
      </PricingWrapper>
    </PricingContainer>
  );
}

const CheckMark = (
  <svg
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 3.75C11.0234 3.75 3.75 11.0234 3.75 20C3.75 28.9766 11.0234 36.25 20 36.25C28.9766 36.25 36.25 28.9766 36.25 20C36.25 11.0234 28.9766 3.75 20 3.75ZM17.4922 25.7578C17.3047 25.9453 17.0391 26.1016 16.8047 26.1016C16.5703 26.1016 16.3047 25.9375 16.1094 25.75L11.7344 21.375L13.125 19.9844L16.8125 23.6719L26.5625 13.8516L27.9297 15.2656L17.4922 25.7578Z"
      fill="#04BE00"
    />
  </svg>
);

const data = [
  {
    name: "Design",
    options: [
      "Web survey desig,",
      "25 question types,",
      "Logic, dependency, calculations,",
      "Cascading dropdown list,",
      "Taxonomy (tags)",
      "Templates",
      "Draft validation",
      "Video survey form",
      "Location dropdown",
    ],
  },
  {
    name: "Management",
    options: [
      "Create Projects",
      "Dashboard",
      "Responses",
      "Roles",
      "Text audit",
      "Audio audit",
    ],
  },
  {
    name: "Data",
    options: [
      "Response pivot table",
      "Data export (excel)",
      "Own database",
      "Data API",
    ],
  },
  {
    name: "Branding",
    options: ["Own domain", "Own branding"],
  },
];
