import {
  FaEquals,
  FaGreaterThan,
  FaGreaterThanEqual,
  FaLessThan,
  FaLessThanEqual,
  FaNotEqual,
  FaPlus,
  FaMinus,
  FaTimes,
  FaDivide,
  FaPercentage,
} from "react-icons/fa";

export const select1OptionData = [
  {
    label: "Default",
    value: "",
    style: "select1",
    type: "select1",
  },
  {
    label: "Minimal",
    value: "minimal",
    style: "select1",
    type: "select1",
  },
  {
    label: "Table",
    value: "label",
    style: "select1",
    type: "select1",
  },
  {
    label: "Horizontal Layout",
    value: "horizontal",
    style: "select1",
    type: "select1",
  },
  {
    label: "Likert",
    value: "likert",
    style: "select1",
    type: "select1",
  },
];

export const numericOptionData = [
  {
    label: "Text Box",
    value: "",
    style: "input",
    type: "int",
  },
  {
    label: "Slider",
    value: " ",
    style: "range",
    type: "int",
  },
  {
    label: "Vertical Slider",
    value: "vertical",
    style: "range",
    type: "int",
  },
  {
    label: "Picker",
    value: "picker",
    style: "range",
    type: "int",
  },
  {
    label: "Bearing",
    value: "bearing",
    style: "input",
    type: "decimal",
  },
];

export const dataAttributeData = [
  {
    label: "fullName",
    value: "fullName",
  },
  {
    label: "email",
    value: "email",
  },
  {
    label: "phone",
    value: "phone",
  },
  {
    label: "address",
    value: "address",
  },
  {
    label: "city",
    value: "city",
  },
  {
    label: "yesNo",
    value: "yesNo",
  },
];

export const compoundConstraint = [
  {
    icon: "AND",
    value: "and",
  },
  {
    icon: "OR",
    value: "or",
  },
];

export const arithmeticConstraint = [
  {
    icon: <FaPlus size={16} />,
    value: "+",
  },
  {
    icon: <FaMinus size={16} />,
    value: "-",
  },
  {
    icon: <FaTimes size={16} />,
    value: "*",
  },
  {
    icon: <FaDivide size={16} />,
    value: "/",
  },
  {
    icon: <FaPercentage size={16} />,
    value: "%",
  },
];

export const basicConstraint = [
  {
    icon: <FaLessThan size={16} />,
    value: "&lt;",
  },
  {
    icon: <FaLessThanEqual size={16} />,
    value: "&lt;=",
  },
  {
    icon: <FaEquals size={16} />,
    value: "=",
  },
  {
    icon: <FaNotEqual size={16} />,
    value: "!=",
  },
  {
    icon: <FaGreaterThanEqual size={16} />,
    value: "&gt;=",
  },
  {
    icon: <FaGreaterThan size={16} />,
    value: "&gt;",
  },
];

export const getOptions = (type: string) => {
  switch (type) {
    case "select1":
      return select1OptionData;
    case "int":
    case "decimal":
      return numericOptionData;
    default:
      return [];
  }
};
