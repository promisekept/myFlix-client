import React, { useState } from "react";
import { Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const MovieView = ({ movieId, movies }) => {
  const [movie, setMovie] = useState(movies.find((m) => m._id === movieId));
  const navigate = useNavigate();
  return movie ? (
    <>
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div>
      </div>
      <div className="movie-title">
        <span className="label">Title: </span>
        <span className="value">{movie.Title}</span>
      </div>
      <div className="movie-description">
        <span className="label">Description: </span>
        <span className="value">{movie.Description}</span>
      </div>
      <Button variant="link" onClick={() => navigate("/movies")}>
        Return
      </Button>
      <Link to={`/directors/${movie.Director.Name}`}>
        <Button variant="link">Director</Button>
      </Link>
      <Link to={`/genres/${movie.Genre.Name}`}>
        <Button variant="link">Genre</Button>
      </Link>
    </>
  ) : (
    <Alert>Movie not found</Alert>
  );
};

MovieView.propTypes = {
  movies: PropTypes.array.isRequired,
  movieId: PropTypes.string.isRequired,
};

export default MovieView;
