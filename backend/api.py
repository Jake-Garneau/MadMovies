from fastapi import FastAPI
import pandas as pd
import sqlite3

app = FastAPI()

name = 'IMDBmovies.db'
con = sqlite3.connect(name)

def get_movies_from_db():
    query="select * from sqlite_master"
    df = pd.read_sql(query, con)
    return df.to_dict(orient="records")

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI app!"}
