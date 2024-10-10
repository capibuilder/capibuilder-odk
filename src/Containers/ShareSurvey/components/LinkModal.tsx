import { CloseIcon } from "@/assets";
import { SwitchOption } from "@/components";
import useKeyPress from "@/hooks/useKeyPress";
import useToken from "@/hooks/useToken";
import { odkAxios } from "@/utils/useAxios";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { CloseButton, FormControl, useAlert } from "socialwell-design";
import {
  Button,
  Form,
  ModelWrapper,
  Overlay,
  SurveyModelContainer,
  Title,
} from "./styles";

const LinkModal = ({
  handleClose,
  refresh,
}: {
  handleClose: () => void;
  refresh: () => void;
}) => {
  const { query } = useRouter();
  const projectId = query.projectid as string;
  const [form, setData] = useState({ name: "", once: false });
  const { setAlert } = useAlert();
  const { token } = useToken();

  const getPublicAccessLink = () => {
    odkAxios
      .post(
        `/v1/projects/${projectId}/forms/${query.surveyId}/public-links`,
        { displayName: form.name, once: form.once },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        setAlert({
          show: true,
          state: "success",
          text: "Success! Your Public Access Link has been created and is now live",
          title: "Link created",
        });
        refresh();
        handleClose();
      })
      .catch(() => {
        setAlert({
          show: true,
          state: "error",
          text: "Something went wrong",
          title: "Request Failed",
        });
      })
      .finally(() => {});
  };

  useKeyPress("Escape", () => {
    handleClose();
  });

  const inputRef: any = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <SurveyModelContainer>
      <Overlay onClick={handleClose} />
      <ModelWrapper data-animate="opacity">
        <div className="close-btn">
          <CloseButton onClick={handleClose} icon={<CloseIcon />} />
        </div>
        <Title>Enable web responses.</Title>
        <Form
          onSubmit={e => {
            e.preventDefault();
            getPublicAccessLink();
          }}
        >
          <FormControl
            ref={inputRef}
            required
            inputType="text"
            label="Display Name"
            name="name"
            onChange={e => {
              setData(v => ({ ...v, name: e.target.value }));
            }}
            placeholder="Display Name"
            value={form.name}
          />

          <SwitchOption
            helpText="Allow only one Submission from each browser."
            name="Single Submission"
            isChecked={form.once}
            onChange={e => {
              setData(v => ({ ...v, once: e.target.checked }));
            }}
          />

          <Button disabled={!form?.name} type="submit">
            create survey
          </Button>
        </Form>
      </ModelWrapper>
    </SurveyModelContainer>
  );
};

export default LinkModal;
