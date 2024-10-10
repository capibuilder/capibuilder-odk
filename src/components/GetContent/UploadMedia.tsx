import React from "react";
import { UploadMediaWrapper } from "./styles";

const UploadMedia = ({
  text,
  size = "10MB",
  icon,
}: {
  text: string;
  size?: string;
  icon: React.ReactNode;
}) => {
  return (
    <UploadMediaWrapper>
      <input
        type="file"
        style={{ display: "none" }}
        id={"upload-media"}
        disabled
      />
      <label htmlFor={"upload-media"}>
        <div className="upload-media__icon">{icon}</div>
        <div className="upload-media__text">
          <p>{text}</p>
        </div>
        {size !== "" && (
          <div className="upload-media__sm-text">
            <p>Size limit: {size}</p>
          </div>
        )}
      </label>
    </UploadMediaWrapper>
  );
};

export default UploadMedia;
