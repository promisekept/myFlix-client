import React from "react";
import Button from 'react-bootstrap'
import Link from 'react-router-dom'

import PropTypes from "prop-types";

const MovieView = ({ selectedMovie }) => {
  const movie = selectedMovie;
  return (
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
      <Link to={"/movies"}>
        <Button>Go back to the list of movies</Button>
      </Link>
    </>
  );
};

// MovieView.propTypes = {
//   movie: PropTypes.shape({
//     Actors: PropTypes.array.isRequired,
//     Description: PropTypes.string.isRequired,
//     Director: PropTypes.shape({
//       Bio: PropTypes.string.isRequired,
//       Birth: PropTypes.string.isRequired,
//       Name: PropTypes.string.isRequired,
//     }),
//     Featured: PropTypes.bool.isRequired,
//     Genre: PropTypes.shape({
//       Description: PropTypes.string.isRequired,
//       Name: PropTypes.string.isRequired,
//     }),
//     ImagePath: PropTypes.string.isRequired,
//     Title: PropTypes.string.isRequired,
//   }).isRequired,
//   returnToMain: PropTypes.func.isRequired,
// };

export default MovieView;
