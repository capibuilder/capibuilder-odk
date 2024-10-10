import { odkAxios } from "@/utils/useAxios";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { Alert, TextField, Typography } from "socialwell-design";
import * as Yup from "yup";

import { PasswodHide, PasswordShow } from "@/assets/icons/PasswodShowHide";
import UnlockIcon from "@/assets/icons/Unlock";
import { AuthContainer, AuthWrapper } from "./style";

function NewPassword() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      new: "",
    },
    validationSchema: Yup.object({
      new: Yup.string().required("Required"),
    }),
    onSubmit: values => {
      setError("");
      setLoading(true);

      if (values.new.length < 10) {
        setError("Password must be at least 10 characters long");
        setLoading(false);
        return;
      }

      odkAxios
        .post(
          "/v1/users/reset/verify",
          {
            new: values.new,
          },
          {
            headers: {
              Authorization: `Bearer ${router.query.token}`,
            },
          }
        )
        .then(() => {
          router.push("/login");
        })
        .catch(err => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  // useEffect(() => {
  //   // if (router.query.token === undefined) {
  //   //   router.push("/login");
  //   // }
  //   console.log(router.query.token);
  // }, []);

  return (
    <AuthContainer>
      <AuthWrapper>
        <div className="formwrapper">
          <Typography as="h1" content="New Password" />
          {error !== "" && (
            <Alert
              onClose={() => {
                setError("");
              }}
              title="Something went wrong"
              description={error}
              state="error"
            />
          )}

          <form onSubmit={formik.handleSubmit}>
            <div className="formgroup">
              <label>New Password</label>
              <TextField
                required
                icon={UnlockIcon}
                placeholder="Your new password"
                type={showPassword ? "text" : "password"}
                name="new"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.new}
              />
              <button
                className="password_btn"
                onClick={() => {
                  setShowPassword(v => !v);
                }}
                type="button"
              >
                {showPassword ? PasswordShow : PasswodHide}
              </button>
            </div>

            <button
              disabled={!(formik.isValid && formik.dirty) || loading}
              type="submit"
            >
              {loading ? "Loading..." : "Save"}
            </button>
          </form>
        </div>
      </AuthWrapper>
    </AuthContainer>
  );
}

export default NewPassword;
