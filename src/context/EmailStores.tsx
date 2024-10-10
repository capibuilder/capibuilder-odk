import { create } from "zustand";

export type State = {
  data: {
    dataCollectionName: string;
    emailSentTo: string;
    emailSentFrom: string;
    emailSubject: string;
    permissableAttachment: string;
  };
  schema: {
    title: string;
    description: string;
    fields: Record<string, any>;
  };
  openDrawer: string;
  importOpen: string;
  selectedField: string;
};

export type Actions = {
  setData: (value: any) => void;
  setSchema: (value: any) => void;
  setField: (id: string, value: any) => void;
  updateField: (id: string, value: any) => void;
  setOpenDrawer: (value: string) => void;
  deleteField: (id: string) => void;
  setImportOpen: (value: string) => void;
  setSelectedField: (value: string) => void;
  emptyField: () => void;
};

export const useEmailStore = create<State & Actions>((set, get) => ({
  data: {
    dataCollectionName: "",
    emailSentTo: "",
    emailSentFrom: "",
    emailSubject: "",
    permissableAttachment: ".XLSX, .XLS, .CSV",
  },
  schema: {
    title: "",
    description: "",
    fields: {},
  },
  openDrawer: "",
  importOpen: "",
  selectedField: "",
  setImportOpen: value => {
    set({
      importOpen: value,
    });
  },
  setData: value => {
    set({
      data: value,
      schema: {
        ...get().schema,
        title: value.dataCollectionName,
      },
    });
  },
  setSchema: value => {
    set({ schema: value });
  },
  setField: (id, value) => {
    set(state => {
      return {
        schema: {
          ...state.schema,
          fields: {
            ...state.schema.fields,
            [`field-${id}`]: {
              ...value,
              id: id,
              parentId:
                get().openDrawer === "content" ? null : get().openDrawer,
            },
          },
        },
      };
    });
  },
  updateField: (id, value) => {
    set(state => {
      return {
        schema: {
          ...state.schema,
          fields: {
            ...state.schema.fields,
            [`field-${id}`]: {
              ...state.schema.fields[`field-${id}`],
              ...value,
            },
          },
        },
      };
    });
  },
  emptyField: () => {
    set(state => {
      return {
        schema: {
          ...state.schema,
          fields: {},
        },
      };
    });
  },
  deleteField: id => {
    set(state => {
      const fields = { ...state.schema.fields };
      delete fields[`field-${id}`];
      return {
        schema: {
          ...state.schema,
          fields: fields,
        },
      };
    });
  },
  setOpenDrawer: value => {
    set({ openDrawer: value });
  },
  setSelectedField: value => {
    set({ selectedField: value });
  },
}));
