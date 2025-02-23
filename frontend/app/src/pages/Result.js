import React, { useContext } from "react";
import { QuizContext } from "../contexts/QuizContext";

const Result = () => {
  const { preferences } = useContext(QuizContext);

  const handleSubmit = async () => {
    try {
      console.log("Submitting preferences:", preferences);
      const response = await fetch("http://127.0.0.1:8000/submit-preferences", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(preferences),
      });

      const data = await response.json();
      console.log("Movie Recommendations:", data);
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  return (
    <div>
      <h1>Quiz Complete!</h1>
      <button onClick={handleSubmit}>Get Recommendations</button>
    </div>
  );
};

export default Result;
