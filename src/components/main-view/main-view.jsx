import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import LoginView from "../login-view/login-view";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const MainView = () => {
  // Initial state is set to null
  const [selectedMovie, setSelectedMovie] = useState();
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState(null);
  const bob = { bob: "bob", bill: "bill" };

  // useEffect(
  //   () =>
  //     axios
  //       .get("https://herokumovieapi.herokuapp.com/movies", {
  //         headers: { Authorization: `Bearer ${token}` },
  //       })
  //       .then((response) => {
  //         setMovies(response.data);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       }),
  //   []
  // );

  useEffect(() => setUser(localStorage.getItem("user")), []);

  /*When a movie is clicked, this function is invoked and updates the state of the `selectedMovie` *property to that movie*/
  const displayMovie = (movie) => {
    setSelectedMovie(movie);
  };
  const returnToMain = () => {
    setSelectedMovie();
  };

  const getMovies = (token) => {
    axios
      .get("https://herokumovieapi.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onLoggedIn = (authData) => {
    // console.log(`Auth Data: ${authData}`);
    setUser(authData);
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    getMovies(authData.token);
  };

  const onLoggedOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <>
      {user && <Button onClick={onLoggedOut}>Log out</Button>}
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              user ? (
                <MovieCard movies={movies} />
              ) : (
                <LoginView onLoggedIn={onLoggedIn} />
              )
            }
          />
        </Routes>
      </Router>
    </>
  );

  //   if (!user)
  //     return (
  //       <Row className="justify-content-md-center">
  //         <Col>
  //           <LoginView className="main-view" onLoggedIn={onLoggedIn} />
  //         </Col>
  //       </Row>
  //     );
  //   //Show the selected movie
  //   else if (selectedMovie)
  //     return (
  //       <Row className="justify-content-md-center">
  //         <Col md={8}>
  //           <MovieView
  //             className="main-view"
  //             movie={selectedMovie}
  //             returnToMain={returnToMain}
  //           />
  //         </Col>
  //       </Row>
  //     );
  //   //No movies fetched
  //   else if (movies.length === 0)
  //     return (
  //       <Row className="justify-content-md-center">
  //         <div className="main-view">The list is empty!</div>
  //       </Row>
  //     );
  //   //Show a list of movies
  //   else
  //     return (
  //       <>
  //         <Row className="justify-content-md-center bg-danger">
  //           <Col md={3}>
  //             <div className="main-view">
  //               {movies.map((movie) => (
  //                 <MovieCard
  //                   key={movie._id}
  //                   movie={movie}
  //                   displayMovie={displayMovie}
  //                 />
  //               ))}
  //             </div>
  //           </Col>
  //         </Row>
  //       </>
  //     );
};
export default MainView;
