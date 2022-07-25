import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Form,
  Button,
  Alert,
  Container,
  Row,
  Col,
  Stack,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro"; // <-- import styles to be used
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState([]);
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();
  const [favMovies, setFavMovies] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [updatedUsername, setUpdatedUsername] = useState("");
  const [updatedPassword, setUpdatedPassword] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedBirthday, setUpdatedBirthday] = useState("");
  const [updatedUsernameErr, setUpdatedUsernameErr] = useState("");
  const [updatedPasswordErr, setUpdatedPasswordErr] = useState("");
  const [updatedEmailErr, setUpdatedEmailErr] = useState("");
  const [updatedBirthdayErr, setUpdatedBirthdayErr] = useState("");
  useEffect(() => {
    if (localStorage.getItem("user")) {
      axios
        .get("https://herokumovieapi.herokuapp.com/movies", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          setMovies(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [user]);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      const Username = localStorage.getItem("user");
      axios
        .get("https://herokumovieapi.herokuapp.com/users", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          const allUsersAr = response.data;
          setUser(
            allUsersAr.filter((account) => account.Username === Username)[0]
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    if (user.Username) {
      const { Username, Birthday, Email } = user;
      setFavMovies(user.FavoriteMovies.map((favMovie) => favMovie));
      setUpdatedUsername(Username);
      setUpdatedEmail(Email);
      setUpdatedBirthday(Birthday.substring(0, 10));
    }
  }, [user]);

  const getMovieTitle = (movieId) => {
    if (movies.length) {
      if (favMovies.length > 0) {
        return movies.filter((movie) => movie._id === movieId && movie.Title)[0]
          .Title;
      }
    }
  };
  const deleteFavMovie = (movieId) => {
    setFavMovies(favMovies.filter((favMovieId) => favMovieId !== movieId));
    axios
      .delete(
        `https://herokumovieapi.herokuapp.com/users/${updatedUsername}/movies/${movieId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
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
      .delete(
        `https://herokumovieapi.herokuapp.com/users/${localStorage.getItem(
          "user"
        )},
      `,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
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
      setUpdateMode(false);
      setUpdatedUsernameErr("");
      setUpdatedPasswordErr("");
      setUpdatedEmailErr("");
      setUpdatedBirthdayErr("");
      console.log();
      axios
        .put(
          `https://herokumovieapi.herokuapp.com/users/${localStorage.getItem(
            "user"
          )}`,
          {
            Username: updatedUsername,
            Password: updatedPassword,
            Email: updatedEmail,
            Birthday: updatedBirthday,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
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
      <Alert>Your account information:</Alert>
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
        {favMovies.length > 0 && (
          <Alert className="mt-4">{updatedUsername}'s favorite movies:</Alert>
        )}
        <Stack gap={2}>
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
        </Stack>
      </Form.Group>
      <Stack direction="horizontal" gap={3} className="mt-2">
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
            <Button variant="danger" type="submit" onClick={deleteAccount}>
              Delete account
            </Button>
            <Button variant="link" onClick={() => navigate(-1)}>
              Go back
            </Button>
          </>
        )}
      </Stack>
    </Form>
  );
};

export default Profile;
