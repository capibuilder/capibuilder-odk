import { Footer } from "@/components";
import Hero from "./components/Hero";
import { HeroWrapper } from "./styles";
import DemoComponent from "@/components/DemoSection";
import SolutionComponent from "@/components/Solutions";
import DataCollection from "../DataCollection";
import TemplateContainer from "../TemplateContainer";
import FooterTop from "@/components/Footer/FooterTop";

const Home = () => {
  return (
    <>
      <HeroWrapper>
        <Hero />
        <DemoComponent />
        <SolutionComponent />
        <DataCollection />
        <TemplateContainer />
      </HeroWrapper>
    </>
  );
};

export default Home;

interface feature {
  name: string;
  title: string;
  desc: string;
  img: string;
  headIcon: string;
  rtl: boolean;
}

const Data: feature[] = [
  {
    rtl: false,
    desc: "Our feature-rich form builder with 20+ field types, situation-specific templates, and a simple user interface, helps you create beautiful, functional forms for all your needs. Collect contact information, feedback, or orders with just a few clicks.",
    headIcon: "/assets/svg/create.svg",
    img: "/assets/svg/create-e.svg",
    name: "Create",
    title:
      "Create beautiful, responsive forms without writing a single line of code.",
  },
  {
    rtl: true,
    headIcon: "/assets/svg/share.svg",
    img: "/assets/svg/share-e.svg",
    name: "Share",
    title: "Spread Insights Far and Wide: Share Surveys with a Click!",
    desc: "With just a few clicks, you can distribute your surveys via email, social media, or embed them on your website. Reach your target audience, whether it's customers, colleagues, or participants, and gather meaningful insights that drive informed decision-making. Seamlessly share surveys, streamline data collection, and unlock the power of collective feedback",
  },
  {
    rtl: false,
    headIcon: "/assets/svg/collect.svg",
    img: "/assets/svg/collect-e.svg",
    name: "Collect",
    title:
      "Uncover Insights, One Response at a Time: Effortlessly Collect Survey Data!",
    desc: "From capturing customer feedback to conducting market research, our powerful platform streamlines response collection. Share your survey with ease, track response rates in real-time, and analyse results seamlessly. Accelerate your data-driven decision-making with FormsWell and unlock the power of actionable insights!",
  },
  {
    rtl: true,
    headIcon: "/assets/svg/analyze.svg",
    img: "/assets/svg/analyze-e.svg",
    name: "Analyze",
    title:
      "Decode the Data: Unlock Actionable Insights with Advanced Response Analysis!",
    desc: "Discover patterns, identify trends, and gain a holistic understanding of your data with ease. From sentiment analysis to demographic segmentation, FormsWell equips you with the tools to unlock valuable insights and drive success. Transform raw data into actionable intelligence and elevate your decision-making with FormsWell!",
  },
];
