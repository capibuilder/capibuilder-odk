import { CirclePlusIcon } from "@/assets";
import useSurveyStore from "@/context/surveyStores";
import { questionField } from "@/interfaces/questionFields";
import { getTranslation } from "@/utils/network/getTranslation";
import { ChangeEvent, Key, useEffect, useMemo, useState } from "react";
import {
  Checkbox,
  Flex,
  IconButton,
  Radio,
  SelectField,
  TextField,
  useAlert,
} from "socialwell-design";
import { shallow } from "zustand/shallow";
import { AddOptionWrapper, Button } from "./styles";

export const getTranslationOptions = async (
  otherLangs: any[],
  addOptions: any[],
  langs: string[]
) => {
  const newOtherLangs = await Promise.all(
    otherLangs.map(async (item: any) => {
      let getTranslatedLabel = null;

      const newAddOptions = await Promise.all(
        addOptions.map(async (option: any) => {
          const { data: translationResponse, error } = await getTranslation({
            languages: langs,
            text: option.label,
          });

          if (error) {
            return {
              label: option.label,
              value: option.value,
            };
          }

          const translations =
            translationResponse?.translate.data[0].translations || [];
          const translated = translations.find(
            (tr: any) => tr.to === item.lang
          );

          getTranslatedLabel = translated?.text || option.label;

          return {
            label: getTranslatedLabel || option.label,
            value: option.value,
          };
        })
      );

      return {
        ...item,
        selectOptions: newAddOptions,
      };
    })
  );

  return newOtherLangs;
};

const AddOptions = ({
  type = "checkbox",
  hideBtn = false,
}: {
  type?: "checkbox" | "radio" | "dropdown" | "none";
  hideBtn?: boolean;
}) => {
  const { setAlert } = useAlert();
  const data = useSurveyStore(state => state.data, shallow);
  const setData = useSurveyStore(state => state.setData);
  const currentField = useSurveyStore(state => state.currentField)!;
  const [open, setOpen] = useState(false);
  const [addOptions, setAddOptions] = useState([
    {
      label: "",
      value: "",
    },
  ]);

  const selectedField: questionField = data.fields[currentField];

  const addData = (item: any) => {
    setData({
      ...data,
      fields: {
        ...data.fields,
        [`${currentField}`]: {
          ...data.fields[`${currentField}`],
          ...item,
        },
      },
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: "label" | "value",
    index: Key
  ) => {
    const newOptions = addOptions.map((item: any, i: number) => {
      if (i === index) {
        return {
          ...item,
          [type]: e.target.value,
        };
      }

      return item;
    });

    setAddOptions(newOptions);
  };

  const handleClick = async () => {
    const otherLangs = selectedField?.otherLangs || [];

    const newOtherLangs = await getTranslationOptions(
      otherLangs,
      addOptions,
      data.langs!
    );

    addData({
      selectOptions: addOptions,
      ismodified: { ...selectedField?.ismodified, selectOptions: true },
      otherLangs: newOtherLangs,
    });
    setAlert({
      title: "Success",
      text: "Option added successfully!",
      state: "success",
      show: true,
    });
  };

  const handleDelete = (index: number) => {
    const newOptions = selectedField.selectOptions?.filter(
      (_item: any, i: number) => i !== index
    );

    const newOtherLangs = selectedField?.otherLangs?.map((item: any) => {
      const newSelectOptions = item.selectOptions?.filter(
        (_item: any, i: number) => i !== index
      );

      return {
        ...item,
        selectOptions: newSelectOptions,
      };
    });

    addData({
      selectOptions: newOptions,
      otherLangs: newOtherLangs,
    });
  };

  const options = selectedField?.selectOptions || [];

  useEffect(() => {
    const newOptions =
      options.length > 0
        ? options
        : [
            {
              label: "",
              value: "",
            },
          ];
    setAddOptions(newOptions);
  }, [options.length]);

  return (
    <AddOptionWrapper>
      <div className="add-option__header">
        {type === "dropdown" && (
          <>
            <SelectField
              hideClearButton
              onChange={() => {}}
              options={selectedField?.selectOptions || []}
              value={{ label: "This is how dropdown looks", value: "" }}
            />
          </>
        )}
        {options.map((item: any, index: number) => {
          if (type === "radio") {
            return (
              <div
                key={item.value}
                className="has-radio"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Radio
                  name={currentField as string}
                  label={`${item.label} (${item.value})`}
                  onChange={() => console.log("log")}
                />

                {selectedField?.type === "select1" && hideBtn ? (
                  <></>
                ) : (
                  <Button onClick={() => handleDelete(index)}>delete</Button>
                )}
              </div>
            );
          }

          if (type === "none") {
            return (
              <div
                key={item.value}
                className="has-radio"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {`${item.label} (${item.value})`}

                {selectedField?.type === "select1" && hideBtn ? (
                  <></>
                ) : (
                  <Button onClick={() => handleDelete(index)}>delete</Button>
                )}
              </div>
            );
          }

          if (type === "dropdown") {
            return <></>;
          }

          return (
            <div
              key={item.value}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                // marginBottom: "15px",
              }}
            >
              <Checkbox
                className="flex align-center"
                label={`${item.label} (${item.value})`}
                onChange={() => console.log("log")}
              />
              {!hideBtn && (
                <Button onClick={() => handleDelete(index)}>delete</Button>
              )}
            </div>
          );
        })}
      </div>
      <div className="add-option__button">
        {selectedField?.type === "select1" && hideBtn ? (
          <></>
        ) : (
          <button onClick={() => setOpen(true)}>Add Option</button>
        )}

        {open && (
          <>
            <div className="overlay" onClick={() => setOpen(false)}></div>
            <div className="option-model" data-animate="opacity">
              <Flex
                alignItems="center"
                margin="10px 0"
                justifyContent="space-between"
              >
                <div
                  className="title"
                  style={{
                    padding: "0",
                    margin: "0",
                  }}
                >
                  add options
                </div>
              </Flex>
              <Flex direction="column" gap="15px" margin="0px 0px 10px 0px">
                {addOptions.map((option: any, index: number, array) => {
                  return (
                    <Flex key={index} alignItems="center" gap="10px">
                      <TextField
                        type="text"
                        value={option.value}
                        onChange={e => handleChange(e, "value", index)}
                        placeholder="e.g. 1, value1, etc."
                      />
                      <TextField
                        type="text"
                        value={option.label}
                        onChange={e => handleChange(e, "label", index)}
                        placeholder="e.g. Option Label, value1, etc."
                      />
                      {index === array.length - 1 ? (
                        <IconButton
                          icon={<CirclePlusIcon />}
                          onClick={() =>
                            setAddOptions(prev => [
                              ...prev,
                              {
                                label: "",
                                value: "",
                              },
                            ])
                          }
                        />
                      ) : (
                        <IconButton
                          icon={
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="#c70000"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M5 12l14 0" />
                            </svg>
                          }
                          onClick={() => handleDelete(index)}
                        />
                      )}
                    </Flex>
                  );
                })}
              </Flex>
              <button onClick={handleClick}>save</button>
            </div>
          </>
        )}
      </div>
    </AddOptionWrapper>
  );
};

