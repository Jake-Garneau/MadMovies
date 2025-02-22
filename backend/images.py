import requests
from dotenv import load_dotenv
import os

load_dotenv()

API_KEY = os.getenv("TMDB_API_KEY")  # Replace with your TMDB API key
BASE_URL = "https://api.themoviedb.org/3"

def get_movie_poster(movie_name):
    search_url = f"{BASE_URL}/search/movie?api_key={API_KEY}&query={movie_name}"
    response = requests.get(search_url)
    
    if response.status_code == 200:
        data = response.json()
        if data["results"]:
            movie = data["results"][0]  # Get the first search result
            poster_path = movie.get("poster_path")
            if poster_path:
                poster_url = f"https://image.tmdb.org/t/p/w500{poster_path}"  # Get a medium-sized poster
                return poster_url
            else:
                return "Poster not available"
        else:
            return "Movie not found"
    else:
        return f"Error: {response.status_code}"

movie_name = "Inception"
poster_url = get_movie_poster(movie_name)
print(f"Movie Poster URL: {poster_url}")
