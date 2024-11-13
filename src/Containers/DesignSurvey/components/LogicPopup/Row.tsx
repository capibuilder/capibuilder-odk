import useSurveyStore from "@/context/surveyStores";
import { useEffect, useState } from "react";
import { Flex, FormControl, SelectField } from "socialwell-design";
import styled from "styled-components";

const IsOptions = [
  { label: "is equal to", value: "is_equal_to" },
  { label: "is not equal to", value: "is_not_equal_to" },
  { label: "is empty", value: "is_empty" },
  { label: "is not empty", value: "is_not_empty" },
  { label: "less than", value: "less_than" },
  { label: "greater than", value: "greater_than" },
  { label: "less than or equal to", value: "less_than_or_equal_to" },
  { label: "between", value: "between" },
  { label: "contains", value: "contains" },
  { label: "not contains", value: "not_contains" },
];

interface data {
  title: string;
  entityDataset?: string | undefined;
  category: string;
  description: string;
  fields: any;
}

export interface dataInterFace {
  logicId: string;
  LogicType: "relevent" | "caclulation" | "contains";
  question: { id: any; label: string };
  action: { label: string; symbol: string };
  compValue: string;
  referenceQuestionAction: string;
  referenceQuestionId: string;
}

export default function Row() {
  const { data, setData } = useSurveyStore(state => state);

  // const { fields } = useSurveyStore(state => state.data);
  // const currentField = useSurveyStore(state => state.currentField);
  // const addFieldData = useSurveyStore(state => state.addFieldData);

  // const currunt: questionField = data.fields[currentField as string];

  const [currentQuestion, setCurrentQuestion] = useState<dataInterFace>({
    logicId: "sdkjsdkjsharp",
    compValue: "",
    LogicType: "relevent",
    question: { label: "", id: "" },
    action: { label: "", symbol: "" },
    referenceQuestionAction: "",
    referenceQuestionId: "",
  });

  `logic-${(Math.random() * 21540).toFixed()}`;

  useEffect(() => {
    setData({
      ...data,
      logics: {
        ...data?.logics,
        [currentQuestion.logicId]: {
          ...currentQuestion,
        },
      },
    });
  }, [currentQuestion]);

  return (
    <RowW>
      <Flex>
        <SelectField
          hideClearButton
          value={{
            label: currentQuestion.question.label || "Select Question",
            value: currentQuestion.question.id,
          }}
          onChange={e => {
            setCurrentQuestion(prevState => ({
              ...prevState,
              question: {
                label: e?.label || "Select Question",
                id: e?.value || "Select Question",
              },
            }));
          }}
          options={Object.values(data?.fields)?.map((feild: any) => {
            return { value: feild?.label, label: feild?.label };
          })}
        />
        <SelectField
          hideClearButton
          value={{
            label: currentQuestion.action.label || "Select",
            value: currentQuestion.action.symbol,
          }}
          onChange={(e: any) => {
            setCurrentQuestion(prevState => ({
              ...prevState,
              action: {
                label: e.label || "Select Question",
                symbol: e.value,
              },
            }));
          }}
          options={IsOptions}
        />
        <FormControl
          inputType={"select"}
          label={""}
          value={currentQuestion.compValue}
          onChange={e => {
            setCurrentQuestion(prevState => ({
              ...prevState,
              compValue: e.target.value,
            }));
          }}
          name=""
          placeholder="Enter value"
        />

        {true ? (
          <div className="andor">
            <SelectField
              hideClearButton
              onChange={() => {}}
              value={{ label: "Add AND/OR", value: "Add AND/OR" }}
              options={[
                { label: "AND", value: "AND" },
                { label: "OR", value: "OR" },
              ]}
            />
          </div>
        ) : (
          <>
            <button className="unset pointer">{plus}</button>
            <button className="unset pointer">{Minus}</button>
          </>
        )}
      </Flex>
    </RowW>
  );
}

const RowW = styled.div`
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

  .andor {
    width: 50%;

    div > :has(.caret + .options) {
      color: #9981fa;
      border-color: #9981fa;

      .caret {
        border-top-color: #9981fa;
      }
    }
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

const Minus = (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M18.6 12C18.6 12.33 18.33 12.6 18 12.6H5.99998C5.66998 12.6 5.39998 12.33 5.39998 12C5.39998 11.67 5.66998 11.4 5.99998 11.4H18C18.33 11.4 18.6 11.67 18.6 12ZM23.4 12C23.4 18.3 18.3 23.4 12 23.4C5.69998 23.4 0.599976 18.3 0.599976 12C0.599976 5.70001 5.69998 0.600006 12 0.600006C18.3 0.600006 23.4 5.70001 23.4 12ZM22.2 12C22.2 6.36001 17.64 1.80001 12 1.80001C6.35998 1.80001 1.79998 6.36001 1.79998 12C1.79998 17.64 6.35998 22.2 12 22.2C17.64 22.2 22.2 17.64 22.2 12Z"
      fill="#A90202"
    />
  </svg>
);
