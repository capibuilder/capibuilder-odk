import { MenuIcon } from "@/assets";
import authStore from "@/context/authStores";
import useToken from "@/hooks/useToken";
import { odkAxios } from "@/utils/useAxios";
import { useContext, useEffect, useState } from "react";
import { BsFillCloudDownloadFill } from "react-icons/bs";
import { TableContext } from "../..";
import { SurveyTableContainer } from "./styles";

const downloadFile = (data: any, filename: string) => {
  const blob = new Blob([data], { type: "text/csv" });
  // download the file
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const SurveyTable = () => {
  const { newData, slug } = useContext<any>(TableContext);
  const [fieldNames, setFieldNames] = useState([]);
  const getProjectId = authStore(state => state.getProjectId);

  useEffect(() => {
    const { token } = useToken();
    odkAxios
      .get(`/v1/projects/${getProjectId()}/forms/${slug}/fields?odata=true`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(e => {
        setFieldNames(
          e.data.map((field: any) => {
            if (field.type === "structure") return "except";
            return field.name;
          })
        );
      })
      .catch(err => {
        console.log(err.message);
      });
  }, [slug]);

  const downloadCsv = () => {
    const { token } = useToken();
    const filename = `${slug}.csv`;
    odkAxios
      .get(
        `/v1/projects/${getProjectId()}/forms/${slug}/draft/submissions.csv?splitSelectMultiples=false&groupPaths=true&deletedFields=false`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(e => {
        downloadFile(e.data, filename);
      })
      .catch(err => {
        console.log(err.message);
      });
  };

  return (
    <SurveyTableContainer>
      <div className="filter-options">
        {/* <IoMdCloudUpload className="icon" size={24} /> */}

        <BsFillCloudDownloadFill
          onClick={downloadCsv}
          className="icon"
          size={20}
        />

        {/* <AiFillPrinter className="icon" size={24} />
        <FaFilter className="icon" size={20} /> */}
      </div>
      <div className="table-overlay">
        <div className="table">
          <div
            style={{ gridTemplateColumns: `repeat(${fieldNames.length},1fr)` }}
            className="row head"
          >
            <span>
              <input type="checkbox" />
            </span>
            {fieldNames.map((item: any, index: any) => {
              if (item.startsWith("_") || item === "except") return null;
              return <span key={index}>{item}</span>;
            })}
          </div>

          <div className="row">
            {newData?.value.map((item: any) => (
              <Trow key={item.meta.instanceID} data={item} />
            ))}
          </div>
        </div>
      </div>
    </SurveyTableContainer>
  );
};

const Trow = ({ data }: any) => {
  return (
    <>
      <span>
        <input type="checkbox" />
      </span>
      {/*
      <td className="name-content">
        <Avatar size="md" />
        <div className="name-content__details">
          <div className="name">name</div>
          <div className="text">34,male</div>
          <div className="text">1234567890</div>
        </div>
      </td>
      <td className="location">Village, State</td>
      <td className="status">
        <span className="approved">Approved</span>
      </td> */}
      <>
        <div>{data.meta.instanceID}</div>
        {Object.entries(data)
          .filter(str => {
            return !str[0].startsWith("_");
          })
          .map((item: any, index: any) => {
            if (typeof item[1] === "object") return null;
            return (
              <span key={index} className="location">
                {item[1]}
              </span>
            );
          })}
      </>

      <div className="options">
        <div className="icon">
          <MenuIcon />
        </div>
      </div>
    </>
  );
};

export default SurveyTable;
