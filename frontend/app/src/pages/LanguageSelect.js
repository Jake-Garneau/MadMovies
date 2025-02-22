import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './shared.css';

const LanguageSelect = () => {
  const navigate = useNavigate();
  const [selectedLanguages, setSelectedLanguages] = useState([]);

  const languages = [
    'English', 'Spanish', 'French', 'Japanese', 'Korean', 'Other'
  ];

  const toggleLanguage = (language) => {
    setSelectedLanguages(prevLanguages => {
      if (prevLanguages.includes(language)) {
        return prevLanguages.filter(lang => lang !== language);
      } else {
        return [...prevLanguages, language];
      }
    });
  };

  return (
    <div className="container">
      <div className="card">
        <div className="content">
          <h1 className="title">Select Language</h1>
          <p className="description">Select all languages you would watch</p>
          
          <div className="languages-grid">
            {languages.map((language) => (
              <button 
                key={language}
                className={`option-button ${selectedLanguages.includes(language) ? 'selected' : ''}`}
                onClick={() => toggleLanguage(language)}
              >
                {language}
              </button>
            ))}
          </div>
          
          <div className="nav-buttons">
            <button className="back-button" onClick={() => navigate('/')}>
              Back
            </button>
            <button 
              className="next-button"
              onClick={() => navigate('/genre')}
              disabled={selectedLanguages.length === 0}
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