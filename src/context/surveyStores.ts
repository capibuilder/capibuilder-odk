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
  deleteField: (fieldKey: string) => void;
}

const useSurveyStore = create<SurveyState>((set) => ({
  data: {
    title: "",
    fields: {},
  },
  setData: (data) => set({ data }),
  deleteField: (fieldKey) => 
    set((state) => ({
      data: {
        ...state.data,
        fields: Object.fromEntries(
          Object.entries(state.data.fields).filter(([key]) => key !== fieldKey)
        )
      }
    }))
}));

export default useSurveyStore;
