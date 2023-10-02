import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import useIsLoggedIn from "../hooks/useIsLoggedIn";
import Header from "./UI/Layouts/Header";
import Sidebar from "./UI/Layouts/Sidebar";
import Notification from "./UI/Notification";
import UiModal from "./UI/UiModal";
import Shortcuts from "./General/Shortcuts";
import NavBar from "./UI/Layouts/NavBar";

function Base() {
  // get loggedin Data
  const isLoggedIn = useIsLoggedIn();

  // naviate user programatically
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn]);

  const [sideBarStatus, setSideBarStatus] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
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
        {/* <Sidebar sidebarStateChange={setSideBarStatus} /> */}

        {/* <div id="content" className="main-content"> */}
        {/* <div className="layout-px-spacing">
            <div className="middle-content p-0"> */}

        <div className="container-fluid mt-3">
          <div className="row">
            <Header />

            <Outlet />
            <Shortcuts />
          </div>
          {/* </div>
            </div> */}
          {/* </div> */}
        </div>
      </div>
      <Notification />
      {/* <div
        className="fixed-footer"
        title="Create Enquiry"
        onClick={() => {
          // navigate(`/enquiry/create`)}
          setModalStatus(true);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="60"
          height="60"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#4361ee"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-plus-circle"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="16"></line>
          <line x1="8" y1="12" x2="16" y2="12"></line>
        </svg>
      </div> */}

      {/* <UiModal
        setModalStatus={() => {
          setModalStatus(false);
        }}
        modalClass="fullEnq"
        showStatus={modalStatus}
        showHeader={true}
        title=""
        body={
          <EnquiryForm
            closeIt={() => {
              setModalStatus(false);
            }}
            type="create"
            title="Create Enquiry"
            isModal={true}
            edit={false}
          />
        }
        showFooter={false}
        // footerContent={modalStatus.footerContent}
      /> */}
    </>
  );
}

export default Base;