export const AddLangOptions = ({
  type = "checkbox",
  lang,
  hideBtn = false,
}: {
  type?: "checkbox" | "radio" | "dropdown" | "none";
  lang: string;
  hideBtn?: boolean;
}) => {
  const { setAlert } = useAlert();
  const data = useSurveyStore(state => state.data, shallow);
  const setData = useSurveyStore(state => state.setData);
  const currentField = useSurveyStore(state => state.currentField)!;
  const [open, setOpen] = useState(false);
  const [addOptions, setAddOptions] = useState([
    {
      label: "",
      value: "",
    },
  ]);

  const selectedField: questionField = data.fields[currentField];

  const addData = (item: any) => {
    setData({
      ...data,
      fields: {
        ...data.fields,
        [`${currentField}`]: {
          ...data.fields[`${currentField}`],
          ...item,
        },
      },
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    type: "label" | "value",
    index: Key
  ) => {
    const newOptions = addOptions.map((item: any, i: number) => {
      if (i === index) {
        return {
          ...item,
          [type]: e.target.value,
        };
      }

      return item;
    });

    setAddOptions(newOptions);
  };

  const handleClick = () => {
    const newOtherLangs = selectedField?.otherLangs?.map((item: any) => {
      if (item.lang !== lang) {
        return item;
      }

      return {
        ...item,
        selectOptions: addOptions,
      };
    });

    addData({
      otherLangs: newOtherLangs,
    });
    setAlert({
      title: "Success",
      text: "Option updated successfully!",
      state: "success",
      show: true,
    });
  };

  const handleDelete = (index: number) => {
    const newOptions = selectedField.selectOptions?.filter(
      (_item: any, i: number) => i !== index
    );

    const newOtherLangs = selectedField?.otherLangs?.map((item: any) => {
      const newSelectOptions = item.selectOptions?.filter(
        (_item: any, i: number) => i !== index
      );

      return {
        ...item,
        selectOptions: newSelectOptions,
      };
    });

    addData({
      selectOptions: newOptions,
      otherLangs: newOtherLangs,
    });
  };

  const options =
    selectedField?.otherLangs?.find((item: any) => item.lang === lang)
      ?.selectOptions || [];

  useEffect(() => {
    const newOptions =
      options.length > 0
        ? options
        : [
            {
              label: "",
              value: "",
            },
          ];
    setAddOptions(newOptions);
  }, [options.length]);

  return (
    <AddOptionWrapper>
      <div className="add-option__header">
        {type === "dropdown" && (
          <>
            <SelectField
              hideClearButton
              onChange={() => {}}
              options={selectedField?.selectOptions || []}
              value={{ label: "This is how dropdown looks", value: "" }}
            />
          </>
        )}
        {options.map((item: any, index: number) => {
          if (type === "radio") {
            return (
              <div
                key={item.value}
                className="has-radio"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Radio
                  name={currentField as string}
                  label={`${item.label} (${item.value})`}
                  onChange={() => console.log("log")}
                />

                {selectedField?.type === "select1" && hideBtn ? (
                  <></>
                ) : (
                  <Button onClick={() => handleDelete(index)}>delete</Button>
                )}
              </div>
            );
          }

          if (type === "none") {
            return (
              <div
                key={item.value}
                className="has-radio"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                {`${item.label} (${item.value})`}
                {selectedField?.type === "select1" && hideBtn ? (
                  <></>
                ) : (
                  <Button onClick={() => handleDelete(index)}>delete</Button>
                )}
              </div>
            );
          }

          if (type === "dropdown") {
            return <></>;
          }

          return (
            <div
              key={item.value}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                // marginBottom: "15px",
              }}
            >
              <Checkbox
                className="flex align-center"
                label={`${item.label} (${item.value})`}
                onChange={() => console.log("log")}
              />
              {!hideBtn && (
                <Button onClick={() => handleDelete(index)}>delete</Button>
              )}
            </div>
          );
        })}
      </div>
      <div className="add-option__button">
        {selectedField?.type === "select1" && hideBtn ? (
          <></>
        ) : (
          <button onClick={() => setOpen(true)}>Edit Option</button>
        )}

        {open && (
          <>
            <div className="overlay" onClick={() => setOpen(false)}></div>
            <div className="option-model" data-animate="opacity">
              <Flex
                alignItems="center"
                margin="10px 0"
                justifyContent="space-between"
              >
                <div
                  className="title"
                  style={{
                    padding: "0",
                    margin: "0",
                  }}
                >
                  edit options
                </div>
              </Flex>
              <Flex direction="column" gap="15px" margin="0px 0px 10px 0px">
                {addOptions.map((option: any, index: number, array) => {
                  return (
                    <Flex key={index} alignItems="center">
                      <TextField
                        type="text"
                        value={option.value}
                        onChange={e => handleChange(e, "value", index)}
                        placeholder="Option Value"
                      />
                      <TextField
                        type="text"
                        value={option.label}
                        onChange={e => handleChange(e, "label", index)}
                        placeholder="Option Label"
                      />
                      <IconButton
                        icon={
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="#c70000"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M5 12l14 0" />
                          </svg>
                        }
                        onClick={() => handleDelete(index)}
                      />
                    </Flex>
                  );
                })}
              </Flex>
              <button onClick={handleClick}>save</button>
            </div>
          </>
        )}
      </div>
    </AddOptionWrapper>
  );
};

export const PreviewOptions = ({
  options,
  type = "checkbox",
}: {
  options: any;
  type?: "checkbox" | "radio";
}) => {
  const ramdomId = useMemo(() => Math.floor(Math.random() * 1000), []);
  return (
    <AddOptionWrapper>
      <div className="add-option__header">
        {options?.map((item: any) => {
          if (type === "radio") {
            return (
              <Radio
                disabled
                name={`field-${ramdomId}`}
                key={item.value}
                label={item.label}
                onChange={() => console.log("log")}
              />
            );
          }

          return (
            <>
              <Checkbox
                disabled
                key={item.value}
                label={item.label}
                onChange={() => console.log("log")}
              />
            </>
          );
        })}
      </div>
    </AddOptionWrapper>
  );
};

export default AddOptions;
