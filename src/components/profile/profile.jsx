import React, { useEffect, useState } from "react";
import { useNavigate, useRoutes } from "react-router-dom";
import { Form, Button, Alert, Container, Row, Col } from "react-bootstrap";
import axios, { AxiosError } from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import PropTypes from "prop-types";

const Profile = ({ user, movies }) => {
  const [favMovies, setFavMovies] = useState(
    user.user.FavoriteMovies.map((favMovie) => favMovie)
  );
  const [updateMode, setUpdateMode] = useState(false);
  const navigate = useNavigate();
  let { Username, Birthday, Email } = user.user;
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

  const getMovieTitle = (movieId) => {
    return movies.filter((movie) => movie._id === movieId && movie.Title)[0]
      .Title;
  };
  const deleteFavMovie = (movieId) => {
    setFavMovies(favMovies.filter((favMovieId) => favMovieId !== movieId));
    axios
      .delete(
        `https://herokumovieapi.herokuapp.com/users/${updatedUsername}/movies/${movieId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(`The deleted movie ID: ${movieId}`);
      })
      .catch((e) => {
        console.log("error deleting movie");
      });
  };
  const deleteAccount = (e) => {
    e.preventDefault();
    axios
      .delete(`https://herokumovieapi.herokuapp.com/users/${updatedUsername}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.open("/", "_self"); // the second argument '_self' is necessary so that the page will open in the current tab
      })
      .catch((e) => {
        console.log("error deleting the user");
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
        .put(
          `https://herokumovieapi.herokuapp.com/users/${Username}`,
          {
            Username: updatedUsername,
            Password: updatedPassword,
            Email: updatedEmail,
            Birthday: updatedBirthday,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
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
        <Alert>{Username}'s favorite movies:</Alert>
        {favMovies.map((movieId) => (
          <Row key={movieId}>
            <Col>{getMovieTitle(movieId)}</Col>
            <Col>
              <Button onClick={() => deleteFavMovie(movieId)}>
                <FontAwesomeIcon icon={solid("trash")} />
              </Button>
            </Col>
          </Row>
        ))}
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

Profile.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default Profile;
