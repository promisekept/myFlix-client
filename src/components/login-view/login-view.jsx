import React, { useState } from "react";
import PropTypes from "prop-types";
import RegView from "../registration-view/registration-view";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registered, setRegistered] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    onLoggedIn(username);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
    // props.onLoggedIn(username);
  };

  const handleUnregistered = () => {
    setRegistered(!registered);
  };
  if (registered) {
    return (
      <>
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>
              Username:
            </Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group controlId="formPassword">
            <Form.Label>
              Password:
            </Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form>
        <p style={{ color: "red" }} onClick={handleUnregistered}>
          Not registered? Click here!
        </p>
      </>
    );
  } else {
    return <RegView handleUnregistered={handleUnregistered} />;
  }
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
export default LoginView;
