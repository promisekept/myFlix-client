import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import MovieCard from "../movie-card/movie-card";

const Director = ({ movies }) => {
  //make director name match the first movie he's in.  Then display his bio
  const navigate = useNavigate();
  const params = useParams();
  const director = params.name;
  const directorsMovies = movies.filter(
    (movie) => movie.Director.Name === director
  );
  return (
    <>
      <h3>Biography:</h3>
      <div>{directorsMovies[0].Director.Bio}</div>
      <h3>{director}'s movies:</h3>
      {directorsMovies.map((movie) => (
        <div key={movie._id}>{movie.Title}</div>
      ))}
      <Button variant="link" onClick={() => navigate(-1)}>
        Go back
      </Button>
    </>
  );
};

export default Director;
