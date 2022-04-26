import React from "react";

const MovieView = ({ movie, returnToMain }) => {
  return (
    <>
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} width="200vw" />
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
      <button onClick={returnToMain}>Back</button>
    </>
  );
};

export default MovieView;
