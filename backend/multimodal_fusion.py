import time

def process_vitals_risk(vitals: dict):
    """
    Evaluates vitals risk signals.
    vitals = { "bp_sys": 135, "bp_dia": 85, "hr": 92, "spo2": 95, "temp_f": 101.2 }
    """
    risk_points = 0
    signals = []
    
    spo2 = vitals.get("spo2", 98)
    temp = vitals.get("temp_f", 98.6)
    bp_sys = vitals.get("bp_sys", 120)
    hr = vitals.get("hr", 75)
    
    if spo2 < 92:
        risk_points += 35
        signals.append(("Low Oxygen Saturation (SpO2 < 92%)", 35))
    elif spo2 < 95:
        risk_points += 15
        signals.append(("Mild SpO2 Reduction (92-94%)", 15))
        
    if temp >= 102.5:
        risk_points += 25
        signals.append(("High Fever (Temp ≥ 102.5°F)", 25))
    elif temp >= 100.4:
        risk_points += 12
        signals.append(("Moderate Fever (Temp 100.4-102.4°F)", 12))
        
    if bp_sys >= 160:
        risk_points += 25
        signals.append(("Hypertensive Crisis Warning (BP ≥ 160)", 25))
    elif bp_sys >= 140:
        risk_points += 10
        signals.append(("Elevated Blood Pressure", 10))
        
    if hr >= 110:
        risk_points += 15
        signals.append(("Tachycardia (Heart Rate ≥ 110 bpm)", 15))
        
    return risk_points, signals

def fuse_multimodal_health_intelligence(
    symptoms: list,
    vitals: dict = None,
    skin_finding: dict = None,
    cough_finding: dict = None,
    medical_history: list = None,
    report_text: str = ""
):
    """
    Fuses multi-source medical data streams into a unified health intelligence risk analysis.
    """
    start_time = time.time()
    
    vitals = vitals or {}
    medical_history = medical_history or []
    
    total_score = 10.0 # Baseline score
    evidence_checklist = []
    feature_impacts = []
    
    # 1. Symptoms Evaluation
    if symptoms:
        evidence_checklist.append({"type": "Symptoms", "present": True, "count": len(symptoms)})
        sym_score = min(len(symptoms) * 12, 40)
        total_score += sym_score
        feature_impacts.append({"feature": f"Primary Symptoms ({', '.join(symptoms[:2])})", "impact_pct": sym_score, "weight_bar": "█" * int(sym_score / 5)})
    else:
        evidence_checklist.append({"type": "Symptoms", "present": False, "count": 0})
        
    # 2. Vitals Evaluation
    if vitals:
        evidence_checklist.append({"type": "Vitals Measurements", "present": True, "details": vitals})
        v_points, v_signals = process_vitals_risk(vitals)
        total_score += v_points
        for sig_name, sig_w in v_signals:
            feature_impacts.append({"feature": sig_name, "impact_pct": sig_w, "weight_bar": "█" * max(1, int(sig_w / 5))})
    else:
        evidence_checklist.append({"type": "Vitals Measurements", "present": False, "details": None})
        
    # 3. Skin Vision AI Evaluation
    if skin_finding:
        evidence_checklist.append({"type": "Skin Vision Tensor Analysis", "present": True, "finding": skin_finding.get("detected_condition")})
        conf = skin_finding.get("confidence", 70.0)
        skin_score = round((conf / 100.0) * 25, 1)
        total_score += skin_score
        feature_impacts.append({"feature": f"Dermatological Anomaly ({skin_finding.get('detected_condition')})", "impact_pct": skin_score, "weight_bar": "█" * max(1, int(skin_score / 5))})
    else:
        evidence_checklist.append({"type": "Skin Vision Tensor Analysis", "present": False, "finding": None})
        
    # 4. Respiratory Audio Evaluation
    if cough_finding:
        evidence_checklist.append({"type": "Respiratory Audio Spectrogram", "present": True, "finding": cough_finding.get("detected_condition")})
        cough_cond = cough_finding.get("detected_condition", "")
        audio_score = 20.0 if "Wet" in cough_cond or "Chronic" in cough_cond else 8.0
        total_score += audio_score
        feature_impacts.append({"feature": f"Acoustic Audio Signature ({cough_cond})", "impact_pct": audio_score, "weight_bar": "█" * max(1, int(audio_score / 5))})
    else:
        evidence_checklist.append({"type": "Respiratory Audio Spectrogram", "present": False, "finding": None})

    # 5. History & Text Context
    if medical_history:
        evidence_checklist.append({"type": "Medical History Context", "present": True, "items": medical_history})
        total_score += len(medical_history) * 5
        feature_impacts.append({"feature": f"Historical Antecedents ({', '.join(medical_history[:2])})", "impact_pct": len(medical_history) * 5, "weight_bar": "█" * len(medical_history)})
    else:
        evidence_checklist.append({"type": "Medical History Context", "present": False, "items": []})

    # Cap overall risk score
    final_risk_pct = min(round(total_score, 1), 98.0)
    
    # Determine Risk Category
    if final_risk_pct >= 70.0:
        risk_category = "Elevated Risk"
        alert_color = "red"
    elif final_risk_pct >= 40.0:
        risk_category = "Moderate Risk"
        alert_color = "amber"
    else:
        risk_category = "Low Risk"
        alert_color = "green"
        
    elapsed = round((time.time() - start_time) * 1000, 2)
    
    return {
        "status": "success",
        "multimodal_fusion": {
            "health_risk_score_pct": final_risk_pct,
            "risk_category": risk_category,
            "alert_color": alert_color,
            "feature_impacts": feature_impacts,
            "evidence_checklist": evidence_checklist,
            "latency_ms": elapsed
        }
    }
