import EmailIcon from "@/assets/icons/Email";
import { odkAxios } from "@/utils/useAxios";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { Alert, TextField, Typography } from "socialwell-design";
import * as Yup from "yup";

import { AuthContainer, AuthWrapper } from "./style";

function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
    }),
    onSubmit: values => {
      setError(false);
      setLoading(true);
      odkAxios
        .post("/v1/users/reset/initiate", {
          email: values.email,
        })
        .then(() => {
          //   console.log(res);
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

  return (
    <AuthContainer>
      <AuthWrapper>
        <div className="formwrapper">
          <Typography as="h1" content="Reset Password" />
          <Typography
            as="h4"
            content="Enter your registered email address to reset your password."
          />
          {error && (
            <Alert
              onClose={() => {
                setError(false);
              }}
              title="Authentication failed"
              description="Invalid email or password"
              state="error"
            />
          )}

          <form onSubmit={formik.handleSubmit}>
            <div className="formgroup">
              <label>Email</label>
              <TextField
                required
                icon={EmailIcon}
                placeholder="Your email"
                type="text"
                name="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
            </div>

            <button
              disabled={!(formik.isValid && formik.dirty) || loading}
              type="submit"
            >
              {loading ? "Sending..." : "Reset Password"}
            </button>
          </form>
        </div>
      </AuthWrapper>
    </AuthContainer>
  );
}

export default ResetPassword;
