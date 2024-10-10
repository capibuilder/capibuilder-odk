import useSurveyStore from "@/context/surveyStores";
import {
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
  AiOutlineStar,
} from "react-icons/ai";

export default function Rating({ fieldProp }: { fieldProp: any }) {
  const {
    currentField,
    addFieldData,
    data: { fields },
  } = useSurveyStore();

  const field = fields[currentField as string];

  const handleChange = (type: "plus" | "minus") => {
    if (type === "minus") {
      if (Number(field?.sliderOptions?.end) < 1) return;
      addFieldData({
        sliderOptions: {
          ...field?.sliderOptions,
          end: String(Number(field?.sliderOptions?.end) - 1),
        },
      });
    } else {
      addFieldData({
        sliderOptions: {
          ...field?.sliderOptions,
          end: String(Number(field?.sliderOptions?.end) + 1),
        },
      });
    }
  };

  const NuM =
    Number(fieldProp?.sliderOptions?.end || field?.sliderOptions?.end || 0) ||
    0;

  return (
    <div>
      {[...Array(NuM)].map((_, i) => (
        <AiOutlineStar key={i} size={50} style={{ marginRight: "5px" }} />
      ))}

      <br />
      <br />

      <span
        onClick={() => {
          handleChange("minus");
        }}
        style={{ cursor: "pointer" }}
      >
        <AiOutlineMinusCircle size={35} color="darkred" />
      </span>

      <span
        style={{ cursor: "pointer", marginLeft: "20px" }}
        onClick={() => {
          handleChange("plus");
        }}
      >
        <AiOutlinePlusCircle size={35} color="green" />
      </span>
    </div>
  );
}
