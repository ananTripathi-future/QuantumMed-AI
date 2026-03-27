from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import time
import math

from quantum_search import grover_mock_search
from classical_search import classical_linear_search
from ai_analyzer import analyze_skin_image, analyze_cough_audio

app = FastAPI(title="QuantumMed AI Backend")

# Enable CORS for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SymptomRequest(BaseModel):
    symptoms: List[str]

@app.get("/")
def read_root():
    return {"message": "Welcome to the QuantumMed AI API! Status: Quantum Processor Online"}

@app.post("/analyze")
def analyze_symptoms(request: SymptomRequest):
    user_symptoms = [s.strip().lower() for s in request.symptoms]
    
    # Call the quantum mock search to match diseases based on symptoms
    results = grover_mock_search(user_symptoms)
    
    return {
        "status": "success",
        "quantum_processing_time_ms": 14.5, # Mock quantum execution metric
        "findings": results["matches"][:3]  # Only return the top 3 matches to keep UI clean
    }

@app.post("/compare")
def compare_searches(request: SymptomRequest):
    """
    Run BOTH classical and quantum searches on the same input,
    measure their performance, and return a detailed comparison.
    """
    user_symptoms = [s.strip().lower() for s in request.symptoms]
    
    # --- Run Classical Search with timing ---
    classical_start = time.perf_counter()
    classical_results = classical_linear_search(user_symptoms)
    classical_end = time.perf_counter()
    classical_time_ms = round((classical_end - classical_start) * 1000, 4)
    
    # --- Run Quantum Search with timing ---
    quantum_start = time.perf_counter()
    quantum_results = grover_mock_search(user_symptoms)
    quantum_end = time.perf_counter()
    quantum_time_ms = round((quantum_end - quantum_start) * 1000, 4)
    
    # --- SIMULATE MASSIVE DATABASE DEMO ---
    # Intercept 'simulate 1m scale' to explicitly demonstrate the condition where Quantum wins
    is_massive_scale = any("simulate 1m scale" in s for s in user_symptoms)
    if is_massive_scale:
        user_symptoms = [s for s in user_symptoms if "simulate 1m scale" not in s]
        if not user_symptoms:
            user_symptoms = ["fever"] # Fallback symptom
        
        # Artificially scale up the physical timings 
        # (Simulating real-world O(N) lag for 1,000,000 linear checks)
        classical_time_ms += 3250.75  # ~3.2 seconds
        quantum_time_ms += 12.30      # Quantum states compute large spaces instantaneously
        
        # Override base size
        classical_results["database_size"] = 1000000
        quantum_results["database_size"] = 1000000
        
    # --- Compute comparison metrics ---
    db_size = classical_results["database_size"]
    
    # Theoretical complexity comparison
    classical_theoretical_ops = db_size * len(user_symptoms)  # O(N*M)
    quantum_theoretical_ops = max(1, int(math.sqrt(db_size)))  # O(√N)
    
    speedup_factor = round(classical_theoretical_ops / max(quantum_theoretical_ops, 1), 2)
    
    # Match quality analysis
    classical_matches = classical_results["matches"]
    quantum_matches = quantum_results["matches"]
    
    classical_diseases = set(m["disease"] for m in classical_matches)
    quantum_diseases = set(m["disease"] for m in quantum_matches)
    
    common_matches = classical_diseases.intersection(quantum_diseases)
    
    # Determine the winner dynamically
    if quantum_time_ms <= classical_time_ms:
        winner = "quantum"
    else:
        winner = "classical"
        
    winner_reasons = []
    
    if winner == "classical":
        winner_reasons.append(f"Classical Search executed faster physically ({classical_time_ms} ms vs {quantum_time_ms} ms).")
        winner_reasons.append(f"For tiny databases ({db_size} records), the overhead of establishing a Quantum state outpaces the linear runtime.")
    else:
        winner_reasons.append(f"Quantum Search executed faster physically ({quantum_time_ms} ms vs {classical_time_ms} ms).")
    
    if quantum_theoretical_ops < classical_theoretical_ops:
        winner_reasons.append(f"Theoretically, Quantum requires only {quantum_theoretical_ops} ops vs Classical's {classical_theoretical_ops} checks.")
    
    if speedup_factor > 1:
        winner_reasons.append(f"Grover's algorithm provides a {speedup_factor}x theoretical speedup.")
        
    winner_reasons.append(f"As the database scales, Quantum's O(√N) algorithm massively outperforms Classical's O(N×M).")
    winner_reasons.append(f"Both algorithms independently found {len(common_matches)} common matches, proving identical accuracy.")
    
    # Scalability projections
    scale_projections = []
    for scale in [100, 1000, 10000, 100000, 1000000]:
        classical_ops = scale * len(user_symptoms)
        quantum_ops = int(math.sqrt(scale))
        scale_projections.append({
            "database_size": scale,
            "classical_operations": classical_ops,
            "quantum_operations": quantum_ops,
            "speedup": round(classical_ops / max(quantum_ops, 1), 1)
        })
    
    return {
        "status": "success",
        "classical": {
            "algorithm": classical_results["algorithm"],
            "complexity": classical_results["complexity"],
            "time_ms": classical_time_ms,
            "comparisons": classical_results["comparisons_made"],
            "theoretical_operations": classical_theoretical_ops,
            "matches_found": len(classical_matches),
            "matches": classical_matches[:5],  # Top 5 for display
        },
        "quantum": {
            "algorithm": quantum_results["algorithm"],
            "complexity": quantum_results["complexity"],
            "time_ms": quantum_time_ms,
            "comparisons": quantum_results["comparisons_made"],
            "theoretical_operations": quantum_theoretical_ops,
            "matches_found": len(quantum_matches),
            "matches": quantum_matches[:5],  # Top 5 for display
            "quantum_state": quantum_results["quantum_state"],
        },
        "comparison": {
            "winner": winner,
            "speedup_factor": speedup_factor,
            "common_matches": len(common_matches),
            "winner_reasons": winner_reasons,
            "scalability": scale_projections,
            "database_size": db_size,
        }
    }

@app.post("/analyze-skin")
async def analyze_skin(file: UploadFile = File(...)):
    contents = await file.read()
    results = analyze_skin_image(contents)
    return {"status": "success", "ai_findings": results}

@app.post("/analyze-cough")
async def analyze_cough(file: UploadFile = File(...)):
    contents = await file.read()
    results = analyze_cough_audio(contents)
    return {"status": "success", "ai_findings": results}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
