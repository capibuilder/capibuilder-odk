import authStore from "@/context/authStores";
import useSurveyStore from "@/context/surveyStores";
import useInputFocus from "@/hooks/useInputFocus";
import useToken from "@/hooks/useToken";
import { Overlay } from "@/styles/globals";
import { odkAxios } from "@/utils/useAxios";
import axios from "axios";
import { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useAlert } from "socialwell-design";
import { parseString } from "xml2js";
import { Empty, Loading } from "..";
import { PastSurveyWrapper } from "./styles";

interface props {
  onClose: () => void;
  field?: any;
  addData?: any;
  setMenuData?: any;
}

export interface data {
  id?: string;
  label?: string;
  options: string[];
}

export default function Index({ onClose, addData, setMenuData }: props) {
  const { currentField, data } = useSurveyStore(state => state);
  const { token } = useToken();
  const getProjectId = authStore(state => state.getProjectId);
  const [allSurvey, setAllSurvey] = useState<null | any[]>(null);
  const [query, setQuery] = useState("");
  const { setAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [options, setOptionsData] = useState<null | data[]>(null);

  const getAllSurveys = () => {
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
                    setOptionsData(opts);
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
              setOptionsData(opts);
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

  useEffect(() => {
    getAllSurveys();
  }, []);

  const focusInputRef: any = useInputFocus();

  const filtered: any[] = allSurvey
    ? allSurvey.filter(e =>
        e.title.toLowerCase()?.includes(query.toLowerCase())
      )
    : [];

  const handleAddOptions = (input: string[]) => {
    let newOptions = input.map((d: string) => ({
      label: d,
      value: d,
    }));

    newOptions = [
      ...newOptions,
      ...data.fields[currentField as string]?.selectOptions,
    ];

    newOptions = removeDuplicatOptions(newOptions);

    addData({
      selectOptions: [...newOptions],
    });
    setMenuData({
      label: "",
      value: "",
    });
    onClose();
  };

  return (
    <>
      <Overlay
        onClick={() => {
          onClose();
        }}
      >
        <PastSurveyWrapper
          className="c-scrollbar"
          data-animate="opacity"
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <input
            onChange={e => {
              setQuery(e.target.value);
            }}
            ref={focusInputRef}
            type="search"
            placeholder="Search..."
          />
          {loading ? (
            <Loading height="250px" />
          ) : filtered && filtered.length === 0 ? (
            <Empty />
          ) : options ? (
            <>
              <span
                onClick={() => {
                  setOptionsData(null);
                }}
                className="back"
              >
                <IoArrowBackOutline size={25} /> Go back
              </span>
              <ul data-animate="slideLeft">
                {options.map((data, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      handleAddOptions(data.options);
                    }}
                  >
                    {data.label}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <>
              <ul>
                {filtered.map((survey, index) => (
                  <li
                    key={index}
                    data-animate="slideRight"
                    onClick={() => {
                      getXMLOfSurvey(survey.xmlFormId, survey.isPublished);
                    }}
                  >
                    {survey?.title}
                  </li>
                ))}
              </ul>
            </>
          )}
        </PastSurveyWrapper>
      </Overlay>
    </>
  );
}

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
