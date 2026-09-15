def evaluate_prediction_uncertainty(confidence_score: float, evidence_count: int, missing_vitals: bool = False):
    """
    Uncertainty Engine & Safety Fallback:
    If confidence < 0.65 or evidence is insufficient, returns an explicit "I Don't Know" safety prompt.
    """
    uncertainty_score = round(1.0 - (confidence_score / 100.0 if confidence_score > 1.0 else confidence_score), 2)
    
    if confidence_score < 65.0 or evidence_count < 2 or (confidence_score < 75.0 and missing_vitals):
        is_uncertain = True
        safety_status = "UNCERTAINTY_MODE_TRIGGERED"
        user_message = (
            "The available clinical evidence is insufficient to provide a reliable risk assessment. "
            "To prevent hallucinatory predictions, our safety protocol requires additional data. "
            "Uploading a clearer skin photograph, providing vitals (BP/SpO2), or entering more symptoms will increase diagnostic confidence."
        )
        action_requested = [
            "Upload high-resolution clinical photograph",
            "Provide objective vitals measurements (SpO2 %, Blood Pressure)",
            "Attach recent laboratory/pathology PDF report"
        ]
    else:
        is_uncertain = False
        safety_status = "CONFIDENCE_HIGH_VERIFIED"
        user_message = "Sufficient multimodal evidence detected. Prediction confidence satisfies clinical safety thresholds."
        action_requested = []

    return {
        "confidence_score": round(confidence_score if confidence_score <= 1.0 else confidence_score / 100.0, 2),
        "uncertainty_score": uncertainty_score,
        "is_uncertain": is_uncertain,
        "safety_status": safety_status,
        "user_message": user_message,
        "action_requested": action_requested
    }
