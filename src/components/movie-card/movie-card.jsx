import React from "react";
import PropTypes from "prop-types";

const MovieCard = ({ displayMovie, movie }) => {
  return (
    <div className="movie-card" onClick={() => displayMovie(movie)}>
      {movie.Title}
    </div>
  );
};

MovieCard.propTypes = {
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
  displayMovie: PropTypes.func.isRequired,
};

export default MovieCard;
