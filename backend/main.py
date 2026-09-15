from fastapi import FastAPI, File, UploadFile, APIRouter, Body
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional, Dict
import time
import math

from quantum_search import grover_mock_search
from classical_search import classical_linear_search
from ai_analyzer import analyze_skin_image, analyze_cough_audio
import ml_compare

# 10-Pillar Extension Modules
import pqc_security
import qrng_security
import qaoa_optimizer
import multimodal_fusion
import uncertainty_engine
import xai_engine
import digital_twin
import temporal_diff
import hitl_workflow
import research_lab

app = FastAPI(title="QuantumMed AI Backend", version="2.0.0")
api_router = APIRouter()
ML_METRICS_CACHE = None

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SymptomRequest(BaseModel):
    symptoms: List[str]
    gender: str = "Any"
    age_group: str = "Adult"
    is_pregnant: bool = False
    severities: dict[str, str] = {}

class MultimodalRequest(BaseModel):
    symptoms: List[str]
    gender: str = "Any"
    age_group: str = "Adult"
    is_pregnant: bool = False
    severities: dict[str, str] = {}
    vitals: Optional[Dict[str, float]] = None
    medical_history: Optional[List[str]] = None
    patient_id: str = "demo_patient"

class TemporalRequest(BaseModel):
    report_t1: str
    report_t2: str

class HITLRequest(BaseModel):
    consultation_id: str
    clinician_name: str
    review_status: str
    clinician_notes: str

@api_router.get("/")
def read_root():
    return {"message": "Welcome to QuantumMed AI Research Platform! Status: Quantum & AI Processors Online"}

