import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import uiAction from "../../../store/uiStore";
import CollapsableComponent from "../CollapsableComponent";
import enqSvg from "../../../assets/img/enquiry.svg";
import { authAction } from "../../../store/authStore";
import { deleteFromLocalStorage } from "../../../helpers/helperFunctions";
function NavBar(props) {
  const uiData = useSelector((state) => state.uiStore);
  const dispatch = useDispatch();
  const locaton = useLocation();
  const navigate = useNavigate();
  const logout = () => {
    dispatch(
      authAction.setAuthStatus({
        userName: "",
        loggedIn: false,
        accessToken: null,
        refreshToken: null,
        userId: null,
        user_type: null,
        timeOfLogin: null,
        logInOperation: -1,
      })
    );
    deleteFromLocalStorage("loginInfo");
    navigate(`/`);
  };
  return (
    <div className="sidebar-wrapper sidebar-theme">
      <nav id="sidebar">
        <div className="navbar-nav theme-brand flex-row  text-center">
          <div className="nav-logo">
            <div className="nav-item theme-text">
              <NavLink to="/">
                {/* <img
                  src="https://www.oecindia.com/assets/images/finalpic.png"
                  className="navbar-logo"
                  alt="logo"
                /> */}
                PowerCRM
              </NavLink>
            </div>
          </div>
          <div className="nav-item sidebar-toggle">
            <div
              className="btn-toggle sidebarCollapse"
              onClick={() => props.sidebarStateChange((state) => !state)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-chevrons-left">
                <polyline points="11 17 6 12 11 7"></polyline>
                <polyline points="18 17 13 12 18 7"></polyline>
              </svg>
            </div>
          </div>
        </div>

        {/* <div className="shadow-bottom"></div> */}
        <ul className="list-unstyled menu-categories" id="accordionExample">
          <li className={`menu ${locaton.pathname === "/" ? "active" : ""}`}>
            <NavLink to="/" className="dropdown-toggle">
              <div className="">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="feather feather-home">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <span>Dashboard</span>
              </div>
            </NavLink>
          </li>
          <li className="menu menu-heading">
            <div className="heading">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-minus">
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>Company</span>
            </div>
          </li>

          <CollapsableComponent
            svg={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-clipboard">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              </svg>
            }
            name="Company"
            subMenu={[
              { name: "Companies", link: "/companies" },
              // { name: "Create Enquiry", link: "/enquiry/create" },
            ]}
          />
          <li className="menu menu-heading">
            <div className="heading">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                className="feather feather-minus">
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              <span>Sites</span>
            </div>
          </li>

          <CollapsableComponent
            svg={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-clipboard">
                <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
              </svg>
            }
            name="Sites"
            subMenu={[
              { name: "Sites", link: "/sites" },
              // { name: "Create Enquiry", link: "/enquiry/create" },
            ]}
          />
        </ul>
        <div className="logout-container" onClick={logout}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-log-out">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
            <polyline points="16 17 21 12 16 7"></polyline>
            <line x1="21" y1="12" x2="9" y2="12"></line>
          </svg>
          <p className="logoutBtn">Logout</p>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
