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
      const response = await axios.get('https://' + import.meta.env.VITE_X_RAPIDAPI_HOST + '/shows/search/title', {
        params: {
          title: query,
          country: 'in',
          show_type: filter,
          series_granularity: 'season',
          output_language: 'en',
        },
        headers: {
          'x-rapidapi-key': import.meta.env.VITE_X_RAPIDAPI_KEY,
          'x-rapidapi-host': import.meta.env.VITE_X_RAPIDAPI_HOST,
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
          <img src="/search-icon.png" alt="Search" />
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
            {/* Backdrop Image */}
            {selectedResult.imageSet?.horizontalBackdrop && (
              <div
                className="backdrop-image"
                style={{
                  backgroundImage: `url(${selectedResult.imageSet.horizontalBackdrop.w1440})`,
                }}
              ></div>
            )}
            <div className="dialog-content">
              <h2>{selectedResult.title}</h2>
              <p><strong>Overview:</strong> {selectedResult.overview}</p>
              <p><strong>Release Year:</strong> {selectedResult.releaseYear}</p>
              <p><strong>Genres:</strong> {selectedResult.genres.map((genre) => genre.name).join(', ')}</p>
              <p><strong>{filter === 'movie' ? 'Director: ' : 'Creator: '}</strong> { filter === 'movie' ? selectedResult.directors.join(', ') : selectedResult.creators.join(', ')}</p>
              <p><strong>Cast:</strong> {selectedResult.cast.join(', ')}</p>
              <p><strong>Rating:</strong> {selectedResult.rating}</p>
              <p><strong>Runtime:</strong> {selectedResult.runtime} minutes</p>
            </div>
            <div className="streaming-options">
              {selectedResult.streamingOptions?.in &&
                  Object.values(
                    selectedResult.streamingOptions.in.reduce((acc, option) => {
                      const serviceId = option.service.id;
                      // Prioritize 'buy' over other types
                      if (
                        !acc[serviceId] ||
                        (acc[serviceId].type !== 'buy' && option.type === 'buy')
                      ) {
                        acc[serviceId] = option;
                      }
                      return acc;
                    }, {})
                  ).map((option) => (
                    <a key={option.service.id} href={option.link} target="_blank" rel="noopener noreferrer">
                      <img src={option.service.imageSet.lightThemeImage} alt={option.service.name} />
                    </a>
                  ))
              }
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
