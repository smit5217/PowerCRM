import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import uiAction from "../../../store/uiStore";
import CollapsableComponent from "../CollapsableComponent";
import enqSvg from "../../../assets/img/enquiry.svg";
import { authAction } from "../../../store/authStore";
import { deleteFromLocalStorage } from "../../../helpers/helperFunctions";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

export default function NavBar(props) {
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
    navigate(`/login`);
  };
  return (
    <>
      {/* <Navbar
        bg="light"
        data-bs-theme="light"
        className="navbar navbar-expand-lg navbar-transparent navbar-light shadow-inset rounded navbar-theme-primary"
      >
        <Container className="position-relative">
          <Navbar.Brand href="#home" className="mr-lg-5">
            PowerCRM
          </Navbar.Brand>
          <Navbar className="justify-content-end">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/">
                Dashboard
              </Nav.Link>
              <Nav.Link as={NavLink} to="/companies">
                Company
              </Nav.Link>
              <Nav.Link as={NavLink} to="/sites">
                Sites
              </Nav.Link>
              <Nav.Link as={NavLink} to="/group-sites">
                Group Sites
              </Nav.Link>
              <Nav.Link as={NavLink} to="/quotes">
                Quotes
              </Nav.Link>
              <Nav.Link as={Button} onClick={logout}>
                Logout
              </Nav.Link>
            </Nav>
          </Navbar>
        </Container>
      </Navbar> */}
      <nav className="navbar navbar-expand-lg navbar-transparent navbar-light shadow-inset rounded navbar-theme-primary">
        <div className="container-fluid position-relative">
          <Navbar className="justify-content-end">
            <Navbar.Brand as={NavLink} to="/" className="">
              PowerCRM
            </Navbar.Brand>
          </Navbar>
          <div className="navbar-collapse collapse" id="navbar-dark-signin">
            <div className="navbar-collapse-header">
              <div className="row">
                <div className="col-6 collapse-brand">
                  <a href="https://demo.themesberg.com/neumorphism-ui-pro/index.html">
                    <img
                      src="https://demo.themesberg.com/neumorphism-ui-pro/assets/img/brand/dark.svg"
                      alt="menuimage"
                    />
                  </a>
                </div>
                <div className="col-6 collapse-close">
                  <span
                    className="fas fa-times"
                    data-toggle="collapse"
                    role="button"
                    data-target="#navbar-dark-signin"
                    aria-controls="navbar-dark-signin"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  ></span>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center">
            <Navbar className="">
              <Nav className="me-auto">
                <Nav.Link as={NavLink} to="/companies">
                  Company
                </Nav.Link>
                <Nav.Link as={NavLink} to="/sites">
                  Sites
                </Nav.Link>
                <Nav.Link as={NavLink} to="/group-sites">
                  Group Sites
                </Nav.Link>
                <Nav.Link as={NavLink} to="/quotes">
                  Quotes
                </Nav.Link>
                <Nav.Link as={NavLink} to="/group-quotes">
                  Group Quotes
                </Nav.Link>
              </Nav>
            </Navbar>
            <Nav.Link as={Button} onClick={logout}>
              Logout
            </Nav.Link>
          </div>
        </div>
      </nav>
    </>
  );
}
