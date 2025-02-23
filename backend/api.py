from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from fastapi.middleware.cors import CORSMiddleware

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
