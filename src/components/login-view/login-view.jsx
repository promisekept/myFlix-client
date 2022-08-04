import React, { useState } from "react";
import { Form, Button, Alert, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginView = ({ setUserOnLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    /* Send a request to the server for authentication */
    if (!username) {
      setUsernameErr("Username Required");
    } else if (username.length < 5) {
      setUsernameErr("Username must be at least 5 characters long");
    } else if (!password) {
      setPasswordErr("Password Required");
    } else if (password.length < 4) {
      setPasswordErr("Password must be at least 4 characters long");
    } else {
      axios
        .post("https://herokumovieapi.herokuapp.com/login", {
          Username: username,
          Password: password,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", response.data.user.Username);
          setUserOnLogin(response.data.user);
          navigate("/movies");
        })
        .catch((e) => {
          console.log("no such user");
        });
    }
  };
  return (
    <Form>
      <Stack gap={1}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
          {usernameErr && <Alert className="text-danger">{usernameErr}</Alert>}
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordErr && <Alert className="text-danger">{passwordErr}</Alert>}
        </Form.Group>
      </Stack>
      <Button
        className="mt-3"
        variant="primary"
        type="submit"
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Form>
  );
};

export default LoginView;
