import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../contexts/QuizContext";
import "./shared.css";

const ReleaseDateSelect = () => {
  const navigate = useNavigate();
  const { preferences, updatePreference } = useContext(QuizContext);

  const decades = ["2020s", "2010s", "2000s", "1990s", "1980s", "Older"];

  const toggleDecade = (decade) => {
    const currentDecades = preferences.releaseDate || [];
    if (currentDecades.includes(decade)) {
      updatePreference(
        "releaseDate",
        currentDecades.filter((d) => d !== decade)
      );
    } else {
      updatePreference("releaseDate", [...currentDecades, decade]);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="content">
          <h1 className="title">Select Era</h1>
          <p className="description">
            Select all decades you would watch movies from
          </p>
          <div className="languages-grid">
            {decades.map((decade) => (
              <button
                key={decade}
                className={`option-button ${
                  preferences.releaseDate.includes(decade) ? "selected" : ""
                }`}
                onClick={() => toggleDecade(decade)}
              >
                {decade}
              </button>
            ))}
          </div>

          <div className="nav-buttons">
            <button className="back-button" onClick={() => navigate("/genre")}>
              Back
            </button>
            <button
              className="next-button"
              onClick={() => navigate("/budget")}
              disabled={preferences.releaseDate.length === 0}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReleaseDateSelect;
