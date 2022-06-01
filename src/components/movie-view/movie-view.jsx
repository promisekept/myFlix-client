import React, { useState } from "react";
import { Button, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'

import PropTypes from "prop-types";

const MovieView = ({ movieId, movies }) => {
  const [movie, setMovie] = useState(movies.find(m => m._id === movieId));
  const navigate = useNavigate();
  return (
    movie ?
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
        <Button variant="link" onClick={() => navigate('/movies')}>Return</Button>
        <Link to={`/directors/${movie.Director.Name}`}>
          <Button variant="link">Director</Button>
        </Link>
        <Link to={`/genres/${movie.Genre.Name}`}>
          <Button variant="link">Genre</Button>
        </Link>
      </>
      :
      <Alert>Movie not found</Alert>
  )
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
