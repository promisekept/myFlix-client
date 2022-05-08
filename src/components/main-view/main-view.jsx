import React, { useState, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";
import LoginView from "../login-view/login-view";

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

  if (!user) return <LoginView onLoggedIn={onLoggedIn} />;
  else if (selectedMovie)
    return <MovieView movie={selectedMovie} returnToMain={returnToMain} />;
  else if (movies.length === 0)
    return <div className="main-view">The list is empty!</div>;
  else
    return (
      <div className="main-view">
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            displayMovie={displayMovie}
          />
        ))}
      </div>
    );
};

export default MainView;
