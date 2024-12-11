import { MenuIcon } from "@/assets";
import {
  ConfirmPopup,
  Loading,
  PrimaryButton,
  SurveyPreviewModel,
} from "@/components";
import { ODK_CENTRAL_REST_API } from "@/config";
import useSurveyStore from "@/context/surveyStores";
import useToken from "@/hooks/useToken";
import { FormResponse } from "@/interfaces/form";
import { deleteCachedPublickLink } from "@/utils/cachePublicLinks";
import { odkAxios } from "@/utils/useAxios";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { AiOutlineDelete, AiOutlineEye, AiOutlineQrcode } from "react-icons/ai";
import { CiViewTable } from "react-icons/ci";
import { MdDashboard, MdDownload, MdOutlineFileUpload } from "react-icons/md";
import { Flex, TextField } from "socialwell-design";
import { VersionModelWrapper } from "../styles";
import QRCode from "./QRCode";
import { RowWrapper } from "./styles";

interface props {
  handleRefresh?: (isRefetching: boolean) => void;
  data: FormResponse;
  openSetting: boolean;
  setOpenSettingIndex: Dispatch<SetStateAction<number | null>>;
  index: number;
  fileNames: string[];
}

export default function Row({
  data,
  handleRefresh,
  index,
  openSetting,
  setOpenSettingIndex,
  fileNames,
}: props) {
  const { token } = useToken();
  const { query } = useRouter();
  const [previewUrl, setPreviewUrl] = useState("");
  const [isDraft, setIsDraft] = useState(true);
  const [Delete, setDelete] = useState(false);
  const [showQR, setshowQR] = useState(false);
  const projectId = query.projectid as string;
  const [isOpen, setIsOpen] = useState(false);
  const fileName = fileNames.find(
    (string: string) => getTitle(string) === data.xmlFormId
  );

  const handleDataOnHover = async () => {
    const url = `/v1/projects/${data.projectId}/forms/${data.xmlFormId}/draft`;

    try {
      const res = await odkAxios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsDraft(!!res.data.draftToken);
    } catch (error) {
      setIsDraft(false);
    }
  };

  const handlePublish = (newVersion = "") => {
    const uri = !!newVersion
      ? `/v1/projects/${data.projectId}/forms/${data.xmlFormId}/draft/publish?version=${newVersion}`
      : `/v1/projects/${data.projectId}/forms/${data.xmlFormId}/draft/publish`;

    odkAxios
      .post(
        uri,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        handleRefresh && handleRefresh(false);
        setOpenSettingIndex(null);
      })
      .catch(err => {
        if (err.response.statusText === "Conflict") {
          setIsOpen(true);
        }
      });
  };

  const handleDelete = async () => {
    try {
      if (fileName) {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_PIVOT_API_BASE_URL}/deleteFile/${projectId}/${fileName}`
        );
      }

      await odkAxios.delete(
        `/v1/projects/${projectId}/forms/${data.xmlFormId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      deleteCachedPublickLink(data.xmlFormId);
      handleRefresh && handleRefresh(false);
      setOpenSettingIndex(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <VersionModel {...{ isOpen, setIsOpen, handlePublish }} />
      {showQR && (
        <QRCode
          data={data}
          onClose={() => {
            setshowQR(false);
          }}
        />
      )}
      {Delete && (
        <ConfirmPopup
          onConfirm={handleDelete}
          onClose={() => {
            setDelete(false);
          }}
          title="Delete Survey"
          description="Are you sure you want to delete the Survey ? "
        />
      )}
      {previewUrl !== "" && (
        <SurveyPreviewModel {...{ previewUrl, setPreviewUrl }} />
      )}
      <RowWrapper className="grid" data-animate="opacity">
        <span>{data?.name}</span>
        <span>{new Date(data.createdAt).toLocaleString()?.toUpperCase()}</span>

        <span
          data-status={data.publishedAt === null ? "draft" : "live"}
          className="status"
        >
          {data.publishedAt === null ? "draft" : "live"}
        </span>

        {openSetting && (
          <PopoverContentView
            {...{
              data,
              setDelete,
              token,
              handleRefresh,
              handlePublish,
              setPreviewUrl,
              setshowQR,
              fileName,
              isDraft,
              setOpenSettingIndex,
            }}
          />
        )}
        <button
          onMouseEnter={handleDataOnHover}
          onClick={e => {
            e.preventDefault();
            e.stopPropagation();
            setOpenSettingIndex(index);
          }}
          className="pop"
        >
          <MenuIcon />
        </button>
      </RowWrapper>
    </>
  );
}

const getTitle = (string: string) => {
  const parts = string.split("_");

  return parts.at(-1);
};

const PopoverContentView = ({
  data,
  setDelete,
  token,
  setPreviewUrl,
  handlePublish,
  setshowQR,
  fileName,
  isDraft,
  setOpenSettingIndex,
}: {
  data: FormResponse;
  token: string;
  fileName: string | undefined;
  isDraft: boolean;
  setDelete: (value: boolean) => void;
  setPreviewUrl: (value: string) => void;
  handlePublish: () => void;
  setshowQR: (value: boolean) => void;
  setOpenSettingIndex: (value: number | null) => void;
}) => {
  const router = useRouter();
  const mainData = useSurveyStore(state => state.data);
  const setData = useSurveyStore(state => state.setData);

  const handleDownloadDraft = async () => {
    const url = `/v1/projects/${data.projectId}/forms/${data.xmlFormId}/draft.xml`;

    const res = await odkAxios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const blob = new Blob([res.data], { type: "text/xml" });
    const link = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = link;
    a.download = `${data.name}.xml`;
    a.click();
    a.remove();

    setOpenSettingIndex(null);
  };

  const handleEditForm = async () => {
    const url = `${process.env.NEXT_PUBLIC_PIVOT_API_BASE_URL}/streamFile/${data.projectId}/${fileName}`;

    const fileRes = await axios.get(url);

    setData({
      ...mainData,
      ...fileRes.data,
    });
    setOpenSettingIndex(null);

    router.push(
      `/projects/${data.projectId}/survey/design-survey?formEdit=${data.xmlFormId}&fileName=${fileName}`
    );
  };

  const handleDownloadPublished = async () => {
    const url = `/v1/projects/${data.projectId}/forms/${data.xmlFormId}/versions/${data.version}.xml`;

    const res = await odkAxios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const blob = new Blob([res.data], { type: "text/xml" });
    const link = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = link;
    a.download = `${data.name}.xml`;
    a.click();
    a.remove();

    setOpenSettingIndex(null);
  };

  return (
    <>
      <ul
        onClick={e => {
          e.preventDefault();
          e.stopPropagation();
        }}
        className="popup"
      >
        {!data.publishedAt && (
          <li
            aria-disabled={data.enketoId === null}
            onClick={e => {
              e.preventDefault();
              data.enketoId !== null &&
                setPreviewUrl(
                  `${ODK_CENTRAL_REST_API}/-/preview/${data.enketoId}`
                );
              setOpenSettingIndex(null);
            }}
          >
            {data.enketoId === null && <Loading height="20px" />}{" "}
            <AiOutlineEye /> Preview
          </li>
        )}

        {isDraft && (
          <li
            aria-disabled={data.enketoId === null}
            onClick={() => handlePublish()}
          >
            {data.enketoId === null && <Loading height="20px" />}{" "}
            <MdOutlineFileUpload size={22} /> Publish
          </li>
        )}
        {!!fileName && (
          <li onClick={handleEditForm}>
            <MdOutlineFileUpload size={22} /> Update Form
          </li>
        )}
        <li
          aria-disabled={data.enketoId === null}
          onClick={() => {
            data.enketoId !== null && setshowQR(true);
          }}
        >
          <AiOutlineQrcode /> QR Code
        </li>
        <Link
          href={(() => {
            const path = !!data.publishedAt
              ? `/projects/${data.projectId}/survey/${data.xmlFormId}/responses`
              : `/projects/${data.projectId}/survey/${data.xmlFormId}/draft-responses`;
            return path;
          })()}
        >
          <li>
            <CiViewTable />
            {data.publishedAt ? "Responses" : "Responses"}
          </li>
        </Link>

        <Link
          href={(() => {
            const path = !!data.publishedAt
              ? `/projects/${data.projectId}/survey/${data.xmlFormId}/survey-dashboard`
              : `/projects/${data.projectId}/survey/${data.xmlFormId}/survey-draft-dashboard`;
            return path;
          })()}
        >
          <li>
            <MdDashboard />
            Dashboard
          </li>
        </Link>

        {!data.publishedAt ? (
          <a onClick={handleDownloadDraft}>
            <li>
              {data.enketoId === null && <Loading height="20px" />}{" "}
              <MdDownload size={22} /> Download Form
            </li>
          </a>
        ) : (
          <a onClick={handleDownloadPublished}>
            <li>
              {data.enketoId === null && <Loading height="20px" />}{" "}
              <MdDownload size={22} /> Download Form
            </li>
          </a>
        )}
        <li
          onClick={() => {
            setDelete(true);
          }}
          className="delete"
        >
          <AiOutlineDelete /> Delete
        </li>
      </ul>
    </>
  );
};

const VersionModel = ({
  isOpen,
  setIsOpen,
  handlePublish,
}: {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  handlePublish: (version: string) => void;
}) => {
  const [error, setError] = useState("");
  const [version, setVersion] = useState("");

  if (!isOpen) return null;

  return (
    <VersionModelWrapper>
      <div className="overlay" onClick={() => setIsOpen(false)} />
      <div className="content">
        <h2>Version Conflict</h2>
        <br />
        <p>
          Please enter a new version number to publish the form.{" "}
          <strong>Version number should be unique</strong>
        </p>
        <br />
        <TextField
          type="number"
          value={version}
          onChange={e => setVersion(e.target.value)}
          placeholder="Enter version number"
          hasError={
            !!error && (
              <span
                style={{
                  color: "red",
                  fontSize: "12px",
                  display: "block",
                  marginTop: "5px",
                }}
              >
                {error}
              </span>
            )
          }
        />

        <Flex justifyContent="flex-end" gap="5px" margin="10px 0">
          <PrimaryButton
            secondary
            name="Close"
            onClick={() => setIsOpen(false)}
          />
          <PrimaryButton
            name="Update"
            onClick={() => {
              setError("");
              if (version === "") return;
              if (version.length < 6) {
                setError("Version number should be atleast 6 characters long");
                return;
              }
              handlePublish(version);
            }}
          />
        </Flex>
      </div>
    </VersionModelWrapper>
  );
};
