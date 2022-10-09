import React from "react";
import { createPortal } from "react-dom";
import { generalStyle } from "../styles/movieStyle";
import { heroIcon } from "../UserView/constants/heroIcon";

export default function NotifyModal({
  children,
  isNotifyModalOpen = false,
  handleCancelClick,
  handleOKClick,
}) {
  if (!isNotifyModalOpen) return null;

  return createPortal(
    <>
      <div style={generalStyle.modalOverlay}></div>
      <div style={generalStyle.modal} className="w-2/5">
        <div className="modalHeader px-10 flex justify-end items-center">
          <span
            className="text-black cursor-pointer"
            onClick={handleCancelClick}
          >
            {heroIcon.xIcon}
          </span>
        </div>
        <div className="modalBody px-10 text-black">{children}</div>
        <div className="modalFooter px-10 py-5 flex justify-between items-center">
          <button
            type="button"
            class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={handleOKClick}
          >
            OK
          </button>
          <button
            type="button"
            class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}
