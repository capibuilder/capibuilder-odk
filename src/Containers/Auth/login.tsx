import EmailIcon from "@/assets/icons/Email";
import { PasswodHide, PasswordShow } from "@/assets/icons/PasswodShowHide";
import UnlockIcon from "@/assets/icons/Unlock";
import authStore from "@/context/authStores";
import { odkAxios } from "@/utils/useAxios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Alert, Flex, TextField, Typography } from "socialwell-design";
import * as Yup from "yup";

import { AuthContainer, AuthWrapper } from "./style";

function Login() {
  const [loading, setLoading] = useState(false);
  const [showpassword, setshowpassword] = useState(false);
  const [error, setError] = useState<boolean>(false);
  const login = authStore(state => state.login);

  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: values => {
      setError(false);
      setLoading(true);
      odkAxios
        .post(
          "/v1/sessions",
          {
            email: values.email,
            password: values.password,
          },
          {
            headers: {
              Authorization: undefined,
            },
          }
        )
        .then(res => {
          localStorage.setItem("auth", JSON.stringify(res.data));
          login();
          //router.push("/projects");
          window.location.href = `${router.query.return || "/projects"}`;
        })
        .catch(err => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  useEffect(() => {
    if (localStorage?.getItem("auth")) {
      router.push("/projects");
    }
  }, []);

  return (
    <AuthContainer>
      <AuthWrapper>
        <div className="formwrapper">
          <Typography as="h1" content="Welcome Back" />
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
            <div className="formgroup">
              <label>Password</label>
              <TextField
                required
                icon={UnlockIcon}
                placeholder="Your password"
                type={showpassword ? "text" : "password"}
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
              />

              <button
                className="password_btn"
                onClick={() => {
                  setshowpassword(!showpassword);
                }}
                type="button"
              >
                {showpassword ? PasswordShow : PasswodHide}
              </button>
            </div>

            <Flex className="cbd" justifyContent="flex-end">
              <Link href="/reset-password">Forgot Password?</Link>
            </Flex>

            <button
              disabled={!(formik.isValid && formik.dirty) || loading}
              type="submit"
              // onSubmit={handlelogin}
            >
              {loading ? "Loading..." : "Login"}
            </button>
          </form>
          {/* <div className="social_logins">
          <SocialLogin />
        </div> */}
        </div>
        <h3>
          Don&apos;t have an account? <Link href="/sign-up">Sign up</Link>{" "}
        </h3>
      </AuthWrapper>
    </AuthContainer>
  );
}

export default Login;
