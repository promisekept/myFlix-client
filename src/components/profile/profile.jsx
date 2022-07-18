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
  let { Username, Birthday, Email } = user.user;
  // let Username = "The User";
  // let Birthday = "2003-02-02T00:00:00.000Z";
  // let Email = "The Email";

  const [updatedUsername, setUpdatedUsername] = useState(Username);
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState(Email);
  const [updatedBirthday, setUpdatedBirthday] = useState(
    Birthday.substring(0, 10)
  );
  const [updatedUsernameErr, setUpdatedUsernameErr] = useState("");
  const [updatedPasswordErr, setUpdatedPasswordErr] = useState("");
  const [updatedEmailErr, setUpdatedEmailErr] = useState("");
  const [updatedBirthdayErr, setUpdatedBirthdayErr] = useState("");
  const token = localStorage.getItem("token");
  const deleteAccount = (e) => {
    e.preventDefault();
    axios
      .delete(
        `https://herokumovieapi.herokuapp.com/users/${Username}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.open("/", "_self"); // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch((e) => {
        console.log("error delete the user");
      });
  };

  const updateInfo = (e) => {
    e.preventDefault();
    console.log(
      updatedUsername,
      updatedPassword,
      updatedEmail,
      updatedBirthday
    );
    if (!updatedUsername) {
      setUpdatedUsernameErr("Username required");
    } else if (updatedUsername.length < 5) {
      setUpdatedUsernameErr("Username must be at least 5 characters long");
    } else if (!updatedPassword) {
      setUpdatedPasswordErr("Password required");
    } else if (updatedPassword.length < 4) {
      setUpdatedPasswordErr("Password must be at least 4 characters long");
    } else if (!updatedEmail) {
      setUpdatedEmailErr("Email required");
    } else if (updatedEmail.indexOf("@") === -1) {
      setUpdatedEmailErr("Please enter a valid email");
    } else if (!updatedBirthday) {
      setUpdatedBirthdayErr("Birtdhay is requied");
    } else {
      console.log("info updated");
      setUpdateMode(false);
      setUpdatedUsernameErr("");
      setUpdatedPasswordErr("");
      setUpdatedEmailErr("");
      setUpdatedBirthdayErr("");
      axios
        .put(`https://herokumovieapi.herokuapp.com/users/${Username}`,
          {
            Username: updatedUsername,
            Password: updatedPassword,
            Email: updatedEmail,
            Birthday: updatedBirthday,
          }, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          localStorage.setItem("user", updatedUsername);
        });
    }
  };

  return (
    <Form>
      <Alert>Your account information</Alert>
      <Form.Group controlId="formUpdatedUser">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={updatedUsername}
          onChange={(e) => setUpdatedUsername(e.target.value)}
          readOnly={!updateMode}
        />
        {updatedUsernameErr && (
          <Alert className="text-danger">{updatedUsernameErr}</Alert>
        )}
      </Form.Group>
      <Form.Group controlId="formUpdatedPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={updatedPassword}
          onChange={(e) => setUpdatedPassword(e.target.value)}
          readOnly={!updateMode}
        />
        {updatedPasswordErr && (
          <Alert className="text-danger">{updatedPasswordErr}</Alert>
        )}
      </Form.Group>
      <Form.Group controlId="formUpdatedEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="text"
          value={updatedEmail}
          onChange={(e) => setUpdatedEmail(e.target.value)}
          readOnly={!updateMode}
        />
        {updatedEmailErr && (
          <Alert className="text-danger">{updatedEmailErr}</Alert>
        )}
      </Form.Group>
      <Form.Group controlId="formUpdatedBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={updatedBirthday}
          onChange={(e) => setUpdatedBirthday(e.target.value)}
          readOnly={!updateMode}
        />
        {updatedBirthdayErr && (
          <Alert className="text-danger">{updatedBirthdayErr}</Alert>
        )}
      </Form.Group>
      {updateMode ? (
        <>
          <Button onClick={updateInfo}>Update</Button>
          <Button onClick={() => setUpdateMode(false)}>Cancel</Button>
        </>
      ) : (
        <>
          <Button onClick={() => setUpdateMode(true)}>
            Update user information
          </Button>
          <Button type="submit" onClick={deleteAccount}>
            Delete account
          </Button>
          <Button variant="link" onClick={() => navigate(-1)}>
            Go back
          </Button>
        </>
      )}
    </Form>
  );
};

export default Profile;
