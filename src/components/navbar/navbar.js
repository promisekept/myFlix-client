import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = ({ isLoggedIn }) => {
  return (
    <nav>
      {/* {localStorage.getItem("user") ? ( */}
      {isLoggedIn ? (
        <>
          <NavLink to="/movies">Home</NavLink>
          <NavLink to="/profile-view">Profile</NavLink>
          <NavLink to="/signout">Sign out</NavLink>
        </>
      ) : (
        <NavLink to="/registration">Sign up</NavLink>
      )}
    </nav>
  );
};

export default Navbar;
