import useToken from "@/hooks/useToken";
import { odkAxios } from "@/utils/useAxios";
import { UserSetter } from "@/utils/userInfoSetter";
import { create } from "zustand";

type UserProps = {
  email: string;
  id: number;
  type: string;
  displayName: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

type AuthStoreProps = {
  isLoggedIn: boolean;
  projectName: string;
  checkUser: () => void;
  getUser: () => void;
  getUserDetails: () => UserProps;
  modifyUser: (user: any) => void;
  checkAuth: () => void;
  saveProjectId: (projectId: string) => void;
  saveDisplayName: (displayName: string) => void;
  getProjectId: () => any;
  getDisplayName: () => any;
  login: () => void;
  logout: () => void;
};

const authStore = create<AuthStoreProps>((set, get) => ({
  isLoggedIn: false,
  projectName: "",
  checkUser: async () => {
    // if (localStorage.getItem("auth") === null) return;
    // const { token } = useToken();
    // const res = await odkAxios.get("/v1/users/current", {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
  },
  getUser: async () => {
    if (localStorage.getItem("auth") === null) return;
    const { token } = useToken();

    const res = await odkAxios.get("/v1/users/current", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data.displayName.split("::")[1] === undefined) {
      get().modifyUser(res.data);
      return res.data;
    }

    localStorage.setItem("user-details", JSON.stringify(res.data));

    get().saveProjectId(res.data.displayName.split("::")[1]);
    get().saveDisplayName(res.data.displayName.split("::")[0]);
    return res.data;
  },
  getUserDetails: () => {
    if (localStorage.getItem("user-details") === null) return;
    return JSON.parse(localStorage.getItem("user-details") ?? "{}");
  },
  modifyUser: async (user: any) => {
    const { token } = useToken();

    const projectId = await projectOdk();
    let displayName = "";
    if (projectId.length === 0) {
      const project = await createProjectOdk(user.displayName);
      displayName = `${user.displayName}::${project.id}`;
    } else {
      displayName = `${user.displayName}::${projectId[0].id}`;
    }

    odkAxios
      .patch(
        `/v1/users/${user.id}`,
        {
          displayName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        get().getUser();
      });
  },
  saveProjectId: (projectId: string) => {
    localStorage.setItem("projectId", projectId);
  },
  saveDisplayName: (displayName: string) => {
    localStorage.setItem("displayName", displayName);
  },
  getProjectId: () => {
    if (localStorage.getItem("projectId") === null) return;
    return localStorage.getItem("projectId");
  },
  getDisplayName: () => {
    if (localStorage.getItem("displayName") === null) return;
    return localStorage.getItem("displayName");
  },
  checkAuth: () => {
    if (localStorage.getItem("auth") === null) return;
    if (localStorage.getItem("auth")) {
      set({ isLoggedIn: true });
    }
    const { token } = useToken();

    odkAxios
      .get("/v1/users/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        UserSetter(res.data);
        set({ isLoggedIn: true });
      })
      .catch(() => {
        get().logout();
      });
  },
  login: () => {
    set({ isLoggedIn: true });
    get().getUser();
  },
  logout: () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("projectId");
    localStorage.removeItem("displayName");
    localStorage.removeItem("user-details");
    set({ isLoggedIn: false });
  },
}));

const projectOdk = async () => {
  const { token } = useToken();
  const res = await odkAxios.get("/v1/projects", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

const createProjectOdk = async (projectName: any) => {
  const { token } = useToken();
  const res = await odkAxios.post(
    "/v1/projects",
    {
      name: projectName,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export default authStore;
