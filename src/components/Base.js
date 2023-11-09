import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useIsLoggedIn from "../hooks/useIsLoggedIn";
import Header from "./UI/Layouts/Header";
import Notification from "./UI/Notification";
import Shortcuts from "./General/Shortcuts";
import NavBar from "./UI/Layouts/NavBar";

const Base = () => {
  const isLoggedIn = useIsLoggedIn();

  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const sideBarStatus = false;

  return (
    <>
      <NavBar />
      <div
        className={`main-container  ${
          sideBarStatus && window.innerWidth > 760
            ? "sidebar-closed sbar-open"
            : ""
        } ${sideBarStatus && window.innerWidth <= 760 ? "sbar-open" : ""}`}
        id="container"
      >
        <div className="container-fluid mt-3">
          <div className="row">
            <Header />
            <Outlet />
            <Shortcuts />
          </div>
        </div>
      </div>
      <Notification />
    </>
  );
};

export default Base;
