import React, { useContext } from "react";
import { QuizContext } from "../contexts/QuizContext";

const Result = () => {
  const { preferences } = useContext(QuizContext);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://api.com/recommend", {
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
