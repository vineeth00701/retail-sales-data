#!/bin/bash

# Setup and run script for Linux/macOS
echo "Installing backend dependencies..."
python -m pip install -r backend/requirements.txt

echo "Installing frontend dependencies..."
cd frontend && npm install && cd ..

echo "Starting Backend..."
cd backend && uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload &
BACKEND_PID=$!

echo "Starting Frontend..."
cd frontend && npm run dev -- --host 0.0.0.0 --port 5173 &
FRONTEND_PID=$!

echo "Both servers are running."
echo "Frontend: http://localhost:5173"
echo "Backend:  http://localhost:8000"
echo "Swagger:  http://localhost:8000/docs"

wait $BACKEND_PID $FRONTEND_PID
