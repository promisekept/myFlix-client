import React from "react";
import { Container, Navbar as NavbarTag, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <NavbarTag bg="light" variant="light">
      <Container>
        <Nav className="me-auto">
          {localStorage.getItem("user") ? (
            <>
              {/* <Nav.Link> */}
              <NavLink to="/movies">Home</NavLink>
              {/* </Nav.Link> */}
              {/* <Nav.Link> */}
              <NavLink to="/profile">Profile</NavLink>
              {/* </Nav.Link> */}
              {/* <Nav.Link> */}
              <NavLink to="/signout">Sign out</NavLink>
              {/* </Nav.Link> */}
            </>
          ) : (
            <NavLink to="/registration">Sign up</NavLink>
          )}
        </Nav>
      </Container>
    </NavbarTag>
  );
};

export default Navbar;
