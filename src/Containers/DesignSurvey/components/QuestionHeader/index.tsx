import { ArrowDown, CheckIcon, SettingIcon } from "@/assets";
import ConnectIcon from "@/assets/icons/connectIcon";
import SelectAppearance from "@/components/SelectAppearance";
import useSurveyStore from "@/context/surveyStores";
import useKeyPress from "@/hooks/useKeyPress";
import { questionTypes } from "@/interfaces/questionTypes";
import { combineQuestion } from "@/utils/combineQuestions";
import { useCallback, useEffect, useState } from "react";
import { FiHash } from "react-icons/fi";
import Select from "react-select";
import { Flex, Switch, TextField } from "socialwell-design";
import { inputListData } from "../InputTypeContainer/inputListData";
import CreateDataset from "../Popups/CreateDataset";
import ConnectionDropDown from "./ConnectionDropDown";
import LogicModel from "./LogicModel";
import QuestionDropDown, { questionType } from "./QuestionDropDown";
import TagDropDown from "./TagDropDown";
import {
  Header,
  Options,
  QuestionHeaderContainer,
  SwitchWrapper,
} from "./styles";

const fieldData = (data: any) => ({
  isRequired: data.required,
  readOnly: data.readOnly,
  loop: data.groupRepeat,
  hasHint: data.hint === "" ? false : true,
  requiredMsg: data.required ? data.requiredMsg : "",
  invalid: data.constraint === "" ? false : true,
  hasCalculation: data.calculate === "" ? false : true,
  calculate: data.calculate === "" ? "" : data.calculate,
  constraint: data.constraint === "" ? "" : data.constraint,
  constraintMsg: data.constraintMsg === "" ? "" : data.constraintMsg,
  hasRelevant: data.relevant === "" ? false : true,
  relevant: data.relevant === "" ? "" : data.relevant,
  hasDefaultValue: data.defaultValue === "" ? false : true,
  defaultValue: data.defaultValue,
});

const appearanceOptionsForMultipleSelect = [
  { label: "Default", value: "" },
  { label: "columns", value: "columns" },
  { label: "columns-pack", value: "columns-pack" },
  { label: "minimal", value: "minimal" },
];

const appearanceOptionsForSingleSelect = [
  { label: "Default", value: "" },
  { label: "columns", value: "columns" },
  { label: "columns-pack no-buttons", value: "columns-pack no-buttons" },
  { label: "minimal", value: "minimal" },
  { label: "autocomplete", value: "autocomplete" },
];

const appearanceOptionsForDate = [
  { label: "Default", value: "" },
  { label: "month-year", value: "month-year" },
  { label: "year", value: "year" },
];

const hideMinMaxLength: questionTypes[] = [
  "geopoint",
  "geoshape",
  "rating",
  "signature",
  "barcode",
  "fileupload",
  "audio",
  "image",
  "video",
  "number",
  "date",
  "datetime",
  "time",
  "ranking",
  "singleselect",
  "multipleselect",
  "chooseone",
  "likert",
  "group",
  "cascadingselect",
  "link",
  "trigger",
  "note",
];

const showMinMaxValue: questionTypes[] = ["number"];

const showDateRange: questionTypes[] = ["date"];

const hideReadOnly: questionTypes[] = [
  "geoshape",
  "group",
  "cascadingselect",
  "note",
];

const hideResponseLogicFor: questionTypes[] = [];

const hideRequired: questionTypes[] = [
  "group",
  "cascadingselect",
  "link",
  "note",
];

const hideAddtoTag: questionTypes[] = [
  "group",
  "cascadingselect",
  "link",
  "note",
];

const hideDefaultValue: questionTypes[] = [
  // "geopoint",
  "geoshape",
  "signature",
  // "barcode",
  "fileupload",
  "audio",
  "image",
  "video",
  "ranking",
  // "rating",
  "group",
  "cascadingselect",
  "link",
  "note",
];

