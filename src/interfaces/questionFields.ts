import { questionTypes } from "./questionTypes";

export interface questionField {
  id?: number;
  type?: string;
  label?: string;
  typeLabel?: string;
  questionType: questionTypes;
  required?: boolean;
  meta?: boolean;
  readOnly?: boolean;
  dataAttribute?: string;
  hint?: string;
  calculate?: string;
  constraint?: string;
  constraintMsg?: string;
  relevant?: string;
  requiredMsg?: string;
  defaultValue?: string;
  appearance?: string;
  style?: string;
  preload?: string;
  preloadParams?: string;
  selectOptions?: any[];
  mediatype?: string;
  sliderOptions?: null;
  group?: boolean;
  groupRepeat?: boolean;
  groupLabel?: string;
  typeLroupLabel?: string;
  groupfields?: any[];
  parentId?: string | null;
  optionType?: string;
  tab?: string;
  questionNumber?: number;
  auditType?: string;
  otherLangs?: MultiLangs[];
  ismodified?: isModified;
  saveToEntity?: boolean;
  connectTo?: null | string;
  length?: {
    min?: number;
    max?: number;
  };
  value?: {
    min?: number;
    max?: number;
  };
  dateRange?: {
    min?: number;
    max?: number;
  };
  repeatCount?: number;
}

export interface isModified {
  label?: boolean;
  hint?: boolean;
  requiredMsg?: boolean;
  constraintMsg?: boolean;
  defaultValue?: boolean;
  selectOptions?: boolean;
}
export interface MultiLangs {
  label: string;
  lang: string;
  hint: string;
  requiredMsg: string;
  constraintMsg: string;
  defaultValue: string;
  selectOptions: any[];
}
