import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signout = ({ onLoggedOut }) => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
    navigate("/");
    onLoggedOut();
  }, []);
  return null;
};

export default Signout;
