import { CloseIcon } from "@/assets";
import useSurveyStore from "@/context/surveyStores";
import { ModelWrapper } from "@/styles/globals";
import { useState } from "react";
import Select from "react-select";
import { CloseButton, Flex } from "socialwell-design";
import { datasetProps } from "../QuestionHeader/ConnectionDropDown";
import { Button, Overlay, SurveyModelContainer } from "./styles";

interface datasetsResponse {
  name: string;
  createdAt: string;
  projectId: number;
  approvalRequired: boolean;
}

const SelectIdentifier = ({
  handleClose,
  data,
}: {
  handleClose: () => void;
  data: datasetProps[];
}) => {
  const [Error, setError] = useState({ feild: "", message: "" });
  const addData = useSurveyStore(state => state.addData);

  const [detail, setDetail] = useState({
    uniqueIdentifier: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (detail.uniqueIdentifier === "") {
      return setError({
        feild: "uniqueIdentifier",
        message: "Identifier is required !",
      });
    }

    addData({ uniqueIdentifier: detail.uniqueIdentifier });
    return handleClose();
  };

  return (
    <SurveyModelContainer>
      <Overlay onClick={handleClose} />
      <ModelWrapper data-animate="opacity" className="cont">
        <Flex
          alignItems="center"
          justifyContent="space-between"
          className="head"
        >
          <h2>Select identifier</h2>
          <div className="close-btn">
            <CloseButton onClick={handleClose} icon={<CloseIcon />} />
          </div>
        </Flex>
        <hr />

        <div>
          <Select
            options={data.map(e => ({ label: e.name, value: e.name }))}
            onChange={e => {
              setDetail({ uniqueIdentifier: e?.value || "" });
            }}
            autoFocus
          />
          {Error.feild === "uniqueIdentifier" && (
            <span className="error">{Error.message}</span>
          )}
        </div>
        <br />
        <Button
          disabled={detail.uniqueIdentifier === "" || !detail.uniqueIdentifier}
          onClick={handleSubmit}
        >
          Confirm
        </Button>
      </ModelWrapper>
    </SurveyModelContainer>
  );
};

export default SelectIdentifier;
