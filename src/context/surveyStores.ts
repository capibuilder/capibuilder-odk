// Added interface and function

import { create } from "zustand";

interface SurveyState {
  data: any;
  setData: (data: any) => void;
  options: {
    isRequired: boolean;
    requiredMsg: string;
    loop: boolean;
    readOnly: boolean;
    invalid: boolean;
    hasCalculation: boolean;
    calculate: string;
    constraint: string;
    constraintMsg: string;
    hasRelevant: boolean;
    relevant: string;
    hasDefaultValue: boolean;
    defaultValue: string;
    isMultipleSelection: boolean;
    isVerticalAlignment: boolean;
    isShuffleOptionOrder: boolean;
    repeatCount: string;
  };
  currentField: string | null;
  addFieldData: (data: any) => void;
  setOptions: (options: Partial<SurveyState["options"]>) => void;
  currentTabBtn: string;
  setCurrentTabBtn: (btn: string) => void;
}

const initialData = {};

const useSurveyStore = create<SurveyState>((set) => ({
  data: initialData,
  setData: (data) => set({ data }),
  options: {
    isRequired: false,
    requiredMsg: "",
    loop: false,
    readOnly: false,
    invalid: false,
    hasCalculation: false,
    calculate: "",
    constraint: "",
    constraintMsg: "",
    hasRelevant: false,
    relevant: "",
    hasDefaultValue: false,
    defaultValue: "",
    isMultipleSelection: false,
    isVerticalAlignment: false,
    isShuffleOptionOrder: false,
    repeatCount: "",
  },
  setOptions: (newOptions) => set((state) => ({
    options: { ...state.options, ...newOptions }
  })),
  currentField: null,
  addFieldData: (data) => set((state) => ({
    data: { ...state.data, ...data }
  })),
  currentTabBtn: "",
  setCurrentTabBtn: (btn) => set({ currentTabBtn: btn }),
}));

export default useSurveyStore;
