import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import LoginView from "../login-view/login-view";
import RegView from "../registration-view/registration-view";
import Signout from "../signout/signout.jsx";
import Error from "../error/error.jsx";
import Navbar from "../navbar/navbar";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";


const MainView = () => {
  const [movies, setMovies] = useState([])
  const [user, setUser] = useState(null);
  const [movieId, setMovieId] = useState([]);

  useEffect(
    () => {
      if (user) {
        axios
          .get("https://herokumovieapi.herokuapp.com/movies", {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
          })
          .then((response) => {
            setMovies(response.data);
          })
          .catch(function (error) {
            console.log(error);
          })
      }
    },
    [user]
  );

  useEffect(() => { if (localStorage.getItem("user")) setUser(localStorage.getItem("user")) }
    , []);


  const onLoggedIn = (authData) => {
    setUser(authData);
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
  };

  const selectMovie = (id) => {
    setMovieId(id);
  }
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginView onLoggedIn={onLoggedIn} />} />
        <Route path="/registration" element={<RegView />} />
        <Route path="/movies" element={movies.map((movie) => <MovieCard key={movie._id} movie={movie} selectMovie={selectMovie} />)} />
        <Route path="/movies/:movieId" element={<MovieView movieId={movieId} movies={movies} />} />
        <Route path='/signout' element={<Signout />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router >

    //  <Router>
    //     {user && <Button onClick={onLoggedOut}>Log out</Button>}
    //     <Routes>
    //       <Route
    //         path="/"
    //         element={
    //           user ?
    //             <Navigate to="/movies" />
    //             :
    //             <LoginView onLoggedIn={onLoggedIn} />

    //         }
    //       />
    //       <Route
    //         path="/movies"
    //         element={
    //           user ?
    //             <MovieCard movies={movies} />
    //             :
    //             <Navigate to="/" />
    //         } />
    //     </Routes>
    //   </Router>
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
