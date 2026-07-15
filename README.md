<!-- Badges Row 1 — Core Tech -->
<p align="center">
  <img src="https://img.shields.io/badge/Quantum-Qiskit-6366f1?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/AI-PyTorch-ee4c2c?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Backend-FastAPI-009688?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Frontend-React.js-61dafb?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Python-3.8+-3776ab?style=for-the-badge"/>
</p>

<!-- Badges Row 2 — GitHub Stats -->
<p align="center">
  <img src="https://img.shields.io/github/stars/ananTripathi-future/QuantumMed-AI?style=for-the-badge"/>
  <img src="https://img.shields.io/github/forks/ananTripathi-future/QuantumMed-AI?style=for-the-badge"/>
  <img src="https://img.shields.io/github/issues/ananTripathi-future/QuantumMed-AI?style=for-the-badge"/>
  <img src="https://img.shields.io/github/license/ananTripathi-future/QuantumMed-AI?style=for-the-badge"/>
</p>

---

# ⚛️ QuantumMed AI

> *"Traditional systems analyze data sequentially. QuantumMed AI simulates parallel intelligence — where quantum speed meets deep learning accuracy."*

A hybrid **Quantum + AI** healthcare platform that combines Grover's Algorithm-powered symptom search, CNN-based skin vision, and audio DNN diagnostics into a unified medical intelligence pipeline.

---

## 🧠 Core Architecture — The Three Pillars

```
                ┌──────────────────────────────────────────────┐
                │              QUANTUMMED AI                    │
                │                                              │
  Symptoms ───►│  Pillar 1: ⚛️ Quantum Symptom Engine         │
                 │    ├─ Grover's Search Algorithm (Qiskit)     │
                 │    ├─ Symptom Weighting & Probability Ranking│
                 │    └─ Top 5 Disease Matches                  │
                 │                                              │
  Skin Image ──►│  Pillar 2: 🧠 AI Vision Engine               │
                 │    ├─ PyTorch CNN feature classification     │
                 │    ├─ 8-Stage Preprocessing Validation       │
                 │    └─ Dual-Pass Skin & Lesion Detection      │
                 │                                              │
  Audio File ──►│  Pillar 3: 🔊 Audio Intelligence Engine      │
                 │    ├─ Audio → Mel Spectrogram conversion      │
                 │    ├─ Deep Neural Network classification      │
                 │    └─ Dry cough · Congestion · Infection      │
                 │                                              │
                 │  ┌────────────────────────────────────────┐  │
                 │  │  Unified Output Pipeline                │  │
                 │  │  Explainable AI (XAI) Checklist         │  │
                 │  │  Checklist-based Medical Advice         │  │
                 │  │  Printable PDF Report Generation        │  │
                 │  └────────────────────────────────────────┘  │
                 └──────────────────────────────────────────────┘
```

---

## ⚙️ How It Works

### 🔹 Step 1 — Input Layer

Users provide any combination of:

| Input Type | Format | Engine |
|-----------|--------|--------|
| Symptoms & Severities | Free text + Severity Selectors | Quantum Symptom Engine |
| Skin condition image | `.jpg`, `.png` | AI Vision Engine |
| Respiratory audio | `.wav`, `.mp3` | Audio Intelligence Engine |

---

### 🔹 Step 2 — Processing Layer

**⚛️ Quantum Symptom Engine**
```
[Symptom Text Input]
       │
       ▼
[Dynamic Severity Weighting] (Mild: 1x, Moderate: 1.5x, Severe: 2.5x)
       │
       ▼
Qiskit Circuit + Grover's Search Algorithm
       │
       ▼
[Ranked Disease Probability Matches (Top 5 Results)]
```

**🧠 AI Vision Engine (8-Stage Preprocessing Pipeline)**
```
[Skin Image Upload]
       │
       ▼
File Format Validation (JPEG, PNG, etc.)
       │
       ▼
Blank Image Check (Standard Deviation & Min/Max Luminance checks)
       │
       ▼
Image Quality check (Blur, low resolution, contrast checks)
       │
       ▼
Dual-Pass Skin Detection (RGB Segmentation + PyTorch Binary CNN check)
       │
       ▼
Lesion Presence check (Skin variance analysis for rashes/moles)
       │
       ▼
Deep Learning Disease Classifier (Acne, Eczema, Psoriasis, Rosacea)
       │
       ▼
Confidence Threshold Constraint (Rejects under 60.0% confidence)
       │
       ▼
[Display Diagnostics & Top Predictions Chart]
```

**🔊 Audio Intelligence Engine**
```
[Cough / Respiratory Audio]
       │
       ▼
Convert → Mel Spectrogram
       │
       ▼
Deep Neural Network Classification
       │
       ▼
[Dry cough · Chest congestion · Infection indicator]
```

