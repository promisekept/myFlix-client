import React, { useState, useEffect } from "react";
import { Alert, Button, Card } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Director = () => {
  //make director name match the first movie he's in.  Then display his bio
  const [directorsMovies, setDirectorsMovies] = useState();
  const navigate = useNavigate();
  const params = useParams();
  const director = params.name;
  useEffect(() => {
    if (localStorage.getItem("user")) {
      axios
        .get("https://herokumovieapi.herokuapp.com/movies", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          setDirectorsMovies(
            response.data.filter((movie) => movie.Director.Name === director)
          );
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);
  return directorsMovies ? (
    <Card>
      <Card.Body>
        <Card.Title>Biography:</Card.Title>
        <Card.Text>{directorsMovies[0].Director.Bio}</Card.Text>
        <Card.Title>{director}'s movies:</Card.Title>
        {directorsMovies.map((movie) => (
          <Card.Text key={movie._id}>{movie.Title}</Card.Text>
        ))}
        <Button variant="link" onClick={() => navigate(-1)}>
          Go back
        </Button>
      </Card.Body>
    </Card>
  ) : (
    <Alert>Director not found</Alert>
  );
};

export default Director;
