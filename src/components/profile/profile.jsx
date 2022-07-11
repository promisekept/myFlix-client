import React, { useEffect, useState } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const Profile = ({ user }) => {
  const [updatedUsername, setUpdatedUsername] = useState();

  const navigate = useNavigate();
  // let Username, Birthday, Email = "Default"
  // let { Username, Birthday, Email } = user.user;
  let Username = "The User";
  let Birthday = "The Birthday";
  let Email = "The Email";

  const deleteAccount = (e) => {
    e.preventDefault();
    axios
      .delete(
        `https://herokumovieapi.herokuapp.com/users/${user.user.Username}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        const data = response.data;
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        console.log(data);
        window.open("/", "_self"); // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch((e) => {
        console.log("error delete the user");
      });
  };

  return (
    <Form>
      <Alert>Your account information</Alert>
      <Form.Group>
        <Form.Label controlId="formUsername">Username:</Form.Label>
        <Form.Control type="text" value={Username} />
      </Form.Group>
      <h3>Your account information:</h3>
      {console.log(user)}
      {/* <Input type="text" id="username"> */}
      {/* {Username} */}
      {/* </Input> */}
      <div>Email: {Email}</div>
      <div>Birthday: {Birthday}</div>
      <Button>Update user information</Button>
      <Button type="submit" onClick={deleteAccount}>
        Delete account
      </Button>
      <Button variant="link" onClick={() => navigate(-1)}>
        Go back
      </Button>
    </Form>
  );
};

export default Profile;
