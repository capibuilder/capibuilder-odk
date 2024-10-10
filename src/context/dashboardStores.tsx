import { dashboardData } from "@/assets/mockData";
import { create } from "zustand";

export type ComponentTypeProps = {
  id: string;
  type: string;
  tag: string;
  title: string;
};

export type ComponentType = {
  id: string;
  columns: string;
  components: ComponentTypeProps[];
};

type ComponentIdProps = {
  componentId: string;
  columnId: string;
};

export type DashboardComponent = {
  title: string;
  description: string;
  componentTypes: ComponentType[];
};

// export type Props = {
//   componentData: DashboardComponent;
//   setComponentData: (value: any) => void;
//   drawerOpen: boolean;
//   setDrawerOpen: (value: boolean) => void;
//   currentComponentId: ComponentIdProps;
//   setCurrentComponentId: (value: ComponentIdProps) => void;
//   updateComponentData: (value: any) => void;
//   updateColumn: (value: string) => void;
//   removeComponent: () => void;
//   changePosition: (id: string, type: "up" | "down") => void;
// };

export type State = {
  componentData: DashboardComponent;
  drawerOpen: boolean;
  currentComponentId: ComponentIdProps;
};

export type Actions = {
  setComponentData: (value: any) => void;
  setDrawerOpen: (value: boolean) => void;
  setCurrentComponentId: (value: ComponentIdProps) => void;
  updateComponentData: (value: any) => void;
  updateColumn: (value: string) => void;
  removeComponent: () => void;
  changePosition: (id: string, type: "up" | "down") => void;
};

const useDashboardStore = create<State & Actions>((set, get) => ({
  componentData: dashboardData,
  drawerOpen: false,
  currentComponentId: {
    componentId: "",
    columnId: "",
  },
  setComponentData: (value: any) => {
    set({ componentData: value });
  },
  setDrawerOpen: (value: boolean) => {
    set({ drawerOpen: value });
  },
  setCurrentComponentId: (value: ComponentIdProps) => {
    set({ currentComponentId: value });
  },
  updateComponentData: (value: any) => {
    const temp = get().componentData.componentTypes.map(v => {
      if (v.id === get().currentComponentId.columnId) {
        const temp = v.components.map(component => {
          if (component.id === get().currentComponentId.componentId) {
            return {
              ...component,
              ...value,
            };
          }
          return component;
        });
        return {
          ...v,
          components: temp,
        };
      }
      return v;
    });

    set({ componentData: { ...get().componentData, componentTypes: temp } });
  },
  removeComponent: () => {
    const { componentId, columnId } = get().currentComponentId;
    const temp = get()
      .componentData.componentTypes.map(v => {
        if (v.id === columnId) {
          const components = v.components.filter(v => v.id !== componentId);
          if (components.length === 0) {
            return undefined;
          }

          return {
            ...v,
            components,
          };
        }

        return v;
      })
      .filter(Boolean);

    set({
      componentData: { ...get().componentData, componentTypes: temp as any },
    });
    set({
      currentComponentId: {
        componentId: "",
        columnId: "",
      },
    });
  },
  updateColumn: (value: string) => {
    const temp = get().componentData.componentTypes.map(v => {
      if (v.id === get().currentComponentId.columnId) {
        return {
          ...v,
          columns: value,
        };
      }
      return v;
    });

    set({ componentData: { ...get().componentData, componentTypes: temp } });
  },
  changePosition: (columnId: string, type: "up" | "down") => {
    const index = get().componentData.componentTypes.findIndex(
      v => v.id === columnId
    );

    const temp = [...get().componentData.componentTypes];

    if (type === "up") {
      if (index === 0) {
        return;
      }

      const currentColumn = temp[index];
      temp[index] = temp[index - 1];
      temp[index - 1] = currentColumn;
    } else {
      if (index === temp.length - 1) {
        return;
      }

      const currentColumn = temp[index];
      temp[index] = temp[index + 1];
      temp[index + 1] = currentColumn;
    }

    set({ componentData: { ...get().componentData, componentTypes: temp } });
  },
}));

export default useDashboardStore;
