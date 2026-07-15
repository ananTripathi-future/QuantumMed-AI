"""
Classical (Linear) Search Algorithm for Medical Symptom Matching.
This serves as the baseline comparison against the Quantum (Grover's) search.
"""

import time
import json
import os

# Load the same disease database
DB_PATH = os.path.join(os.path.dirname(__file__), "diseases.json")
try:
    with open(DB_PATH, "r", encoding="utf-8") as f:
        DISEASE_DB = json.load(f)
except Exception as e:
    print(f"[Error] Medical Database JSON not found! Fallback to empty DB. {e}")
    DISEASE_DB = {}


# Precompute symptom frequencies across the database for inverse frequency weighting
SYMPTOM_FREQUENCIES = {}
for disease, details in DISEASE_DB.items():
    for symptom in details.get("symptoms", []):
        symptom_clean = symptom.strip().lower()
        SYMPTOM_FREQUENCIES[symptom_clean] = SYMPTOM_FREQUENCIES.get(symptom_clean, 0) + 1

def get_symptom_weight(symptom):
    """
    Returns symptom weight (inverse frequency).
    Rarer symptoms have higher weight (max 1.0), common symptoms have lower weight.
    """
    freq = SYMPTOM_FREQUENCIES.get(symptom.strip().lower(), 1)
    return round(1.0 / freq, 4)

def classical_linear_search(user_symptoms, gender="Any", age_group="Adult", is_pregnant=False, severities=None):
    """
    Standard classical linear search algorithm with demographic filtering and symptom severity.
    Iterates through every disease entry one by one and computes
    symptom weighting and probability ranking.
    No quantum speedup is applied.
    """
    if severities is None:
        severities = {}
        
    matches = []
    user_symptoms_clean = [s.strip().lower() for s in user_symptoms if s.strip()]
    
    if not user_symptoms_clean:
        return {
            "matches": [],
            "comparisons_made": 1,
            "database_size": len(DISEASE_DB),
            "algorithm": "Classical Linear Search",
            "complexity": "O(N × M)",
        }

    # 1. Symptom Weighting with severity multipliers
    symptom_weights = {}
    for s in user_symptoms_clean:
        sev = severities.get(s, "Mild")
        mult = 1.0
        if sev.lower() == "severe":
            mult = 2.5
        elif sev.lower() == "moderate":
            mult = 1.5
        symptom_weights[s] = round(get_symptom_weight(s) * mult, 4)
        
    total_query_weight = sum(symptom_weights.values())

    comparisons_made = 0  # Track total comparisons for complexity analysis

    for disease, details in DISEASE_DB.items():
        db_symptoms = [s.strip().lower() for s in details.get("symptoms", [])]
        db_symptoms_set = set(db_symptoms)

        # Count each symptom check as a comparison
        for symptom in user_symptoms_clean:
            comparisons_made += 1

        # Demographic Filtering
        disease_category = details.get("category", "").lower()
        
        # Gender checks
        if gender.lower() == "male":
            if disease_category == "gynecology" or disease in ["Polycystic Ovary Syndrome (PCOS)", "Endometriosis"]:
                continue
        
        # Pregnancy check (only applicable for female / any gender)
        pregnancy_multiplier = 1.0
        if is_pregnant:
            if disease == "Gestational Diabetes":
                pregnancy_multiplier = 1.6
            elif disease == "Yeast Infection (Candidiasis)":
                pregnancy_multiplier = 1.3
        
        # Age group checks
        age_multiplier = 1.0
        if age_group.lower() == "child":
            # Filter out strictly elderly diseases
            if disease in ["Alzheimer's Disease", "Parkinson's Disease", "Osteoarthritis", "Osteoporosis"]:
                continue
            # Prioritize pediatric conditions
            if disease_category == "pediatrics" or disease in ["Chickenpox", "Kawasaki Disease", "Tonsillitis", "Otitis Media (Ear Infection)"]:
                age_multiplier = 1.5
        elif age_group.lower() == "senior":
            # Filter out child-only diseases
            if disease in ["Kawasaki Disease", "Chickenpox", "Juvenile Rheumatoid Arthritis"]:
                continue
            # Prioritize degenerative/elderly conditions
            if disease in ["Alzheimer's Disease", "Parkinson's Disease", "Osteoarthritis", "Osteoporosis"]:
                age_multiplier = 1.5

        # Calculate matched weight
        matched_weight = 0.0
        for symptom in user_symptoms_clean:
            if symptom in db_symptoms_set:
                matched_weight += symptom_weights[symptom]

        # Check disease name match
        disease_name_clean = "".join(
            char if char.isalnum() else " " for char in disease.lower()
        ).strip()
        name_match = False
        for term in user_symptoms_clean:
            comparisons_made += 1
            term_clean = "".join(
                char if char.isalnum() else " " for char in term
            ).strip()
            if term_clean in disease_name_clean or disease_name_clean in term_clean:
                name_match = True
                break

        # Compute confidence score
        if total_query_weight > 0:
            weight_ratio = (matched_weight / total_query_weight) * age_multiplier * pregnancy_multiplier
        else:
            weight_ratio = 0.0

        if name_match:
            confidence = 0.95
        else:
            confidence = weight_ratio

        confidence_pct = min(round(confidence * 100, 2), 100.0)

        if confidence_pct > 0:
            matches.append({
                "disease": disease,
                "confidence": confidence_pct,
                # Backward compatibility keys
                "remedies": details.get("home_remedies", []),
                "medical": details.get("medical_treatment", []) + details.get("medications", []),
                "specialist": details.get("recommended_specialist", "General Physician"),
                # Rich schema keys
                "name": details.get("name", disease),
                "category": details.get("category", "General"),
                "severity": details.get("severity", "Moderate"),
                "symptoms": details.get("symptoms", []),
                "risk_factors": details.get("risk_factors", []),
                "home_remedies": details.get("home_remedies", []),
                "medical_treatment": details.get("medical_treatment", []),
                "medications": details.get("medications", []),
                "prevention": details.get("prevention", []),
                "recommended_specialist": details.get("recommended_specialist", "General Physician"),
                "emergency": details.get("emergency", False),
                "description": details.get("description", ""),
                "recovery_time": details.get("recovery_time", "Varies")
            })

    # Sort diseases by confidence
    matches.sort(key=lambda x: x["confidence"], reverse=True)

    return {
        "matches": matches,
        "comparisons_made": comparisons_made,
        "database_size": len(DISEASE_DB),
        "algorithm": "Classical Linear Search",
        "complexity": "O(N × M)",
    }

