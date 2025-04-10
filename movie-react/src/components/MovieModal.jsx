import React from 'react';

const MovieModal = ({ movie, onClose }) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-body">
          <div className="modal-poster">
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
              alt={movie.Title}
            />
          </div>
          <div className="modal-details">
            <h2>{movie.Title}</h2>
            <p><strong>Year:</strong> {movie.Year}</p>
            <p><strong>Rated:</strong> {movie.Rated}</p>
            <p><strong>Runtime:</strong> {movie.Runtime}</p>
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>
            <p><strong>IMDb Rating:</strong> {movie.imdbRating}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal; 