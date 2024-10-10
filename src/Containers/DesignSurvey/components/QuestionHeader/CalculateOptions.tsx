import { PrimaryButton } from "@/components";
import useSurveyStore from "@/context/surveyStores";
import { useMemo, useState } from "react";

import { AddIcon } from "@/assets";
import { ResetIcon } from "@/assets/icons/ResetIcon";
import { modifiedJsonData } from "@/utils/modifiedJsonData";
import { TbTrash } from "react-icons/tb";
import {
  Flex,
  SelectField,
  Switch,
  TextField,
  useAlert,
} from "socialwell-design";
import { arithmeticConstraint } from "./options";
import { ComparisonLogicWrapper, Wrapper } from "./styles";

type SelectOption = {
  label: string;
  value: string;
  type?: string;
  id?: string;
};

type LogicProps = {
  method: {
    icon: string;
    value: string;
  };
  option1: SelectOption;
  option2: string;
  option3: SelectOption;
  option3Input: string;
  hasInput: boolean;
};

export const CalculateModel = ({
  setIsOpen,
}: {
  setIsOpen: (o: boolean) => void;
}) => {
  const { fields } = useSurveyStore(state => state.data);
  const currentField = useSurveyStore(state => state.currentField);
  const addFieldData = useSurveyStore(state => state.addFieldData);
  const { setAlert } = useAlert();

  const field = useMemo(() => {
    return fields[currentField as string];
  }, [currentField]);

  const [logics, setLogics] = useState<LogicProps[]>(
    field.calculateLogic || [
      {
        method: {
          icon: "",
          value: "",
        },
        option1: {
          label: "Select",
          value: "",
        },
        option2: "",
        option3: { label: "Select", value: "" },
        option3Input: "",
        hasInput: false,
      },
    ]
  );

  const fieldAttributesOptions = useMemo<SelectOption[]>(() => {
    const options: SelectOption[] = [];

    const collectOptions = (field: any, path: string) => {
      if (field.group) {
        Object.values(field.groupfields)?.forEach((groupField: any) => {
          if (field.dataAttribute === groupField.dataAttribute) return;
          collectOptions(groupField, `${path}/${groupField.dataAttribute}`);
        });
      } else {
        options.push({
          label: field.label,
          value: path,
          type: field.type,
          id: `field-${field.id}`,
        });
      }
    };

    Object.entries(modifiedJsonData(fields)).forEach(([, objField]: any) => {
      collectOptions(objField, `/data/${objField.dataAttribute}`);
    });

    return options;
  }, [fields]);

  const addLogic = (method: { icon: string; value: string }) => {
    setLogics([
      ...logics,
      {
        method,
        option1: {
          label: "Select",
          value: "",
        },
        option2: "",
        option3: { label: "Select", value: "" },
        option3Input: "",
        hasInput: false,
      },
    ]);
  };

  const handleLogicChange = (index: number, key: string, value: any) => {
    const newLogics: any = [...logics];
    newLogics[index][key] = value;
    setLogics(newLogics);
  };

  const removeLogic = (index: number) => {
    if (index === 0) {
      setLogics([
        {
          method: {
            icon: "",
            value: "",
          },
          option1: {
            label: "Select",
            value: "",
          },
          option2: "",
          option3: { label: "Select", value: "" },
          option3Input: "",
          hasInput: false,
        },
      ]);
      addFieldData({
        calculate: "",
        calculateLogic: undefined,
      });
      return;
    }
    const newLogics = [...logics];
    newLogics.splice(index, 1);
    setLogics(newLogics);
  };

  const handleAdd = () => {
    let logic = "";

    logics.forEach((logicItem, index) => {
      const option3 = logicItem.hasInput
        ? `'${logicItem.option3Input}'`
        : logicItem.option3.value;

      if (index === 0) {
        logic += `${logicItem.option1.value} ${logicItem.option2} ${option3}`;
      } else {
        logic += ` ${logicItem.method.value} ${logicItem.option1.value} ${logicItem.option2} ${option3}`;
      }
    });

    if (logic === "") {
      setAlert({
        show: true,
        state: "warning",
        text: "Logic is empty. Please add a logic to save.",
        title: "",
      });
      return;
    }

    addFieldData({
      calculate: logic,
      calculateLogic: logics,
    });

    setAlert({
      show: true,
      state: "success",
      text: "Logic saved successfully",
      title: "",
    });

    // setIsOpen(false);
  };

  return (
    <Wrapper>
      {logics.map((logic, index) => (
        <CalculateLogic
          key={index}
          {...{
            currentField,
            fieldAttributesOptions,
            removeLogic,
            handleLogicChange,
            addLogic,
          }}
          logic={logic}
          index={index}
          lastCard={index === logics.length - 1}
        />
      ))}
      <Flex margin="16px 0 0 0" justifyContent="flex-end">
        <PrimaryButton
          name="Save"
          onClick={handleAdd}
          loading={false}
          secondary
        />
        <PrimaryButton
          name="Close"
          onClick={() => setIsOpen(false)}
          loading={false}
          secondary
        />
      </Flex>
    </Wrapper>
  );
};

