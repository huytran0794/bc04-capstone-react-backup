import React from "react";
import Navigation from "./Navigation";
import UserNav from "./UserNav";

export default function Header() {
  return (
    <div className="flex justify-between items-center">
      <div className="flex justify-between items-center">
        <img src="./movieLogo.png" alt="web-logo" />
        <Navigation />
      </div>
      <UserNav />
    </div>
  );
}
