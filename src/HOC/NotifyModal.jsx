import React from "react";
import { generalStyle } from "../styles/movieStyle";
import { heroIcon } from "../UserView/constants/heroIcon";

export default function NotifyModal({ children }) {
  return (
    <div style={generalStyle.modal}>
      <div className="modalHeader px-10 flex justify-end items-center">
        {heroIcon.xIcon}
      </div>
      <div className="modalBody px-10">{children}</div>
      <div className="modalFooter px-10 py-5 flex justify-between items-center">
        <button
          type="button"
          class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
        >
          OK
        </button>
        <button
          type="button"
          class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
