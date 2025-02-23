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
                        Find your new favorite movie in just a few clicks!
                    </p>

                    <div className="button-container">
                        <button
                            onClick={startQuiz}
                            className="start-button"
                        >
                            Get Started
                        </button>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;