import { useState } from "react";
import Panel from "./Panel";
import { FaqContainer, FaqTitle, FaqPanels } from "./styles";

const panelData = [
  {
    title: "Do I need to use CAPIBuilder Cloud?",
    content:
      "No, you don't need to use CAPIBuilder cloud. If you are comfortable in deploying the ODK Central as the backend service and CAPIBuilder as the frontend in your own server, you can avail most of the CAPIBuilder features.",
  },
  {
    title: "Which pricing plan is right for me?",
    content:
      "CAPIBuilder comes with 3 plans - Free, Standard, and Premium. If you are a researcher or a community nonprofit, you can continue using the Free plan.If you are implementing a project, Standard plan will be the right for you to meet the requirements of the funding agencies and partners. However, if you are implementing multiple projects in a year, you should consider using Premium to ensure complex requirements from the funding agencies, ensure data quality, and comply with the data privacy laws.",
  },
  {
    title: "How does our pricing work?",
    content:
      "The pricing is available monthly and annually and is payable in advance. For monthly, you will be asked to select the number of months and get the total amount payable. For the annual subscription, you will get the annual quote.",
  },
  {
    title: "What payment methods do you accept?",
    content:
      "Currently, we are accepting payments through international credit and debit cards.",
  },
  {
    title: "Can I change my plan?",
    content:
      "You can upgrade your plan by paying the differential amount while upgrading. However, you shall not be able to downgrade your plan.",
  },
];

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handlePanelClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <FaqContainer>
      <FaqTitle>Frequently Asked Questions</FaqTitle>
      <FaqPanels>
        {panelData.map((panel, index) => (
          <Panel
            key={index}
            title={panel.title}
            isActive={activeIndex === index}
            onShow={() => handlePanelClick(index)}
          >
            {panel.content}
          </Panel>
        ))}
      </FaqPanels>
    </FaqContainer>
  );
};

export default Faq;
