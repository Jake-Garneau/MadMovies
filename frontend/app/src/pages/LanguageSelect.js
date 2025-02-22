import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './shared.css';

const LanguageSelect = () => {
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState(null);

  return (
    <div className="container">
      <div className="card">
        <div className="content">
          <h1 className="title">Select Language</h1>
          <p className="description">What language would you prefer?</p>
          
          <div className="options-container">
            <button 
              className={`option-button ${selectedLanguage === 'english' ? 'selected' : ''}`}
              onClick={() => setSelectedLanguage('english')}
            >
              English
            </button>
            <button 
              className={`option-button ${selectedLanguage === 'spanish' ? 'selected' : ''}`}
              onClick={() => setSelectedLanguage('spanish')}
            >
              Spanish
            </button>
            <button 
              className={`option-button ${selectedLanguage === 'korean' ? 'selected' : ''}`}
              onClick={() => setSelectedLanguage('korean')}
            >
              Korean
            </button>
          </div>
          
          <div className="nav-buttons">
            <button className="back-button" onClick={() => navigate('/')}>
              Back
            </button>
            <button 
              className="start-button"
              onClick={() => navigate('/genre')}
              style={{ maxWidth: '150px' }}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelect;