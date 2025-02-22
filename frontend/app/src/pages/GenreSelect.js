import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../contexts/QuizContext";
import "./shared.css";

const GenreSelect = () => {
  const navigate = useNavigate();
  const { preferences, updatePreference } = useContext(QuizContext);

  const genres = [
    "Action",
    "Adventure",
    "Animation",
    "Comedy",
    "Documentary",
    "Drama",
    "Family",
    "Fantasy",
    "Horror",
    "History",
    "Mystery",
    "Romance",
    "Sci-Fi",
    "Thriller",
    "Other",
  ];

  const toggleGenre = (genre) => {
    const currentGenres = preferences.genre || [];
    if (currentGenres.includes(genre)) {
      updatePreference(
        "genre",
        currentGenres.filter((g) => g !== genre)
      );
    } else {
      updatePreference("genre", [...currentGenres, genre]);
    }
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
                className={`genre-button ${
                  preferences.genre.includes(genre) ? "selected" : ""
                }`}
                onClick={() => toggleGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>

          <div className="nav-buttons">
            <button
              className="back-button"
              onClick={() => navigate("/language")}
            >
              Back
            </button>
            <button
              className="next-button"
              onClick={() => navigate("/era")}
              style={{ maxWidth: "150px" }}
              disabled={preferences.genre.length === 0}
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
