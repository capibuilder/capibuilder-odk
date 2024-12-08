import { ImportIcon, StartIcon, TemplateIcon } from "@/assets";
import { SurveyModel, UploadSurveyModal } from "@/components";
import useKeyPress from "@/hooks/useKeyPress";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { CreateSurveyCard, CreateSurveyContainer, SurveyGrid } from "./styles";

// type StateProps = "copy" | "template";

const CreateSurvey = () => {
  const { push } = useRouter();
  const [openModel, setOpenModel] = useState(false);
  const [openUploadModel, setOpenUploadModel] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const { query } = useRouter();
  const projectId = query.projectid as string;

  useKeyPress("Escape", () => {
    setOpenModel(false);
    setOpenUploadModel(false);
  });

  return (
    <CreateSurveyContainer>
      {openUploadModel && (
        <UploadSurveyModal
          handleClose={() => {
            setOpenUploadModel(false);
          }}
        />
      )}
      {openModel && <SurveyModel handleClose={() => setOpenModel(false)} />}
      <Head>
        <title>CAPIBuilder: Design ODK Survey & Data Collection Form</title>
      </Head>
      <h1 className="page__title">Build Form</h1>
      <SurveyGrid>
        <CreateSurveyCard
          data-animate="opacity"
          onClick={() => {
            setOpenModel(true);
          }}
        >
          <StartIcon />
          <h2>Use Form Designer</h2>
          <p>Drag-n-drop question types to create a new survey form.</p>
        </CreateSurveyCard>
        <CreateSurveyCard
          data-animate="opacity"
          onClick={() => {
            push(`/projects/${projectId}/survey/new/templates`);
          }}
        >
          <TemplateIcon />
          <h2>Use Template</h2>
          <p>Start a survey or data collection form using template.</p>
        </CreateSurveyCard>
        <CreateSurveyCard
          data-animate="opacity"
          onClick={() => {
            setOpenUploadModel(true);
          }}
        >
          <ImportIcon />
          <h2>Import ODK XML/XLS</h2>
          <p>If you have an ODK compliant XLS or XML form, import it here.</p>
        </CreateSurveyCard>
      </SurveyGrid>
    </CreateSurveyContainer>
  );
};

export default CreateSurvey;
