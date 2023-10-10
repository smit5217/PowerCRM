import React from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { authAction } from "../../../store/authStore";
import { deleteFromLocalStorage } from "../../../helpers/helperFunctions";

export default function NavBar(props) {
  
  const dispatch = useDispatch();
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
    <>
      <div
        id="tabsSimple"
        className="col-xl-12 col-12 layout-spacing container-fluid">
        <div className="statbox box box-shadow">
          <div className="widget-content widget-content-area">
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
              <NavLink className="navbar-brand mx-4" to="/">
                PowerCRM
              </NavLink>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div
                className="collapse navbar-collapse justifyCenter"
                id="navbarNav">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link mx-2"
                      aria-current="page"
                      to="/">
                      Dashboard
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/companies">
                      Company
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/sites">
                      Sites
                    </NavLink>
                  </li>
                </ul>
                <NavLink className="navbar-text" onClick={logout}>
                  Logout
                </NavLink>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
