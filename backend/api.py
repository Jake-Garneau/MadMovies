from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI()

user_preferences = {}
class UserPreferences(BaseModel):
    language: List[str]
    genre: List[str]
    releaseDate: str
    budget: str

@app.get("/")
def read_root():
    return {"message": "Welcome to the FastAPI app!"}

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
