import { TagDrawerOverlay, TagDrawerWrapper } from "@/Containers/Tags/styles";
import axios from "axios";
import { useRouter } from "next/router";
import { DrawerOpenProps } from "./OdkTable";

import { PIVOT_REST_API } from "@/config";
import { useRef, useState } from "react";
import { v4 as uuidV4 } from "uuid";

// check if key starts with __, meta and remove it
const trimValueInObject = (obj: any) => {
  Object.keys(obj).forEach(key => {
    if (key.startsWith("__") || key.startsWith("meta")) {
      delete obj[key];
    }
  });

  return obj;
};

const convertString = (inputString: string, value = ""): string => {
  const currArr = inputString.split("__");

  const [groupName, ...restOfTheString] = currArr;

  if (restOfTheString.length === 0) {
    return `<${groupName}>${value}</${groupName}>`;
  }

  return `<${groupName}>${convertString(
    restOfTheString.join("__"),
    value
  )}</${groupName}>`;
};

const Drawer = ({
  drawerOpen,
  setDrawerOpen,
}: {
  drawerOpen: DrawerOpenProps;
  setDrawerOpen: (data: any) => void;
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [canEdit, setCanEdit] = useState(false);
  const { reload } = useRouter();

  const handleUpdate = async (e: any) => {
    e.preventDefault();

    const elements = [...e.target.elements];

    const data = elements.reduce((acc, curr) => {
      if (curr.name) {
        const jsonData = curr.value.includes("[")
          ? JSON.parse(curr.value)
          : curr.value;

        acc[curr.name] = Array.isArray(jsonData) ? jsonData : curr.value;
        acc[curr.name] = curr.value;
      }
      return acc;
    }, {});

    if (!drawerOpen.params) return;

    const fields = Object.keys(data).reduce((acc, curr) => {
      if (curr.includes("__type") || curr.includes("properties__accuracy")) {
        return acc;
      }

      if (curr.includes("__coordinates")) {
        const name = curr.split("__coordinates")[0];

        const coordinates = JSON.parse(data[curr]);

        const convertedCoordinates: string[] = [];

        for (const point of coordinates) {
          if (typeof point === "number") {
            const [lat, lon] = coordinates;

            const string = `${lon} ${lat} 0 0`;

            if (!convertedCoordinates.includes(string)) {
              convertedCoordinates.push(string);
            }
          } else {
            for (const p of point) {
              const [lat, lon] = p;
              const string = `${lon} ${lat} 0 0`;
              convertedCoordinates.push(string);
            }
          }
        }

        const result: string = convertedCoordinates.join(";");

        acc += `<${name}>${result}</${name}>`;
        return acc;
      }

      if (curr.includes("__")) {
        const string = convertString(curr, data[curr]);
        return acc + string;
      }

      acc += `<${curr}>${data[curr]}</${curr}>`;
      return acc;
    }, "");

    const xml = `<data id="${drawerOpen.params.surveyId}" version="${
      drawerOpen.params.formVersion
    }"><meta><deprecatedID>${
      drawerOpen.params.deprecatedId
    }</deprecatedID><instanceID>uuid:${uuidV4()}</instanceID></meta>
    ${fields}
    </data>`;

    try {
      await axios.put(`${PIVOT_REST_API}/submission/edit`, {
        project_id: drawerOpen.params.projectId,
        form_id: drawerOpen.params.surveyId,
        instance_id: drawerOpen.params.instanceId,
        xml,
      });
      setDrawerOpen({
        open: false,
        data: null,
        params: null,
      });
      reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleReview = async (params: any, status: string) => {
    const uri = `${PIVOT_REST_API}/submission/review`;

    if (!params.instanceId) return;

    const res = await axios.post(uri, {
      project_id: params.projectId,
      form_id: params.surveyId,
      instance_id: params.instanceId,
      review_state: status,
    });

    if (res.status === 200) {
      setDrawerOpen({
        open: false,
        data: null,
        params: null,
      });
    }
  };

  return (
    <>
      <TagDrawerOverlay />
      <TagDrawerWrapper className="drawer-state-opened">
        <div className="header">Review</div>

        <div className="content">
          <div className="heading">
            <span>
              Submitted By :{" "}
              <em>{drawerOpen.params?.submittedBy?.split("::")[0] || ""}</em>
            </span>
            <span>
              Submitted On :{" "}
              <em>
                {drawerOpen.params?.submittedOn
                  ? new Date(
                      drawerOpen.params?.submittedOn
                    )?.toLocaleDateString()
                  : ""}
              </em>
            </span>
            {drawerOpen.params?.status !== "approved" && (
              <button onClick={() => setCanEdit(b => !b)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="#000000"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" />
                  <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" />
                  <path d="M16 5l3 3" />
                </svg>
              </button>
            )}
          </div>
          <form ref={formRef} onSubmit={handleUpdate} className="form-groups">
            {Object.keys(trimValueInObject(drawerOpen.data)).map(key => {
              return (
                <div className="form-group" key={key}>
                  <label htmlFor={key}>{key.replaceAll("__", " ")}</label>
                  {canEdit ? (
                    <input
                      type="text"
                      name={key}
                      id={key}
                      defaultValue={
                        Array.isArray(drawerOpen.data[key])
                          ? JSON.stringify(drawerOpen.data[key])
                          : drawerOpen.data[key]
                      }
                    />
                  ) : (
                    <span>{drawerOpen.data[key]}</span>
                  )}
                </div>
              );
            })}
          </form>
          <div className="btns">
            <button
              type="button"
              className="btn"
              onClick={() =>
                setDrawerOpen({
                  open: false,
                  data: null,
                  params: null,
                })
              }
            >
              cancel
            </button>
            {drawerOpen.params?.status !== "rejected" && (
              <button
                className="btn danger"
                onClick={() => handleReview(drawerOpen.params, "rejected")}
              >
                reject
              </button>
            )}
            {drawerOpen.params?.status !== "approved" && (
              <button
                className="btn success"
                onClick={() => handleReview(drawerOpen.params, "approved")}
              >
                approve
              </button>
            )}
            {canEdit && (
              <button
                className="btn primary"
                onClick={() => {
                  formRef.current?.dispatchEvent(
                    new Event("submit", { cancelable: true, bubbles: true })
                  );
                }}
              >
                update
              </button>
            )}
          </div>
        </div>
      </TagDrawerWrapper>
    </>
  );
};

export default Drawer;