---

### 🔹 Step-3 — Output Layer

Each analysis produces a unified diagnostic report:

| Output | Description |
|--------|-------------|
| 📊 Disease probabilities | Ranked list of matched conditions |
| 🧬 Explainable AI (XAI) | Matched vs. Missing symptoms checklist |
| 💊 Suggested medications | Checklist of common treatment options |
| 🏠 Home remedies | Supportive care suggestions |
| 🩺 Specialist Referral | Recommended Doctor |
| ⚠️ Medical recommendations | Flashing real-time emergency warnings |

---

## ✨ Key Features & Implementation Phases

The platform implements all **13 phases** of the QuantumMed AI spec:

### 🔹 Phase 1: Comprehensive Disease Database
- Main database expands to **90+ diseases** covering A–Z with a 13-field custom schema (Description, Severity, Risk Factors, Prevention, Treatments, and Recovery Time).

### 🔹 Phase 2: Intelligent Symptom Matching
- Inverse symptom frequency weighting assigns high significance to rare symptoms. Output displays **Top 5 Disease Matches** with confidence ratings.

### 🔹 Phase 3: Symptom Severity & Weighting
- Interactive selectors allow users to adjust symptom weights dynamically in the UI: **Mild (1x)**, **Moderate (1.5x)**, or **Severe (2.5x)**.

### 🔹 Phase 4: Disease Categories
- Skew-free classification over 13 designated medical disciplines.

### 🔹 Phase 5: Real-time Emergency Warning
- Prominent flashing emergency notice triggered immediately in the UI if critical symptoms like `chest pain`, `difficulty breathing`, or `loss of consciousness` are inputted.

### 🔹 Phase 6: Quantum Search & Circuit Visualizer
- Beautiful SVG-based visualizer that animates Grover's algorithm wire states (`|q_0>`, `|q_1>`, `|q_2>`, `c`) in real-time as the query runs.

### 🔹 Phase 7 & 8: Confidence Score & Explainable AI (XAI)
- Shows **Matched Symptoms (✔)** vs. **Missing Symptoms (✖)** checklists and a collapsible details panel explaining the primary present and secondary typical symptoms.

### 🔹 Phase 9: Medical Recommendations
- Formatted recommendations including checklists for Home Care, Medications, recommended Specialist, and Hospital Referral thresholds.

### 🔹 Phase 10: Search Filters
- Demographic dropdown selectors filtering results by Age Group (Child, Adult, Senior), Gender, and Pregnancy status to prevent false matches.

### 🔹 Phase 11: Disease-to-Disease Comparison
- A comparative grid tab where users can select any two diseases from the 90-disease database and view general metrics and symptom overlaps.

### 🔹 Phase 12: Medical Report PDF Generation
- Exporter generating a formatted vector-crisp PDF medical report containing diagnostics, treatments, timestamps, and Report IDs.

### 🔹 Phase 13: Analytics Dashboard
- Glowing statistical benchmark cards detailing classical vs. quantum scaling, execution times, and Grover speedup factors ($13.4\times$).

---

## 📁 Project Structure

```
quantummed-ai/
├── backend/
│   ├── app.py                      # FastAPI entry point & routers
│   ├── quantum_search.py           # Grover's algorithm & symptom weighting
│   ├── classical_search.py         # Classical benchmark search
│   ├── ai_analyzer.py              # PyTorch skin classifier & audio diagnostics
│   ├── diseases.json               # 90+ Disease custom database
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx                 # React layout, dashboard, & visualizer
│   │   └── index.css               # CSS stylesheet & dark themes
│   └── package.json
│
├── Start-QuantumMed.bat            # Windows double-click launcher
└── README.md
```

---

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16+)
- Python 3.8+

### Quick Start (Windows)
Double-click `Start-QuantumMed.bat` in the root directory. This automatically launches both the FastAPI backend and React frontend in separate terminal windows.

### Manual Setup

**Backend**
```bash
cd backend
pip install -r requirements.txt
python app.py
# Runs at → http://localhost:8000
```

**Frontend**
```bash
cd frontend
npm install
npm run dev
# Runs at → http://localhost:5173
```

---

## ⚠️ Disclaimer

This project is built **for educational and research simulation purposes only.**
It is **not** intended for real-world medical use, clinical decision-making, or patient care. Always consult a qualified medical professional for health concerns.

---

## ⭐ Support

If this project helped you, please consider:
- ⭐ **Starring** the repository on GitHub.
- 🍴 **Forking** the project and extending the quantum engines.
- 🧠 **Contributing** updates via Pull Requests.
