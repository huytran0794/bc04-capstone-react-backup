import React from "react";
import { useSelector } from "react-redux";

export default function UserNav() {
  let user = useSelector((state) => {
    return state.userSlice.user;
  });
  let renderContent = () => {
    if (user) {
      return (
        <>
          <span>{user.hoTen}</span>
        </>
      );
    }
    return (
      <>
        <span>UserNav</span>
      </>
    );
  };
  return <div>{renderContent()}</div>;
}
