import sqlite3
import time
import secrets
from database import DB_PATH

def record_clinician_hitl_review(consultation_id: str, clinician_name: str, review_status: str, clinician_notes: str):
    """
    Submits a Human-in-the-Loop (HITL) clinician review & final sign-off.
    review_status: 'Approved', 'Modified/Overridden', 'Rejected'
    """
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S")
    
    cursor.execute("""
    INSERT OR REPLACE INTO hitl_reviews (consultation_id, clinician_name, review_status, clinician_notes, decision_timestamp)
    VALUES (?, ?, ?, ?, ?)
    """, (consultation_id, clinician_name, review_status, clinician_notes, timestamp))
    
    conn.commit()
    conn.close()
    
    return {
        "status": "success",
        "hitl_review": {
            "consultation_id": consultation_id,
            "clinician_name": clinician_name,
            "review_status": review_status,
            "clinician_notes": clinician_notes,
            "decision_timestamp": timestamp,
            "clinical_signoff_certificate": f"HITL-SIG-{secrets.token_hex(4).upper()}"
        }
    }
