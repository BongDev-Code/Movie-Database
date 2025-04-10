import React from 'react';

const MovieModal = ({ movie, onClose }) => {
  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gradient-to-br from-purple-800 to-blue-800 p-6 rounded-lg w-11/12 max-w-2xl text-white">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-white hover:text-pink-300 text-2xl"
        >
          ×
        </button>
        <div className="mt-4">
          <div className="flex flex-col md:flex-row gap-6">
            <img
              src={movie?.Poster && movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}
              alt={movie?.Title || 'No Title Available'}
              className="w-full md:w-1/3 h-auto object-cover rounded-lg"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-2">{movie?.Title || 'No Title Available'}</h2>
              <p className="text-gray-300 mb-2">
                {movie?.Year || 'Unknown Year'} • {movie?.Rated || 'Not Rated'} • {movie?.Runtime || 'Unknown Runtime'}
              </p>
              <p className="mb-4">
                <strong className="text-pink-300">Genre:</strong> {movie?.Genre || 'Unknown Genre'}
              </p>
              <p className="mb-4">
                <strong className="text-pink-300">Director:</strong> {movie?.Director || 'Unknown Director'}
              </p>
              <p className="mb-4">
                <strong className="text-pink-300">Actors:</strong> {movie?.Actors || 'Unknown Actors'}
              </p>
              <p className="mb-4">
                <strong className="text-pink-300">Plot:</strong> {movie?.Plot || 'No Plot Available'}
              </p>
              <div className="flex gap-4">
                <div className="text-center bg-pink-500 bg-opacity-20 p-4 rounded-lg">
                  <p className="text-2xl font-bold">{movie?.imdbRating || 'N/A'}</p>
                  <p className="text-sm text-gray-300">IMDb</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal; 