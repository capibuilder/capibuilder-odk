import { LoadingBlock } from "@/components";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import useToken from "../hooks/useToken";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { asPath, push, isReady } = useRouter();
  const [authPassed, setAuthPassed] = useState(false);
  const { token } = useToken();

  useEffect(() => {
    if (isReady && !token) {
      push(`/login?return=${encodeURIComponent(asPath)}`);
    } else {
      setAuthPassed(true);
    }
  }, [isReady]);

  useEffect(() => {
    window.addEventListener("storage", e => {
      if (e.key === "auth") {
        window.location.reload();
      }
    });
  }, []);

  return <>{authPassed ? children : <LoadingBlock />}</>;
}
