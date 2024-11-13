import { entity } from "@/utils/generateXml";
import { create } from "zustand";

export type State = {
  data: {
    title: string;
    entity?: null | entity;
    category: string;
    description: string;
    logics?: any;
    fields: any;
    langs?: string[];
    dataset?: string | null;
    uniqueIdentifier?: string | null;
  };
  currentField: string | null;
  currentTabBtn: string;
};

export type Actions = {
  setData: (data: any) => void;
  addData: (data: any) => void;
  addFieldData: (item: any) => void;
  resetForm: () => void;
  setCurrentField: (id: string) => void;
  removeCurrentField: () => void;
  setCurrentTabBtn: (tab: any) => void;
  deleteField: (id: string) => void;
};

const useSurveyStore = create<State & Actions>((set, get) => ({
  data: {
    title: "survey title",
    category: "",
    description: "",
    fields: {},
    entity: null,
    langs: [],
    dataset: null,
    uniqueIdentifier: null,
  },
  currentField: null,
  currentTabBtn: "",
  setData: (data: any) => set({ data }),
  addData: (data: any) => set({ data: { ...get().data, ...data } }),
  resetForm: () =>
    set({
      data: {
        title: "survey title",
        category: "",
        description: "",
        fields: {},
      },
    }),
  addFieldData: (item: any) => {
    const currentField = get().currentField;
    if (!currentField) return;

    set(state => ({
      ...state,
      data: {
        ...state.data,
        fields: {
          ...state.data.fields,
          [`${currentField}`]: {
            ...state.data.fields[`${currentField}`],
            ...item,
          },
        },
      },
    }));
  },
  setCurrentField: (id: string) => set({ currentField: id }),
  removeCurrentField: () => set({ currentField: null }),
  setCurrentTabBtn: (tab: any) => set({ currentTabBtn: tab }),
  deleteField: (id: string) => {
    const newFields: any = { ...get().data.fields };

    // Check if field is a sub-question in any group
    const parentGroup = Object.values(newFields).find((field: any) => 
      field.groupfields && field.groupfields[id]
    );

    if (parentGroup) {
      // If it's a sub-question, remove it from parent's groupfields
      const updatedGroupFields = { ...parentGroup.groupfields };
      delete updatedGroupFields[id];
      
      newFields[`field-${parentGroup.id}`] = {
        ...parentGroup,
        groupfields: updatedGroupFields
      };
    } else {
      // Original logic for regular fields
      const hasChildren = Object.values(newFields).some(
        (field: any) => field.parentId === id
      );

      if (hasChildren) {
        const children = Object.values(newFields).filter(
          (field: any) => field.parentId === id
        );

        children.forEach((field: any) => {
          delete newFields[`field-${field.id}`];
        });
      }

      delete newFields[id];
    }

    set(state => ({
      ...state,
      data: {
        ...state.data,
        fields: newFields,
      },
    }));
    
    get().currentField === id &&
      set({
        currentField: null,
      });
  },
}));

export default useSurveyStore;
