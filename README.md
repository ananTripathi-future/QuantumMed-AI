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
  <img src="https://img.shields.io/github/stars/ananTripathi-future/quantummed-ai?style=for-the-badge"/>
  <img src="https://img.shields.io/github/forks/ananTripathi-future/quantummed-ai?style=for-the-badge"/>
  <img src="https://img.shields.io/github/issues/ananTripathi-future/quantummed-ai?style=for-the-badge"/>
  <img src="https://img.shields.io/github/license/ananTripathi-future/quantummed-ai?style=for-the-badge"/>
</p>

<!-- Badges Row 3 — Activity -->
<p align="center">
  <img src="https://img.shields.io/github/last-commit/ananTripathi-future/quantummed-ai?style=for-the-badge"/>
  <img src="https://img.shields.io/github/repo-size/ananTripathi-future/quantummed-ai?style=for-the-badge"/>
  <img src="https://img.shields.io/github/languages/top/ananTripathi-future/quantummed-ai?style=for-the-badge"/>
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
                │    ├─ Grover's Algorithm (Qiskit + Aer)      │
                │    ├─ Quantum-parallelized dataset search     │
                │    └─ Probable disease match + confidence     │
                │                                              │
  Skin Image ──►│  Pillar 2: 🧠 AI Vision Engine               │
                │    ├─ PyTorch CNN feature extraction          │
                │    ├─ Detects: Eczema · Fungal · Allergies   │
                │    └─ Condition classification + severity     │
                │                                              │
  Audio File ──►│  Pillar 3: 🔊 Audio Intelligence Engine      │
                │    ├─ Audio → Mel Spectrogram conversion      │
                │    ├─ Deep Neural Network classification      │
                │    └─ Dry cough · Congestion · Infection      │
                │                                              │
                │  ┌────────────────────────────────────────┐  │
                │  │  Unified Output Pipeline                │  │
                │  │  Disease Probabilities                  │  │
                │  │  Suggested Medications + Remedies       │  │
                │  │  Medical Recommendations                │  │
                │  └────────────────────────────────────────┘  │
                └──────────────────────────────────────────────┘
```

---

## ⚙️ How It Works

### 🔹 Step 1 — Input Layer

Users provide any combination of:

| Input Type | Format | Engine |
|-----------|--------|--------|
| Symptoms or disease name | Free text | Quantum Symptom Engine |
| Skin condition image | `.jpg`, `.png` | AI Vision Engine |
| Respiratory audio | `.wav`, `.mp3` | Audio Intelligence Engine |

---

### 🔹 Step 2 — Processing Layer

**⚛️ Quantum Symptom Engine**
[Symptom Text Input]
│
▼
Qiskit Circuit + Grover's Algorithm
│
▼
Quantum-parallelized medical dataset search
│
▼
[Ranked disease probability matches]


**🧠 AI Vision Engine**
[Skin Image Upload]
│
▼
PyTorch CNN — Feature Tensor Extraction
│
▼
Classification: Eczema · Fungal · Allergy
│
▼
[Condition label + confidence score]


**🔊 Audio Intelligence Engine**
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


---

### 🔹 Step 3 — Output Layer

Each analysis produces a unified diagnostic report:

| Output | Description |
|--------|-------------|
| 📊 Disease probabilities | Ranked list of matched conditions |
| 💊 Suggested medications | Common treatment options |
| 🏠 Home remedies | Supportive care suggestions |
| ⚠️ Medical recommendations | When to seek professional care |

---

## ✨ Key Features

| Feature | Technology | Details |
|---------|-----------|---------|
| ⚛️ Quantum symptom matching | Qiskit + Grover's Algorithm | Parallelized search over medical datasets |
| 🧠 AI skin vision | PyTorch CNN | Eczema, fungal infections, allergies |
| 🔊 Audio diagnostics | Mel Spectrogram + DNN | Respiratory pattern classification |
| 🌐 Real-time backend | FastAPI + Uvicorn | Async REST API, instant responses |
| ⚡ Live frontend | React.js + Axios | Interactive UI with Lucide Icons |

---

## 🛠️ Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React.js, Axios, Lucide Icons |
| Backend | Python 3.8+, FastAPI, Uvicorn |
| Quantum | Qiskit, Qiskit Aer |
| AI / ML | PyTorch, CNN Models, Audio DNNs |
| Audio Processing | Librosa, Mel Spectrogram |

---

## 📁 Project Structure

```
quantummed-ai/
├── backend/
│   ├── app.py                      # FastAPI entry point
│   ├── quantum_engine.py           # Grover's algorithm symptom search
│   ├── vision_engine.py            # PyTorch CNN skin classifier
│   ├── audio_engine.py             # Mel spectrogram + DNN classifier
│   ├── medical_dataset/            # Symptom-disease mapping data
│   ├── models/                     # Pretrained CNN + DNN weights
│   └── requirements.txt
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx                 # Main React application
│   │   ├── components/
│   │   │   ├── SymptomInput.jsx    # Quantum symptom UI
│   │   │   ├── SkinUpload.jsx      # Vision engine UI
│   │   │   └── AudioUpload.jsx     # Audio engine UI
│   │   └── api/
│   │       └── quantummed.js       # Axios API client
│   └── package.json
│
├── Start-QuantumMed.bat            # One-shot Windows launcher
└── README.md


---

## 📦 Installation & Setup

### Prerequisites

- Node.js (v16+)
- Python 3.8+

### Backend

```bash
cd backend
pip install -r requirements.txt
python app.py
# Runs at → http://localhost:8000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
# Runs at → http://localhost:5173
```

### ⚡ Quick Start (Windows)

```bat
Start-QuantumMed.bat
```

> Launches both backend and frontend automatically in separate terminals.

---

## 🧪 How to Use

### 🩺 Quantum Symptom Match

1. Enter symptoms (e.g., `fever, fatigue, headache`) or a disease name
2. The quantum engine runs Grover's search over the medical dataset
3. Receive ranked disease predictions with suggested treatments

### 🖼️ AI Skin Vision

1. Upload a skin image (`.jpg` or `.png`)
2. CNN model extracts feature tensors and classifies the condition
3. Get detected abnormality label and confidence score

### 🔊 AI Audio Diagnostics

1. Upload a cough or respiratory audio file
2. Audio is converted to a Mel spectrogram
3. DNN classifies the respiratory pattern and returns diagnosis

---

## 📌 Project Vision

QuantumMed AI simulates a future healthcare paradigm where:

| Today | Future (Simulated) |
|-------|-------------------|
| Sequential symptom lookup | Quantum-parallelized search |
| Manual image review | Instant CNN-based diagnosis |
| Subjective audio assessment | DNN respiratory classification |
| Reactive care | Proactive intelligent systems |

---

## ⚠️ Disclaimer

This project is built **for educational and research simulation purposes only.**
It is **not** intended for real-world medical use, clinical decision-making, or patient care. Always consult a qualified medical professional for health concerns.

---

## 🧑‍💻 Author

**Anant Tripathi**
B.Tech CSE · Quantum Computing · AI · Cybersecurity

- GitHub: [@ananTripathi-future](https://github.com/ananTripathi-future)

---

## ⭐ Support

If this project helped you:

- ⭐ **Star** the repository
- 🍴 **Fork** it and extend the engines
- 🧠 **Contribute** via pull requests
- 🐛 **Report issues** in the Issues tab

---

## 📝 License

This project is provided for educational and research purposes.
