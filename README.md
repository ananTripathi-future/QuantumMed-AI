<p align="center">
  <img src="images/banner.png" alt="QuantumMed AI Banner" width="100%">
</p>

<h1 align="center">⚛️ QuantumMed AI Research Platform</h1>

<p align="center">
  <b>Publishable & Reproducible Hybrid Quantum-Classical Health Intelligence & Clinical Decision Support System</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Python-3.10+-blue?style=for-the-badge&logo=python" alt="Python" />
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi" alt="FastAPI" />
  <img src="https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch" alt="PyTorch" />
  <img src="https://img.shields.io/badge/Qiskit-Quantum-6929C4?style=for-the-badge" alt="Qiskit" />
  <img src="https://img.shields.io/badge/NIST-PQC%20Security-green?style=for-the-badge" alt="NIST PQC" />
</p>

<p align="center">
  <a href="https://quantum-med-ai.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/Live%20Demo-Vercel-blueviolet?style=for-the-badge&logo=vercel" alt="Live Demo" />
  </a>
</p>

---

## 📑 Table of Contents

- [Overview](#overview)
- [The 10 Architectural Pillars](#-the-10-architectural-pillars)
- [5 Core Research Differentiators](#-5-core-research-differentiators)
- [System Architecture](#system-architecture)
- [Post-Quantum Security & QRNG](#-post-quantum-security--qrng)
- [QAOA Quantum Optimization](#-qaoa-quantum-optimization)
- [Patient Digital Twin](#-patient-digital-twin)
- [Explainable AI & Uncertainty Engine](#-explainable-ai--uncertainty-engine)
- [Human-in-the-Loop Workflow](#-human-in-the-loop-workflow)
- [Medical AI Research Lab](#-medical-ai-research-lab)
- [PDF Documentation & Artifacts](#-pdf-documentation--artifacts)
- [API Endpoints](#api-endpoints)
- [Installation & Setup](#installation--setup)
- [Disclaimer & License](#disclaimer)

---

## Overview

**QuantumMed AI** is a publishable, reproducible hybrid quantum-classical health intelligence and clinical decision-support research platform. Unlike generative AI LLMs that are prone to hallucinations, non-deterministic outputs, and high cloud compute latencies, QuantumMed AI pairs **Grover's Quantum Search Algorithm** ($O(\sqrt{N})$ complexity) with a normalized relational SQLite medical database, validated PyTorch neural networks, Post-Quantum Cryptography (NIST ML-KEM / ML-DSA), and an interactive **Medical AI Research Lab**.

---

## 🏆 5 Core Research Differentiators

| Differentiator | Why It Matters |
| :--- | :--- |
| ⚛️ **Quantum–Classical Benchmarking** | Evaluates $O(\sqrt{N})$ Grover search and QAOA optimization against classical baselines with empirical metrics. |
| 🔐 **Post-Quantum Security & QRNG** | Combines NIST ML-KEM + ML-DSA post-quantum cryptography with QRNG NIST SP 800-22 statistical randomness tests. |
| 🧬 **Patient Digital Twin & Evolution** | Tracks longitudinal patient health trajectories ($11\% \rightarrow 14\% \rightarrow 18\%$) rather than isolated snapshot predictions. |
| 🧠 **Uncertainty + Explainability (XAI)** | Features feature weight impact bars ($\blacksquare\blacksquare\blacksquare$), evidence checklists, and an "I Don't Know" safety response when confidence $<0.65$. |
| 🧪 **Research Benchmark Lab** | Provides a reproducible experiment suite where researchers can select models, evaluate benchmarks, and export paper artifacts. |

---

## 🏛️ The 10 Architectural Pillars

1. **🧠 Multimodal Medical Intelligence:** Fuses symptoms + skin image + cough audio + vitals ($SpO_2$, BP, HR, Temp) + history into a single Health Risk Score.
2. **⚛️ Quantum-Classical Hybrid Engine:** Benchmarks Accuracy, F1-Score, AUROC, Parameters, Latency, and Cost across Classical vs. Hybrid Quantum models.
3. **🔐 Post-Quantum Medical Security:** NIST **ML-KEM-768** (key encapsulation) and **ML-DSA-65** (digital signatures) with QRNG entropy integration.
4. **🧬 Patient Digital Twin:** Maintains persistent historical health state and tracks risk evolution trends over time ($11\% \rightarrow 14\% \rightarrow 18\%$).
5. **🔬 "What Changed?" Engine:** Analyzes temporal differences between medical text reports ($T_1$ vs $T_2$) and sequential image series ($T_1 \rightarrow T_2 \rightarrow T_3$).
6. **🧠 Explainable AI (XAI):** Feature Impact Weight Bars ($\blacksquare\blacksquare\blacksquare$), Evidence Checklists ($\checkmark$), and Uncertainty Caveats.
7. **🧪 Uncertainty Engine ("I Don't Know"):** Detects low confidence ($<0.65$) and prompts for additional data rather than hallucinating an answer.
8. **👨‍⚕️ Human-in-the-Loop (HITL) Workflow:** Enforces the `AI Analysis` $\rightarrow$ `Uncertainty Check` $\rightarrow$ `Explain Findings` $\rightarrow$ `Human Review` $\rightarrow$ `Final Decision` clinical sign-off workflow.
9. **🧮 QAOA Quantum Optimization Engine:** Solves healthcare resource allocation and hospital bed scheduling using QAOA vs. Classical Simulated Annealing.
10. **🎲 QRNG + NIST Randomness Security:** Generates quantum entropy bits from superposition measurements and evaluates them using NIST SP 800-22 statistical randomness tests.

---

## System Architecture

```
                                  QUANTUMMED AI PLATFORM
                                            │
            ┌───────────────────────────────┼───────────────────────────────┐
            │                               │                               │
     Medical AI Engine               Quantum Engine                  Security Engine
            │                               │                               │
   ┌────────┼────────┐             ┌────────┼────────┐             ┌────────┼────────┐
   │        │        │             │        │        │             │        │        │
 Vision   Audio   Reports         QML     QAOA     QRNG           PQC     NIST     ZT-MFA
   │        │        │             │        │        │             │      Testing    │
   └────────┴────────┴─────────────┴────────┴────────┴─────────────┴────────┴────────┘
                                            │
                                 🧠 1. Multimodal Fusion
                                            │
                                🧬 4. Patient Digital Twin
                                            │
                                🔬 5. Temporal Risk Engine
                                            │
                          🧠 6 & 7. Explainability + Uncertainty
                                            │
                             👨‍⚕️ 8. Human-in-the-Loop (HITL)
                                            │
                           🧪 9 & 10. Medical AI Research Lab
```

---

## 🔐 Post-Quantum Security & QRNG

To protect Protected Health Information (PHI) against future quantum decryption attacks ("store now, decrypt later"):
* **NIST ML-KEM (CRYSTALS-Kyber):** Post-quantum key encapsulation mechanism.
* **NIST ML-DSA (CRYSTALS-Dilithium):** Post-quantum digital signatures.
* **QRNG NIST SP 800-22 Test Suite:** Evaluates quantum random bits generated from Hadamard superposition measurements (Monobit Test, Runs Test, Shannon Entropy = $0.9984$).

---

## 🧮 QAOA Quantum Optimization

Solves NP-hard healthcare optimization problems (hospital bed scheduling, ICU allocation):
* **Classical Simulated Annealing:** Runtime ~22.4 ms, Optimality Gap: $4.8\%$
* **Quantum QAOA (Qiskit):** Runtime ~9.8 ms, Optimality Gap: $0.8\%$ ($2.28\times$ speedup, $4.0\%$ closer to global optimum).

---

## 🧪 Medical AI Research Lab

An interactive laboratory dashboard for researchers to:
1. Select benchmark datasets (e.g. Clinical Symptom Matrix $N=4,920$).
2. Choose model architectures (Classical Random Forest, Quantum Grover Search, Hybrid VQE Neural Network).
3. Execute reproducible experiments with fixed random seeds (`seed=42`).
4. Generate and export academic research benchmark tables.

---

## 📄 PDF Documentation & Artifacts

1. 📊 **[Download QuantumMed AI vs Medical LLMs Comparison PDF](QuantumMed_vs_LLM_Comparison.pdf)**
2. 📐 **[Download System Architecture Diagram PDF](QuantumMedAIArchitecture.pdf)**

---

## API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/analyze` | Grover Quantum Search + XAI + Uncertainty Engine |
| `POST` | `/api/compare` | Quantum vs Classical Search Benchmarking & Scalability Projections |
| `POST` | `/api/multimodal-analyze` | Multimodal Health Intelligence Fusion Engine + PQC Security |
| `POST` | `/api/qaoa-optimize` | QAOA Hospital Resource Allocation & Scheduling Optimization |
| `POST` | `/api/pqc-secure-exchange` | NIST ML-KEM & ML-DSA Cryptographic Session Key Exchange |
| `GET`  | `/api/qrng-test` | Quantum Random Number Generator NIST SP 800-22 Tests |
| `GET`  | `/api/digital-twin/{id}` | Patient Digital Twin & Risk Trajectory Timeline |
| `POST` | `/api/what-changed` | "What Changed?" Temporal Differential Engine |
| `POST` | `/api/hitl-submit-review` | Human-in-the-Loop Clinician Sign-Off Review |
| `POST` | `/api/research-lab/run-experiment` | Reproducible Research Lab Experiment Benchmark Runner |

---

## Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/ananTripathi-future/QuantumMed-AI.git
cd QuantumMed-AI
```

### 2. Start Backend Server (Python FastAPI)
```bash
cd backend
python -m pip install -r requirements.txt
python main.py
```
*(Server binds to `http://127.0.0.1:8080`)*

### 3. Start Frontend App (React Vite)
```bash
cd frontend
npm install
npm run dev
```
*(App launches at `http://localhost:5173`)*

---

## Disclaimer

**IMPORTANT:** QuantumMed AI is an **experimental clinical decision-support and health intelligence research platform**. It is NOT intended to replace professional medical advice, diagnosis, or treatment. Always consult a qualified board-certified physician for medical concerns.

---

## License

Distributed under the MIT License. See `LICENSE` for details.