const QuestionHeader = () => {
  const data = useSurveyStore(state => state.data);
  const addFieldData = useSurveyStore(state => state.addFieldData);
  const currentField = useSurveyStore(state => state.currentField)!;
  const [field, setField] = useState<any>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showTag, setShowTag] = useState(false);
  const [showConnecton, setShowConnecton] = useState(false);
  const [createDataset, setCreateDataset] = useState(false);
  const [showSelectAppearance, setShowSelectAppearance] = useState(false);

  const [options, setOptions] = useState({
    isRequired: false,
    requiredMsg: "",
    loop: false,
    readOnly: false,
    invalid: false,
    hasCalculation: false,
    calculate: "",
    constraint: "",
    constraintMsg: "",
    hasRelevant: false,
    relevant: "",
    hasDefaultValue: false,
    defaultValue: "",
    isMultipleSelection: false,
    isVerticalAlignment: false,
    isShuffleOptionOrder: false,
  });

  // Get current field from either top-level or nested fields
  const getCurrentField = useCallback(() => {
    if (!currentField) return undefined;

    // Check if it's a top-level field
    let field = data.fields[currentField];

    // If not found in top-level, check group fields
    if (!field) {
      Object.values(data.fields).forEach((groupField: any) => {
        if (
          groupField.group &&
          groupField.groupfields &&
          groupField.groupfields[currentField]
        ) {
          field = groupField.groupfields[currentField];
        }
      });
    }

    return field;
  }, [currentField, data.fields]);

  // Update field and options only when currentField or data changes
  useEffect(() => {
    const currentFieldData = getCurrentField();
    if (currentFieldData && (!field || field.id !== currentFieldData.id)) {
      setField(currentFieldData);
      setOptions(prevData => ({
        ...prevData,
        ...fieldData(currentFieldData),
      }));
    }
  }, [currentField, data.fields]);

  useEffect(() => {
    if (currentField) {
      updateSetData();
    }
  }, [options, currentField]);

  const current = getCurrentField();

  const updateSetData = useCallback(() => {
    if (!currentField) return;

    const currentOptions = {
      required: options.isRequired,
      requiredMsg: options.isRequired ? options.requiredMsg : "",
      readOnly: options.readOnly,
      groupRepeat: options.loop,
      constraint: options.invalid ? options.constraint : "",
      constraintMsg:
        options.invalid && options.constraintMsg ? options.constraintMsg : "",
      relevant: options.hasRelevant ? options.relevant : "",
      defaultValue: options.hasDefaultValue ? options.defaultValue : "",
      calculate: options.hasCalculation ? options.calculate : "",
    };

    addFieldData(currentOptions);
  }, [options, currentField]);

  useKeyPress("Escape", () => {
    showDropdown && setShowDropdown(false);
    setShowTag(false);
  });

  const questions: questionType[] = combineQuestion(inputListData);

  useEffect(() => {
    if (current?.questionType === "group") {
    }
  }, [current, currentField]);

  useEffect(() => {
    if (field?.repeatCount >= 1) {
      setOptions(data => ({
        ...data,
        loop: true,
      }));

      addFieldData({
        groupRepeat: true,
      });
    }
  }, [field?.repeatCount]);

  return (
    <QuestionHeaderContainer className="c-scrollbar">
      {createDataset && (
        <CreateDataset handleClose={() => setCreateDataset(false)} />
      )}
      <Header>
        <div className="title">Question</div>
        <button className="option-icon">
          <SettingIcon size="36" />
        </button>
      </Header>
      <Options>
        <div className="title">type</div>
        <div
          onClick={e => {
            e.stopPropagation();
            setShowDropdown(v => !v);
          }}
          className="drp"
        >
          <Flex alignItems="center">
            {
              <span className="icon">
                {questions?.find(
                  (opt: any) => opt?.field?.typeLabel === current?.typeLabel
                )?.icon ?? <CheckIcon />}
              </span>
            }

            <p className="text">{current?.typeLabel}</p>
            {showDropdown && (
              <QuestionDropDown
                onClose={() => {
                  setShowDropdown(false);
                }}
              />
            )}
          </Flex>
          <ArrowDown />
        </div>
      </Options>

      {!current?.auditType && (
        <Options>
          <div className="title">Keyword</div>
          <div
            onClick={e => {
              e.stopPropagation();
              setShowTag(v => !v);
            }}
            className="drp"
          >
            <Flex alignItems="center">
              {
                <span className="icon">
                  <FiHash size={20} />
                </span>
              }

              <p className="text">{current?.dataAttribute || "Select"}</p>
              {showTag && (
                <TagDropDown
                  onClose={() => {
                    setShowTag(false);
                  }}
                  setOptions={setOptions}
                />
              )}
            </Flex>
            <ArrowDown />
          </div>
          <br />
          {current &&
            !hideAddtoTag.includes(current.questionType) &&
            !current.parentId && (
              <SwitchOptions
                name="Add to Project Tags"
                isChecked={current?.saveToEntity === true || false}
                onChange={() => {
                  if (!data.entity) {
                    return setCreateDataset(true);
                  }

                  if (current.saveToEntity) {
                    addFieldData({
                      saveToEntity: false,
                    });
                  } else {
                    addFieldData({
                      saveToEntity: true,
                    });
                  }
                }}
              />
            )}
        </Options>
      )}

      {!current?.auditType && data?.dataset && (
        <Options>
          <div className="title">Connect to</div>
          <div
            onClick={e => {
              e.stopPropagation();
              setShowConnecton(v => !v);
            }}
            className="drp"
          >
            <Flex alignItems="center">
              {
                <span>
                  <ConnectIcon />
                </span>
              }

              <p className="text">{current?.connectTo || "Select"}</p>
              {showConnecton && (
                <ConnectionDropDown
                  onClose={() => {
                    setShowConnecton(false);
                  }}
                  setOptions={setOptions}
                />
              )}
            </Flex>
            <ArrowDown />
          </div>
        </Options>
      )}

      {current?.type === "select_multiple" && (
        <Options>
          <div className="title">Appearance</div>
          <div
            onClick={e => {
              e.stopPropagation();
              setShowSelectAppearance(v => !v);
            }}
            className="drp"
          >
            <Flex alignItems="center">
              <p className="text">{current?.appearance || "Select"}</p>
              {showSelectAppearance && (
                <SelectAppearance
                  onClose={() => {
                    setShowSelectAppearance(false);
                  }}
                  options={appearanceOptionsForMultipleSelect}
                />
              )}
            </Flex>
            <ArrowDown />
          </div>
        </Options>
      )}
      {current?.type === "select_one" && (
        <Options>
          <div className="title">Appearance</div>
          <div
            onClick={e => {
              e.stopPropagation();
              setShowSelectAppearance(v => !v);
            }}
            className="drp"
          >
            <Flex alignItems="center">
              <p className="text">{current?.appearance || "Select"}</p>
              {showSelectAppearance && (
                <SelectAppearance
                  onClose={() => {
                    setShowSelectAppearance(false);
                  }}
                  options={appearanceOptionsForSingleSelect}
                />
              )}
            </Flex>
            <ArrowDown />
          </div>
        </Options>
      )}
      {current?.type === "date" && (
        <Options>
          <div className="title">Appearance</div>
          <div
            onClick={e => {
              e.stopPropagation();
              setShowSelectAppearance(v => !v);
            }}
            className="drp"
          >
            <Flex alignItems="center">
              <p className="text">{current?.appearance || "Select"}</p>
              {showSelectAppearance && (
                <SelectAppearance
                  onClose={() => {
                    setShowSelectAppearance(false);
                  }}
                  options={appearanceOptionsForDate}
                />
              )}
            </Flex>
            <ArrowDown />
          </div>
        </Options>
      )}

      {!current?.auditType && (
        <>
          <Options>
            <div className="title">setting</div>

            {field?.group && current && (
              <>
                <SwitchOptions
                  name={
                    current.questionType === "group"
                      ? "Repeat Question Group"
                      : "Repeat Cascading Select"
                  }
                  isChecked={options.loop}
                  onChange={() => {
                    setOptions(data => ({
                      ...data,
                      loop: !data.loop,
                    }));

                    addFieldData({
                      groupRepeat: !options.loop,
                      repeatCount: !options.loop
                        ? undefined
                        : current.repeatCount,
                    });
                  }}
                />

                {current.questionType === "group" && options.loop && (
                  <div style={{ marginBlock: "8px" }}>
                    <TextField
                      type="number"
                      min={1}
                      placeholder="Mention number of repeats"
                      value={field?.repeatCount || ""}
                      onChange={e => {
                        const value = parseInt(e.target.value);
                        if (value >= 1 || e.target.value === "") {
                          addFieldData({
                            groupRepeat: true,
                            repeatCount: value || undefined,
                          });
                          setField(prev => ({
                            ...prev,
                            repeatCount: value || undefined,
                          }));
                        }
                      }}
                    />
                  </div>
                )}
              </>
            )}

            {current?.style !== "upload" &&
              // current?.style !== "range" &&
              // current?.style !== "select" &&
              current?.style !== "trigger" && (
                <>
                  {!hideReadOnly.includes(current.questionType) && (
                    <SwitchOptions
                      name="read only"
                      isChecked={options.readOnly}
                      onChange={() => {
                        setOptions(data => ({
                          ...data,
                          readOnly: !data.readOnly,
                        }));
                      }}
                    />
                  )}
                  {!hideDefaultValue.includes(current.questionType) && (
                    <SwitchOptions
                      name="Default Value"
                      isChecked={options.hasDefaultValue}
                      onChange={() => {
                        setOptions(data => ({
                          ...data,
                          hasDefaultValue: !data.hasDefaultValue,
                        }));
                      }}
                    />
                  )}
                </>
              )}
            {options.hasDefaultValue &&
              !hideDefaultValue.includes(current.questionType) &&
              (current.questionType === "singleselect" ||
              current.questionType === "chooseone" ||
              current.questionType === "likert" ? (
                <Select
                  options={current.selectOptions}
                  onChange={(e: any) =>
                    setOptions(data => ({
                      ...data,
                      defaultValue: e.value,
                    }))
                  }
                  value={{
                    label: options.defaultValue || "Select",
                    value: options.defaultValue,
                  }}
                />
              ) : current.questionType === "multipleselect" ? (
                <Select
                  options={current.selectOptions}
                  onChange={(e: any) =>
                    setOptions(data => ({
                      ...data,
                      defaultValue: e.map((v: any) => v.value).join(" "),
                    }))
                  }
                  value={
                    options?.defaultValue
                      .trim()
                      ?.split(" ")
                      .map(v => ({
                        label: v,
                        value: v,
                      })) || []
                  }
                  isMulti
                />
              ) : current.questionType === "date" ? (
                <input
                  required
                  type="date"
                  className="defaultValue"
                  onChange={e =>
                    setOptions(data => ({
                      ...data,
                      defaultValue: e.target.value,
                    }))
                  }
                  value={current.defaultValue}
                />
              ) : current.questionType === "datetime" ? (
                <input
                  required
                  type="datetime-local"
                  className="defaultValue"
                  onChange={e =>
                    setOptions(data => ({
                      ...data,
                      defaultValue: e.target.value,
                    }))
                  }
                  value={current.defaultValue}
                />
              ) : current.questionType === "time" ? (
                <input
                  required
                  type="time"
                  className="defaultValue"
                  onChange={e =>
                    setOptions(data => ({
                      ...data,
                      defaultValue: e.target.value,
                    }))
                  }
                  value={current.defaultValue}
                />
              ) : (
                <div style={{ marginBlock: "8px" }}>
                  <TextField
                    onChange={e =>
                      setOptions(data => ({
                        ...data,
                        defaultValue: e.target.value,
                      }))
                    }
                    placeholder={
                      current.questionType === "geopoint"
                        ? "Required format = lat long"
                        : "Enter Default Value"
                    }
                    value={options.defaultValue}
                    type="text"
                  />
                </div>
              ))}

            {!hideRequired.includes(current.questionType) && (
              <SwitchOptions
                name="Required"
                isChecked={current?.required || false}
                onChange={() => {
                  const newRequired = !current?.required;
                  console.log("Before setting required:", {
                    current: current?.required,
                    newRequired,
                  });
                  addFieldData({
                    required: newRequired,
                    requiredMsg: newRequired ? "This field is required" : "",
                    ismodified: { ...current?.ismodified, requiredMsg: true },
                  });
                  console.log("After setting required:", newRequired);
                }}
              />
            )}

            {current?.required && (
              <div style={{ marginBlock: "8px" }}>
                <TextField
                  onChange={e => {
                    addFieldData({
                      requiredMsg: e.target.value,
                      ismodified: { ...current?.ismodified, requiredMsg: true },
                    });
                  }}
                  placeholder="Enter Required message"
                  value={current?.requiredMsg || ""}
                  type="text"
                />
              </div>
            )}

            {showDateRange.includes(current.questionType) && (
              <>
                <SwitchOptions
                  name="Start-End Dates"
                  isChecked={current?.dateRange !== null || false}
                  onChange={() => {
                    if (!current.dateRange) {
                      addFieldData({
                        dateRange: { max: undefined, min: undefined },
                      });
                    } else {
                      addFieldData({
                        dateRange: null,
                      });
                    }
                  }}
                />
                {current.dateRange && (
                  <div
                    style={{ marginBlock: "8px" }}
                    className="date-range-selector"
                  >
                    <label>
                      Start Date
                      <input
                        required
                        type="date"
                        onChange={e =>
                          addFieldData({
                            dateRange: {
                              ...current?.dateRange,
                              min: e.target.value,
                            },
                          })
                        }
                        value={current.dateRange.min}
                      />
                    </label>{" "}
                    <label>
                      End Date
                      <input
                        required
                        type="date"
                        onChange={e =>
                          addFieldData({
                            dateRange: {
                              ...current?.dateRange,
                              max: e.target.value,
                            },
                          })
                        }
                        value={current.dateRange.max}
                      />
                    </label>
                  </div>
                )}
              </>
            )}
            {!hideMinMaxLength.includes(current.questionType) && (
              <>
                <SwitchOptions
                  name="Minimum Character"
                  isChecked={
                    (current?.length?.min && current?.length?.min > 0) || false
                  }
                  onChange={() => {
                    if (current.length?.min) {
                      addFieldData({
                        length: { ...current?.length, min: undefined },
                      });
                    } else {
                      addFieldData({ length: { ...current?.length, min: 1 } });
                    }
                  }}
                />
                {current.length?.min && (
                  <div style={{ marginBlock: "8px" }}>
                    <TextField
                      onChange={e =>
                        addFieldData({
                          length: {
                            ...current?.length,
                            min: Number(e.target.value),
                          },
                        })
                      }
                      placeholder="0-255"
                      value={current.length.min.toString()}
                      type="text"
                    />
                  </div>
                )}

                <SwitchOptions
                  name="Maximum Character"
                  isChecked={current?.length?.max !== undefined}
                  onChange={() => {
                    if (current.length?.max) {
                      addFieldData({
                        length: { ...current?.length, max: undefined },
                      });
                    } else {
                      addFieldData({
                        length: { ...current?.length, max: 255 },
                      });
                    }
                  }}
                />
                {current.length?.max && (
                  <div style={{ marginBlock: "8px" }}>
                    <TextField
                      onChange={e =>
                        addFieldData({
                          length: {
                            ...current?.length,
                            max: Number(e.target.value),
                          },
                        })
                      }
                      placeholder="0-255"
                      value={current.length.max.toString()}
                      type="text"
                    />
                  </div>
                )}
              </>
            )}
            {showMinMaxValue.includes(current.questionType) && (
              <>
                <SwitchOptions
                  name="Minimum value"
                  isChecked={
                    (current?.value?.min && current?.value?.min > 0) || false
                  }
                  onChange={() => {
                    if (current.value?.min) {
                      addFieldData({
                        value: { ...current?.value, min: undefined },
                      });
                    } else {
                      addFieldData({ value: { ...current?.value, min: 1 } });
                    }
                  }}
                />
                {current.value?.min && (
                  <div style={{ marginBlock: "8px" }}>
                    <TextField
                      onChange={e =>
                        addFieldData({
                          value: {
                            ...current?.value,
                            min: Number(e.target.value),
                          },
                        })
                      }
                      value={current.value.min.toString()}
                      type="text"
                    />
                  </div>
                )}

                <SwitchOptions
                  name="Maximum value"
                  isChecked={current?.value?.max !== undefined}
                  onChange={() => {
                    if (current.value?.max) {
                      addFieldData({
                        value: { ...current?.value, max: undefined },
                      });
                    } else {
                      addFieldData({ value: { ...current?.value, max: 9999 } });
                    }
                  }}
                />
                {current.value?.max && (
                  <div style={{ marginBlock: "8px" }}>
                    <TextField
                      onChange={e =>
                        addFieldData({
                          value: {
                            ...current?.value,
                            max: Number(e.target.value),
                          },
                        })
                      }
                      value={current.value.max.toString()}
                      type="text"
                    />
                  </div>
                )}
              </>
            )}

            {!hideResponseLogicFor.includes(current.questionType) && (
              <>
                <LogicModel />
              </>
            )}
          </Options>
        </>
      )}
    </QuestionHeaderContainer>
  );
};

export const SwitchOptions = ({
  name,
  isChecked,
  onChange,
}: {
  name: string;
  isChecked: boolean;
  onChange: (o: any) => void;
}) => {
  return (
    <SwitchWrapper>
      <div className="name">{name}</div>
      <div className="switch">
        <Switch
          isChecked={isChecked}
          // value={isChecked}
          onChange={onChange}
          size="md"
          label="3"
        />
      </div>
    </SwitchWrapper>
  );
};

export default QuestionHeader;
