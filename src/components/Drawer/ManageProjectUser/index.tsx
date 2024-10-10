import { ConfirmPopup, LoadingBlock } from "@/components";
import { useToken } from "@/hooks";
import { ProjectInterface } from "@/interfaces";
import { Trimmer } from "@/utils/Trimmer";
import { odkAxios } from "@/utils/useAxios";
import { useDebounce } from "@poiler/utils";
import { useEffect, useState } from "react";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { useAlert } from "socialwell-design";
import { Wrapper } from "./style";

export type Assignments = {
  actorId: number;
  roleId: number;
  actor: {
    id: number;
    type: string;
    displayName: string;
    createdAt: string;
    updatedAt: any;
    deletedAt: any;
  };
};

export default function ManageProjectUser({
  onClose,
  id,
}: {
  onClose: () => void;
  id: string | null;
}) {
  const { token } = useToken();
  const [projectData, setProjectData] = useState<ProjectInterface>();
  const [fetching, setFetching] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [assignments, setAssignments] = useState<Assignments[]>([]);
  const { setAlert } = useAlert();
  const [selectedAssignment, setSelectedAssignment] =
    useState<Assignments | null>();
  const [deletePopup, setdeletePopup] = useState<Assignments | null>(null);
  const [users, setUsers] = useState<
    {
      id: number;
      displayName: string;
      email: string;
    }[]
  >([]);

  const fetchAssignment = () => {
    odkAxios
      .get(`/v1/projects/${id}/assignments`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Extended-Metadata": true,
        },
      })
      .then(({ data }) => {
        setAssignments(data);
      })
      .finally(() => {
        setFetching(false);
      });
  };

  useEffect(() => {
    odkAxios
      .get(`/v1/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "X-Extended-Metadata": true,
        },
      })
      .then(({ data }) => {
        setProjectData(data);
      })
      .finally(() => {
        setFetching(false);
      });
  }, []);

  const handleRoleAssignment = ({
    userId,
    roleId,
  }: {
    userId: number;
    roleId: number;
  }) => {
    odkAxios
      .post(
        `/v1/projects/${id}/assignments/${roleId}/${userId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(({ data }) => {
        setAlert({
          show: true,
          state: "info",
          text: "Role Updated successfully",
          title: "",
        });
        fetchAssignment();
        setSelectedAssignment(null);
      })
      .finally(() => {});
  };

  const handleRoleDelete = ({
    userId,
    roleId,
  }: {
    userId: number;
    roleId: number;
  }) => {
    odkAxios
      .delete(`/v1/projects/${id}/assignments/${roleId}/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setAlert({
          show: true,
          state: "info",
          text: "User deleted successfully",
          title: "",
        });
        fetchAssignment();
        setSelectedAssignment(null);
      })
      .finally(() => {});
  };

  const fetchActors = useDebounce((q: string) => {
    odkAxios
      .get(`/v1/users?q=${q}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setUsers(data);
      })
      .catch(v => {
        console.log(v);
      })
      .finally(() => {});
  }, 500);

  useEffect(() => {
    fetchAssignment();
  }, [id]);

  const assignmentsIds = assignments.map(c => c.actor.id);

  return (
    <Wrapper className="drawer-state-opened" onClick={onClose}>
      {deletePopup && (
        <ConfirmPopup
          onClose={() => {
            setdeletePopup(null);
          }}
          onConfirm={() => {
            handleRoleDelete({
              roleId: deletePopup.roleId,
              userId: deletePopup.actor.id,
            });
            setdeletePopup(null);
          }}
          description="Are you sure you want to remove? "
          title="Delete User?"
        />
      )}

      <div
        data-animate="slideLeft"
        className="content"
        onClick={e => {
          e.stopPropagation();
          setIsSearching(false);
        }}
      >
        {fetching ? (
          <LoadingBlock />
        ) : (
          <>
            <div className="head">
              <h2>{projectData?.name} : Project Users</h2>
            </div>
            <div className="pad" onClick={() => setIsSearching(false)}>
              <div className="search-users" onClick={e => e.stopPropagation()}>
                <input
                  type="search"
                  placeholder="Search and Select User"
                  onFocus={() => {
                    setIsSearching(true);
                  }}
                  onChange={e => fetchActors(e.target.value)}
                />
                {isSearching && (
                  <ul
                    className="users-dropdown c-scrollbar"
                    data-isSearching="true"
                  >
                    {users.length === 0 ? (
                      <i>Enter users name to search</i>
                    ) : (
                      users.map(v => (
                        <li
                          key={v.email}
                          aria-disabled={assignmentsIds.includes(v.id)}
                        >
                          {Trimmer(v.displayName, 50)}

                          <select
                            disabled={assignmentsIds.includes(v.id)}
                            aria-label="Project Role"
                            aria-disabled="false"
                            onChange={e => {
                              if (assignmentsIds.includes(v.id)) return;
                              if (e.target.value === "" || !e.target.value) {
                                return handleRoleDelete({
                                  roleId: Number(e.target.value),
                                  userId: Number(v.id),
                                });
                              }
                              handleRoleAssignment({
                                roleId: Number(e.target.value),
                                userId: Number(v.id),
                              });
                              setIsSearching(false);
                            }}
                          >
                            <option value="5">Project Manager</option>
                            <option value="6">Project Viewer</option>
                            <option value="8">Data Collector</option>
                            <option selected value="">
                              None
                            </option>
                          </select>
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </div>

              <div className="devider" data-animate="slideUp">
                <ul className="list">
                  {assignments.map(v => (
                    <li
                      key={v.actorId}
                      onClick={() => setSelectedAssignment(v)}
                    >
                      {v.actor.displayName}
                      <button onClick={() => setdeletePopup(v)}>
                        <AiOutlineMinusCircle />
                      </button>
                    </li>
                  ))}
                </ul>
                {selectedAssignment && (
                  <div className="setting">
                    <h3>{selectedAssignment?.actor.displayName} </h3>

                    <div className="selection">
                      <span>Select Role - </span>
                      <select
                        className="form-control"
                        aria-label="Project Role"
                        aria-disabled="false"
                        onChange={e => {
                          handleRoleDelete({
                            roleId: selectedAssignment.roleId,
                            userId: Number(selectedAssignment.actor.id),
                          });
                          if (e.target.value !== "" || e.target.value) {
                            handleRoleAssignment({
                              roleId: Number(e.target.value),
                              userId: Number(selectedAssignment.actor.id),
                            });
                          }
                        }}
                      >
                        <option
                          selected={
                            selectedAssignment.roleId.toString() === "5"
                          }
                          value="5"
                        >
                          Project Manager
                        </option>
                        <option
                          selected={
                            selectedAssignment.roleId.toString() === "6"
                          }
                          value="6"
                        >
                          Project Viewer
                        </option>
                        <option
                          selected={
                            selectedAssignment.roleId.toString() === "8"
                          }
                          value="8"
                        >
                          Data Collector
                        </option>
                        <option
                          selected={selectedAssignment.roleId.toString() === ""}
                          value=""
                        >
                          None
                        </option>
                      </select>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </Wrapper>
  );
}
