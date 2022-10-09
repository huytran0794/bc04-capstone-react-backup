import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import NotifyModal from "../../../HOC/NotifyModal";
import { localServ } from "../../../services/localServ";
import { removeUserInfo } from "../../redux/slices/userSlice";

export default function UserNav() {
  let [isNotifyModalOpen, setNotifyModalOpen] = useState(false);

  let dispatch = useDispatch();
  let user = useSelector((state) => state.userSlice.user);

  let handleLogOut = () => {
    localServ.user.remove();
    dispatch(removeUserInfo());
    setNotifyModalOpen(false);
    window.location.href = "/";
  };

  let renderContent = () => {
    if (user) {
      return (
        <>
          <NavLink to="/login">
            <span className="text-white mr-2">
              Xin chào{" "}
              <span className="font-bold text-xl text-red-500">
                {user.hoTen}
              </span>
            </span>
          </NavLink>
          <button
            type="button"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            onClick={() => {
              setNotifyModalOpen(true);
            }}
          >
            Đăng xuất
          </button>
        </>
      );
    }
    return (
      <>
        <NavLink to="/login">
          <button
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            Đăng nhập
          </button>
        </NavLink>
      </>
    );
  };
  return (
    <div>
      {renderContent()}
      <NotifyModal
        isNotifyModalOpen={isNotifyModalOpen}
        handleCancelClick={() => {
          setNotifyModalOpen(false);
        }}
        handleOKClick={handleLogOut}
      >
        Bạn có muốn đăng xuất?
      </NotifyModal>
    </div>
  );
}
