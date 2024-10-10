"use client";

import { DeleteIcon } from "@/assets";
import { Confirm } from "@/components";
import { odkAxios } from "@/utils/useAxios";
import { useEffect, useState } from "react";
import { useAlert } from "socialwell-design";

import useToken from "@/hooks/useToken";
import { links } from "./Links";

interface Props {
  data: links;
  enketoOnceId: string;
  refresh: () => void;
}

const Row: React.FC<Props> = ({ data, enketoOnceId, refresh }: Props) => {
  const { setAlert } = useAlert();
  const { token } = useToken();
  const [showConfirm, setShowConfirm] = useState(false);
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const handleClipboard = (link: string) => {
    if (!data.token) return;
    window.navigator.clipboard.writeText(link).then(() => {
      setAlert({
        show: true,
        state: "success",
        text: "Copied to clipboard",
        title: "Success",
      });
    });
  };

  const handleDelete = (id: string) => {
    odkAxios
      .delete(`/v1/sessions/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        refresh();
        setAlert({
          show: true,
          state: "success",
          text: "Public link revoked successfully",
          title: "Deleted successfully",
        });
      })
      .catch(error => {
        setAlert({
          show: true,
          state: "error",
          text: error?.response?.data?.message || "Something went wrong",
          title: "Request Failed",
        });
      });
  };

  const handleConfirmClose = () => {
    setShowConfirm(false);
  };

  const handleConfirmDelete = () => {
    handleDelete(String(data.token));
  };

  return (
    <>
      {showConfirm && (
        <Confirm
          handleClose={handleConfirmClose}
          onConfirm={handleConfirmDelete}
          refresh={refresh}
        />
      )}
      <li key={data.id} className="link">
        <span>{data.displayName?.slice(0, 15)}</span>
        <span>{data.once ? "Yes" : "No"} </span>
        <span
          aria-disabled={!data.token}
          onClick={() => {
            handleClipboard(`${origin}/r/${enketoOnceId}?st=${data?.token}`);
          }}
          className="url"
        >
          {data.token
            ? `${origin}/r/${enketoOnceId}?st=${data?.token}`.slice(0, 10)
            : "Revoked"}
        </span>
        <button
          title={data.token ? "Revoke Public access" : "Revoked"}
          type="button"
          onClick={() => {
            setShowConfirm(true);
          }}
          disabled={!data?.token}
        >
          <DeleteIcon />
        </button>
      </li>
    </>
  );
};

export default Row;
