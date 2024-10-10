import authStore from "@/context/authStores";
import { useToken } from "@/hooks";
import { odkAxios } from "@/utils/useAxios";
import { useFormik } from "formik";
import Link from "next/link";
import { Button, FormControl, useAlert } from "socialwell-design";
import { Wrapper } from "./style";

import { useRouter } from "next/router";
import { useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  old: Yup.string().required("Old Password is required"),
  new: Yup.string()
    .required("New Password is required")
    .min(6, "New Password must be at least 6 characters"),
  newConfirm: Yup.string()
    .oneOf([Yup.ref("new")], "Confirmation Password does not match")
    .required("Confirmation new Password is required"),
});

export default function Index() {
  const { getUserDetails, logout } = authStore();
  const { token } = useToken();
  const { setAlert } = useAlert();
  const [loading, setLoading] = useState(false);
  const { push } = useRouter();

  const formik = useFormik({
    initialValues: {
      old: "",
      new: "",
      newConfirm: "",
    },
    validationSchema,
    onSubmit: values => {
      setLoading(true);
      odkAxios
        .put(
          `/v1/users/${getUserDetails().id}/password`,
          { new: values.new, old: values.old },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then(() => {
          logout();
          setAlert({
            show: true,
            state: "success",
            text: "Password updated successfully",
            title: "Success",
          });
          push("/login");
        })
        .catch(() => {
          setAlert({
            show: true,
            state: "error",
            text: "Provided current password is incorrect",
            title: "Failed",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return (
    <Wrapper>
      <div className="content">
        <h2>Change Password</h2>

        <form onSubmit={formik.handleSubmit}>
          <FormControl
            inputType={"text"}
            label={"Current Password"}
            value={formik.values.old}
            name={"old"}
            onChange={formik.handleChange}
            placeholder="Enter your current password"
            hasError={
              formik.touched.old &&
              formik.errors.old && <p className="error">{formik.errors.old}</p>
            }
          />
          <FormControl
            inputType={"text"}
            label={"New Password"}
            value={formik.values.new}
            name={"new"}
            onChange={formik.handleChange}
            placeholder="Enter your new Password"
            hasError={
              formik.touched.new &&
              formik.errors.new && <p className="error">{formik.errors.new}</p>
            }
          />
          <FormControl
            inputType={"text"}
            label={"Retype New Password"}
            value={formik.values.newConfirm}
            name={"newConfirm"}
            onChange={formik.handleChange}
            placeholder="Enter your new password again"
            hasError={
              formik.touched.newConfirm &&
              formik.errors.newConfirm && (
                <p className="error">{formik.errors.newConfirm}</p>
              )
            }
          />

          <Button
            disabled={loading}
            type="submit"
            name={loading ? "Loading..." : "Update Password"}
            variant="solid"
          />
        </form>

        <Link className="change-password" href={"/reset-password"}>
          Forgot Password
        </Link>
      </div>
    </Wrapper>
  );
}
