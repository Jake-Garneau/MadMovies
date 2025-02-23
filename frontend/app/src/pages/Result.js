import React, { useContext, useEffect, useRef, useState } from "react";
import { QuizContext } from "../contexts/QuizContext";
import { useNavigate } from "react-router-dom";
import "./shared.css";

const Result = () => {
  const { preferences } = useContext(QuizContext);
  const hasSubmittedRef = useRef(false);
  const [movies, setMovies] = useState([]);
  const [expandedMovie, setExpandedMovie] = useState(null);
  const navigate = useNavigate();

  const fetchMovies = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/get-movies");
      const data = await response.json();
      console.log("Fetched Movies:", data);
      
      const shuffled = data.sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 3);
      setMovies(selected);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };
  const fetchSingleMovie = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/get-movies");
      const data = await response.json();
      const shuffled = data.sort(() => 0.5 - Math.random());
      return shuffled[0];
    } catch (error) {
      console.error("Error fetching replacement movie:", error);
      return null;
    }
  };
  const removeAndReplaceMovie = async (index) => {
    const newMovie = await fetchSingleMovie();
    if (newMovie) {
      setMovies(currentMovies => {
        const newMovies = [...currentMovies];
        newMovies[index] = newMovie;
        return newMovies;
      });
    }
  };
  useEffect(() => {
    if (hasSubmittedRef.current) return;

    const handleSubmit = async () => {
      console.log("Submitting preferences:", preferences);
      hasSubmittedRef.current = true;

      try {
        const response = await fetch(
          "http://127.0.0.1:8000/submit-preferences",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(preferences),
          }
        );

        const data = await response.json();
        console.log("Movie Preferences Saved:", data);
        fetchMovies();
      } catch (error) {
        console.error("Error submitting preferences:", error);
      }
    };

    if (preferences && Object.keys(preferences).length > 0) {
      handleSubmit();
    }
  }, [preferences]);

  const toggleDescription = (index) => {
    if (expandedMovie === index) {
      setExpandedMovie(null);
    } else {
      setExpandedMovie(index);
    }
  };

  return (
    <div className="container">
      <div className="content">
        <div className="top-buttons">
          <button className="start-over-button" onClick={() => navigate('/')}>
            Start Over
          </button>
          <button className="reroll-button" onClick={fetchMovies}>
            Reroll Movies
          </button>
        </div>
        <h1 className="title">Your Movie Matches</h1>
        <div className="cards-container">
          {movies.map((movie, index) => (
            <div key={index} className="movie-card">
               <button 
              className="remove-button"
              onClick={() => removeAndReplaceMovie(index)}
            >
              ×
            </button>
              <h2 className="movie-title">{movie.names}</h2>
              <div className="card-content">
                <p className="movie-genres">Genre: {movie.genre}</p>
                <p className="release-date">Released: {movie.date_x}</p>
                <button 
                  className="description-toggle"
                  onClick={() => toggleDescription(index)}
                >
                  {expandedMovie === index ? "Hide Description" : "Show Description"}
                </button>
                {expandedMovie === index && (
                  <div className="movie-description">
                    <p>{movie.overview}</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Result;