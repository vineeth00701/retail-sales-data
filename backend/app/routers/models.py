from fastapi import APIRouter

router = APIRouter()

@router.post("/train")
def train_models():
    return {"message": "Models training initiated."}
