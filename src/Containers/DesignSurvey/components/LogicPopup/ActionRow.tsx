import useSurveyStore from "@/context/surveyStores";
import { SelectField } from "socialwell-design";
import styled from "styled-components";

const IsOptions = [
  { label: "show", value: "show" },
  { label: "hide", value: "hide" },
  { label: "go", value: "go" },
  { label: "to", value: "to" },
  { label: "add", value: "add" },
  { label: "substract", value: "substract" },
  { label: "divide", value: "divide" },
  { label: "multiply", value: "multiply" },
];

export default function ActionRow() {
  const data = useSurveyStore(state => state.data);

  return (
    <RowW className="w-full">
      <div className="grid">
        <SelectField
          hideClearButton
          value={{
            label: "Show",
            value: "",
          }}
          onChange={() => {}}
          options={IsOptions}
        />
        <SelectField
          hideClearButton
          value={{
            label: "Search fields",
            value: "",
          }}
          onChange={() => {}}
          options={Object.values(data?.fields)?.map((feild: any) => {
            return { value: feild?.label, label: feild?.label };
          })}
        />

        <button className="unset pointer">{plus}</button>
      </div>
    </RowW>
  );
}

const RowW = styled.div`
  .grid {
    display: grid;
    grid-template-columns: 1fr 2fr 0.2fr;
    gap: 20px;
  }

  button {
    margin: auto;
  }

  :not(:first-child) {
    margin-top: 20px;
  }

  div > :has(.caret + .options) {
    background-color: #fff;
    display: flex;
    border-color: #858585;
    border-width: 2px;
    border-radius: 7px;
  }

  div > label {
    display: none;
  }
`;

const plus = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.6 12C18.6 12.33 18.33 12.6 18 12.6H12.6V18C12.6 18.33 12.33 18.6 12 18.6C11.67 18.6 11.4 18.33 11.4 18V12.6H5.99998C5.66998 12.6 5.39998 12.33 5.39998 12C5.39998 11.67 5.66998 11.4 5.99998 11.4H11.4V6.00001C11.4 5.67001 11.67 5.40001 12 5.40001C12.33 5.40001 12.6 5.67001 12.6 6.00001V11.4H18C18.33 11.4 18.6 11.67 18.6 12ZM23.4 12C23.4 18.3 18.3 23.4 12 23.4C5.69998 23.4 0.599976 18.3 0.599976 12C0.599976 5.70001 5.69998 0.600006 12 0.600006C18.3 0.600006 23.4 5.70001 23.4 12ZM22.2 12C22.2 6.36001 17.64 1.80001 12 1.80001C6.35998 1.80001 1.79998 6.36001 1.79998 12C1.79998 17.64 6.35998 22.2 12 22.2C17.64 22.2 22.2 17.64 22.2 12Z"
      fill="#50A060"
    />
  </svg>
);

// const Minus = (
//   <svg
//     width="24"
//     height="24"
//     viewBox="0 0 24 24"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//   >
//     <path
//       d="M18.6 12C18.6 12.33 18.33 12.6 18 12.6H5.99998C5.66998 12.6 5.39998 12.33 5.39998 12C5.39998 11.67 5.66998 11.4 5.99998 11.4H18C18.33 11.4 18.6 11.67 18.6 12ZM23.4 12C23.4 18.3 18.3 23.4 12 23.4C5.69998 23.4 0.599976 18.3 0.599976 12C0.599976 5.70001 5.69998 0.600006 12 0.600006C18.3 0.600006 23.4 5.70001 23.4 12ZM22.2 12C22.2 6.36001 17.64 1.80001 12 1.80001C6.35998 1.80001 1.79998 6.36001 1.79998 12C1.79998 17.64 6.35998 22.2 12 22.2C17.64 22.2 22.2 17.64 22.2 12Z"
//       fill="#A90202"
//     />
//   </svg>
// );
