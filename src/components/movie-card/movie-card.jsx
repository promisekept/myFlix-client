import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Stack } from "react-bootstrap";
import axios from "axios";

const MovieCard = ({ loggedUser }) => {
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
    // !loggedUser && navigate("/");
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

  const isFavorite = (id) => {
    if (user.FavoriteMovies && id) {
      return user.FavoriteMovies.includes(id);
    }
  };
  const addToFavorite = (id) => {
    axios
      .post(
        `https://herokumovieapi.herokuapp.com/users/${user.Username}/movies/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch((e) => {
        console.log(e);
        console.log("error adding a movie");
      });
  };

  return movies && user ? (
    <Container>
      <Row xs={1} md={2} lg={4} className="g-4">
        {movies.map((movie) => (
          <Fragment key={movie._id}>
            <Col>
              <Card>
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                  <Stack direction="horizontal">
                    <Link to={`/movies/${movie._id}`}>
                      <Button variant="success">Open</Button>
                    </Link>
                    <Button
                      onClick={() => addToFavorite(movie._id)}
                      disabled={isFavorite(movie._id)}
                      className="ms-auto"
                    >
                      Add to Favorites
                    </Button>
                  </Stack>
                </Card.Body>
              </Card>
            </Col>
          </Fragment>
        ))}
      </Row>
    </Container>
  ) : (
    <Alert>Movies or User not loaded</Alert>
  );
};

export default MovieCard;
