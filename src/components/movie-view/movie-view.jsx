import React, { useEffect, useState } from "react";
import { Button, Alert, Figure, Stack } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const MovieView = () => {
  const params = useParams();
  const movieId = params.movieId;
  const [movie, setMovie] = useState();
  // const { ImagePath, Title, Description, Director } = movie;
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("user")) {
      axios
        .get("https://herokumovieapi.herokuapp.com/movies", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          setMovie(response.data.find((m) => m._id === movieId));
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);
  return movie ? (
    <>
      <Figure>
        <div className="movie-view">
          <div className="movie-poster">
            <Figure.Image
              className="w-50 mw-75"
              src={movie.ImagePath}
              alt={movie.Title}
            />
          </div>
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <Figure.Caption className="value">{movie.Title}</Figure.Caption>
        </div>
        <br />
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
      </Figure>
      <Stack direction="horizontal" gap={3}>
        <Button variant="link" onClick={() => navigate("/movies")}>
          Return
        </Button>
        <Link to={`/directors/${movie.Director.Name}`}>
          <Button variant="link">Director</Button>
        </Link>
        <Link to={`/genres/${movie.Genre.Name}`}>
          <Button variant="link">Genre</Button>
        </Link>
      </Stack>
    </>
  ) : (
    <Alert>Movie not found</Alert>
  );
};

export default MovieView;
