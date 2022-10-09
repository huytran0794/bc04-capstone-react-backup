import React from "react";
import { NavLink } from "react-router-dom";
import Navigation from "./Navigation";
import UserNav from "./UserNav";

export default function Header() {
  return (
    <div className="container mx-auto flex justify-between items-center">
      <div className="flex justify-between items-center">
        <NavLink to={"/"}>
          <img src="./movieLogo.png" alt="web-logo" />
        </NavLink>
        <Navigation />
      </div>
      <UserNav />
    </div>
  );
}
