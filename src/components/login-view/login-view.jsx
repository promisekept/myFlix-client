import React, { useState } from "react";
import PropTypes from "prop-types";
import RegView from "../registration-view/registration-view";

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
        <form>
          <label>
            Username:{" "}
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </label>
          <br />
          <br />
          <label>
            Password:{" "}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <br />
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
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
