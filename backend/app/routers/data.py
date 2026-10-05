from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

@router.get("/summary")
def get_summary():
    return {"message": "Data summary will go here."}
