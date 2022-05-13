import React, { useState } from "react";
import PropTypes from "prop-types";

const RegistrationView = ({ handleUnregistered }) => {
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newBirthday, setNewBirthday] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newUsername, newPassword, newEmail, newBirthday);
    handleUnregistered();
  };

  return (
    <form>
      <label>
        New User:{" "}
        <input
          type="text"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
      </label>
      <br />
      <br />
      <label>
        New Password:{" "}
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </label>
      <br />
      <br />
      <label>
        Email:{" "}
        <input
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
      </label>
      <br />
      <br />
      <label>
        Birthday:{" "}
        <input
          type="date"
          value={newBirthday}
          onChange={(e) => setNewBirthday(e.target.value)}
        />
        <br />
        <br />
      </label>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
};
RegistrationView.propTypes = {
  handleUnregistered: PropTypes.func.isRequired,
};
export default RegistrationView;
