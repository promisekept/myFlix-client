import React, { useEffect, useState } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";

const Profile = ({ user }) => {
  const navigate = useNavigate();

  const deleteAccount = (e) => {

    e.preventDefault();
    axios
      .delete(`https://herokumovieapi.herokuapp.com/users/${user.user.Username}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
      ).then((response) => {
        const data = response.data;
        console.log(data);
        window.open("/", "_self"); // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch((e) => {
        console.log("error delete the user");
      });
  }

  return (
    <>
      <h3>Your account information:</h3>
      {console.log(user)}
      <div>Username: {user.user.Username}</div>
      <div>Email: {user.user.Email}</div>
      <div>Birthday: {user.user.Birthday}</div>
      <Button type="submit" onClick={deleteAccount}>Delete account</Button>
      <Button variant="link" onClick={() => navigate(-1)}>
        Go back
      </Button>
    </>
  );
};

export default Profile;
