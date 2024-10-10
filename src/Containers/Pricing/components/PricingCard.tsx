import { PricingCardWrapper } from "./styles";

interface props {
  name: string;
  tagline: string;
  pricing: string;
  description: string;
  features: string[];
}

export default function PricingCard({
  description,
  features,
  name,
  pricing,
  tagline,
}: props) {
  return (
    <PricingCardWrapper data-animate="opacity">
      <h3>{name}</h3>
      <p>{tagline}</p>
      <span>
        <b>{pricing}</b>
      </span>
      <p>{description}</p>
      <ul>
        {features?.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
    </PricingCardWrapper>
  );
}
