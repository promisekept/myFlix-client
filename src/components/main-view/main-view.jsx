import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import LoginView from "../login-view/login-view";
import RegView from "../registration-view/registration-view";
import Signout from "../signout/signout.jsx";
import Error from "../error/error.jsx";
import Navbar from "../navbar/navbar";
import Genre from "../genre/genre";
import Director from "../director/director";
import Profile from "../profile/profile";

const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState([]);
  const [movieId, setMovieId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //get all movies
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
          // console.log(allUsersAr.filter(account => account.Username === Username))
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);

  const onLoggedIn = (authData) => {
    setUser(authData);
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    setIsLoggedIn(true);
  };

  const onLoggedOut = () => {
    setIsLoggedIn(false);
  };
  const selectMovie = (id) => {
    setMovieId(id);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginView onLoggedIn={onLoggedIn} />} />
        <Route
          path="/registration"
          element={<RegView />}
          // element={user ? <Navigate to="/movies" /> : <RegView />}
        />
        <Route
          path="/movies"
          element={
            <Container>
              {movies.map((movie) => (
                <Row key={movie._id}>
                  <MovieCard
                    key={movie._id}
                    movie={movie}
                    selectMovie={selectMovie}
                  />
                </Row>
              ))}
            </Container>
          }
        />
        <Route
          path="/movies/:movieId"
          element={<MovieView movieId={movieId} movies={movies} />}
        />
        <Route
          path="/signout"
          element={<Signout onLoggedOut={onLoggedOut} />}
        />
        <Route path="/directors/:name" element={<Director movies={movies} />} />
        <Route path="/genres/:name" element={<Genre movies={movies} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};
export default MainView;
