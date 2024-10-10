import { Empty, Loading } from "@/components";
import useSurveyStore from "@/context/surveyStores";
import { useToken } from "@/hooks";
import useInputFocus from "@/hooks/useInputFocus";
import { odkAxios } from "@/utils/useAxios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import SelectIdentifier from "../Popups/SelectIdentifier";
import { DropdownWrapper } from "./styles";

export interface datasetProps {
  name: string;
  publishedAt: string;
  odataName: string;
}

interface props {
  onClose?: () => void;
  setOptions: any;
}

export default function ConnectionDropDown({ onClose }: props) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { addFieldData, data } = useSurveyStore(state => state);
  const focusInputRef = useInputFocus();
  const [allProperties, setAllProperties] = useState<datasetProps[]>([]);
  const { token } = useToken();
  const [showIdentifierSelect, setShowIdentifierSelect] = useState(false);
  const { query } = useRouter();
  const projectId = query.projectid;

  useEffect(() => {
    if (!data.dataset) return;
    setLoading(true);
    odkAxios
      .get(`/v1/projects/${projectId}/datasets/${data.dataset}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(e => {
        setAllProperties(e.data.properties);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filtered = input
    ? allProperties?.filter(e => {
        return e.name?.toLowerCase()?.includes(input.toLowerCase());
      })
    : allProperties;

  const handleFieldChange = (input: datasetProps) => {
    if (!data.uniqueIdentifier || data.uniqueIdentifier === "") {
      return setShowIdentifierSelect(true);
    }
    addFieldData({ connectTo: input.odataName });
    onClose && onClose();
  };

  useEffect(() => {
    const handleClick = () => {
      onClose && onClose();
    };
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <DropdownWrapper
        onClick={e => {
          e.stopPropagation();
          e.preventDefault();
        }}
        className="c-scrollbar"
      >
        {showIdentifierSelect && (
          <SelectIdentifier
            handleClose={() => setShowIdentifierSelect(false)}
            data={allProperties}
          />
        )}
        <div className="search">
          <input
            ref={focusInputRef}
            type="search"
            onChange={e => {
              setInput(e.target.value);
            }}
            placeholder="Search..."
          />
        </div>
        {loading ? (
          <Loading height="50px" />
        ) : filtered?.length === 0 ? (
          <Empty height="250px" message="No Result" />
        ) : (
          filtered.map((d, index) => (
            <li
              // aria-selected={tagsArray.includes(d.tag)}
              key={index}
              onClick={() => {
                // if (tagsArray.includes(d.tag)) return;
                handleFieldChange(d);
              }}
              data-animate="slideUp"
            >
              {d.name}{" "}
              {/* <b className="red">
              {tagsArray.includes(d.tag) && "- already in use"}
            </b> */}
            </li>
          ))
        )}
      </DropdownWrapper>
    </>
  );
}
