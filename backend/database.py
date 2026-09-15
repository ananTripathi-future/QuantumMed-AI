import sqlite3
import os
import json

DB_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data")
DB_PATH = os.path.join(DB_DIR, "quantum_med.db")

def init_db():
    """
    Initializes the SQLite database tables.
    """
    if not os.path.exists(DB_DIR):
        os.makedirs(DB_DIR)
        
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # Base schema tables
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS diseases (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE,
        category TEXT,
        severity TEXT,
        description TEXT,
        recommended_specialist TEXT,
        emergency INTEGER,
        recovery_time TEXT
    )
    """)
    
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS symptoms (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE
    )
    """)
    
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS disease_symptoms (
        disease_id INTEGER,
        symptom_id INTEGER,
        association_strength REAL,
        PRIMARY KEY (disease_id, symptom_id),
        FOREIGN KEY (disease_id) REFERENCES diseases(id),
        FOREIGN KEY (symptom_id) REFERENCES symptoms(id)
    )
    """)
    
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS treatments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        disease_id INTEGER,
        home_remedies TEXT,
        medications TEXT,
        medical_treatment TEXT,
        FOREIGN KEY (disease_id) REFERENCES diseases(id)
    )
    """)
    
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS risk_factors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        disease_id INTEGER,
        factor TEXT,
        FOREIGN KEY (disease_id) REFERENCES diseases(id)
    )
    """)

    # --- 10-Pillar Extension Schema Tables ---

    # Patient Digital Twin tables
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS patient_digital_twins (
        patient_id TEXT PRIMARY KEY,
        name TEXT,
        age INTEGER,
        gender TEXT,
        baseline_vitals TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS patient_health_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        patient_id TEXT,
        timestamp TEXT,
        symptoms TEXT,
        vitals TEXT,
        risk_score REAL,
        risk_category TEXT,
        findings TEXT,
        FOREIGN KEY (patient_id) REFERENCES patient_digital_twins(patient_id)
    )
    """)

    # PQC & QRNG Security logs
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS pqc_security_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT UNIQUE,
        kem_algorithm TEXT,
        dsa_algorithm TEXT,
        public_key_fingerprint TEXT,
        signature_status TEXT,
        timestamp TEXT
    )
    """)

    cursor.execute("""
    CREATE TABLE IF NOT EXISTS qrng_entropy_tests (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        bitstring TEXT,
        entropy_score REAL,
        monobit_pass INTEGER,
        runs_pass INTEGER,
        timestamp TEXT
    )
    """)

    # Temporal Comparisons ("What Changed?")
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS temporal_comparisons (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        patient_id TEXT,
        timestamp_t1 TEXT,
        timestamp_t2 TEXT,
        improved_markers TEXT,
        worsened_markers TEXT,
        new_risk_factors TEXT
    )
    """)

    # QAOA Optimization logs
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS qaoa_optimization_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        problem_type TEXT,
        classical_runtime_ms REAL,
        quantum_runtime_ms REAL,
        optimality_gap REAL,
        timestamp TEXT
    )
    """)

    # Research Lab Experiments
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS research_experiments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        experiment_name TEXT,
        dataset_name TEXT,
        model_type TEXT,
        accuracy REAL,
        f1_score REAL,
        auroc REAL,
        parameters_count INTEGER,
        runtime_ms REAL,
        timestamp TEXT
    )
    """)

    # Human-in-the-Loop Reviews
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS hitl_reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        consultation_id TEXT UNIQUE,
        clinician_name TEXT,
        review_status TEXT,
        clinician_notes TEXT,
        decision_timestamp TEXT
    )
    """)
    
    conn.commit()
    conn.close()

def seed_db_from_json(json_path):
    """
    Migrates and seeds the relational SQLite database from the diseases.json database.
    """
    if not os.path.exists(json_path):
        print(f"[Database Engine] JSON path not found for seeding: {json_path}")
        return
        
    init_db()
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    with open(json_path, "r", encoding="utf-8") as f:
        diseases_data = json.load(f)
        
    for disease_name, info in diseases_data.items():
        try:
            cursor.execute("""
            INSERT OR IGNORE INTO diseases (name, category, severity, description, recommended_specialist, emergency, recovery_time)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (
                info.get("name", disease_name),
                info.get("category", ""),
                info.get("severity", "Mild"),
                info.get("description", ""),
                info.get("recommended_specialist", ""),
                1 if info.get("emergency", False) else 0,
                info.get("recovery_time", "")
            ))
            
            cursor.execute("SELECT id FROM diseases WHERE name = ?", (disease_name,))
            disease_id = cursor.fetchone()[0]
            
            symptoms = info.get("symptoms", [])
            for sym in symptoms:
                sym_clean = sym.strip().lower()
                cursor.execute("INSERT OR IGNORE INTO symptoms (name) VALUES (?)", (sym_clean,))
                cursor.execute("SELECT id FROM symptoms WHERE name = ?", (sym_clean,))
                sym_id = cursor.fetchone()[0]
                
                cursor.execute("""
                INSERT OR IGNORE INTO disease_symptoms (disease_id, symptom_id, association_strength)
                VALUES (?, ?, ?)
                """, (disease_id, sym_id, 1.0))
                
            home_remedies = ";".join(info.get("home_remedies", []))
            medications = ";".join(info.get("medications", []))
            medical_treatment = ";".join(info.get("medical_treatment", []))
            
            cursor.execute("""
            INSERT OR IGNORE INTO treatments (disease_id, home_remedies, medications, medical_treatment)
            VALUES (?, ?, ?, ?)
            """, (disease_id, home_remedies, medications, medical_treatment))
            
            risk_factors = info.get("risk_factors", [])
            for rf in risk_factors:
                cursor.execute("""
                INSERT OR IGNORE INTO risk_factors (disease_id, factor)
                VALUES (?, ?)
                """, (disease_id, rf))
                
        except Exception as e:
            print(f"[Database Engine] Error seeding disease '{disease_name}': {e}")
            
    conn.commit()
    conn.close()
    print("[Database Engine] Relational database seeding complete!")

def get_disease_info(disease_name):
    """
    Retrieves full relational details for a disease from the SQLite database.
    """
    if not os.path.exists(DB_PATH):
        return None
        
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM diseases WHERE name = ?", (disease_name,))
    row = cursor.fetchone()
    if not row:
        conn.close()
        return None
        
    disease_info = dict(row)
    disease_id = disease_info["id"]
    
    cursor.execute("""
    SELECT s.name FROM symptoms s
    JOIN disease_symptoms ds ON ds.symptom_id = s.id
    WHERE ds.disease_id = ?
    """, (disease_id,))
    disease_info["symptoms"] = [r["name"] for r in cursor.fetchall()]
    
    cursor.execute("SELECT * FROM treatments WHERE disease_id = ?", (disease_id,))
    t_row = cursor.fetchone()
    if t_row:
        disease_info["home_remedies"] = t_row["home_remedies"].split(";") if t_row["home_remedies"] else []
        disease_info["medications"] = t_row["medications"].split(";") if t_row["medications"] else []
        disease_info["medical_treatment"] = t_row["medical_treatment"].split(";") if t_row["medical_treatment"] else []
    else:
        disease_info["home_remedies"] = []
        disease_info["medications"] = []
        disease_info["medical_treatment"] = []
        
    cursor.execute("SELECT factor FROM risk_factors WHERE disease_id = ?", (disease_id,))
    disease_info["risk_factors"] = [r["factor"] for r in cursor.fetchall()]
    
    disease_info["emergency"] = True if disease_info["emergency"] == 1 else False
    conn.close()
    return disease_info
