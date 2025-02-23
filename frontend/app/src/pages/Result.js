import React, { useContext, useEffect, useRef, useState } from "react";
import { QuizContext } from "../contexts/QuizContext";
import { useNavigate } from "react-router-dom";
import "./shared.css";

const Result = () => {
  const { preferences } = useContext(QuizContext);
  const hasSubmittedRef = useRef(false);
  const [movies, setMovies] = useState([]);

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

        // Fetch recommended movies after submitting preferences
        fetchMovies();
      } catch (error) {
        console.error("Error submitting preferences:", error);
      }
    };

    if (preferences && Object.keys(preferences).length > 0) {
      handleSubmit();
    }
  }, [preferences]);

  const fetchMovies = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/get-movies");
      const data = await response.json();
      console.log("Fetched Movies:", data);
      setMovies(data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <div className="container">
      <h1>Quiz Complete!</h1>
      <h2>Recommended Movies:</h2>
      {movies.length > 0 ? (
        <ul>
          {movies.map((movie, index) => (
            <li key={index}>{movie.names}</li>
          ))}
        </ul>
      ) : (
        <p>Loading movie recommendations...</p>
      )}
    </div>
  );
};

export default Result;