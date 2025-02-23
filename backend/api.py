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
    releaseDate: List[str]
    budget: List[str]

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

#def qry(QUERY):
    #return pd.read_sql(QUERY, conn)

#def get_movies_by_preference(language="english", genre="Drama", decade=2020, budget="large"):
def get_movies_by_preference(
    language: Optional[List[str]] = None, 
    genre: Optional[List[str]] = None, 
    decade: Optional[int] = None, 
    budget: Optional[str] = None
):
    con = get_db_connection()

    qry="""SELECT * 
    FROM movies
    """
    df = pd.read_sql(qry, con)
    df["orig_lang"] = df["orig_lang"].astype(str).str.strip().str.lower()
    if language is None:
        language = ["spanish", "english"]
    if genre is None:
        genre = ["drama", "comedy"]
    
    #filtered_df = df[df["orig_lang"] == "English"]
    language = [lang.lower() for lang in language]
    genre = [g.lower() for g in genre]
    filtered_df = df[df["orig_lang"].isin(language)]
    #genre = [g.lower() for g in genre]
    filtered_df["genre"] = filtered_df["genre"].astype(str).str.lower()
    filtered_df = filtered_df[filtered_df["genre"].apply(lambda g: any(gen in g for gen in genre))]

    #filtered_df = df[df["orig_lang"] == language.lower()] #right now english but change to some varaible based on user preference
    #filtered_df = filtered_df[filtered_df["genre"].str.contains(rf'\b{genre}\b', case=False, na=False)] #right not set to drama for genre, but will need to modify to work for selected genre by user
    if "date_x" in filtered_df.columns:
        filtered_df["date_x"] = filtered_df["date_x"].astype(str).str.strip()
        filtered_df["date_x"] = pd.to_datetime(filtered_df["date_x"], errors="coerce", infer_datetime_format=True)

        #filtered_df["date_x"] = pd.to_datetime(filtered_df["date_x"], format="%m/%d/%Y", errors="coerce")
        filtered_df = filtered_df.dropna(subset=["date_x"])
        filtered_df["year"] = filtered_df["date_x"].dt.year  # Add 'year' column
    else:
        raise ValueError("Column 'date_x' not found in DataFrame!")
    #print("Columns in DataFrame:", df.columns)
    #print("First 5 rows of DataFrame:\n", df.head())
    if "year" not in filtered_df.columns:
        raise ValueError("Column 'year' was not created successfully!")
    

    #filtered_df["date_x"] = filtered_df["date_x"].astype(str)
    #filtered_df["date_x"] = filtered_df["date_x"].apply(lambda x: x.strftime("%Y-%m-%d") if pd.notna(x) else None)

    #filtered_df.replace([np.inf, -np.inf], np.nan, inplace=True)
    #filtered_df.replace([np.inf, -np.inf], np.nan, inplace=True)
    #filtered_df.fillna("", inplace=True)
    #return JSONResponse(filtered_df.fillna("").to_dict(orient="records"))
    if decade:
        start_year = (decade // 10) * 10   
        end_year = start_year + 9          
        filtered_df = filtered_df[(filtered_df["year"] >= start_year) & (filtered_df["year"] <= end_year)]

    if "budget_x" in filtered_df.columns:
        filtered_df["budget_x"] = pd.to_numeric(filtered_df["budget_x"], errors="coerce")
    else:
        raise ValueError("Column 'budget' not found in DataFrame!")
    
    filtered_df["date_x"] = filtered_df["date_x"].astype(str) 
    if budget:
        budget = budget.lower()
        if budget == "small":
            filtered_df = filtered_df[filtered_df["budget_x"] < 2_000_000]
        elif budget == "med":
            filtered_df = filtered_df[(filtered_df["budget_x"] >= 2_000_000) & (filtered_df["budget_x"] <= 100_000_000)]
        elif budget == "large":
            filtered_df = filtered_df[filtered_df["budget_x"] > 100_000_000]
        else:
            raise ValueError("Invalid budget category! Choose from: 'Small', 'Med', or 'Large'.")

    return JSONResponse(filtered_df.to_dict(orient="records"))

#def get_movies_by_preference(language="english", genre="Drama", decade=2020, budget="large"):


@app.get("/first-5-movie-names", response_model=List[str])
def get_first_5_movies():
    # Fetch the first 5 movie names from the database
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