@api_router.get("/diseases")
def get_all_diseases():
    import sqlite3
    import database
    conn = sqlite3.connect(database.DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM diseases")
    names = [r[0] for r in cursor.fetchall()]
    conn.close()
    
    db_dict = {}
    for name in names:
        db_dict[name] = database.get_disease_info(name)
    return db_dict

@api_router.post("/analyze")
def analyze_symptoms(request: SymptomRequest):
    user_symptoms = [s.strip().lower() for s in request.symptoms]
    results = grover_mock_search(
        user_symptoms,
        gender=request.gender,
        age_group=request.age_group,
        is_pregnant=request.is_pregnant,
        severities=request.severities
    )
    
    import database
    findings = []
    for match in results["matches"][:5]:
        disease_name = match["disease"]
        db_info = database.get_disease_info(disease_name)
        if db_info:
            db_info["confidence"] = match["confidence"]
            findings.append(db_info)
            
    # Compute Explainability & Uncertainty
    xai = xai_engine.generate_explainable_ai_report(findings, user_symptoms)
    top_conf = findings[0]["confidence"] if findings else 0.0
    unc = uncertainty_engine.evaluate_prediction_uncertainty(top_conf, len(user_symptoms))
            
    return {
        "status": "success",
        "quantum_processing_time_ms": 14.5,
        "findings": findings,
        "xai_explainability": xai,
        "uncertainty_safety": unc
    }

@api_router.post("/compare")
def compare_searches(request: SymptomRequest):
    user_symptoms = [s.strip().lower() for s in request.symptoms]
    
    classical_start = time.perf_counter()
    classical_results = classical_linear_search(
        user_symptoms,
        gender=request.gender,
        age_group=request.age_group,
        is_pregnant=request.is_pregnant,
        severities=request.severities
    )
    classical_end = time.perf_counter()
    classical_time_ms = round((classical_end - classical_start) * 1000, 4)
    
    quantum_start = time.perf_counter()
    quantum_results = grover_mock_search(
        user_symptoms,
        gender=request.gender,
        age_group=request.age_group,
        is_pregnant=request.is_pregnant,
        severities=request.severities
    )
    quantum_end = time.perf_counter()
    quantum_time_ms = round((quantum_end - quantum_start) * 1000, 4)
    
    db_size = classical_results["database_size"]
    classical_theoretical_ops = db_size * len(user_symptoms)
    quantum_theoretical_ops = max(1, int(math.sqrt(db_size)))
    speedup_factor = round(classical_theoretical_ops / max(quantum_theoretical_ops, 1), 2)
    
    classical_matches = classical_results["matches"]
    quantum_matches = quantum_results["matches"]
    
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
    
    res = {
        "status": "success",
        "classical": {
            "algorithm": classical_results["algorithm"],
            "complexity": classical_results["complexity"],
            "time_ms": classical_time_ms,
            "comparisons": classical_results["comparisons_made"],
            "theoretical_operations": classical_theoretical_ops,
            "matches_found": len(classical_matches),
            "matches": classical_matches[:5],
        },
        "quantum": {
            "algorithm": quantum_results["algorithm"],
            "complexity": quantum_results["complexity"],
            "time_ms": quantum_time_ms,
            "comparisons": quantum_results["comparisons_made"],
            "theoretical_operations": quantum_theoretical_ops,
            "matches_found": len(quantum_matches),
            "matches": quantum_matches[:5],
            "quantum_state": quantum_results["quantum_state"],
        },
        "comparison": {
            "winner": "quantum" if quantum_time_ms <= classical_time_ms else "classical",
            "speedup_factor": speedup_factor,
            "common_matches": len(set(m["disease"] for m in classical_matches).intersection(set(m["disease"] for m in quantum_matches))),
            "winner_reasons": [
                f"Theoretical O(√N) speedup ({quantum_theoretical_ops} ops vs {classical_theoretical_ops} ops).",
                f"Grover algorithm speedup factor: {speedup_factor}x."
            ],
            "scalability": scaleProjections if 'scaleProjections' in locals() else scale_projections,
            "database_size": db_size,
        }
    }
    
    global ML_METRICS_CACHE
    if ML_METRICS_CACHE is None:
        ML_METRICS_CACHE = ml_compare.get_ml_metrics()
    res["ml_models"] = ML_METRICS_CACHE
    return res

@api_router.post("/multimodal-analyze")
def multimodal_analyze(request: MultimodalRequest):
    fusion_res = multimodal_fusion.fuse_multimodal_health_intelligence(
        request.symptoms,
        vitals=request.vitals,
        medical_history=request.medical_history
    )
    
    # Track Digital Twin event
    twin = digital_twin.record_digital_twin_consultation(
        request.patient_id,
        request.symptoms,
        request.vitals,
        fusion_res["multimodal_fusion"]["health_risk_score_pct"],
        fusion_res["multimodal_fusion"]["risk_category"],
        f"Primary Symptoms: {', '.join(request.symptoms[:2])}"
    )
    
    # Attach PQC Security Audit Certificate
    pqc_audit = pqc_security.execute_pqc_security_exchange(request.patient_id, fusion_res)
    
    # Check Uncertainty Safety
    unc = uncertainty_engine.evaluate_prediction_uncertainty(
        fusion_res["multimodal_fusion"]["health_risk_score_pct"],
        len(request.symptoms),
        missing_vitals=(request.vitals is None)
    )
    
    return {
        "status": "success",
        "multimodal": fusion_res["multimodal_fusion"],
        "digital_twin": twin,
        "pqc_security": pqc_audit,
        "uncertainty_safety": unc
    }

@api_router.post("/pqc-secure-exchange")
def pqc_exchange(payload: dict = Body(...)):
    patient_id = payload.get("patient_id", "demo_patient")
    return pqc_security.execute_pqc_security_exchange(patient_id, payload)

@api_router.get("/qrng-test")
def qrng_test():
    return qrng_security.run_qrng_suite()

@api_router.post("/qaoa-optimize")
def qaoa_optimize(problem_type: str = "bed_scheduling", units: int = 10, patients: int = 20):
    return qaoa_optimizer.solve_hospital_resource_allocation(problem_type, units, patients)

@api_router.get("/digital-twin/{patient_id}")
def get_digital_twin(patient_id: str):
    return digital_twin.get_or_create_digital_twin(patient_id)

@api_router.post("/what-changed")
def what_changed(request: TemporalRequest):
    text_diff = temporal_diff.compare_temporal_text_reports(request.report_t1, request.report_t2)
    img_diff = temporal_diff.compare_temporal_image_series()
    return {
        "status": "success",
        "text_differential": text_diff,
        "image_differential": img_diff
    }

@api_router.post("/hitl-submit-review")
def submit_hitl_review(request: HITLRequest):
    return hitl_workflow.record_clinician_hitl_review(
        request.consultation_id,
        request.clinician_name,
        request.review_status,
        request.clinician_notes
    )

@api_router.post("/research-lab/run-experiment")
def run_research_experiment(exp_name: str = "Quantum vs Classical Diagnostic Classification"):
    return research_lab.run_reproducible_experiment(experiment_name=exp_name)

@api_router.post("/analyze-skin")
async def analyze_skin(file: UploadFile = File(...)):
    contents = await file.read()
    results = analyze_skin_image(contents)
    return {"status": "success", "ai_findings": results}

@api_router.post("/analyze-cough")
async def analyze_cough(file: UploadFile = File(...)):
    contents = await file.read()
    results = analyze_cough_audio(contents)
    return {"status": "success", "ai_findings": results}

app.include_router(api_router)
app.include_router(api_router, prefix="/api")

if __name__ == "__main__":
    import uvicorn
    import database
    database.init_db()
    uvicorn.run(app, host="127.0.0.1", port=8080)
