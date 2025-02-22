import React, { createContext, useState } from "react";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [preferences, setPreferences] = useState({
    language: [],
    genre: [],
    releaseDate: null,
    budget: null,
  });

  const updatePreference = (key, value) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <QuizContext.Provider value={{ preferences, updatePreference }}>
      {children}
    </QuizContext.Provider>
  );
};
