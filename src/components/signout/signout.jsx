import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signout = ({ setUserOnLogout }) => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUserOnLogout();
    navigate("/");
  }, []);
  return null;
};

export default Signout;
