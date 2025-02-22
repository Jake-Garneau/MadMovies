import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './shared.css';

const GenreSelect = () => {
  const navigate = useNavigate();
  const [selectedGenres, setSelectedGenres] = useState([]);

  const genres = [
    'Action', 'Adventure', 'Animation', 'Comedy',
    'Documentary', 'Drama','Family', 'Fantasy', 'Horror','History', 'Mystery',
    'Romance', 'Sci-Fi', 'Thriller', 'Other'
  ];

  const toggleGenre = (genre) => {
    setSelectedGenres(prevGenres => {
      if (prevGenres.includes(genre)) {
        return prevGenres.filter(g => g !== genre);
      } else {
        return [...prevGenres, genre];
      }
    });
  };

  return (
    <div className="container">
      <div className="card">
        <div className="content">
          <h1 className="title">Select Genres</h1>
          <p className="description">Select all genres you are interested in</p>          
          <div className="genres-grid">
            {genres.map((genre) => (
              <button 
                key={genre}
                className={`genre-button ${selectedGenres.includes(genre) ? 'selected' : ''}`}
                onClick={() => toggleGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
          
          <div className="nav-buttons">
            <button className="back-button" onClick={() => navigate('/language')}>
              Back
            </button>
            <button 
              className="next-button"
              onClick={() => navigate('/release-date')}
              style={{ maxWidth: '150px' }}
              disabled={selectedGenres.length === 0}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenreSelect;