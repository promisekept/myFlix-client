import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";

const RegistrationView = () => {
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newBirthday, setNewBirthday] = useState("");
  const [registrationSuccessful, setRegistratonSuccessful] = useState(false);
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(newUsername, newPassword, newEmail, newBirthday);
    axios
      .post("https://herokumovieapi.herokuapp.com/users", {
        Username: newUsername,
        Password: newPassword,
        Email: newEmail,
        Birthday: newBirthday,
      })
      .then((response) => {
        const data = response.data;
        console.log(data);
        setRegistratonSuccessful(true);
        // window.open("/", "_self"); // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch((e) => {
        console.log("error registering the user");
      });
  };

  return registrationSuccessful ? (
    <>
      <Alert>Registration successful!</Alert>
      <Button variant="link" onClick={() => navigate("/")}>
        Log in
      </Button>
    </>
  ) : (
    <Form>
      <Form.Group controlId="formNewUser">
        <Form.Label>New User:</Form.Label>
        <Form.Control
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId="formNewPassword">
        <Form.Label>New Password:</Form.Label>
        <Form.Control
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={newBirthday}
          onChange={(e) => setNewBirthday(e.target.value)}
        />
      </Form.Group>
      <Button type="submit" onClick={handleRegister}>
        Submit
      </Button>
    </Form>
  );
};
// RegistrationView.propTypes = {
//   handleUnregistered: PropTypes.func.isRequired,
// };
export default RegistrationView;
