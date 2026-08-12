@echo off
title QuantumMed AI Launcher
color 0B

echo ==============================================
echo       Starting QuantumMed AI Platform
echo ==============================================
echo.

echo [1/2] Installing backend dependencies and starting FastAPI (Port 8000)...
start "QuantumMed Backend" cmd /k "cd /d backend && python -m pip install -r requirements.txt && python main.py"

echo [2/2] Starting React Frontend (Port 5173)...
start "QuantumMed Frontend" cmd /k "cd /d frontend && npm.cmd run dev -- --open"

echo.
echo Both services are starting up! 
echo A new browser window should open shortly.
pause
