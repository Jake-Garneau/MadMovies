# Movie Recommendation App - Hackathon

This is a **movie recommendation web app** built for a **24-hour hackathon**. The app allows users to take a quiz on movie genres and other preferences, then recommends movies based on their responses using **Cosine Similarity**.

### Tech Stack:

- **Frontend**: React.js, Tailwind CSS
- **Backend**: FastAPI (Python)
- **Database**: SQLite
- **Recommendation Engine**: Cosine Similarity for movie recommendations

### Features:

- **Quiz**: Users answer questions related to their movie preferences and genre choices.
- **Recommendations**: After completing the quiz, users receive movie recommendations based on their preferences using a **Cosine Similarity** algorithm.
- **Responsive UI**: The app is designed with React and styled using Tailwind CSS for a fast, mobile-responsive experience.

---

## **How It Works**:

1. **Frontend (React)**:

   - Users take a quiz on the frontend, which asks questions about their favorite movie genres and other preferences.
   - The answers are sent to the backend for processing.

2. **Backend (FastAPI)**:

   - The FastAPI backend processes the quiz answers.
   - It fetches movie data from an SQLite database and applies a **Cosine Similarity** algorithm to recommend movies based on user responses.

3. **Recommendation Engine**:

   - The system calculates the **Cosine Similarity** between the user’s answers and a database of movie genres and other attributes.
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
cd movie-recommendation-hackathon
```
