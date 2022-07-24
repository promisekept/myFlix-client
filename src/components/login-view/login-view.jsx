import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!!localStorage.getItem("user")) {
      navigate("/movies");
    }
  }, []);

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
          onLoggedIn(response.data);
          navigate("/movies");
        })
        .catch((e) => {
          console.log("no such user");
        });
    }
  };
  return (
    <>
      <Form>
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
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
    </>
  );
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
export default LoginView;
