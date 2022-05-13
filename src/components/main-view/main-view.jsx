import React, { useState, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import LoginView from "../login-view/login-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const MainView = () => {
  // Initial state is set to null
  const [selectedMovie, setSelectedMovie] = useState();
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(
    () =>
      axios
        .get("https://herokumovieapi.herokuapp.com/movies")
        .then((response) => {
          setMovies(response.data);
        })
        .catch((error) => {
          console.log(error);
        }),
    []
  );

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  const displayMovie = (movie) => {
    setSelectedMovie(movie);
  };
  const returnToMain = () => {
    setSelectedMovie();
  };
  const onLoggedIn = (u) => {
    setUser(u);
  };
  /* If there is no user, the LoginView is rendered. If there is a user logged in, the user details are *passed as a prop to the LoginView*/
  //User not logged in
  if (!user)
    return (
      <Row className="justify-content-md-center">
        <Col>
          <LoginView className="main-view" onLoggedIn={onLoggedIn} />
        </Col>
      </Row>
    );
  //Show the selected movie
  else if (selectedMovie)
    return (
      <Row className="justify-content-md-center">
        <Col md={8}>
          <MovieView
            className="main-view"
            movie={selectedMovie}
            returnToMain={returnToMain}
          />
        </Col>
      </Row>
    );
  //No movies fetched
  else if (movies.length === 0)
    return (
      <Row className="justify-content-md-center">
        <div className="main-view">The list is empty!</div>
      </Row>
    );
  //Show a list of movies
  else
    return (
      <Row className="justify-content-md-center bg-danger">
        <Col md={3}>
          <div className="main-view">
            {movies.map((movie) => (
              <MovieCard
                key={movie._id}
                movie={movie}
                displayMovie={displayMovie}
              />
            ))}
          </div>
        </Col>
      </Row>
    );
};

export default MainView;
