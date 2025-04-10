import React, { useState, useEffect } from 'react';
import MovieModal from './components/MovieModal';
import MovieGrid from './components/MovieGrid'; // Import MovieGrid
import './App.css';

const API_KEY = '2c51a409'; // Replace with your actual API key

const popularMovies = [
  'The Dark Knight',
  'Inception',
  'The Shawshank Redemption',
  'Pulp Fiction',
  'The Godfather',
  'Fight Club',
  'The Matrix',
  'Interstellar',
  'Forrest Gump',
  'The Lord of the Rings: The Fellowship of the Ring',
  'Star Wars: Episode IV - A New Hope',
  'Titanic'
];

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [popularMoviesList, setPopularMoviesList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadPopularMovies();
  }, []);

  const loadPopularMovies = async () => {
    try {
      setIsLoading(true);
      const moviePromises = popularMovies.map(title => 
        fetch(`https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${API_KEY}`)
          .then(response => response.json())
      );
      
      const movies = await Promise.all(moviePromises);
      const validMovies = movies.filter(movie => movie.Response === 'True');
      setPopularMoviesList(validMovies);
    } catch (error) {
      console.error('Error loading popular movies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const searchMovies = async () => {
    if (!searchTerm.trim()) return;

    try {
      setIsLoading(true);
      const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`);
      const data = await response.json();

      if (data.Response === 'True') {
        setSearchResults(data.Search);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMovieClick = async (imdbID) => {
    try {
      setIsLoading(true);
      const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`);
      const movie = await response.json();
      if (movie.Response === 'True') {
        setSelectedMovie(movie);
      } else {
        console.error('Invalid movie details:', movie);
      }
    } catch (error) {
      console.error('Error fetching movie details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-900 to-blue-900 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">🎬 Movie Database</h1>
        
        {/* Search Section */}
        <div className="max-w-md mx-auto mb-8">
          <div className="flex">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && searchMovies()}
              className="flex-1 px-4 py-2 border-0 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white bg-opacity-20 text-white placeholder-gray-300"
              placeholder="Search for a movie..."
            />
            <button
              onClick={searchMovies}
              className="bg-pink-500 text-white px-6 py-2 rounded-r-lg hover:bg-pink-600 transition-colors duration-300"
            >
              Search
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="text-center text-white mb-8">Loading...</div>
        )}

        {/* Popular Movies Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6">🌟 Popular Movies</h2>
          <MovieGrid movies={popularMoviesList} onMovieClick={handleMovieClick} />
        </div>

        {/* Search Results Section */}
        {searchResults.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">🔍 Search Results</h2>
            <MovieGrid movies={searchResults} onMovieClick={handleMovieClick} />
          </div>
        )}

        {/* Movie Details Modal */}
        {selectedMovie && (
          <MovieModal
            movie={selectedMovie}
            onClose={() => setSelectedMovie(null)}
          />
        )}
      </div>
    </div>
  );
}

export default App;
