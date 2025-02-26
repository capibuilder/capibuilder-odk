import { PrimaryButton } from "@/components";
import authStore from "@/context/authStores";
import useSurveyStore from "@/context/surveyStores";
import useToken from "@/hooks/useToken";
import { questionField } from "@/interfaces/questionFields";
import { compareValueFormArray } from "@/utils/compareValueFormArray";
import generateXml from "@/utils/generateXml";
import { hasDuplicates } from "@/utils/hasDuplicatesTag";
import { modifiedJsonData } from "@/utils/modifiedJsonData";
import { odkAxios, templateAxios } from "@/utils/useAxios";
import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoChevronBackOutline } from "react-icons/io5";
import { useAlert } from "socialwell-design";
import { shallow } from "zustand/shallow";
import ContentHeader from "./components/ContentHeader";
import ContentWrapperView from "./components/ContentWrapperView";
import OtherLanguages from "./components/ContentWrapperView/OtherLanguages";
import InputTypes from "./components/InputTypeContainer";
import QuestionHeader from "./components/QuestionHeader";
import SaveTemplates from "./components/SaveTemplates";
import {
  Content,
  DesignSurveyContainer,
  DesignSurveyHeader,
  DesignSurveyWrapper,
  Leftside,
  Rightside,
  Title,
} from "./styles";

