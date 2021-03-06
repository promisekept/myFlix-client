import React, { useState, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import MovieCard from "../movie-card/movie-card";
import MovieView from "../movie-view/movie-view";

const MainView = () => {
  const [selectedMovie, setSelectedMovie] = useState();
  const [movies, setMovies] = useState([]);
  // const [movies, setMovies] = useState([
  //   { _id: 1, Title: "Inception", Description: "desc1...", ImagePath: "..." },
  //   {
  //     _id: 2,
  //     Title: "The Shawshank Redemption",
  //     Description: "desc2...",
  //     ImagePath: "...",
  //   },
  //   { _id: 3, Title: "Gladiator", Description: "desc3...", ImagePath: "..." },
  // ]);

  useEffect(
    () =>
      axios
        .get("https://herokumovieapi.herokuapp.com/movies")
        .then((response) => {
          console.log(response.data);
          setMovies(response.data);
        })
        .catch((error) => {
          console.log(error);
        }),
    []
  );

  const displayMovie = (movie) => {
    setSelectedMovie(movie);
  };
  const returnToMain = () => {
    setSelectedMovie();
  };
  if (selectedMovie)
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
