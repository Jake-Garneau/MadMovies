import React from 'react';
import { useNavigate } from 'react-router-dom';
import './shared.css';

const Homepage = () => {
    const navigate = useNavigate();

    const startQuiz = () => {
        navigate('/language');
    };

    return (
        <div className="container">
            <div className="card">
                <div className="content">
                    <h1 className="title">
                        MadMovies
                    </h1>
                    <p className="description">
                        Take the quiz! Find your next favorite movie!
                    </p>

                    <div className="button-container">
                        <button
                            onClick={startQuiz}
                            className="start-button"
                        >
                            Start Quiz
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;