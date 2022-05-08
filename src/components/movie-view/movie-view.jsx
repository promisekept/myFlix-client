import React from "react";
import PropTypes from "prop-types";

const MovieView = ({ movie, returnToMain }) => {
  return (
    <>
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} width="200vw" />
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
      <button onClick={returnToMain}>Back</button>
    </>
  );
};

MovieView.propTypes = {
  movie: PropTypes.shape({
    Actors: PropTypes.array.isRequired,
    Description: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Name: PropTypes.string.isRequired,
    }),
    Featured: PropTypes.bool.isRequired,
    Genre: PropTypes.shape({
      Description: PropTypes.string.isRequired,
      Name: PropTypes.string.isRequired,
    }),
    ImagePath: PropTypes.string.isRequired,
    Title: PropTypes.string.isRequired,
  }).isRequired,
  returnToMain: PropTypes.func.isRequired,
};

export default MovieView;
