import { CloseIcon } from "@/assets";
import { allLanguages } from "@/constant/languges";
import useSurveyStore from "@/context/surveyStores";
import useInputFocus from "@/hooks/useInputFocus";
import useToken from "@/hooks/useToken";
import { ModelWrapper } from "@/styles/globals";
import { odkAxios, templateAxios } from "@/utils/useAxios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import Select from "react-select";
import "react-tippy/dist/tippy.css";
import { CloseButton, Flex, FormControl, ToolTips } from "socialwell-design";

import { FormInterface } from "@/interfaces";
import { generateRandomId } from "@/utils/generateRandomId";
import { shallow } from "zustand/shallow";
import Loading from "../Loading";
import { Button, Form, Overlay, SurveyModelContainer } from "./styles";

const SurveyModel = ({ handleClose }: { handleClose: () => void }) => {
  const { push, query } = useRouter();
  const data = useSurveyStore(state => state.data, shallow);
  const setData = useSurveyStore(state => state.setData);
  const removeCurrentField = useSurveyStore(state => state.removeCurrentField);

  const projectId = query.projectid;
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [allSurvey, setAllSurvey] = useState<string[]>([]);
  const { token } = useToken();
  const [Error, setError] = useState({ feild: "", message: "" });

  const [forms, setForms] = useState<FormInterface[]>();

  const [detail, setDetail] = useState({
    surveyName: "",
    surveyCategory: { label: "Select", value: "" },
    langs: [],
    dataset: null,
    dataSetForm: { id: "", name: "" },
  });

  const focusInputRef = useInputFocus();

  useEffect(() => {
    templateAxios
      .get("/getSurveyCategories")
      .then(response => {
        const data = response.data.map((item: any) => ({
          label: item.categoryName,
          value: item.categoryId,
        }));

        setCategory(data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setLoading(true);

    odkAxios
      // .get(`/v1/projects/${projectId}/datasets`, {
      .get(`/v1/projects/${projectId}/forms`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Extended-Metadata": "true",
        },
      })
      .then(e => {
        setAllSurvey(e.data.map((v: FormInterface) => v.name));
        setForms(
          e.data
            .filter((v: FormInterface) => v.publishedAt)
            .filter((v: any) => v.entityRelated)
        );
      })
      .catch(() => {
        setForms([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (allSurvey.includes(detail.surveyName)) {
      setError({
        feild: "name",
        message: `${detail.surveyName} is already exists in your surveys , choose another name.`,
      });
      return;
    }

    if (detail.surveyName === "") {
      setError({
        feild: "name",
        message: "Survey name is required",
      });

      return;
    }

    if (detail.surveyCategory.value === "") {
      setError({
        feild: "category",
        message: "Survey Category is required",
      });

      return;
    }

    setLoading(true);

    try {
      let datasetName = null;
      if (detail.dataSetForm.id) {
        const { data: response } = await odkAxios.get(
          `/v1/projects/${projectId}/forms/${detail.dataSetForm.id}/dataset-diff`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response?.[0]?.properties?.length === 0) {
          setLoading(false);
          return setError({
            feild: "dataset",
            message:
              "The dataset doesn't contain any properties, so it's unusable.",
          });
        }
        datasetName = response?.[0]?.name;
      }

      setData({
        ...data,
        title: detail.surveyName,
        category: detail.surveyCategory.value,
        description: "",
        fields: {},
        entity: { datasetName: generateRandomId(8) },
        dataset: datasetName,
        langs: detail.langs,
      });

      removeCurrentField();

      push(`/projects/${projectId}/survey/design-survey`);
    } catch (error) {
      setLoading(false);

      return setError({
        feild: "dataset",
        message: "Something went wrong",
      });
      console.log(error);
    }
  };

  return (
    <SurveyModelContainer>
      <Overlay onClick={handleClose} />
      <ModelWrapper data-animate="opacity" className="c-scrollbar">
        {loading ? (
          <Loading height="30px" />
        ) : (
          <>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              className="head"
            >
              <h2>Name your Survey</h2>
              <div className="close-btn">
                <CloseButton onClick={handleClose} icon={<CloseIcon />} />
              </div>
            </Flex>
            <hr />

            <Form onSubmit={handleSubmit}>
              <div>
                <FormControl
                  required
                  ref={focusInputRef}
                  inputType="text"
                  label="Survey Name"
                  name="surveyName"
                  onChange={e => {
                    setError({ feild: "", message: "" });
                    setDetail((prevData: any) => ({
                      ...prevData,
                      surveyName: e.target.value,
                    }));
                  }}
                  placeholder="Survey Name"
                  value={detail.surveyName}
                />
                {Error.feild === "name" && (
                  <span className="error">{Error.message}</span>
                )}
              </div>

              <div className="lang">
                <div className="label">Survey Category</div>
                <Select
                  required
                  onChange={(o: any) => {
                    setError({ feild: "", message: "" });
                    setDetail((prevData: any) => ({
                      ...prevData,
                      surveyCategory: o,
                    }));
                  }}
                  value={detail.surveyCategory}
                  options={getCategoriesOptions(category)}
                />
                {Error.feild === "category" && (
                  <span className="error">{Error.message}</span>
                )}
              </div>
              <div className="lang">
                <div className="label">
                  Form languages{" "}
                  <ToolTips text="English is the primary language. Other languages will be automatically translated by the system, although you can make corrections to add a human touch.">
                    <AiFillQuestionCircle />
                  </ToolTips>
                </div>
                <Select
                  options={
                    allLanguages?.map(v => ({
                      label: `${v?.value?.toUpperCase()}-${v.label} (${
                        v.nativeName
                      })`,
                      value: v.value,
                    })) as any
                  }
                  onChange={e => {
                    setDetail((prevData: any) => ({
                      ...prevData,
                      langs: e.map((vv: any) => vv?.value),
                    }));
                  }}
                  isMulti
                  value={detail.langs?.map(vv => ({ label: vv, value: vv }))}
                />
              </div>
              <div className="lang">
                <div className="label">
                  Select Survey{" "}
                  <ToolTips text="Selecting a survey will give you access to the Project Dataset from the earlier survey form to this new survey form.">
                    <AiFillQuestionCircle />
                  </ToolTips>
                </div>
                <Select
                  autoFocus={Error.feild === "dataset"}
                  options={
                    forms?.map(v => ({
                      label: v.name,
                      value: v.xmlFormId,
                    })) as any
                  }
                  onChange={(e: any) => {
                    setError({ feild: "", message: "" });
                    setDetail((prevData: any) => ({
                      ...prevData,
                      dataSetForm: {
                        id: e.value,
                        name: e.label,
                      },
                    }));
                  }}
                  value={{
                    label: detail.dataSetForm.name,
                    value: detail.dataSetForm.id,
                  }}
                />
                {Error.feild === "dataset" && (
                  <span className="error">{Error.message}</span>
                )}
              </div>
              <Button disabled={Error.feild !== ""} type="submit">
                create survey
              </Button>
            </Form>
          </>
        )}
      </ModelWrapper>
    </SurveyModelContainer>
  );
};

const getCategoriesOptions = (categories: any[]) => {
  if (categories.length === 0) {
    return [
      {
        label: "Select",
        value: "",
      },
      {
        label: "Health",
        value: "HEALTH",
      },
    ];
  }

  return [
    {
      label: "Select",
      value: "",
    },
    ...categories,
  ];
};

export default SurveyModel;
