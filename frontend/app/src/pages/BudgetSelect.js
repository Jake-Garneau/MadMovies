import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { QuizContext } from "../contexts/QuizContext";
import "./shared.css";

const BudgetSelect = () => {
  const navigate = useNavigate();
  const { preferences, updatePreference } = useContext(QuizContext);

  const budgets = ["Small (<$20M)", "Medium ($20M-$100M)", "Large (>$100M)"];

  const toggleBudget = (budget) => {
    const currentBudgets = preferences.budget || [];
    if (currentBudgets.includes(budget)) {
      updatePreference(
        "budget",
        currentBudgets.filter((b) => b !== budget)
      );
    } else {
      updatePreference("budget", [...currentBudgets, budget]);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="content">
          <h1 className="title">Select Budget</h1>
          <p className="description">
            Select all budget ranges you are interested in
          </p>
          <div className="options-container">
            {budgets.map((budget) => (
              <button
                key={budget}
                className={`option-button ${
                  preferences.budget.includes(budget) ? "selected" : ""
                }`}
                onClick={() => toggleBudget(budget)}
              >
                {budget}
              </button>
            ))}
          </div>

          <div className="nav-buttons">
            <button className="back-button" onClick={() => navigate("/era")}>
              Back
            </button>
            <button
              className="next-button"
              onClick={() => navigate("/result")}
              disabled={preferences.budget.length === 0}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetSelect;
