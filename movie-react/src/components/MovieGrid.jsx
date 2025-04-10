import React from 'react';

const MovieGrid = ({ movies, onMovieClick }) => {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <div
          key={movie.imdbID}
          className="movie-card"
          onClick={() => onMovieClick(movie)}
        >
          <img
            src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
            alt={movie.Title}
            className="movie-poster"
          />
          <div className="movie-info">
            <h3 className="movie-title">{movie.Title}</h3>
            <p className="movie-year">{movie.Year}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieGrid; 