# QuantumMed AI

QuantumMed AI is a hybrid Quantum-AI Medical Infrastructure platform designed to provide rapid, advanced medical diagnostic assistance. It integrates mocked quantum computing algorithms for sophisticated symptom matching and deep learning neural networks for visual and audio medical analysis.

## Features

1. **Quantum Symptom Match** 
   - Uses a quantum search simulation (Grover's algorithm via Qiskit) to cross-reference user symptoms or specific disease names against a comprehensive medical database.
   - Outputs highly accurate disease matches alongside recommended home remedies and medical treatments/medications.

2. **AI Skin Vision**
   - Utilizes a PyTorch-based computer vision model architecture to process skin images.
   - Extracts tensorial features to detect anomalies and identify potential skin conditions such as eczema, fungal infections, or allergic reactions.

3. **AI Audio Diagnostics**
   - Processes user-uploaded audio files (like coughing sounds) using deep neural networks to extract Mel-spectrograms.
   - Classifies respiratory conditions (e.g., viral dry cough, bacterial chest cough) and provides actionable medical recommendations.

## Tech Stack

- **Frontend:** React.js, Lucide Icons, Axios (Communicates with the AI/Quantum backend endpoints)
- **Backend:** Python, FastAPI, Uvicorn
- **Quantum computing simulation:** Qiskit, Qiskit Aer
- **Artificial Intelligence:** PyTorch

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:
- [Node.js](https://nodejs.org/) (for the React Frontend)
- [Python 3.8+](https://www.python.org/) (for the FastAPI Backend)

### Installation

1. **Start the Backend server:**
   Navigate to the `backend/` directory, install the Python dependencies, and run the FastAPI server:
   ```bash
   cd backend
   pip install -r requirements.txt
   python app.py
   ```
   *The backend server will start on `http://localhost:8000`.*

2. **Start the Frontend development server:**
   Open a new terminal, navigate to the `frontend/` directory, install the Node dependencies, and run the React app:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *The application will open in your default available web browser.*

Alternatively, you can start both the backend and frontend simultaneously by running the `Start-QuantumMed.bat` script located in the project root if you are on Windows.

## Usage

- Navigate between the three main tabs (Quantum Symptom Match, AI Skin Vision, AI Audio Diagnostics).
- **Symptom Match:** Enter comma-separated symptoms (e.g., "fever, fatigue") or a disease name (e.g., "Covid 19") and click analyze to see potential matches and medications.
- **AI Diagnostics:** Upload mock image or audio files to test the PyTorch classification system.

## License

This project is for educational and experimental purposes, simulating future Quantum-AI integrations in the healthcare space.
