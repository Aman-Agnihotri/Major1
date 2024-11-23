import { useState } from 'react';
import axios from 'axios';
import './searchPage.css';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('movie');
  const [detail, setDetail] = useState('show');
  const [results, setResults] = useState([]);
  const [selectedMovie, setSelectedMovie]=useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get('https://streaming-availability.p.rapidapi.com/shows/search/title', {
        params: {
          title: query,
          country: 'in',
          show_type: filter,
          series_granularity: detail,
          output_language: 'en',
        },
        headers: {
            'x-rapidapi-key': 'e4a33437d2msh90f111df451fa67p1016b4jsne9a05f5a82b6',
            'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
        }
      });
      setResults(response.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResults([]);
    }
  };

  const openDialog = (movie) => {
    setSelectedMovie(movie); // Set the movie details to display in the dialog box
  };

  const closeDialog = () => {
    setSelectedMovie(null); // Close the dialog box
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="search-page">
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          className="search-bar"
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-select">
          <option value="movie">Movie</option>
          <option value="series">TV Show</option>
        </select>
        <select value={detail} onChange={(e) => setDetail(e.target.value)} className="detail-select">
          <option value="show">Minimal</option>
          <option value="season">Detail</option>
        </select>
        <button onClick={handleSearch} className="search-button">
          <img src="/searchIcon.jpg" alt="Search" />
        </button>
      </div>
      
      <div className="results-container">
        {results.map((result) => (
          <div key={result.id} className="info-card">
          <img src={result.imageSet.verticalPoster.w360} alt={result.title} className="poster" />
            <div className="info">
              <h3>{result.title}</h3>
              <p>{result.overview}</p>
              <p><strong>Release Year:</strong> {result.releaseYear}</p>
              <p><strong>Genres:</strong> {result.genres.map(genre => genre.name).join(', ')}</p>
              <p><strong>{filter === 'movie' ? 'Director: ' : 'Creator: '}</strong> { filter === 'movie' ? result.directors.join(', ') : result.creators.join(', ')}</p>
              <p><strong>Cast:</strong> {result.cast.join(', ')}</p>
              <p><strong>Rating:</strong> {result.rating}</p>
              <p><strong>Runtime:</strong> {result.runtime} minutes</p>
              <div className="platforms">
                {result.streamingOptions.in?.map((option) => (
                  <a key={option.service.id} href={option.link} target="_blank" rel="noopener noreferrer">
                    <img src={option.service.imageSet.lightThemeImage} alt={option.service.name} className="platform-icon" />
                  </a>                
                ))}
              </div>
            </div>

          </div>
        ))}
      </div>

      {selectedMovie && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <button className="close-button" onClick={closeDialog}>
              &times;
            </button>
            <h2>{selectedMovie.title}</h2>
            <p><strong>Overview:</strong> {selectedMovie.overview}</p>
            <p><strong>Release Year:</strong> {selectedMovie.releaseYear}</p>
            <p><strong>Genres:</strong> {selectedMovie.genres.map(genre => genre.name).join(', ')}</p>
            <p><strong>Directors:</strong> {selectedMovie.directors.join(', ')}</p>
            <p><strong>Cast:</strong> {selectedMovie.cast.join(', ')}</p>
            <p><strong>Rating:</strong> {selectedMovie.rating}</p>
            <p><strong>Runtime:</strong> {selectedMovie.runtime} minutes</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;