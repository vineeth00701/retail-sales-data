from fastapi import APIRouter

router = APIRouter()

@router.get("/overview")
def get_analysis():
    return {"message": "Analysis overview."}
