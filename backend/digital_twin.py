import sqlite3
import os
import json
import time
from database import DB_PATH

def get_or_create_digital_twin(patient_id: str, name: str = "Demo Patient", age: int = 34, gender: str = "Adult"):
    """
    Fetches or initializes a Patient Digital Twin state.
    """
    if not os.path.exists(DB_PATH):
        return None
        
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM patient_digital_twins WHERE patient_id = ?", (patient_id,))
    twin = cursor.fetchone()
    
    if not twin:
        baseline_vitals = json.dumps({"bp_sys": 120, "bp_dia": 80, "hr": 72, "spo2": 98, "temp_f": 98.6})
        cursor.execute("""
        INSERT INTO patient_digital_twins (patient_id, name, age, gender, baseline_vitals)
        VALUES (?, ?, ?, ?, ?)
        """, (patient_id, name, age, gender, baseline_vitals))
        conn.commit()
        
        # Add baseline initial health event
        cursor.execute("""
        INSERT INTO patient_health_events (patient_id, timestamp, symptoms, vitals, risk_score, risk_category, findings)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (patient_id, "2026-08-01 10:00:00", "mild fatigue", baseline_vitals, 11.0, "Low Risk", "Baseline Routine Checkup"))
        conn.commit()

        # Add second event to build initial trend line
        cursor.execute("""
        INSERT INTO patient_health_events (patient_id, timestamp, symptoms, vitals, risk_score, risk_category, findings)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (patient_id, "2026-08-20 14:30:00", "fatigue, slight fever", baseline_vitals, 14.2, "Low Risk", "Follow-up Checkup"))
        conn.commit()

    # Retrieve all health events
    cursor.execute("""
    SELECT * FROM patient_health_events WHERE patient_id = ? ORDER BY id ASC
    """, (patient_id,))
    events = [dict(r) for r in cursor.fetchall()]
    
    conn.close()
    
    # Calculate Risk Velocity Trend
    scores = [e["risk_score"] for e in events]
    first_score = scores[0] if scores else 10.0
    latest_score = scores[-1] if scores else 10.0
    trend = "STABLE"
    if latest_score > first_score + 3.0:
        trend = "INCREASING (Elevated Health Risk Trajectory)"
    elif latest_score < first_score - 3.0:
        trend = "DECREASING (Improving Health Baseline)"

    return {
        "status": "success",
        "patient_id": patient_id,
        "name": name,
        "age": age,
        "gender": gender,
        "risk_trajectory": scores,
        "latest_risk_score_pct": latest_score,
        "trend_assessment": trend,
        "historical_events_count": len(events),
        "events": events
    }

def record_digital_twin_consultation(patient_id: str, symptoms: list, vitals: dict, risk_score: float, risk_category: str, disease_match: str):
    """
    Appends a new consultation event to the Patient Digital Twin timeline.
    """
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
    vitals_json = json.dumps(vitals or {})
    symptoms_str = ", ".join(symptoms)
    
    cursor.execute("""
    INSERT INTO patient_health_events (patient_id, timestamp, symptoms, vitals, risk_score, risk_category, findings)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (patient_id, timestamp, symptoms_str, vitals_json, risk_score, risk_category, disease_match))
    conn.commit()
    conn.close()
    
    return get_or_create_digital_twin(patient_id)
