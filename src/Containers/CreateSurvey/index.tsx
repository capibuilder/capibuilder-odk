import { ImportIcon, StartIcon, TemplateIcon } from "@/assets";
import TimeEmailIcon from "@/assets/icons/TimeEmailIcon";
import { SurveyModel, UploadSurveyModal } from "@/components";
import { useEmailStore } from "@/context/EmailStores";
import useKeyPress from "@/hooks/useKeyPress";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormControl, SelectFormControl } from "socialwell-design";
import {
  CreateSurveyCard,
  CreateSurveyContainer,
  SurveyDrawer,
  SurveyDrawerOverlay,
  SurveyGrid,
} from "./styles";

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
      {openDrawer && (
        <SurveyDrawerViewer handleClose={() => setOpenDrawer(false)} />
      )}
      <Head>
        <title>Create Survey</title>
      </Head>
      <h1 className="page__title">Create survey</h1>
      <SurveyGrid>
        <CreateSurveyCard
          data-animate="opacity"
          onClick={() => {
            setOpenModel(true);
          }}
        >
          <StartIcon />
          <h2>Start from scratch</h2>
          <p>
            Innovate and Assemble: From Scratch to Structure, the Building
            Begins
          </p>
        </CreateSurveyCard>
        <CreateSurveyCard
          data-animate="opacity"
          onClick={() => {
            push(`/projects/${projectId}/survey/new/templates`);
          }}
        >
          <TemplateIcon />
          <h2>Start from template</h2>
          <p>From Template to Transformation: Crafting Unique Beginnings</p>
        </CreateSurveyCard>
        <CreateSurveyCard
          data-animate="opacity"
          onClick={() => {
            setOpenUploadModel(true);
          }}
        >
          <ImportIcon />
          <h2>Import form</h2>
          <p>Seamless Integration: Uniting Form and Function through Import</p>
        </CreateSurveyCard>
        <CreateSurveyCard
          data-animate="opacity"
          onClick={() => {
            setOpenDrawer(true);
          }}
        >
          <TimeEmailIcon />
          <h2>Data from email attachments</h2>
          <p>
            Attach and Extract: From Email to Excel, the Data Journey Begins
          </p>
        </CreateSurveyCard>
      </SurveyGrid>
    </CreateSurveyContainer>
  );
};

const SurveyDrawerViewer = ({ handleClose }: { handleClose: () => void }) => {
  const { setData, emptyField } = useEmailStore();
  const [form, setForm] = useState({
    dataCollectionName: "",
    emailSentTo: {
      value: "",
      label: "Select",
    },
    emailSentFrom: {
      value: "",
      label: "Select",
    },
    emailSubject: {
      value: "",
      label: "Select",
    },
    permissableAttachment: ".XLSX, .XLS, .CSV",
  });
  const { push, query } = useRouter();

  const handleClick = async () => {
    try {
      emptyField();
      setData({
        projectId: query.projectid as string,
        dataCollectionName: form.dataCollectionName,
        emailSentTo: form.emailSentTo.value,
        emailSentFrom: form.emailSentFrom.value,
        emailSubject: form.emailSubject.value,
        permissableAttachment: form.permissableAttachment,
      });

      push(`/projects/${query.projectid}/survey/email-survey`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <SurveyDrawerOverlay onClick={handleClose} />
      <SurveyDrawer>
        <div className="survey-drawer-title">Email Submissions</div>
        <div className="survey-drawer-content">
          <FormControl
            inputType="text"
            label="Data Collection Name"
            name="dataCollectionName"
            value={form.dataCollectionName}
            onChange={e =>
              setForm({ ...form, dataCollectionName: e.target.value })
            }
            placeholder="Name to identify the data collection"
            required
          />
          {/* <FormControl
            inputType="text"
            label="Email sent to"
            name="emailSentTo"
            value={form.emailSentTo}
            onChange={e => setForm({ ...form, emailSentTo: e.target.value })}
            required
          /> */}
          <SelectFormControl
            label="Email sent to"
            onChange={(o: any) => {
              setForm({ ...form, emailSentTo: o });
            }}
            options={[
              {
                label: "harsh.mca19.du@gmail.com",
                value: "harsh.mca19.du@gmail.com",
              },
            ]}
            value={form.emailSentTo}
            required
          />
          {/* <FormControl
            inputType="text"
            label="Email sent from"
            name="emailSentFrom"
            value={form.emailSentFrom}
            onChange={e => setForm({ ...form, emailSentFrom: e.target.value })}
            required
          /> */}
          <SelectFormControl
            label="Email sent from"
            onChange={(o: any) => {
              setForm({ ...form, emailSentFrom: o });
            }}
            options={[
              {
                label: "harsh@socialwell.net",
                value: "harsh@socialwell.net",
              },
            ]}
            value={form.emailSentFrom}
            required
          />
          {/* <FormControl
            inputType="text"
            label="Email Subject has this words"
            name="emailSubject"
            value={form.emailSubject}
            onChange={e => setForm({ ...form, emailSubject: e.target.value })}
            required
          /> */}
          <SelectFormControl
            label="Email Subject has this words"
            onChange={(o: any) => {
              setForm({ ...form, emailSubject: o });
            }}
            options={[
              {
                label: "Karnataka NBS",
                value: "KarnatakaANDNBS",
              },
            ]}
            value={form.emailSubject}
            required
          />
          <FormControl
            inputType="text"
            label="Permissable attachment extensions"
            name="permissableAttachment"
            value={form.permissableAttachment}
            onChange={e =>
              setForm({ ...form, permissableAttachment: e.target.value })
            }
            disabled
            required
          />
        </div>
        <div className="btns">
          <button onClick={handleClose} className="secondary">
            Cancel
          </button>
          <button className="primary" onClick={handleClick}>
            Create Email Submission
          </button>
        </div>
      </SurveyDrawer>
    </>
  );
};

export default CreateSurvey;
