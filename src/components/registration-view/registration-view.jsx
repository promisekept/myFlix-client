import React, { useState } from "react";
import PropTypes from "prop-types";
import { Form } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
      <Button type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
};
RegistrationView.propTypes = {
  handleUnregistered: PropTypes.func.isRequired,
};
export default RegistrationView;
