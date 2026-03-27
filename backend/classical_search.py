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


def classical_linear_search(user_symptoms):
    """
    Standard classical linear search algorithm.
    Iterates through every disease entry one by one and computes
    symptom overlap. This is O(N*M) where N = diseases, M = symptoms.
    No quantum speedup is applied.
    """
    matches = []
    comparisons_made = 0  # Track total comparisons for complexity analysis

    for disease, details in DISEASE_DB.items():
        db_symptoms = set(details["symptoms"])
        user_symptoms_set = set(user_symptoms)

        # Count each symptom check as a comparison
        for symptom in user_symptoms_set:
            comparisons_made += 1

        # Calculate symptom overlap (basic intersection)
        overlap = db_symptoms.intersection(user_symptoms_set)

        # Also check disease name match (each check = 1 comparison)
        disease_name_clean = "".join(
            char if char.isalnum() else " " for char in disease.lower()
        ).strip()
        name_match = False
        for term in user_symptoms_set:
            comparisons_made += 1
            term_clean = "".join(
                char if char.isalnum() else " " for char in term
            ).strip()
            if term_clean in disease_name_clean or disease_name_clean in term_clean:
                name_match = True
                break

        if overlap or name_match:
            if overlap:
                confidence = len(overlap) / len(user_symptoms_set)
            else:
                confidence = 0.95

            matches.append(
                {
                    "disease": disease,
                    "confidence": min(round(confidence * 100, 2), 100),
                    "remedies": details["remedies"],
                    "medical": details["medical"],
                    "specialist": details.get("specialist", "General Physician")
                }
            )

    # Sort diseases by confidence
    matches.sort(key=lambda x: x["confidence"], reverse=True)

    return {
        "matches": matches,
        "comparisons_made": comparisons_made,
        "database_size": len(DISEASE_DB),
        "algorithm": "Classical Linear Search",
        "complexity": "O(N × M)",
    }
