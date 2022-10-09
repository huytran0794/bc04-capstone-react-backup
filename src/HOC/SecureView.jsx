import React, { useEffect } from "react";
import { useState } from "react";
import { localServ } from "../services/localServ";
import NotifyModal from "./NotifyModal";

export default function SecureView({ children }) {
  let [isNotifyModalOpen, setNotifyModalOpen] = useState(false);

  useEffect(() => {
    let localUser = localServ.user.get();
    if (!localUser) {
      setNotifyModalOpen(true);
    }
  }, []);

  let handleOKClick = () => {
    window.location.href = "/login";
  };

  let handleCancelClick = () => {
    window.location.href = "/";
  };

  return (
    <>
      {children}
      <NotifyModal
        isNotifyModalOpen={isNotifyModalOpen}
        handleOKClick={handleOKClick}
        handleCancelClick={handleCancelClick}
      >
        Vui lòng đăng nhập để thực hiện tính năng này
      </NotifyModal>
    </>
  );
}
