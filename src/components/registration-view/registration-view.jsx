import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert, Stack } from "react-bootstrap";
import axios from "axios";

const RegistrationView = ({ isOutOfRegScreen }) => {
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newBirthday, setNewBirthday] = useState("");
  const [registrationSuccessful, setRegistratonSuccessful] = useState(false);
  const [newUsernameErr, setNewUsernameErr] = useState("");
  const [newPasswordErr, setNewPasswordErr] = useState("");
  const [newEmailErr, setNewEmailErr] = useState("");
  const [newBirthdayErr, setNewBirthdayErr] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(newUsername, newPassword, newEmail, newBirthday);
    if (!newUsername) {
      setNewUsernameErr("New Username Required");
    } else if (newUsername.length < 5) {
      setNewUsernameErr("Username must be at least 5 characters long");
    } else if (!newPassword) {
      setNewPasswordErr("Password Required");
    } else if (newPassword.length < 4) {
      setNewPasswordErr("Password must be at least 4 characters long");
    } else if (!newEmail) {
      setNewEmailErr("Email is required");
    } else if (newEmail.indexOf("@") === -1) {
      setNewEmailErr("Please enter a valid email");
    } else if (!newBirthday) {
      setNewBirthdayErr("Birthday is required");
    } else {
      axios
        .post("https://herokumovieapi.herokuapp.com/users", {
          Username: newUsername,
          Password: newPassword,
          Email: newEmail,
          Birthday: newBirthday,
        })
        .then((response) => {
          setRegistratonSuccessful(true);
        })
        .catch((e) => {
          console.log("error registering the user");
        });
    }
  };

  return registrationSuccessful ? (
    <>
      <Alert>Registration successful!</Alert>
      <Button
        variant="link"
        onClick={() => {
          isOutOfRegScreen();
          navigate("/");
        }}
      >
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
        {newUsernameErr && (
          <Alert className="text-danger">{newUsernameErr}</Alert>
        )}
      </Form.Group>
      <Form.Group controlId="formNewPassword">
        <Form.Label>New Password:</Form.Label>
        <Form.Control
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        {newPasswordErr && (
          <Alert className="text-danger">{newPasswordErr}</Alert>
        )}
      </Form.Group>
      <Form.Group>
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        {newEmailErr && <Alert className="text-danger">{newEmailErr}</Alert>}
      </Form.Group>
      <Form.Group>
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={newBirthday}
          onChange={(e) => setNewBirthday(e.target.value)}
        />
        {newBirthdayErr && (
          <Alert className="text-danger">{newBirthdayErr}</Alert>
        )}
      </Form.Group>
      <Stack className="mt-5" direction="horizontal" gap={3}>
        <Button type="submit" onClick={handleRegister}>
          Submit
        </Button>
        <Button
          onClick={() => {
            isOutOfRegScreen();
            navigate("/");
          }}
        >
          Go back
        </Button>
      </Stack>
    </Form>
  );
};
export default RegistrationView;