const CalculateLogic = ({
  fieldAttributesOptions,
  logic,
  removeLogic,
  index,
  handleLogicChange,
  addLogic,
  lastCard,
}: {
  fieldAttributesOptions: SelectOption[];
  logic: LogicProps;
  removeLogic: (index: number) => void;
  index: number;
  handleLogicChange: (index: number, key: string, value: any) => void;
  addLogic: (method: { icon: string; value: string }) => void;
  lastCard: boolean;
}) => {
  return (
    <>
      {logic.method.value !== "" && (
        <>
          <br />
          <ComparisonLogic
            constraint={arithmeticConstraint}
            value={logic.method.value}
            onClick={item => {
              handleLogicChange(index, "method", item);
            }}
          />
        </>
      )}
      <div
        style={{
          border: "2px solid #e2e8f0",
          padding: "16px",
          borderRadius: "4px",
          margin: "16px 0",
          position: "relative",
        }}
      >
        {index === 0 && <div className="compare-label">calculate</div>}
        <Flex
          margin="16px 0 0 0"
          direction="column"
          justifyContent="space-between"
          gap="16px"
        >
          {index === 0 && (
            <SelectField
              onChange={(o: any) => {
                handleLogicChange(index, "option1", o);
              }}
              options={fieldAttributesOptions}
              searchable
              value={logic.option1}
            />
          )}
          {/* <div className="compare-label">that has</div> */}
          {index === 0 && (
            <ComparisonLogic
              constraint={arithmeticConstraint}
              value={logic.option2}
              onClick={(item: { value: any }) => {
                handleLogicChange(index, "option2", item.value);
              }}
            />
          )}
          <div className="compare-label">with</div>
          <Flex alignItems="center" gap="8px">
            <Switch
              size="md"
              isChecked={logic.hasInput}
              onChange={(e: any) => {
                handleLogicChange(index, "hasInput", e.target.checked);
              }}
            />
            <span className="switch-input">use input</span>
          </Flex>
          {logic.hasInput ? (
            <>
              <TextField
                value={logic.option3Input}
                type={"text"}
                placeholder="Type value"
                onChange={(e: any) =>
                  handleLogicChange(index, "option3Input", e.target.value)
                }
              />
            </>
          ) : (
            <>
              <SelectField
                onChange={(o: any) => {
                  handleLogicChange(index, "option3", o);
                }}
                options={fieldAttributesOptions}
                value={logic.option3}
                searchable
              />
            </>
          )}
        </Flex>
        <button onClick={() => removeLogic(index)} className="remove-btn">
          {index !== 0 ? <TbTrash size={20} /> : <ResetIcon />}
        </button>
      </div>
      {lastCard && (
        <Flex justifyContent="flex-end">
          <button
            onClick={() => {
              addLogic({
                icon: "",
                value: "+",
              });
            }}
            className="underline-btn"
          >
            <AddIcon size="14" /> add another calculation
          </button>
        </Flex>
      )}
    </>
  );
};

const ComparisonLogic = ({
  constraint,
  value,
  onClick,
  noPadding,
}: {
  constraint: { value: any; icon: any }[];
  value: string;
  onClick: (item: { value: any }) => void;
  noPadding?: boolean;
}) => {
  return (
    <ComparisonLogicWrapper noPadding={noPadding}>
      <Flex alignItems="center" gap="0" className="comparison__logic__lists">
        {constraint.map((item, index) => (
          <button
            key={index}
            className={`${value === item.value ? "active" : ""}`}
            onClick={() => onClick(item)}
          >
            {item.icon}
          </button>
        ))}
      </Flex>
    </ComparisonLogicWrapper>
  );
};

// export default CalculateOptions;
