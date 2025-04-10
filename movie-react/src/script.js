// OMDB API key - You'll need to get your own API key from http://www.omdbapi.com/
const API_KEY = 'www.omdbapi.com/?i=tt3896198&apikey=f16209b3'; // Example API key format, replace with your actual API key

// Popular movie titles to display by default
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

// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const moviesGrid = document.getElementById('moviesGrid');
const popularMoviesContainer = document.getElementById('popularMovies');
const searchResults = document.getElementById('searchResults');
const movieModal = document.getElementById('movieModal');
const movieDetails = document.getElementById('movieDetails');
const closeModal = document.getElementById('closeModal');

// Event Listeners
searchButton.addEventListener('click', searchMovies);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') searchMovies();
});
closeModal.addEventListener('click', () => {
    movieModal.classList.add('hidden');
});

// Initialize popular movies
window.addEventListener('load', () => {
    loadPopularMovies();
});

// Load popular movies
async function loadPopularMovies() {
    try {
        console.log('Loading popular movies...');
        const testMovies = [
            { Title: 'Inception', Year: '2010', Poster: 'https://via.placeholder.com/300x450?text=Inception', imdbID: 'tt1375666' },
            { Title: 'The Dark Knight', Year: '2008', Poster: 'https://via.placeholder.com/300x450?text=The+Dark+Knight', imdbID: 'tt0468569' }
        ];
        displayMovies(testMovies, popularMoviesContainer);
    } catch (error) {
        console.error('Error loading popular movies:', error);
        popularMoviesContainer.innerHTML = '<p class="text-center text-red-500">Error loading popular movies. Please try again.</p>';
    }
}

// Search for movies
async function searchMovies() {
    const searchTerm = searchInput.value.trim();
    if (!searchTerm) return;

    try {
        const response = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=f16209b3`);
        const data = await response.json();

        if (data.Response === 'True') {
            searchResults.classList.remove('hidden');
            displayMovies(data.Search, moviesGrid);
        } else {
            searchResults.classList.remove('hidden');
            moviesGrid.innerHTML = `<p class="text-center text-red-500">${data.Error}</p>`;
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
        moviesGrid.innerHTML = '<p class="text-center text-red-500">Error fetching movies. Please try again.</p>';
    }
}

// Display movies in the grid
function displayMovies(movies, container) {
    console.log('Displaying movies:', movies);
    container.innerHTML = movies.map(movie => {
        const movieId = movie.imdbID;
        return `
            <div class="movie-card rounded-lg overflow-hidden cursor-pointer" data-imdbid="${movieId}">
                <div class="relative overflow-hidden">
                    <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}" 
                         alt="${movie.Title}" 
                         class="w-full h-64 object-cover">
                    <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div class="absolute bottom-0 left-0 right-0 p-4">
                            <h3 class="text-white font-semibold text-lg">${movie.Title}</h3>
                            <p class="text-gray-300">${movie.Year}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    // Add event listeners after adding elements to DOM
    container.querySelectorAll('.movie-card').forEach(card => {
        card.addEventListener('click', () => {
            const imdbID = card.getAttribute('data-imdbid');
            window.showMovieDetails(imdbID);
        });
    });
}

// Make showMovieDetails function globally available
window.showMovieDetails = async function(imdbID) {
    try {
        const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`);
        const movie = await response.json();

        if (movie.Response === 'True') {
            movieDetails.innerHTML = `
                <div class="flex flex-col md:flex-row gap-6">
                    <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=No+Poster'}" 
                         alt="${movie.Title}" 
                         class="w-full md:w-1/3 h-auto object-cover rounded-lg">
                    <div class="flex-1">
                        <h2 class="text-2xl font-bold mb-2">${movie.Title}</h2>
                        <p class="text-gray-300 mb-2">${movie.Year} • ${movie.Rated} • ${movie.Runtime}</p>
                        <p class="mb-4"><strong class="text-pink-300">Genre:</strong> ${movie.Genre}</p>
                        <p class="mb-4"><strong class="text-pink-300">Director:</strong> ${movie.Director}</p>
                        <p class="mb-4"><strong class="text-pink-300">Actors:</strong> ${movie.Actors}</p>
                        <p class="mb-4"><strong class="text-pink-300">Plot:</strong> ${movie.Plot}</p>
                        <div class="flex gap-4">
                            <div class="text-center bg-pink-500 bg-opacity-20 p-4 rounded-lg">
                                <p class="text-2xl font-bold">${movie.imdbRating}</p>
                                <p class="text-sm text-gray-300">IMDb</p>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            movieModal.classList.remove('hidden');
        }
    } catch (error) {
        console.error('Error fetching movie details:', error);
        movieDetails.innerHTML = '<p class="text-red-500">Error loading movie details. Please try again.</p>';
    }
}