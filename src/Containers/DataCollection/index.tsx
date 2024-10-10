import Wrapper from "./Wrapper";
import styled from "styled-components";

const Section = styled.section`
  margin: auto;
  margin-top: 120px;
  padding: 120px 20px;
  background-color: #eff0fc;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  box-sizing: border-box;
  width: 95%;
`;

const MainHeader = styled.h1`
  font-family: Inter;
  font-size: 48px;
  font-weight: 600;
  line-height: 58px;
`;

const DataCollection = () => {
  return (
    <Section>
      <div style={{ width: "60%", margin: "0 auto", textAlign: "center" }}>
        <MainHeader>
          Get the forms right first. Data collection will fall in place.
        </MainHeader>
        <p>
          Help users discover and understand your product’s value across their
          entire journey, from new user to power user.
        </p>
      </div>
      {Data.map((data, index) => (
        <Wrapper
          key={index}
          header={data.header}
          text={data.text}
          smallHeader={data.smallHeader}
          points={data.points}
        />
      ))}
    </Section>
  );
};

export default DataCollection;

const Data = [
  {
    header: "Forms for data quality",
    text: "Before launching the data collection, iterate the form design.",
    smallHeader: "Youc could iterate",
    points: ["Response logic", "Flow of questions", "Questions and help tips"],
  },
  {
    header: "Tags for data standardization",
    text: "In the age of AI, the tag system lets you to define data points, standardize its usage, and reuse across systems in the organization.",
    smallHeader: "Tags let you do ",
    points: ["Define data", "Reuse across forms", "use across APIs"],
  },
  {
    header: "Review data submissions",
    text: "Review the data submission in easy to manage data tables.",
    smallHeader: "Data table lets you do",
    points: [
      "Review data including attachments",
      "Edit,approve and return submissions",
      "Export data",
    ],
  },
];
