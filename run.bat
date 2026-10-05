@echo off
echo Installing backend dependencies...
python -m pip install -r backend\requirements.txt

echo Installing frontend dependencies...
cd frontend
call npm install
cd ..

echo Starting Backend...
start cmd /k "cd backend && uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"

echo Starting Frontend...
start cmd /k "cd frontend && npm run dev -- --host 0.0.0.0 --port 5173"

echo Both servers are running.
echo Frontend: http://localhost:5173
echo Backend:  http://localhost:8000
echo Swagger:  http://localhost:8000/docs
