import React, { useContext, useEffect, useRef, useState } from "react";
import { QuizContext } from "../contexts/QuizContext";
import { useNavigate } from "react-router-dom";
import "./shared.css";

const Result = () => {
  const { preferences } = useContext(QuizContext);
  const hasSubmittedRef = useRef(false);
  const [recommendations, setRecommendations] = useState(null);
  const navigate = useNavigate();

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
        setRecommendations(data);
        console.log("Movie Recommendations:", data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    if (preferences && Object.keys(preferences).length > 0) {
      handleSubmit();
    }
  }, [preferences]);

  return (
    <div className="container">
      <div className="content">
        <h1 className="title">Your Movie Matches</h1>
        <div className="recommendations-grid">
          {recommendations?.slice(0, 3).map((movie, index) => (
            <div key={index} className="recommendation-card">
              <img 
                src={movie.poster_path}
                alt={movie.title}
                className="movie-poster"
              />
              <h2 className="movie-title">{movie.title}</h2>
              <div className="movie-genres">
                {movie.genres?.map((genre, idx) => (
                  <span key={idx} className="genre-tag">{genre}</span>
                ))}
              </div>
              <p className="movie-overview">{movie.overview}</p>
            </div>
          ))}
        </div>

        <div className="nav-buttons">
          <button className="start-button" onClick={() => navigate('/')}>
            Start Over
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;