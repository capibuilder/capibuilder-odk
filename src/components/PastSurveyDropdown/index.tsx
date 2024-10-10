import { CloseIcon } from "@/assets";
import authStore from "@/context/authStores";
import useSurveyStore from "@/context/surveyStores";
import useInputFocus from "@/hooks/useInputFocus";
import useToken from "@/hooks/useToken";
import { Overlay } from "@/styles/globals";
import { odkAxios } from "@/utils/useAxios";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Flex, useAlert } from "socialwell-design";
import styled from "styled-components";
import { parseString } from "xml2js";
import { Loading } from "..";
import { PastSurveyWrapper } from "./styles";

interface props {
  onClose: () => void;
  field?: any;
  addData?: any;
  dataAttribute?: string;
}

export interface dataType {
  value?: string;
  label?: string;
}

export default function Index({ onClose, addData, dataAttribute }: props) {
  const { currentField, data } = useSurveyStore(state => state);
  const { token } = useToken();
  const getProjectId = authStore(state => state.getProjectId);
  const [allSurvey, setAllSurvey] = useState<null | any[]>(null);
  const { setAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [options, setOptionsData] = useState<null | dataType[]>(null);
  const [selcted, setSelcted] = useState("Select dropdown type");
  const [customOption, setCustomOption] = useState("");

  const current = useMemo(() => {
    return data.fields[currentField as string];
  }, [currentField]);

  useEffect(() => {
    setLoading(true);
    setOptionsData(current?.selectOptions);
    setLoading(false);
  }, []);

  const getAllSurveys = () => {
    if (current?.typeLabel === "multiple choice") {
      return setAllSurvey([]);
    }
    setLoading(true);

    axios
      .post("/api/get-surveys", {
        projectId: getProjectId(),
        token,
      })
      .then(e => {
        setAllSurvey(e.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const getXMLOfSurvey = (xmlFormId: string, isPublished: boolean) => {
    setLoading(true);
    if (isPublished) {
      odkAxios
        .get(`/v1/projects/${getProjectId()}/forms/${xmlFormId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(e => {
          if (e.data.version) {
            odkAxios
              .get(
                `/v1/projects/${getProjectId()}/forms/${xmlFormId}/versions/${
                  e.data.version
                }.xml`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              )
              .then(e => {
                parseString(e.data, function (err: any, result: any) {
                  const opts = convertToJson(
                    result["h:html"]["h:head"][0].model[0].itext
                  );

                  if (opts.filter(o => o.options.length !== 0).length > 0) {
                    const newOptions = opts
                      ?.filter(v => v.id === dataAttribute)[0]
                      ?.options.map((d: string) => ({
                        label: d,
                        value: d,
                      }));

                    if (!newOptions) {
                      setAlert({
                        show: true,
                        state: "error",
                        text: `In this form no any option with ${current?.dataAttribute} Tag`,
                        title: "Incorrect Tag",
                      });

                      return;
                    }

                    let filterred = options
                      ? [...options, ...newOptions]
                      : newOptions;
                    filterred = removeDuplicatOptions(filterred);

                    setOptionsData(filterred);
                  } else {
                    setAlert({
                      show: true,
                      state: "error",
                      text: "This survey havent any options ",
                      title: "Options does not exist",
                    });
                  }
                });
              });
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      odkAxios
        .get(`/v1/projects/${getProjectId()}/forms/${xmlFormId}/draft.xml`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(e => {
          parseString(e.data, function (err: any, result: any) {
            const opts = convertToJson(
              result["h:html"]["h:head"][0].model[0].itext
            );

            if (opts.filter(o => o.options.length !== 0).length > 0) {
              const newOptions = opts
                ?.filter(v => v.id === dataAttribute)[0]
                ?.options.map((d: string) => ({
                  label: d,
                  value: d,
                }));

              if (!newOptions) {
                setAlert({
                  show: true,
                  state: "error",
                  text: `In this form no any option with ${current?.dataAttribute} Tag`,
                  title: "Incorrect Tag",
                });

                return;
              }

              let filterred = options
                ? [...options, ...newOptions]
                : newOptions;
              filterred = removeDuplicatOptions(filterred);

              setOptionsData(filterred);
            } else {
              setAlert({
                show: true,
                state: "error",
                text: "This survey havent any options ",
                title: "Options does not exist",
              });
            }
          });
        })
        .catch(() => {})
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleDelete = (index: number) => {
    if (!options) return;
    const newArray = [...options] || [];
    newArray?.splice(index, 1);
    setOptionsData(newArray);
  };

  useEffect(() => {
    getAllSurveys();
  }, []);

  const handleAddOptions = () => {
    if (!options) return;
    let newOptions = [...options];

    newOptions = removeDuplicatOptions(newOptions);

    addData({
      selectOptions: [...newOptions],
    });
    setCustomOption("");
    onClose();
  };

  const handleClick = () => {
    if (!customOption) return;

    if (!options) {
      setOptionsData([
        {
          label: customOption,
          value: customOption,
        },
      ]);
      return;
    }

    let newOptions = [
      ...options,
      {
        label: customOption,
        value: customOption,
      },
    ];

    newOptions = removeDuplicatOptions(newOptions);

    setOptionsData(newOptions);
    setCustomOption("");
    setOpen(false);
  };

  return (
    <>
      <Overlay>
        <PastSurveyWrapper
          className="c-scrollbar"
          data-animate="opacity"
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <Flex
            justifyContent="space-between"
            className="head"
            alignItems="center"
          >
            <h3>Edit Choices</h3>
            <span
              onClick={() => {
                onClose();
              }}
            >
              <CloseIcon size="30px" />
            </span>
          </Flex>

          <Flex
            justifyContent="space-between"
            className="wrapper"
            alignItems="flex-start"
          >
            {loading ? (
              <div style={{ width: "50%" }}>
                <Loading height="290px" />
              </div>
            ) : (
              <>
                <ul className="Choises">
                  {options?.map((v, i) => (
                    <li key={i}>
                      <input
                        type={
                          current?.typeLabel === "multiple choice"
                            ? "checkbox"
                            : "radio"
                        }
                        name="opt"
                      />
                      {v.label}
                      <span
                        onClick={() => {
                          handleDelete(i);
                        }}
                      >
                        <CloseIcon size="20px" />
                      </span>
                    </li>
                  ))}
                  {open && (
                    <>
                      <AddOptionRow
                        current={current}
                        customOption={customOption}
                        handleClick={handleClick}
                        setCustomOption={setCustomOption}
                        setOpen={() => {
                          setOpen(false);
                        }}
                      />
                    </>
                  )}
                  <button
                    disabled={open}
                    className="add"
                    onClick={() => {
                      setOpen(true);
                    }}
                  >
                    Add Choices
                  </button>
                </ul>
              </>
            )}

            {current?.typeLabel !== "multiple choice" && (
              <div className="dropdown">
                <span>{selcted}</span>

                <ul>
                  {allSurvey?.map((survey, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        getXMLOfSurvey(survey.xmlFormId, survey.isPublished);
                        setSelcted(survey.title);
                      }}
                    >
                      {survey.title}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Flex>

          <Flex className="btns" gap="10px" justifyContent="flex-end">
            <button
              type="button"
              onClick={() => {
                onClose();
              }}
            >
              Cancel
            </button>
            <button
              disabled={options?.length === 0 || !options}
              type="button"
              onClick={() => {
                handleAddOptions();
              }}
            >
              Save
            </button>
          </Flex>
        </PastSurveyWrapper>
      </Overlay>
    </>
  );
}

const AddOptionRow = ({
  setOpen,
  setCustomOption,
  customOption,
  handleClick,
  current,
}: {
  setOpen: any;
  setCustomOption: any;
  customOption: string;
  handleClick: any;
  current: any;
}) => {
  const focusInputRef = useInputFocus();

  return (
    <InputRow>
      <input
        type={current?.typeLabel === "multiple choice" ? "checkbox" : "radio"}
        name="opt"
      />
      <form
        onSubmit={e => {
          e.preventDefault();
          handleClick();
        }}
      >
        <input
          onBlur={e => {
            if (e.target.value) {
              handleClick();
            } else {
              setOpen();
            }
          }}
          required
          ref={focusInputRef}
          onChange={e => {
            setCustomOption(e.target.value);
          }}
          value={customOption}
          type="text"
        />
      </form>
      <span
        onClick={() => {
          setOpen();
        }}
      >
        <CloseIcon size="20px" />
      </span>
    </InputRow>
  );
};

const InputRow = styled.li`
  input {
    outline: none;
    border: 1px solid grey;
    padding: 5px 10px;
    border-radius: 5px;
  }
`;

export function removeDuplicatOptions(array: any[]) {
  const uniqueObjects = [];
  const labels = new Set();

  for (const obj of array) {
    const label = obj.label;
    if (!labels.has(label)) {
      uniqueObjects.push(obj);
      labels.add(label);
    }
  }

  return uniqueObjects;
}

function convertToJson(jsonData: any[]) {
  const res: { id: any; label: any; options: any }[] = [];

  jsonData?.forEach((item: { translation: any[] }) => {
    const translation = item?.translation[0];

    const labels = translation.text.filter(
      (obj: { $: { id: string | string[] } }) =>
        obj.$ && obj.$.id.includes(":label")
    );
    labels.forEach((label: { $: { id: any }; value: any[] }) => {
      const labelId = label.$.id;
      const labelValue = label.value[0];

      const options = translation.text.filter(
        (obj: { $: { id: string | any[] } }) =>
          obj.$ && obj.$.id.includes(labelId.replace(":label", ""))
      );

      const optionValues = options
        .map((option: { value: any[] }) => option.value[0])
        ?.filter((v: string) => v !== labelValue);

      const labelOptions = {
        id: labelId?.replace("/data/", "")?.replace(":label", ""),
        label: labelValue,
        options: optionValues,
      };

      res.push(labelOptions);
    });
  });

  return res;
}
