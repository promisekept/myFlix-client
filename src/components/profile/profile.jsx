import React, { useEffect, useState } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

//Things to do
//Retrieve user informaiton from local storage
//Update local storage once user information is updated

const Profile = ({ user }) => {
  const [updateMode, setUpdateMode] = useState(false);
  const navigate = useNavigate();
  // let Username, Birthday, Email = "Default"
  // let { Username, Birthday, Email } = user.user;
  let Username = "The User";
  let Birthday = "2002-05-05";
  let Email = "The Email";
  let Password = "The Password";

  const [updatedUsername, setUpdatedUsername] = useState(Username);
  const [updatedPassword, setUpdatedPassword] = useState(Password);
  const [updatedEmail, setUpdatedEmail] = useState(Email);
  const [updatedBirthday, setUpdatedBirthday] = useState(Birthday);
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
        window.open("/", "_self"); // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch((e) => {
        console.log("error delete the user");
      });
  };

  const updateInfo = () => {
    console.log('here')
    console.log(updatedPassword)
  }

  return (
    <Form>
      <Alert>Your account information</Alert>
      <Form.Group controlId="formUpdatedUser">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={updateMode ? updatedUsername : Username}
          onChange={(e) => setUpdatedUsername(e.target.value)}
          readOnly={!updateMode} />
      </Form.Group>
      <Form.Group controlId="formUpdatedPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={updateMode ? updatedPassword : Password}
          onChange={(e) => setUpdatedPassword(e.target.value)}
          readOnly={!updateMode} />
      </Form.Group>
      <Form.Group controlId="formUpdatedEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="text"
          value={updateMode ? updatedEmail : Email}
          onChange={(e) => setUpdatedEmail(e.target.value)}
          readOnly={!updateMode} />
      </Form.Group>
      <Form.Group controlId="formUpdatedBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={updateMode ? updatedBirthday : Birthday}
          onChange={(e) => setUpdatedBirthday(e.target.value)}
          readOnly={!updateMode} />
      </Form.Group>
      <Button className={updateMode && "d-none"} onClick={() => setUpdateMode(true)}>Update user information</Button>
      <Button className={updateMode && "d-none"} type="submit" onClick={deleteAccount}>
        Delete account
      </Button>
      <Button className={!updateMode && "d-none"} onClick={updateInfo}>Update</Button>
      <Button variant="link" onClick={() => navigate(-1)}>
        Go back
      </Button>
    </Form >
  );
};

export default Profile;
