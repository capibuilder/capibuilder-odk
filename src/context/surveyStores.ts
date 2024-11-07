import { create } from "zustand";

interface SurveyState {
  data: {
    title: string;
    fields: {
      [key: string]: any;
    };
    entity?: any;
    langs?: string[];
    dataset?: string;
    uniqueIdentifier?: string;
  };
  setData: (data: any) => void;
  // ... any other state properties and methods
}

export const useSurveyStore = create<SurveyState>((set) => ({
  data: {
    title: '',
    fields: {},
  },
  setData: (data) => set({ data }),
  // ... other state methods
})); 