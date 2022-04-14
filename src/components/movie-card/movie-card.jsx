import React from 'react'

const MovieCard = (props) => {
    const { displayMovie, movie } = props;
    return (
        <div className="movie-card" onClick={() => displayMovie(movie)}>{movie.Title}</div >

    )
}

export default MovieCard