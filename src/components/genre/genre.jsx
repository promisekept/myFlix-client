import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

const Genre = ({ movies }) => {
  const params = useParams();
  const navigate = useNavigate();
  const genre = params.name;
  const genreMovies = movies.filter(
    (movie) => movie.Genre.Name === params.name
  );
  return (
    <>
      <h3>Genre Description:</h3>
      <div>{genreMovies[0].Genre.Description}</div>
      <h3>{genre} movies:</h3>
      {genreMovies.map((movie) => (
        <div key={movie._id}>{movie.Title}</div>
      ))}
      <Button variant="link" onClick={() => navigate(-1)}>
        Go back
      </Button>
    </>
  );
};

Genre.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default Genre;
