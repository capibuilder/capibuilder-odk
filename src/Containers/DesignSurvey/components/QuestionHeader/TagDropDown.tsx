import { Empty, Loading } from "@/components";
import useSurveyStore from "@/context/surveyStores";
import useInputFocus from "@/hooks/useInputFocus";
import { keyword } from "@/interfaces/keyword";
import { questionField } from "@/interfaces/questionFields";
import { getTags } from "@/utils/network/getTags";
import { useDebounce } from "@poiler/utils";
import { useEffect, useState } from "react";
import { useAlert } from "socialwell-design";
import { DropdownWrapper } from "./styles";

interface Attributes {
  attributeId?: string;
  tag?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface props {
  onClose?: () => void;
  setOptions: any;
}

export default function TagDropDown({ onClose }: props) {
  const [loading, setLoading] = useState(false);
  const { addFieldData, data, currentField } = useSurveyStore(state => state);
  const focusInputRef = useInputFocus();
  const { setAlert } = useAlert();
  const [allAttribute, setAllAttribute] = useState<keyword[]>([]);

  const tagsArray = Object.values(data?.fields)?.map(
    (field: any) => field.dataAttribute
  );

  const current: questionField = data.fields[currentField as string];

  const addLogicIds = (
    acc: Set<any>,
    logicArray: any[],
    checkSelect: boolean
  ) => {
    logicArray.forEach((logic: any) => {
      acc.add(logic.option1.id);
      if (!logic.hasInput && (!checkSelect || !logic.hasSelect)) {
        acc.add(logic.option3.id);
      }
    });
  };

  const uniqueFieldIds = Array.from(
    Object.values(data.fields).reduce((acc: Set<any>, field: any) => {
      if (field.relevantLogic) {
        addLogicIds(acc, field.relevantLogic, true);
      }
      if (field.constraintLogic) {
        addLogicIds(acc, field.constraintLogic, false);
      }
      if (field.calculateLogic) {
        addLogicIds(acc, field.calculateLogic, false);
      }
      return acc;
    }, new Set())
  );

  const handleFieldChange = (input: keyword) => {
    if (uniqueFieldIds.includes(`field-${current.id}`)) {
      setAlert({
        show: true,
        state: "warning",
        text: "Selected tag is already in use in a response logic",
        title: "",
      });
      return;
    }
    addFieldData({ dataAttribute: input.keyword });
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

  const handleSearch = useDebounce((q: string) => {
    if (q.length === 0) return;

    getTags(q)
      .then(v => {
        // console.log(v.data);

        if (v.data) {
          setAllAttribute(v.data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, 500);

  return (
    <DropdownWrapper
      onClick={e => {
        e.stopPropagation();
        e.preventDefault();
      }}
      className="c-scrollbar"
    >
      <div className="search">
        <input
          ref={focusInputRef}
          type="search"
          onChange={e => {
            setLoading(true);
            handleSearch(e.target.value);
          }}
          placeholder="Search..."
        />
      </div>
      {loading ? (
        <Loading height="50px" />
      ) : allAttribute?.length === 0 ? (
        <Empty height="250px" message="No Result" />
      ) : (
        allAttribute.map((d, index) => (
          <li
            aria-selected={tagsArray.includes(d.keyword)}
            key={index}
            onClick={() => {
              if (tagsArray.includes(d.keyword)) return;
              handleFieldChange(d);
            }}
            data-animate="slideUp"
          >
            {d.keyword}{" "}
            <b className="red">
              {tagsArray.includes(d.keyword) && "- already in use"}
            </b>
          </li>
        ))
      )}
    </DropdownWrapper>
  );
}
