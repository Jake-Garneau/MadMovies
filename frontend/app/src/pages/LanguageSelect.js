import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../contexts/QuizContext";
import "./shared.css";

const LanguageSelect = () => {
  const navigate = useNavigate();
  const { preferences, updatePreference } = useContext(QuizContext);

  const languages = [
    "English",
    "Spanish, Castilian",
    "French",
    "Japanese",
    "Korean",
    "Other",
  ];

  const toggleLanguage = (language) => {
    const currentLanguages = preferences.language || [];
    if (currentLanguages.includes(language)) {
      updatePreference(
        "language",
        currentLanguages.filter((lang) => lang !== language)
      );
    } else {
      updatePreference("language", [...currentLanguages, language]);
    }
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
                className={`option-button ${
                  preferences.language.includes(language) ? "selected" : ""
                }`}
                onClick={() => toggleLanguage(language)}
              >
                {language === "Spanish, Castilian" ? "Spanish" : language}
              </button>
            ))}
          </div>

          <div className="nav-buttons">
            <button className="back-button" onClick={() => navigate("/")}>
              Back
            </button>
            <button
              className="next-button"
              onClick={() => navigate("/genre")}
              disabled={
                !preferences.language || preferences.language.length === 0
              }
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
