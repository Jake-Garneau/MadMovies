from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
from typing import List, Optional
import threading
from fastapi.responses import JSONResponse

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

user_preferences = {}
class UserPreferences(BaseModel):
    language: List[str]
    genre: List[str]
    releaseDate: List[int]
    budget: List[str]

thread_local = threading.local()

def get_db_connection():
    if not hasattr(thread_local, "con"):
        thread_local.con = sqlite3.connect('IMDBmovies.db')
    return thread_local.con

name = 'IMDBmovies.db'
con = sqlite3.connect(name)

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI app!"}

def get_movies_by_preference(
    language: Optional[List[str]] = None, 
    genre: Optional[List[str]] = None, 
    releaseDate: Optional[List[int]] = None, 
    budget: Optional[List[str]] = None
):
    con = get_db_connection()

    qry="""SELECT * 
    FROM movies
    """
    df = pd.read_sql(qry, con)
    df["orig_lang"] = df["orig_lang"].astype(str).str.strip().str.lower()
    if language is None:
        language = ["spanish, castilian"]
    if genre is None:
        genre = ["drama", "comedy", "action"]
    if releaseDate is None:
        releaseDate = [2020, 2010]
    if budget is None:
        budget = ["small", "med"]
    
    language = [lang.lower() for lang in language]
    genre = [g.lower() for g in genre]
    filtered_df = df[df["orig_lang"].isin(language)]
    filtered_df["genre"] = filtered_df["genre"].astype(str).str.lower()
    filtered_df = filtered_df[filtered_df["genre"].apply(lambda g: any(gen in g for gen in genre))]

    if "date_x" in filtered_df.columns:
        filtered_df["date_x"] = filtered_df["date_x"].astype(str).str.strip()
        filtered_df["date_x"] = pd.to_datetime(filtered_df["date_x"], errors="coerce", infer_datetime_format=True)

        filtered_df = filtered_df.dropna(subset=["date_x"])
        filtered_df["year"] = filtered_df["date_x"].dt.year
    else:
        raise ValueError("Column 'date_x' not found in DataFrame!")
    if "year" not in filtered_df.columns:
        raise ValueError("Column 'year' was not created successfully!")
    
    
    if releaseDate:
        start_years = []
        end_years = []

        for d in releaseDate:
            start_year = (d // 10) * 10
            end_year = start_year + 9
            start_years.append(start_year)
            end_years.append(end_year)

        filtered_df = filtered_df[
            filtered_df["year"].apply(lambda y: any(start <= y <= end for start, end in zip(start_years, end_years)))
        ]

    if "budget_x" in filtered_df.columns:
        filtered_df["budget_x"] = pd.to_numeric(filtered_df["budget_x"], errors="coerce")
    else:
        raise ValueError("Column 'budget_x' not found in DataFrame!")

    filtered_df["date_x"] = filtered_df["date_x"].astype(str)  

    if budget:
        budget_filters = []
        
        for b in budget:
            if b == "small":
                budget_filters.append(filtered_df["budget_x"] < 2_000_000)
            elif b == "med":
                budget_filters.append((filtered_df["budget_x"] >= 2_000_000) & (filtered_df["budget_x"] <= 100_000_000))
            elif b == "large":
                budget_filters.append(filtered_df["budget_x"] > 100_000_000)
            else:
                raise ValueError("Invalid budget category! Choose from: 'small', 'med', or 'large'.")

        if budget_filters:
            filtered_df = filtered_df[pd.concat(budget_filters, axis=1).any(axis=1)]


    return JSONResponse(filtered_df.to_dict(orient="records"))

@app.get("/first-5-movie-names", response_model=List[str])
def get_first_5_movies():
    movie_names = get_movies_by_preference()
    return movie_names

@app.post("/submit-preferences")
def submit_preferences(preferences: UserPreferences):
    """
    Temporarily store user movie preferences in memory and return them.
    """
    try:
        user_preferences["preferences"] = preferences.model_dump()

        return {"message": "Preferences received successfully!", "data": preferences.model_dump()}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
@app.get("/get-movies")
def get_movies():
    try:
        preferences = user_preferences.get("preferences", None)
        print(preferences)
        if preferences is None:
            raise HTTPException(status_code=404, detail="No preferences found in memory!")
        
        return get_movies_by_preference(**preferences)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))