import React from "react";
import { Container, Navbar as NavbarTag, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <NavbarTag bg="primary" variant="dark" sticky="top" className="mb-2">
      <Container>
        <Nav className="me-auto">
          {localStorage.getItem("user") ? (
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
            <NavLink className="nav-link" to="/registration">
              Sign up
            </NavLink>
          )}
          <br />
        </Nav>
      </Container>
    </NavbarTag>
  );
};
//   <NavbarTag bg="primary" variant="dark">
//     <Container>
//       <NavbarTag.Brand href="#home">Navbar</NavbarTag.Brand>
//       <Nav className="me-auto">
//         <Nav.Link href="#home">Home</Nav.Link>
//         <Nav.Link href="#features">Features</Nav.Link>
//         <Nav.Link href="#pricing">Pricing</Nav.Link>
//       </Nav>
//     </Container>
//   </NavbarTag>
// );
// };
export default Navbar;
