import { Menu } from "antd";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { webColor } from "../../constants/colorConstant";

const items = [
  {
    label: (
      <NavLink to="/theatres">
        <span className="text-white">Our Theatres</span>
      </NavLink>
    ),
    key: "theatresList",
  },
  {
    label: (
      <NavLink to="/underDeveloped">
        <span className="text-white">Food & Drinks</span>
      </NavLink>
    ),
    key: "foodDrink",
  },
];

const Navigation = () => {
  const [current, setCurrent] = useState("mail");

  const onClick = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <Menu
      style={{
        background: webColor.bgPrimary,
        border: "none",
        color: "#fff",
        fontSize: "18px",
      }}
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Navigation;
