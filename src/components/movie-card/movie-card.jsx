import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Stack } from "react-bootstrap";
import axios from "axios";

const MovieCard = () => {
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      axios
        .get("https://herokumovieapi.herokuapp.com/movies", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          setMovies(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);
  useEffect(() => {
    if (localStorage.getItem("user")) {
      const Username = localStorage.getItem("user");
      axios
        .get("https://herokumovieapi.herokuapp.com/users", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        })
        .then((response) => {
          const allUsersAr = response.data;
          setUser(
            allUsersAr.filter((account) => account.Username === Username)[0]
          );
          // console.log(allUsersAr.filter(account => account.Username === Username))
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, []);

  const isFavorite = (favMovies, id) => {
    // console.log(favMovies.includes(id));
    if (favMovies && id)
      return favMovies.includes(id);
  }
  const addToFavorite = (id) => {
    // console.log(id)
    // console.log(user.Username);
    // console.log(`https://herokumovieapi.herokuapp.com/users/${user.Username}/movies/${id}`)
    axios.post(`https://herokumovieapi.herokuapp.com/users/${user.Username}/movies/${id}`
      , {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        console.log(response.data)
        console.log(`Added to favorites movie #: ${id}`);
      })
      .catch((e) => {
        console.log(e)
        console.log("error adding a movie");
      });
  }

  return movies && user ?
    (
      <Container>
        <Row xs={1} md={2} lg={4} className="g-4">{movies.map(movie =>
          <Col key={movie._id}>
            <Card>
              <Card.Img variant="top" src={movie.ImagePath} />
              <Card.Body>
                <Stack direction="horizontal">
                  <Link to={`/movies/${movie._id}`} >
                    <Button variant="success">Open</Button>
                  </Link>
                  <Button onClick={() => addToFavorite(movie._id)} disabled={isFavorite(user.FavoriteMovies, movie._id)} className="ms-auto">Add to Favorites</Button>
                </Stack>
              </Card.Body>
            </Card>
          </Col>
        )}</Row>
      </Container>
    ) :
    <Alert>Movies or User not loaded</Alert>
};

export default MovieCard;
