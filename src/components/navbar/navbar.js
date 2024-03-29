import React from "react";

import { Container, Navbar as NavbarTag, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Navbar = ({ user, inRegScreen, isInRegScreen }) => {
  return (
    <NavbarTag
      bg="primary"
      variant="dark"
      sticky="top"
      className={`mb-2 ${inRegScreen ? "d-none" : ""}`}
    >
      <Container>
        <Nav className="me-auto">
          {user ? (
            <>
              <NavLink className="nav-link" to="/movies">
                Home
              </NavLink>
              <NavLink className="nav-link" to="/profile">
                Profile
              </NavLink>
              <NavLink className="nav-link" to="/signout">
                Sign out
              </NavLink>
            </>
          ) : (
            <NavLink
              className="nav-link"
              to="/registration"
              onClick={isInRegScreen}
            >
              Sign up
            </NavLink>
          )}
          <br />
        </Nav>
      </Container>
    </NavbarTag>
  );
};

export default Navbar;
