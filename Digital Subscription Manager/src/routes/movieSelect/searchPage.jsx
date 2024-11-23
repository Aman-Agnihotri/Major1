import { useState } from 'react';
import './searchPage.css';
import axios from 'axios';
import { motion } from 'framer-motion';

const SearchPage = () => {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('movie');
  const [detail, setDetail] = useState('show');
  const [results, setResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

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
          'x-rapidapi-host': 'streaming-availability.p.rapidapi.com',
        },
      });
      setResults(response.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResults([]);
    }
  };

  const openDialog = (movie) => {
    setSelectedMovie(movie);
  };

  const closeDialog = () => {
    setSelectedMovie(null);
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
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="filter-select">
          <option value="movie">Movie</option>
          <option value="tv">TV Show</option>
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
          <motion.div
            key={result.id}
            className="info-card"
            whileInView={{ opacity: 1, x: 0 }} // Animate to opacity 1 and x=0 when in view
            initial={{ opacity: 0, x: -100 }} // Start hidden and positioned to the left
            transition={{ duration: 0.5, ease: 'easeOut' }} // Animation settings
          >
            <h3 className="resultTitle" onClick={() => openDialog(result)}>
              {result.title}
            </h3>
            <img src={result.imageSet?.verticalPoster?.w240 || ''} alt={result.title} className="poster" />
          </motion.div>
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
            <p><strong>Genres:</strong> {selectedMovie.genres.map((genre) => genre.name).join(', ')}</p>
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
