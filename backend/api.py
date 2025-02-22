from fastapi import FastAPI
import pandas as pd
import sqlite3
from typing import List
import threading

app = FastAPI()

thread_local = threading.local()

def get_db_connection():
    if not hasattr(thread_local, "con"):
        # Create a new connection for the current thread
        thread_local.con = sqlite3.connect('IMDBmovies.db')
    return thread_local.con

name = 'IMDBmovies.db'
con = sqlite3.connect(name)

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI app!"}

def get_first_5_movie_names():
    con = get_db_connection()
    query = "SELECT names FROM movies LIMIT 5"
    df = pd.read_sql(query, con)
    return df['names'].tolist()

@app.get("/first-5-movie-names", response_model=List[str])
def get_first_5_movies():
    # Fetch the first 5 movie names from the database
    movie_names = get_first_5_movie_names()
    return movie_names
