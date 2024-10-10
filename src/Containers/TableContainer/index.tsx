import ProductTable from "@/components/Table";
import styled from "styled-components";
import {
  products1,
  products2,
  products3,
  products4,
  products5,
  products6,
  products7,
  products8,
  products9,
  products10,
  products11,
  products12,
} from "./Data";

const SideCircle = styled.svg`
  position: absolute;
  height: 500px;
  width: 240px;
  left: 0px;
  top: -160px;
  z-index: -1;
`;

const SolutionImage = styled.svg`
  position: absolute;
  right: 0;
  bottom: -100px;
`;
const TableContainer = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        margin: "60px 0px",
      }}
    >
      <div
        className="upperTextTableCont"
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "45%",
          transform: "translateX(38%) translateY(20%)",
          fontFamily: "Poppins",
          fontWeight: "700",
        }}
      >
        <h1>Free</h1>
        <h1> Standard</h1>
        <h1>Premium</h1>
      </div>
      <div
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          gap: "15px",
        }}
      >
        <SideCircle
          width="152"
          height="468"
          viewBox="0 0 152 468"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="-82" cy="234" r="194" stroke="#EFF0FC" strokeWidth="80" />
        </SideCircle>
        <ProductTable title="Users and Auth" products={products1} />
        <SolutionImage
          width="92"
          height="463"
          viewBox="0 0 92 463"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="-11"
            y="231.538"
            width="343"
            height="343"
            rx="27"
            transform="rotate(-45 -11 231.538)"
            fill="#EFF0FC"
          />
        </SolutionImage>
      </div>
      <ProductTable title="FORM BUILDER" products={products2} />
      <ProductTable title="DATA SUBMISSION" products={products3} />
      <ProductTable title="FORM TRANSLATIONS" products={products4} />
      <ProductTable title="FORM TEMPLATES" products={products5} />
      <ProductTable title="TAGS" products={products6} />
      <ProductTable title="DATA REVIEW" products={products7} />
      <ProductTable title="GEO SERVICES" products={products8} />
      <ProductTable
        title="COMPLIANCE TO LOCAL DATA PRIVACY LAWS"
        products={products9}
      />
      <ProductTable title="DATA BACKUPS" products={products10} />
      <ProductTable title="CUSTOMIZATION" products={products11} />
      <ProductTable title="ANALYTICS API" products={products12} />
    </div>
  );
};

export default TableContainer;
