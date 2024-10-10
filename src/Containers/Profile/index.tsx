import { KeyIcon } from "@/assets";
import authStore from "@/context/authStores";
import { useToken } from "@/hooks";
import { isValidEmail } from "@/utils/checkEmail";
import { odkAxios } from "@/utils/useAxios";
import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { Button, FormControl, useAlert } from "socialwell-design";
import validator from "validator";
import { Wrapper } from "./style";

export default function Index() {
  const { getUserDetails, getUser } = authStore();
  const [userDetail, setUserDetail] = useState({ email: "", displayName: "" });
  const { token } = useToken();
  const { setAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const [form, setValue] = useState({
    email: "",
    displayName: "",
  });

  useEffect(() => {
    odkAxios
      .get("/v1/users/current", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(res => {
        setValue({
          displayName: res.data.displayName?.split("::")[0],
          email: res.data.email,
        });
        setUserDetail({
          displayName: res.data.displayName,
          email: res.data.email,
        });
      })
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!validator.isEmail(form.email) || !isValidEmail(form.email)) {
      setLoading(false);
      return setAlert({
        show: true,
        state: "error",
        title: "Invalid email",
        text: "Provide a valid email to update",
      });
    }

    odkAxios
      .patch(
        `/v1/users/${getUserDetails().id}`,
        {
          email: form.email,
          displayName: `${form.displayName}::${
            userDetail.displayName.split("::")[1]
          }`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then(res => {
        localStorage.removeItem("user-details");
        getUser();
        setAlert({
          show: true,
          state: "success",
          title: "Success",
          text: "User Details updated successfully",
        });
        setValue({
          displayName: res.data.displayName?.split("::")[0],
          email: res.data.email,
        });
        setUserDetail({
          displayName: res.data.displayName,
          email: res.data.email,
        });
      })
      .catch(() => {
        setAlert({
          show: true,
          state: "error",
          title: "Failed",
          text: "Failed to update user details",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Wrapper>
      <div className="content">
        <h2>Edit Profile</h2>

        <form onSubmit={handleSubmit}>
          <FormControl
            inputType={"text"}
            label={"Name"}
            value={form.displayName}
            name={""}
            onChange={e => {
              if (e.target.value && e.target.value.charAt(0).trim() === "")
                return;
              setValue(prev => ({ ...prev, displayName: e.target.value }));
            }}
          />
          <FormControl
            inputType={"text"}
            label={"Email"}
            value={form.email}
            name={""}
            onChange={e => {
              if (e.target.value.length > 0 && e.target.value.includes(" "))
                return;
              setValue(prev => ({ ...prev, email: e.target.value }));
            }}
          />

          <Button
            disabled={
              loading ||
              (userDetail.email === form.email &&
                userDetail.displayName ===
                  `${form.displayName}::${
                    userDetail.displayName.split("::")[1]
                  }`)
            }
            type="submit"
            name={loading ? "Loading..." : "Update"}
            variant="solid"
          />
        </form>

        <Link className="change-password" href={"/account/password"}>
          <KeyIcon />
          Change Password
        </Link>
      </div>
    </Wrapper>
  );
}
