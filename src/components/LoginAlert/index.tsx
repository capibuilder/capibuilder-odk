import Link from "next/link";
import React from "react";
import { LoginAlertContainer } from "./styles";

const LoginAlert = ({
  icon,
  title,
  cta,
}: {
  icon?: React.ReactNode;
  title: string;
  cta?: React.ReactNode;
}) => {
  return (
    <LoginAlertContainer>
      {icon}
      <h3>{title}</h3>
      <Link href="/login">{cta}</Link>
    </LoginAlertContainer>
  );
};

export default LoginAlert;
