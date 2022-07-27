import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    navigate("/");
  }, []);
  return null;
};

export default Signout;
