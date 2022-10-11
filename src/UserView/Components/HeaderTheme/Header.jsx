import React from "react";
import { NavLink } from "react-router-dom";
import Navigation from "./Navigation";
import UserNav from "./UserNav";

export default function Header() {
  return (
    <div className="container mx-auto py-3 flex justify-between items-center">
      <div className="flex items-center">
        <NavLink to={"/"}>
          <img className="h-16" src="./movieLogo.png" alt="web-logo" />
        </NavLink>
        <Navigation />
      </div>
      <UserNav />
    </div>
  );
}
