import React, { useEffect } from "react";
import { localServ } from "../services/localServ";

export default function SecureView({ children }) {
  useEffect(() => {
    let localUser = localServ.user.get();
    if (!localUser) {
      window.location.href = "/login";
    }
  }, []);
  return <div>{children}</div>;
}
