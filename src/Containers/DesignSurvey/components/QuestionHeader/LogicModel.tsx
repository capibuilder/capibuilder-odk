import { CirclePlusIcon, EditIcon } from "@/assets";
import useSurveyStore from "@/context/surveyStores";
import { questionField } from "@/interfaces/questionFields";
import * as Tabs from "@radix-ui/react-tabs";
import { useState } from "react";
import { Avatar, Flex } from "socialwell-design";
import { CalculateModel } from "./CalculateOptions";
import { ConstraintModel } from "./ConstraintOptions";
import { RelevantModel } from "./RelevantOptions";
import { ModelOverlay, ModelWrapper } from "./styles";

const isEdited = (field?: questionField) => {
  if (!field) return false;
  return !!field.calculate || !!field.relevant || !!field.constraint;
};

const LogicModel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const data = useSurveyStore(state => state.data);
  const currentField = useSurveyStore(state => state.currentField)!;

  const current = data.fields[currentField] as unknown as
    | questionField
    | undefined;

  return (
    <>
      <Flex justifyContent="space-between">
        <span
          style={{
            fontWeight: 500,
          }}
        >
          Response Logic
        </span>
        <span
          onClick={() => setIsOpen(true)}
          style={{
            cursor: "pointer",
          }}
        >
          {current && isEdited(current) ? (
            <EditIcon size="26" />
          ) : (
            <CirclePlusIcon size="26" />
          )}
        </span>
      </Flex>
      {isOpen && <Model {...{ setIsOpen }} />}
    </>
  );
};

const Model = ({ setIsOpen }: { setIsOpen: (isOpen: boolean) => void }) => {
  const { fields } = useSurveyStore(state => state.data);
  const currentField = useSurveyStore(state => state.currentField)!;

  const field = fields[currentField] as unknown as questionField;

  return (
    <>
      <ModelOverlay onClick={() => setIsOpen(false)} />
      <ModelWrapper data-animate="opacity" className="c-scrollbar">
        <Flex
          padding="16px"
          gap="2px"
          direction="column"
          className="border-bottom"
          justifyContent="center"
        >
          <div className="model_title">Response Logic</div>
          <p className="model_text">
            Add logic to the response of this question
          </p>
        </Flex>
        <Flex padding="16px" className="border-bottom" alignItems="center">
          <Avatar size="md" useName={field.questionNumber?.toString()} />
          <div className="question">{field.label}</div>
        </Flex>
        <Tabs.Root defaultValue={"relevant"}>
          <Tabs.List
            className="contraint_tabs_lists"
            aria-label="Select Constraint Type"
          >
            <Tabs.Trigger
              className="contraint_tabs_lists__trigger"
              value="relevant"
            >
              Activation
            </Tabs.Trigger>
            <Tabs.Trigger
              className="contraint_tabs_lists__trigger"
              value="constraint"
            >
              Validation
            </Tabs.Trigger>
            <Tabs.Trigger
              className="contraint_tabs_lists__trigger"
              value="calculate"
            >
              Calculation
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value="constraint">
            <ConstraintModel {...{ setIsOpen }} />
          </Tabs.Content>
          <Tabs.Content value="relevant">
            <RelevantModel {...{ setIsOpen }} />
          </Tabs.Content>
          <Tabs.Content value="calculate">
            <CalculateModel {...{ setIsOpen }} />
          </Tabs.Content>
        </Tabs.Root>
      </ModelWrapper>
    </>
  );
};

export default LogicModel;
