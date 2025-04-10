import React from 'react';


const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <div 
      className="movie-card rounded-lg overflow-hidden cursor-pointer"
      onClick={() => onMovieClick(movie.imdbID)}
    >
      <div className="relative overflow-hidden">
        <img 
          src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'} 
          alt={movie.Title} 
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-semibold text-lg">{movie.Title}</h3>
            <p className="text-gray-300">{movie.Year}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard; 