import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

// const MovieCard = ({ displayMovie, movie }) => {
const MovieCard = ({ movies }) => {
  console.log(movies);
  // movies.map((movie) => console.log(movie));
  return (
    <p>test</p>
    //   <Card>
    //     <Card.Img variant="top" src={movie.ImagePath} />
    //     <Card.Body>
    //       <Card.Title>{movie.Title}</Card.Title>
    //       {/* <Button onClick={() => displayMovie(movie)}>Open</Button> */}
    //     </Card.Body>
    //   </Card>
    // );
  );
};

// MovieCard.propTypes = {
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
//   displayMovie: PropTypes.func.isRequired,
// };

export default MovieCard;
