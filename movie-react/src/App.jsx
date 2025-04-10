import React, { useState, useEffect } from 'react';
import MovieModal from './components/MovieModal';
import MovieGrid from './components/MovieGrid';
import './style.css';

const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [popularMoviesList, setPopularMoviesList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const searchMovies = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`);
      const data = await response.json();
      if (data.Search) {
        setSearchResults(data.Search);
      } else {
        setSearchResults([]);
      }
    } catch (error) {
      console.error('Error searching movies:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await fetch(`https://www.omdbapi.com/?s=popular&apikey=${API_KEY}`);
        const data = await response.json();
        if (data.Search) {
          setPopularMoviesList(data.Search);
        } else {
          setPopularMoviesList([]);
        }
      } catch (error) {
        console.error('Error fetching popular movies:', error);
        setPopularMoviesList([]);
      }
    };

    fetchPopularMovies();
  }, []);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  return (
    <div className="app-container">
      <div className="container">
        <h1 className="app-title">🎬 Movie Database</h1>
        
        {/* Search Section */}
        <div className="search-container">
          <div className="search-box">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && searchMovies()}
              className="search-input"
              placeholder="Search for a movie..."
            />
            <button
              onClick={searchMovies}
              className="search-button"
            >
              Search
            </button>
          </div>
        </div>

        {isLoading && (
          <div className="loading">Loading...</div>
        )}

        {/* Popular Movies Section */}
        <div className="section">
          <h2 className="section-title">🌟 Popular Movies</h2>
          <MovieGrid movies={popularMoviesList} onMovieClick={handleMovieClick} />
        </div>

        {/* Search Results Section */}
        {searchResults.length > 0 && (
          <div className="section">
            <h2 className="section-title">🔍 Search Results</h2>
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
};

export default App; 