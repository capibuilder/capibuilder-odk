import { ConfirmPopup, PrimaryButton } from "@/components";
import authStore from "@/context/authStores";
import useSurveyStore from "@/context/surveyStores";
import { makeHash } from "@/utils/makeHash";
import { templateAxios } from "@/utils/useAxios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BiLeftArrowAlt } from "react-icons/bi";
import { useAlert } from "socialwell-design";
import { NotFound, Restricted } from "./components/Indicator";
import TemplatesContentPreview from "./components/TemplatesContentPreview";
import { PreviewContainer, PreviewSidebar } from "./styles";

const TemplatePreview = ({ id }: { id: string }) => {
  const { isLoggedIn, getUserDetails } = authStore();
  const removeCurrentField = useSurveyStore(state => state.removeCurrentField);
  const setData = useSurveyStore(state => state.setData);
  const [newData, setNewData] = useState<any>(null);
  const [allData, setAllData] = useState<any>(null);
  const router = useRouter();
  const [error, setError] = useState({ status: 0, message: "" });
  const [Delete, setDelete] = useState(false);
  const { setAlert } = useAlert();

  const projectId = router.query.projectid as string;

  useEffect(() => {
    (async () => {
      try {
        const { data } = await templateAxios.post(
          `/getTemplate?templateId=${id}`,
          {
            belongsTo: makeHash(getUserDetails()?.email),
          }
        );
        setNewData(data);
        const { data: fileData } = await templateAxios.get(
          `/fileStream?templateFile=${data.templateFile}`
        );
        setAllData(fileData);
      } catch (err: any) {
        setError({
          message: err.response.data.error || "Something went wrong",
          status: err.response.status,
        });
      }
    })();
  }, []);

  const handleTemplate = (hasEdit = false) => {
    removeCurrentField();

    setData(allData);

    router.push(
      `/projects/${projectId}/survey/design-survey${
        hasEdit ? `?edit=${id}` : ""
      }`
    );
  };

  const handleDelete = () => {
    templateAxios
      .delete(
        `/deleteTemplate?templateId=${id}&belongsTo=${encodeURIComponent(
          makeHash(getUserDetails()?.email)
        )}`
      )
      .then(() => {
        router.push("/templates");
        setAlert({
          show: true,
          state: "success",
          text: "Template deleted successfully",
          title: "Deleted",
        });
      })
      .catch(() => {
        setAlert({
          show: true,
          state: "error",
          text: "Something went wrong",
          title: "Error",
        });
      });
  };

  if (error.status === 404) {
    return <NotFound />;
  }
  if (error.status === 403) {
    return <Restricted />;
  }

  return (
    <PreviewContainer>
      <Head>
        <title>
          {newData?.templateTitle} | {newData?.surveyCategory?.categoryName}
        </title>
      </Head>

      {Delete && (
        <ConfirmPopup
          onClose={() => {
            setDelete(false);
          }}
          onConfirm={handleDelete}
          title="Delete Template "
          description="Are you sure you want to delete this template?"
        />
      )}
      <PreviewSidebar>
        <Link
          href={"#"}
          onClick={e => {
            e.preventDefault();
            router.back();
          }}
        >
          <div className="preview__go-back__btn">
            <BiLeftArrowAlt size={25} />
            template categories
          </div>
        </Link>
        <div className="preview__category">
          {newData?.surveyCategory?.categoryName}
        </div>
        <div className="preview__title">{newData?.templateTitle}</div>
        <div className="preview__contents">
          <div className="preview__contents__items">
            {newData?.numberOfQuestion} Question
            {newData?.numberOfQuestion > 1 && "s"}
          </div>
        </div>
        {isLoggedIn && projectId && (
          <div className="preview__button">
            <PrimaryButton
              name="Use this Template"
              onClick={handleTemplate}
              loading={!(Object.values(allData?.fields || {}).length > 0)}
            />
            <PrimaryButton
              name="Edit the Template"
              onClick={() => handleTemplate(true)}
              loading={!(Object.values(allData?.fields || {}).length > 0)}
            />
          </div>
        )}
        {newData?.author === getUserDetails()?.email && (
          <>
            <br />
            <div className="preview__button delete">
              <PrimaryButton
                secondary
                name="Delete this Template"
                onClick={() => {
                  setDelete(true);
                }}
                loading={!(Object.values(allData?.fields || {}).length > 0)}
              />
            </div>
          </>
        )}
      </PreviewSidebar>
      <TemplatesContentPreview {...{ newData }} fields={allData?.fields} />
    </PreviewContainer>
  );
};

export default TemplatePreview;
