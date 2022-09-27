import React from "react";
import Header from "../Components/HeaderTheme/Header";
import { webColor } from "../constants/colorConstant";

export default function Layout({ Component }) {
  return (
    <div className="text-white" style={{ background: webColor.bgPrimary }}>
      <Header />
      <Component />
    </div>
  );
}
