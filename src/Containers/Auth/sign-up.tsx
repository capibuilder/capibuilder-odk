import { useFormik } from "formik";
import { useState } from "react";
import { Alert, TextField, Typography } from "socialwell-design";
import * as Yup from "yup";

import axios from "axios";
import Link from "next/link";
import { AuthContainer, AuthWrapper } from "./style";

function Signup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({ status: 0, message: "" });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is Required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is Required"),
    }),
    onSubmit: async (values, {}) => {
      setError({ status: 0, message: "" });
      setLoading(true);

      try {
        await axios.post("/api/create-users", {
          name: values.name,
          email: values.email,
        });
        setLoading(false);
        setError({ message: "", status: -1 });
      } catch (error: any) {
        if (error.response.status === 409) {
          formik.setFieldError(
            "email",
            "Email already registered. Try with another email."
          );
        } else {
          setError({ message: error.message, status: error.response.status });
        }
        setLoading(false);
      }
    },
  });

  return (
    <AuthContainer>
      <AuthWrapper>
        {error.status < 0 ? (
          <div className="formwrapper">
            <Typography as="h1" content={"Verify your email"} />
            <br />
            <p className="notif">
              A email has been sent with a link to verify your account. Please
              click on that link to verify your account. If you have not
              received the email after a few minutes, please check your spam
              folder.
            </p>
          </div>
        ) : (
          <>
            <div className="formwrapper">
              <Typography as="h1" content="Create new account" />

              {error.message && error.status != 409 && (
                <Alert
                  onClose={() => setError({ message: "", status: 0 })}
                  title="Something went wrong"
                  description={error.message}
                  state="error"
                />
              )}

              <form onSubmit={formik.handleSubmit}>
                <div className="formgroup">
                  <label>Name</label>
                  <TextField
                    placeholder="Enter your name"
                    type="text"
                    name="name"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="error">{formik.errors.name}</p>
                  )}
                </div>

                <div className="formgroup">
                  <label>Email</label>
                  <TextField
                    placeholder="Your email"
                    type="text"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="error">{formik.errors.email}</p>
                  )}
                </div>

                <button disabled={!formik.isValid || loading} type="submit">
                  {loading ? "Loading..." : "Signup"}
                </button>
              </form>
            </div>
            <h3>
              Already have an account? <Link href="/login">Login</Link>
            </h3>
          </>
        )}
      </AuthWrapper>
    </AuthContainer>
  );
}

export default Signup;
