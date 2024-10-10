import React, { useEffect } from "react";

interface props {
  loading: boolean;
}

export default function Index({ loading }: props) {
  useEffect(() => {
    loading && document.documentElement.setAttribute("area-loading", "true");

    return () => {
      document.documentElement.removeAttribute("area-loading");
    };
  }, [loading]);

  return <></>;
}
