import React, { useContext, useEffect, useRef } from "react";
import { QuizContext } from "../contexts/QuizContext";

const Result = () => {
  const { preferences } = useContext(QuizContext);
  const hasSubmittedRef = useRef(false);

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
        console.log("Movie Recommendations:", data);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      }
    };

    if (preferences && Object.keys(preferences).length > 0) {
      handleSubmit();
    }
  }, [preferences]);

  console.log("Rendered with preferences:", preferences);

  return (
    <div className="container">
      <h1>Quiz Complete!</h1>
    </div>
  );
};

export default Result;
