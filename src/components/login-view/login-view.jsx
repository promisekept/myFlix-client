import React, { useState } from "react";
import PropTypes from "prop-types";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const navigate = useNavigate();

  // const [registered, setRegistered] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    // onLoggedIn(username);
    /* Send a request to the server for authentication */
    if (!username) {
      setUsernameErr("Username Required");
    } else if (username.length < 5) {
      setUsernameErr("Username must be at least 5 characters long");
    } else if (!password) {
      setPasswordErr(<p className="text-danger">Password Required</p>);
    } else if (password.length < 4) {
      setPasswordErr(
        <p className="text-danger">
          Password must be at least 4 characters long
        </p>
      );
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
          {usernameErr && <p className="text-danger">{usernameErr}</p>}
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordErr && <p className="text-danger">{passwordErr}</p>}
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Submit
        </Button>
      </Form>
      {/* <p className="text-danger" onClick={handleUnregistered}>
        Not registered? Click here!
      </p> */}
    </>
  );

  // const handleUnregistered = () => {
  //   setRegistered(!registered);
  // };
  // if (registered) {
  //   return (
  //     <>
  //       <Form>
  //         <Form.Group controlId="formUsername">
  //           <Form.Label>Username:</Form.Label>
  //           <Form.Control
  //             type="text"
  //             value={username}
  //             onChange={(e) => {
  //               setUsername(e.target.value);
  //             }}
  //           />
  //           {usernameErr && <p className="text-danger">{usernameErr}</p>}
  //         </Form.Group>
  //         <Form.Group controlId="formPassword">
  //           <Form.Label>Password:</Form.Label>
  //           <Form.Control
  //             type="password"
  //             value={password}
  //             onChange={(e) => setPassword(e.target.value)}
  //           />
  //           {passwordErr && <p className="text-danger">{passwordErr}</p>}
  //         </Form.Group>
  //         <Button variant="primary" type="submit" onClick={handleSubmit}>
  //           Submit
  //         </Button>
  //       </Form>
  //       <p className="text-danger" onClick={handleUnregistered}>
  //         Not registered? Click here!
  //       </p>
  //     </>
  //   );
  // } else {
  //   return <RegView handleUnregistered={handleUnregistered} />;
  // }
};

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
export default LoginView;
