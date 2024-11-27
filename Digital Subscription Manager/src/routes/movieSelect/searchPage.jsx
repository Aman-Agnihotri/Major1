import { useState } from 'react';
import './searchPage.css';
import axios from 'axios';
import { motion } from 'framer-motion';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('movie');
  const [results, setResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state

  const handleSearch = async () => {
    setLoading(true); // Set loading to true before the request
    try {
      const response = await axios.get('https://streaming-availability.p.rapidapi.com/shows/search/title', {
        params: {
          title: query,
          country: 'in',
          show_type: filter,
          series_granularity: 'season',
          output_language: 'en',
        },
        headers: {
          'x-rapidapi-key': 'e4a33437d2msh90f111df451fa67p1016b4jsne9a05f5a82b6',
          'x-rapidapi-host': 'streaming-availability.p.rapidapi.com',
        },
      });
      setResults(response.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResults([]);
    } finally {
      setLoading(false); // Set loading to false after the request completes
    }
  };

  const openDialog = (movie) => {
    setSelectedResult(movie);
  };

  const closeDialog = () => {
    setSelectedResult(null);
  };

  return (
    <div className="search-page">
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-bar"
          onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-select">
          <option value="movie">Movie</option>
          <option value="series">TV Show</option>
        </select>
        <button onClick={handleSearch} className="search-button">
          <img src="/searchIcon.jpg" alt="Search" />
        </button>
      </div>

      {loading ? ( // Show the loading message or spinner when loading
        <div className="loading-message">Searching...</div>
      ) : (
        <div className="results-container">
          {results.map((result) => (
            <motion.div
              key={result.id}
              className="info-card"
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <button className="resultTitle" onClick={() => openDialog(result)} onKeyDown={(e) => { if (e.key === 'Enter') openDialog(result); }}>
                {result.title}
              </button>
              <button className="poster-button" onClick={() => openDialog(result)} onKeyDown={(e) => { if (e.key === 'Enter') openDialog(result); }}>
                <img src={result.imageSet?.verticalPoster?.w480 || ''} alt={result.title} className="poster" />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {selectedResult && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <button className="close-button" onClick={closeDialog}>
              &times;
            </button>
            <h2>{selectedResult.title}</h2>
            <p><strong>Overview:</strong> {selectedResult.overview}</p>
            <p><strong>Release Year:</strong> {selectedResult.releaseYear}</p>
            <p><strong>Genres:</strong> {selectedResult.genres.map((genre) => genre.name).join(', ')}</p>
            <p><strong>{filter === 'movie' ? 'Director: ' : 'Creator: '}</strong> { filter === 'movie' ? selectedResult.directors.join(', ') : selectedResult.creators.join(', ')}</p>
            <p><strong>Cast:</strong> {selectedResult.cast.join(', ')}</p>
            <p><strong>Rating:</strong> {selectedResult.rating}</p>
            <p><strong>Runtime:</strong> {selectedResult.runtime} minutes</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