const DesignSurvey = () => {
  // const getProjectId = authStore(state => state.getProjectId);
  const userInfo = authStore(state => state.getUserDetails());
  const hasLoggedin = authStore(state => state.isLoggedIn);
  const data = useSurveyStore(state => state.data, shallow);
  const setData = useSurveyStore(state => state.setData);
  const [allTemplate, setAllTemplate] = useState([]);
  const [allSurveys, setAllSurveys] = useState([]);
  const { setAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const { query, push } = useRouter();
  const projectId = query.projectid as string;

  const [showTemplateSave, setshowTemplateSave] = useState(false);

  // const [showLogicPopUp, setShowlogicPopUp] = useState(false);
  const [xmlLoading, setXmlLoading] = useState(false);
  const { token } = useToken();

  useEffect(() => {
    templateAxios
      .get("/getTemplates")
      .then(e => {
        setAllTemplate(e.data);
      })
      .catch(err => {
        setAlert({
          title: "Error",
          text: err.message,
          state: "error",
          show: true,
        });
      });
  }, []);

  useEffect(() => {
    if (!projectId) return;
    axios
      .post("/api/get-surveys", {
        projectId: projectId,
        token,
      })
      .then(e => {
        setAllSurveys(e.data);
      })
      .catch(err => {
        setAlert({
          title: "Error",
          text: err.message,
          state: "error",
          show: true,
        });
      });
  }, [projectId]);

  const handleXmlSubmit = (directPublish: boolean) => {
    setXmlLoading(true);
    if (Object.values(data.fields).length === 0) {
      setXmlLoading(false);
      setAlert({
        title: "Error",
        text: "Please add at least one question",
        state: "error",
        show: true,
      });
      return;
    }

    if (data.title.length === 0) {
      setXmlLoading(false);
      setAlert({
        title: "Error",
        text: "Survey name cannot be empty",
        state: "error",
        show: true,
      });
      return;
    }

    if (
      compareValueFormArray(
        data.title,
        allSurveys.map((data: any) => data.title)
      ) &&
      !query.formEdit
    ) {
      setXmlLoading(false);
      setAlert({
        title: "Error",
        text: "Survey name already exist",
        state: "error",
        show: true,
      });
      return;
    }

    const emptyDataAttribute: any = Object.values(data.fields).find(
      (field: any) => field.dataAttribute === ""
    );

    if (emptyDataAttribute) {
      setXmlLoading(false);
      setAlert({
        title: "Empty data attribute",
        text: `Select Data Attribute for ${
          emptyDataAttribute?.label || "all Questions"
        }`,
        state: "error",
        show: true,
      });
      return;
    }

    const emptySelectOptions: any = Object.values(data.fields).find(
      (field: any) =>
        field.type?.includes("select") && field.selectOptions?.length === 0
    );

    if (emptySelectOptions) {
      setXmlLoading(false);
      setAlert({
        title: "Empty Select Options",
        text: `Select Select Options  for ${
          emptySelectOptions?.label || "all Questions"
        }`,
        state: "error",
        show: true,
      });
      return;
    }

    const hasEmptyField = Object.values(data.fields).some((field: any) => {
      if (field.group) {
        const empty = Object.values(field.groupfields).find(
          (subField: any) => subField.dataAttribute === ""
        ) as questionField | undefined;

        if (empty) {
          setAlert({
            title: "Empty data attribute",
            text: `Select Data Attribute for ${
              (empty as questionField).label || "all Questions"
            }`,
            state: "error",
            show: true,
          });
          return true;
        }
      }
      return false;
    });

    if (hasEmptyField) {
      return;
    }

    const hasDuplicate = hasDuplicates(Object.values(data.fields));

    if (hasDuplicate) {
      setXmlLoading(false);
      setAlert({
        title: "Duplicate Data Attribute",
        text: "Make sure two question have not same Data Attribute.",
        state: "error",
        show: true,
      });
      return;
    }

    const { token } = useToken();

    try {
      setXmlLoading(true);
      const jsonData = {
        title: data.title,
        // entityDataset: data?.entityDataset,
        fields: data.fields,
        entity: data.entity || undefined,
        langs: data.langs || [],
        dataset: data.dataset,
        uniqueIdentifier: data.uniqueIdentifier,
      };

      const xmlData = generateXml({
        jsonData,
        minify: true,
      } as any);

      const jsonString = JSON.stringify(jsonData);

      const blob = new Blob([jsonString], { type: "application/json" });

      (async () => {
        if (query.formEdit) {
          const formData = new FormData();
          formData.append("file", blob);
          formData.append("projectId", projectId);
          formData.append("fileName", query.fileName as string);

          await axios.put(
            `${process.env.NEXT_PUBLIC_PIVOT_API_BASE_URL}/updateFile`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          await odkAxios.post(
            `/v1/projects/${projectId}/forms/${query.formEdit}/draft?ignoreWarnings=true`,
            xmlData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        } else {
          const formData = new FormData();
          formData.append("file", blob);
          formData.append("projectId", projectId);
          formData.append("fileName", data.title.replaceAll(" ", "-"));
          formData.append("type", "survey");

          await axios.post(
            `${process.env.NEXT_PUBLIC_PIVOT_API_BASE_URL}/uploadFile`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          await odkAxios.post(
            `/v1/projects/${projectId}/forms?ignoreWarnings=true&publish=${
              directPublish ? "true" : "false"
            }`,
            xmlData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
        }

        setAlert({
          title: "Success",
          text: "Survey created successfully",
          state: "success",
          show: true,
        });

        push(`/projects/${projectId}/survey`);
      })();
    } catch (error: any) {
      if (error?.response?.data?.code && error.response.data.code === 403.1) {
        setAlert({
          show: true,
          state: "error",
          text: "Your account has no permission to perform this action.",
          title: "Error",
        });

        return;
      }
      setAlert({
        show: true,
        state: "error",
        text: "Something went wrong!",
        title: "",
      });
    } finally {
      setXmlLoading(false);
    }
  };

  const handleTemplateSubmit = async () => {
    setLoading(true);
    if (Object.values(data.fields).length === 0) {
      setLoading(false);
      setAlert({
        title: "Error",
        text: "Please add at least one question",
        state: "error",
        show: true,
      });
      return;
    }

    if (
      compareValueFormArray(
        data.title,
        allTemplate.map((data: any) => data.templateTitle)
      ) &&
      !query.edit
    ) {
      setLoading(false);
      setAlert({
        title: "Error",
        text: "Template name already exist",
        state: "error",
        show: true,
      });
      return;
    }

    const templateData = new FormData();
    const numberOfQuestion = Object.values(data.fields).length;
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: "application/json" });

    templateData.append("templateTitle", data.title);
    templateData.append("surveyCategoryId", data.category);
    templateData.append("accessType", "PUBLIC");
    templateData.append("formType", "TEMPLATE");
    templateData.append("projectId", projectId);
    templateData.append("numberOfQuestion", numberOfQuestion.toString());
    templateData.append("description", data.description);
    templateData.append("templateFile", blob);
    templateData.append("author", userInfo.email);

    try {
      if (query.edit) {
        templateData.append("templateId", query.edit as string);
        await templateAxios.post("/updateTemplate", templateData);
        setAlert({
          title: "Success",
          text: "Template Updated successfully",
          state: "success",
          show: true,
        });
        // push("/templates");
        return;
      }

      await templateAxios.post("/createTemplate", templateData);
      setAlert({
        title: "Success",
        text: "Template created successfully",
        state: "success",
        show: true,
      });
      // push("/templates");
    } catch (error: any) {
      setAlert({
        title: "Error",
        text: error.message,
        state: "error",
        show: true,
      });
    } finally {
      setshowTemplateSave(false);
      setLoading(false);
    }
  };

  if (!hasLoggedin) {
    push("/");
    return null;
  }

  return (
    <DesignSurveyContainer>
      {/* {showLogicPopUp && (
        <LogicPopup onClose={() => setShowlogicPopUp(false)} />
      )} */}
      <Head>
        <title>{data.title ? data.title : "Design Survey"} | ODK Survey</title>
      </Head>
      <DesignSurveyHeader>
        <div>
          <Title>
            <Link
              href={`/projects/${projectId}/survey/new`}
              className="back-button"
            >
              <IoChevronBackOutline size={24} />
            </Link>
            <span>Build Form</span>

            <div className="group">
              <input
                type="text"
                placeholder="Form title"
                value={data.title}
                onChange={e => {
                  setData({
                    ...data,
                    title: e.target.value,
                  });
                }}
              />
              {/* <input
                type="text"
                placeholder="Enter name of your survey"
                onChange={e => {
                  setData({
                    ...data,
                    entityDataset: e.target.value,
                  });
                }}
              /> */}
            </div>
          </Title>

          <div className="description-group">
            <input
              type="text"
              value={data.description}
              onChange={e => {
                setData({
                  ...data,
                  description: e.target.value,
                });
              }}
              placeholder="Enter description here (optional)"
            />
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            position: "relative",
          }}
        >
          {showTemplateSave && (
            <SaveTemplates
              onCancel={() => {
                setshowTemplateSave(false);
              }}
              handleSubmit={handleTemplateSubmit}
            />
          )}
          <PrimaryButton
            onClick={() => {
              setshowTemplateSave(v => !v);
            }}
            loading={loading}
            name={query.edit ? "Update Template" : "Save as Template"}
            ghost
          />
          <PrimaryButton
            onClick={() => handleXmlSubmit(false)}
            loading={xmlLoading}
            name={!query.formEdit ? "Save Draft" : "Update Draft"}
            secondary
          />
          {!query.formEdit && (
            <PrimaryButton
              onClick={() => handleXmlSubmit(true)}
              loading={xmlLoading}
              name={"Publish"}
            />
          )}
        </div>
      </DesignSurveyHeader>
      <DesignSurveyWrapperView />
    </DesignSurveyContainer>
  );
};

const DesignSurveyWrapperView = () => {
  const [open, setOpen] = useState(false);
  const data = useSurveyStore(state => state.data);
  const currentField = useSurveyStore(state => state.currentField)!;
  const setCurrentTabBtn = useSurveyStore(state => state.setCurrentTabBtn);
  const [isGrouped, setIsGrouped] = useState(false);

  const handleClick = (currentBtn: string, group?: boolean, id?: string) => {
    if (group) {
      setIsGrouped(true);
      setCurrentTabBtn(id);
      setOpen(!open);
      document.body.style.overflow = "hidden";
      return;
    }

    setIsGrouped(false);
    setOpen(!open);
    document.body.style.overflow = "hidden";
    setCurrentTabBtn(currentBtn);
  };

  const contentData = Object.values(modifiedJsonData(data.fields)).filter(
    (item: any) => item.tab === "content"
  );

  const current = data.fields[currentField] as any;

  return (
    <DesignSurveyWrapper>
      <Leftside>
        <ContentHeader
          title="content"
          handleClick={handleClick}
          data={contentData}
        />
      </Leftside>
      <Content
        className="c-scrollbar"
        style={{
          maxHeight: "calc(100vh - 100px)",
        }}
      >
        <ContentWrapperView />
        {current?.otherLangs?.map(v => (
          <OtherLanguages key={v.lang} multiLangs={v} field={current} />
        ))}
      </Content>
      {current && (
        <Rightside>
          <QuestionHeader />
        </Rightside>
      )}
      <InputTypes {...{ open, setOpen, isGrouped }} />
    </DesignSurveyWrapper>
  );
};

export default DesignSurvey;
