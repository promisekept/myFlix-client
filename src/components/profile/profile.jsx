import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

const Profile = ({ user }) => {
  const [allUsers, setAllUsers] = useState(null);
  useEffect(() => {
    axios
      .get("https://herokumovieapi.herokuapp.com/users", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setAllUsers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  let userAccount = null;
  if (allUsers) {
    userAccount = allUsers.filter((account) => account.Username === user)[0];
  }
  //   console.log(userAccount);
  const navigate = useNavigate();

  return (
    <>
      <h3>Your account information:</h3>
      <div>Username: {allUsers ? userAccount.Username : ""}</div>
      {/* <div>Email: {userAccount.Email}</div> */}
      {/* <div>Birthday: {userAccount.Birthday}</div>) */}
      <Button varian="link" onClick={() => navigate(-1)}>
        Go back
      </Button>
    </>
  );
};

export default Profile;
