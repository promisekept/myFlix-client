import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

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
  const [user, setUser] = useState();

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


  console.log(`Main View user: ${user}`);
  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<LoginView />} />
        <Route
          path="/registration"
          element={<RegView />}
        // element={user ? <Navigate to="/movies" /> : <RegView />}
        />
        <Route
          path="/movies"
          element={
            <Error />
            // <Container>
            //   <Row xs={1} md={2} lg={4} className="g-4">
            //     {movies.map((movie) => (
            //       <MovieCard
            //         key={movie._id}
            //         movie={movie}
            //       />
            //     ))}
            //   </Row>
            // </Container>
          }
        />
        <Route
          path="/movies/:movieId"
          element={<MovieView />}
        />
        <Route
          path="/signout"
          element={<Signout />}
        />
        <Route path="/directors/:name" element={<Director />} />
        <Route path="/genres/:name" element={<Genre />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router >
  );
};
export default MainView;
