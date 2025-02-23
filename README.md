# Movie Recommendation App - Hackathon

This is a **movie recommendation web app** built for a **24-hour hackathon**. The app allows users to take a quiz on movie genres and other preferences, then recommends movies based on their responses.

### Tech Stack:

- **Frontend**: React.js
- **Backend**: FastAPI (Python)
- **Database**: SQLite

### Features:

- **Quiz**: Users answer questions related to their movie preferences and genre choices.
- **Recommendations**: After completing the quiz, users receive movie recommendations based on their preferences, and can re-roll for new suggestions
- **Responsive UI**: The app is designed with ReactJS and CSS for a fast, mobile-responsive experience.

---

## **How It Works**:

1. **Frontend (React)**:

   - Users take a quiz on the frontend, which asks questions about their favorite movie genres and other preferences.
   - The answers are sent to the backend for processing.

2. **Backend (FastAPI)**:

   - The FastAPI backend processes the quiz answers.
   - It fetches movie data from an SQLite database and applies a **Cosine Similarity** algorithm to recommend movies based on user responses.

3. **Recommendations**:

   - The system filters the
   - It returns a list of recommended movies to the user.

4. **Database (SQLite)**:
   - Movies and their metadata (genre, description, etc.) are stored in an **SQLite** database.
   - The database is lightweight, ensuring fast queries for recommendations.

---

## **Getting Started**

### Prerequisites:

- [Node.js](https://nodejs.org/en/download/) (for the frontend)
- [Python 3.9+](https://www.python.org/downloads/) (for the backend)
- [SQLite](https://www.sqlite.org/download.html) (database)

### 1. Clone the repository:

```bash
git clone https://github.com/yourusername/movie-recommendation-hackathon.git
```

### 2. Frontend:

```bash
npm install
npm start
```

### 3. Backend:

```bash
pip install -r requirements.txt
uvicorn api:app --reload
```

## TODO:

- Add cosine similarity to recommendation system
- Remove possibility of displaying same movie multiple times
- Add loading spinner as movies are loading in
- Dockerize and deploy outside of local environment
- Add placeholders for missing images
- UI touchups
