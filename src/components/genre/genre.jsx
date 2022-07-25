import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Alert, Button, Card } from "react-bootstrap";
import axios from "axios";

const Genre = () => {
  const [genreMovies, setGenreMovies] = useState();
  const navigate = useNavigate();
  const params = useParams();
  const genre = params.name;
  useEffect(() => {
    if (localStorage.getItem("user")) {
      axios
        .get("https://herokumovieapi.herokuapp.com/movies", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          setGenreMovies(
            response.data.filter((movie) => movie.Genre.Name === genre)
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);
  return genreMovies ? (
    <Card>
      <Card.Body>
        <Card.Title>Genre Description:</Card.Title>
        <Card.Text>{genreMovies[0].Genre.Description}</Card.Text>
        <Card.Title>{genre} movies:</Card.Title>
        {genreMovies.map((movie) => (
          <Card.Text key={movie._id}>{movie.Title}</Card.Text>
        ))}
        <Button variant="link" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </Card.Body>
    </Card>
  ) : (
    <Alert>Genre not found</Alert>
  );
};

export default Genre;
