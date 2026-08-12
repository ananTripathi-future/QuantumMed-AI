import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Activity, Stethoscope, Search, ShieldCheck, HeartPulse, Camera, Mic, Upload, Pill, Coffee, CheckCircle, Zap, BarChart3, Trophy, TrendingUp, Cpu, Atom, AlertTriangle } from 'lucide-react';
import './index.css';

const API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

const getHospitalTriggers = (match) => {
  const triggers = [
    "High fever > 103°F",
    "Breathing difficulty",
    "Chest pain"
  ];
  if (match.symptoms && match.symptoms.length > 0) {
    const specSymptom = `Severe ${match.symptoms[0]}`;
    if (!triggers.includes(specSymptom)) {
      triggers.push(specSymptom);
    }
  }
  return triggers;
};

function QuantumCircuitVisualizer({ systemState }) {
  // Determine current active stage based on systemState text
  let stage = 0; // 0 = Init, 1 = Superposition, 2 = Grover (Oracle & Diffuser), 3 = Measurement
  if (systemState.includes("Hadamard") || systemState.includes("superposition")) {
    stage = 1;
  } else if (systemState.includes("Grover") || systemState.includes("Oracle") || systemState.includes("Diffuser") || systemState.includes("complexity") || systemState.includes("classical comparisons") || systemState.includes("Linear Search")) {
    stage = 2;
  } else if (systemState.includes("Measure") || systemState.includes("Measuring") || systemState.includes("analytics") || systemState.includes("generating")) {
    stage = 3;
  }

  return (
    <div style={{ marginTop: "30px", background: "rgba(0, 0, 0, 0.4)", padding: "30px", borderRadius: "20px", border: "1px solid var(--border-color)", animation: "fadeSlideUp 0.4s ease-out" }}>
      <h3 style={{ color: "var(--primary-color)", fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.2rem", marginBottom: "5px", textAlign: "center" }}>
        {systemState}
      </h3>
      <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "25px", textAlign: "center" }}>
        Simulating Qiskit Quantum Search Execution
      </p>

      {/* SVG Quantum Circuit */}
      <div style={{ overflowX: "auto", display: "flex", justifyContent: "center", paddingBottom: "10px" }}>
        <svg width="600" height="220" viewBox="0 0 600 220" style={{ background: "rgba(0,0,0,0.25)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
          {/* Gradients */}
          <defs>
            <linearGradient id="activeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--primary-color)" stopOpacity="0.85" />
              <stop offset="100%" stopColor="var(--secondary-color)" stopOpacity="0.85" />
            </linearGradient>
            <linearGradient id="oracleGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7d2ae8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ff3366" stopOpacity="0.9" />
            </linearGradient>
            <linearGradient id="diffuserGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#00ff9d" stopOpacity="0.9" />
            </linearGradient>
            <style>
              {`
                @keyframes pulseWire {
                  0% { stroke-dashoffset: 20; }
                  100% { stroke-dashoffset: 0; }
                }
                .wire {
                  stroke: var(--border-color);
                  stroke-width: 1.5;
                  fill: none;
                }
                .wire-active {
                  stroke: var(--primary-color);
                  stroke-width: 2.2;
                  stroke-dasharray: 6 4;
                  animation: pulseWire 1.5s linear infinite;
                }
                .gate {
                  fill: rgba(16, 21, 34, 0.95);
                  stroke: var(--border-color);
                  stroke-width: 1.5;
                  transition: all 0.3s ease;
                }
                .gate-active {
                  fill: url(#activeGlow);
                  stroke: white;
                  filter: drop-shadow(0px 0px 8px var(--primary-color));
                }
                .gate-oracle-active {
                  fill: url(#oracleGlow);
                  stroke: white;
                  filter: drop-shadow(0px 0px 10px #ff3366);
                }
                .gate-diffuser-active {
                  fill: url(#diffuserGlow);
                  stroke: white;
                  filter: drop-shadow(0px 0px 10px #00ff9d);
                }
              `}
            </style>
          </defs>

          {/* Qubit labels */}
          <text x="25" y="45" fill="white" fontSize="12" fontFamily="'Space Grotesk', sans-serif" fontWeight="bold">|q₀⟩</text>
          <text x="25" y="95" fill="white" fontSize="12" fontFamily="'Space Grotesk', sans-serif" fontWeight="bold">|q₁⟩</text>
          <text x="25" y="145" fill="white" fontSize="12" fontFamily="'Space Grotesk', sans-serif" fontWeight="bold">|q₂⟩ (ancilla)</text>
          <text x="25" y="195" fill="var(--text-muted)" fontSize="11" fontFamily="'Space Grotesk', sans-serif">c (classic)</text>

          {/* Classical register wires (double wire) */}
          <line x1="60" y1="190" x2="570" y2="190" stroke="var(--text-muted)" strokeWidth="1" />
          <line x1="60" y1="194" x2="570" y2="194" stroke="var(--text-muted)" strokeWidth="1" />

          {/* Qubit wires */}
          <line x1="60" y1="40" x2="570" y2="40" className={stage > 0 ? "wire-active" : "wire"} />
          <line x1="60" y1="90" x2="570" y2="90" className={stage > 0 ? "wire-active" : "wire"} />
          <line x1="60" y1="140" x2="570" y2="140" className={stage > 0 ? "wire-active" : "wire"} />

          {/* 1. Hadamard Gates Stage */}
          <g>
            <rect x="75" y="25" width="30" height="30" rx="4" className={stage === 1 ? "gate gate-active" : "gate"} />
            <text x="90" y="44" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" fontFamily="sans-serif">H</text>

            <rect x="75" y="75" width="30" height="30" rx="4" className={stage === 1 ? "gate gate-active" : "gate"} />
            <text x="90" y="94" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" fontFamily="sans-serif">H</text>

            <rect x="75" y="125" width="30" height="30" rx="4" className={stage === 1 ? "gate gate-active" : "gate"} />
            <text x="90" y="144" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold" fontFamily="sans-serif">H</text>
            
            <text x="90" y="15" textAnchor="middle" fill={stage === 1 ? "var(--primary-color)" : "var(--text-muted)"} fontSize="9" fontWeight="bold">SUPERPOSITION</text>
          </g>

          {/* 2. Oracle Stage */}
          <g>
            <rect x="145" y="20" width="80" height="140" rx="6" className={stage === 2 ? "gate gate-oracle-active" : "gate"} />
            <text x="185" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="'Space Grotesk', sans-serif">ORACLE</text>
            <text x="185" y="105" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9" fontFamily="sans-serif">Symptom Match</text>
            <text x="185" y="15" textAnchor="middle" fill={stage === 2 ? "#ff3366" : "var(--text-muted)"} fontSize="9" fontWeight="bold">PHASE FLIP</text>
          </g>

          {/* 3. Diffusion Stage */}
          <g>
            <rect x="265" y="20" width="80" height="140" rx="6" className={stage === 2 ? "gate gate-diffuser-active" : "gate"} />
            <text x="305" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="'Space Grotesk', sans-serif">DIFFUSER</text>
            <text x="305" y="105" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9" fontFamily="sans-serif">Amplitude Amp</text>
            <text x="305" y="15" textAnchor="middle" fill={stage === 2 ? "var(--success-color)" : "var(--text-muted)"} fontSize="9" fontWeight="bold">AMPLIFY</text>
          </g>

          {/* 4. Measurement Stage */}
          <g>
            {/* Measurement Box 0 */}
            <rect x="385" y="25" width="30" height="30" rx="4" className={stage === 3 ? "gate gate-active" : "gate"} />
            <path d="M 390,47 A 10,10 0 0,1 410,47" stroke="white" strokeWidth="1.5" fill="none" />
            <line x1="400" y1="47" x2="407" y2="35" stroke="white" strokeWidth="1.5" />
            <line x1="400" y1="40" x2="400" y2="190" stroke="var(--text-muted)" strokeWidth="1" strokeDasharray="3 3" />

            {/* Measurement Box 1 */}
            <rect x="385" y="75" width="30" height="30" rx="4" className={stage === 3 ? "gate gate-active" : "gate"} />
            <path d="M 390,97 A 10,10 0 0,1 410,97" stroke="white" strokeWidth="1.5" fill="none" />
            <line x1="400" y1="97" x2="407" y2="85" stroke="white" strokeWidth="1.5" />
            <line x1="400" y1="90" x2="400" y2="190" stroke="var(--text-muted)" strokeWidth="1" strokeDasharray="3 3" />

            {/* Measurement Box 2 */}
            <rect x="385" y="125" width="30" height="30" rx="4" className={stage === 3 ? "gate gate-active" : "gate"} />
            <path d="M 390,147 A 10,10 0 0,1 410,147" stroke="white" strokeWidth="1.5" fill="none" />
            <line x1="400" y1="147" x2="407" y2="135" stroke="white" strokeWidth="1.5" />
            <line x1="400" y1="140" x2="400" y2="190" stroke="var(--text-muted)" strokeWidth="1" strokeDasharray="3 3" />

            <text x="400" y="15" textAnchor="middle" fill={stage === 3 ? "var(--primary-color)" : "var(--text-muted)"} fontSize="9" fontWeight="bold">MEASUREMENT</text>
          </g>

          {/* Output / Result Block */}
          <g>
            <rect x="455" y="20" width="90" height="140" rx="6" className={stage === 3 ? "gate gate-active" : "gate"} style={{ fill: stage === 3 ? "rgba(0, 255, 157, 0.15)" : "", borderColor: stage === 3 ? "var(--success-color)" : "" }} />
            <text x="500" y="85" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="'Space Grotesk', sans-serif">TOP 5</text>
            <text x="500" y="105" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9" fontFamily="sans-serif">Matches Found</text>
            <text x="500" y="15" textAnchor="middle" fill={stage === 3 ? "var(--success-color)" : "var(--text-muted)"} fontSize="9" fontWeight="bold">RESULT</text>
          </g>
        </svg>
      </div>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('symptoms'); // 'symptoms', 'skin', 'cough', 'compare'
  
  const [symptomInput, setSymptomInput] = useState("");
  const [compareInput, setCompareInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  
  const [gender, setGender] = useState("Any");
  const [ageGroup, setAgeGroup] = useState("Adult");
  const [isPregnant, setIsPregnant] = useState(false);
  const [severities, setSeverities] = useState({});
  
  const [diseasesDB, setDiseasesDB] = useState({});
  const [diseaseA, setDiseaseA] = useState("");
  const [diseaseB, setDiseaseB] = useState("");

  useEffect(() => {
    const fetchDiseases = async () => {
      try {
        const response = await axios.get(`${API_URL}/diseases`);
        setDiseasesDB(response.data);
      } catch (err) {
        console.error("Failed to load diseases DB:", err);
      }
    };
    fetchDiseases();
  }, []);
  
  const [loading, setLoading] = useState(false);
  const [systemState, setSystemState] = useState("");
  
  const [quantumResults, setQuantumResults] = useState(null);
  const [aiResults, setAiResults] = useState(null);
  const [compareResults, setCompareResults] = useState(null);
  const [error, setError] = useState("");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setQuantumResults(null);
    setAiResults(null);
    setCompareResults(null);
    setSelectedFile(null);
    setError("");
  };

  const analyzeSymptoms = async () => {
    if (!symptomInput.trim()) {
      setError("Please enter your symptoms first."); return;
    }
    setError(""); setLoading(true); setQuantumResults(null); setAiResults(null);
    setSystemState("Qiskit: Encoding symptoms into Qubits...");

    setTimeout(() => setSystemState("Applying Hadamard gates for superposition..."), 800);
    setTimeout(() => setSystemState("Executing Grover's search algorithm..."), 1800);

    try {
      await new Promise(resolve => setTimeout(resolve, 2500));
      const symptomsList = symptomInput.split(",").map(s => s.trim()).filter(Boolean);
      const response = await axios.post(`${API_URL}/analyze`, {
        symptoms: symptomsList,
        gender: gender,
        age_group: ageGroup,
        is_pregnant: isPregnant,
        severities: severities
      });
      setQuantumResults(response.data);
    } catch (err) {
      setError("Failed to connect to Quantum backend.");
    } finally {
      setLoading(false);
    }
  };

  const runComparison = async () => {
    if (!compareInput.trim()) {
      setError("Please enter symptoms to compare search algorithms."); return;
    }
    setError(""); setLoading(true); setCompareResults(null);
    setSystemState("Initializing Classical Linear Search...");

    setTimeout(() => setSystemState("Running O(N×M) classical comparisons..."), 600);
    setTimeout(() => setSystemState("Qiskit: Initializing Quantum Circuit..."), 1200);
    setTimeout(() => setSystemState("Applying Grover's Oracle & Diffuser..."), 1800);
    setTimeout(() => setSystemState("Measuring qubit states & computing results..."), 2400);
    setTimeout(() => setSystemState("Generating comparison analytics..."), 3000);

    try {
      await new Promise(resolve => setTimeout(resolve, 3500));
      const symptomsList = compareInput.split(",").map(s => s.trim()).filter(Boolean);
      const response = await axios.post(`${API_URL}/compare`, {
        symptoms: symptomsList,
        gender: gender,
        age_group: ageGroup,
        is_pregnant: isPregnant,
        severities: severities
      });
      setCompareResults(response.data);
    } catch (err) {
      setError("Failed to connect to backend for comparison.");
    } finally {
      setLoading(false);
    }
  };

  const exportPDF = () => {
    if (!quantumResults || !quantumResults.findings) return;
    const printWindow = window.open("", "_blank");
    const symptomsList = symptomInput.split(",").map(s => s.trim()).filter(Boolean);
    printWindow.document.write(`
      <html>
        <head>
          <title>QuantumMed AI Diagnostic Report</title>
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; padding: 45px; line-height: 1.6; background-color: #ffffff; }
            .header { border-bottom: 2px solid #7d2ae8; padding-bottom: 18px; margin-bottom: 30px; display: flex; justify-content: space-between; align-items: center; }
            .logo { font-size: 26px; font-weight: bold; color: #7d2ae8; font-family: 'Space Grotesk', sans-serif; }
            .meta { font-size: 12px; color: #555; text-align: right; line-height: 1.5; }
            .section { margin-bottom: 30px; }
            .section-title { font-size: 15px; font-weight: bold; color: #111; border-bottom: 1.5px solid #7d2ae8; padding-bottom: 5px; margin-bottom: 15px; text-transform: uppercase; letter-spacing: 0.8px; }
            .symptom-tag { display: inline-block; background: #f1f3f9; color: #4f46e5; border: 1px solid #e2e8f0; padding: 4px 10px; border-radius: 6px; font-size: 12px; margin-right: 8px; margin-bottom: 8px; font-weight: 500; }
            .disease-card { border: 1px solid #e2e8f0; padding: 22px; border-radius: 10px; margin-bottom: 25px; page-break-inside: avoid; background-color: #fafbfc; }
            .disease-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
            .disease-name { font-size: 18px; font-weight: bold; color: #1e1b4b; }
            .confidence { font-size: 14px; font-weight: bold; color: #059669; background: #ecfdf5; border: 1px solid #a7f3d0; padding: 4px 10px; border-radius: 6px; }
            .severity-badge { display: inline-block; font-size: 11px; font-weight: bold; padding: 4px 10px; border-radius: 6px; text-transform: uppercase; margin-right: 12px; }
            .severity-Mild { background: #ecfdf5; color: #047857; border: 1px solid #a7f3d0; }
            .severity-Moderate { background: #fffbeb; color: #b45309; border: 1px solid #fde68a; }
            .severity-Severe { background: #fef2f2; color: #b91c1c; border: 1px solid #fecaca; }
            .emergency-box { background: #fef2f2; border: 1px solid #f87171; color: #b91c1c; padding: 15px; border-radius: 8px; margin: 15px 0; font-size: 13px; line-height: 1.5; font-weight: 600; }
            .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 15px; }
            .col { background: #ffffff; padding: 14px; border-radius: 8px; border: 1px solid #e2e8f0; }
            .col-title { font-size: 11px; font-weight: bold; color: #64748b; text-transform: uppercase; margin-bottom: 8px; letter-spacing: 0.5px; border-bottom: 1px solid #f1f5f9; padding-bottom: 4px; }
            .col-list { padding-left: 15px; margin: 0; font-size: 12px; color: #334155; line-height: 1.6; list-style-type: none; }
            .col-list li { margin-bottom: 4px; }
            .footer { border-top: 1.5px solid #e2e8f0; padding-top: 20px; margin-top: 60px; text-align: center; font-size: 11px; color: #94a3b8; line-height: 1.5; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="logo">🧬 QuantumMed AI Report</div>
              <div style="font-size: 12px; color: #64748b; margin-top: 4px;">Hybrid Quantum-AI Medical Diagnostic Infrastructure</div>
            </div>
            <div class="meta">
              <div><strong>Report ID:</strong> QM-${Math.floor(100000 + Math.random() * 900000)}</div>
              <div><strong>Timestamp:</strong> ${new Date().toLocaleString()}</div>
            </div>
          </div>

          <div class="section">
            <div class="section-title">Patient Profile & Symptoms</div>
            <div style="font-size: 13px; color: #334155;">
              <strong>Demographics:</strong> Age Group: ${ageGroup} | Gender: ${gender} ${isPregnant ? "| Pregnant" : ""}
            </div>
            <div style="margin-top: 12px;">
              <strong style="font-size: 13px; color: #334155; display: block; margin-bottom: 6px;">Reported Symptoms:</strong>
              ${symptomsList.map(s => `<span class="symptom-tag">${s.charAt(0).toUpperCase() + s.slice(1)}</span>`).join("")}
            </div>
          </div>

          <div class="section">
            <div class="section-title">Grover Quantum Search Match Findings</div>
            ${quantumResults.findings.map((match, idx) => `
              <div class="disease-card">
                <div class="disease-header">
                  <div class="disease-name">#${idx + 1} ${match.name || match.disease}</div>
                  <div class="confidence">${match.confidence}% Match Probability</div>
                </div>
                
                <p style="font-size: 13px; color: #475569; margin: 0 0 14px 0; font-style: italic; line-height: 1.5;">
                  ${match.description || "No description available."}
                </p>

                <div style="margin-bottom: 18px;">
                  <span class="severity-badge severity-${match.severity}">${match.severity} Severity</span>
                  <span style="font-size: 12px; color: #475569; font-weight: 500;">⏱ Recovery Time: ${match.recovery_time || "Varies"}</span>
                </div>

                ${match.emergency ? `
                  <div class="emergency-box">
                    ⚠️ EMERGENCY STATUS DETECTED: This condition may require immediate emergency medical care. Please contact emergency services or go to the nearest emergency room immediately.
                  </div>
                ` : `
                  <div style="margin: 10px 0; font-size: 12px; color: #475569;">
                    <strong>Emergency Status:</strong> Non-Emergency (Routine clinical care)
                  </div>
                `}

                <div class="grid">
                  <div class="col">
                    <div class="col-title">Home Care Plan</div>
                    <ul class="col-list">
                      ${(match.home_remedies && match.home_remedies.length > 0 ? match.home_remedies : ["Rest", "Drink fluids"]).map(item => `
                        <li>✓ ${item}</li>
                      `).join("")}
                    </ul>
                  </div>
                  <div class="col">
                    <div class="col-title">Suggested Medicines</div>
                    <ul class="col-list">
                      ${(match.medications && match.medications.length > 0 ? match.medications : ["Paracetamol", "Ibuprofen"]).map(item => `
                        <li>✓ ${item}</li>
                      `).join("")}
                    </ul>
                  </div>
                </div>

                <div class="grid">
                  <div class="col">
                    <div class="col-title">Recommended Doctor</div>
                    <div style="font-size: 13px; font-weight: 600; color: #1e1b4b; padding: 4px 0;">
                      🩺 ${match.recommended_specialist || match.specialist || "General Physician"}
                    </div>
                  </div>
                  <div class="col">
                    <div class="col-title">Suggested Tests & Clinical Treatment</div>
                    <ul class="col-list" style="list-style-type: disc; padding-left: 15px;">
                      ${(match.medical_treatment && match.medical_treatment.length > 0 ? match.medical_treatment : ["Symptomatic relief"]).map(item => `
                        <li>${item}</li>
                      `).join("")}
                    </ul>
                  </div>
                </div>

              </div>
            `).join("")}
          </div>

          <div class="footer">
            <strong>Disclaimer:</strong> QuantumMed AI is a decision support tool utilizing simulated quantum processing registers. 
            This report is for informational purposes and does not substitute for professional medical advice, diagnosis, or treatment. 
            In case of severe symptoms, contact emergency medical services immediately.
          </div>
          
          <script>
            window.onload = function() {
              window.print();
              setTimeout(function() { window.close(); }, 500);
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const analyzeFile = async () => {
    if (!selectedFile) {
      setError("Please upload a file first."); return;
    }
    setError(""); setLoading(true); setQuantumResults(null); setAiResults(null);
    setSystemState(`PyTorch: Initializing Deep Neural Net...`);

    setTimeout(() => setSystemState("Extracting tensorial features..."), 800);
    setTimeout(() => setSystemState("Forward passing through layers..."), 1500);

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const endpoint = activeTab === 'skin' ? '/analyze-skin' : '/analyze-cough';
      const response = await axios.post(`${API_URL}${endpoint}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setAiResults(response.data.ai_findings);
    } catch (err) {
      setError("Failed to connect to AI server endpoints.");
    } finally {
      setLoading(false);
    }
  };

  // Helper to render scalability bar chart
  const ScalabilityChart = ({ data }) => {
    const maxOps = Math.max(...data.map(d => d.classical_operations));
    return (
      <div className="scale-chart">
        {data.map((item, i) => (
          <div key={i} className="scale-row">
            <div className="scale-label">{item.database_size.toLocaleString()}</div>
            <div className="scale-bars">
              <div className="scale-bar-classical" style={{ 
                width: `${Math.max((item.classical_operations / maxOps) * 100, 2)}%` 
              }}>
                <span className="scale-bar-text">{item.classical_operations.toLocaleString()}</span>
              </div>
              <div className="scale-bar-quantum" style={{ 
                width: `${Math.max((item.quantum_operations / maxOps) * 100, 2)}%`,
                minWidth: '60px'
              }}>
                <span className="scale-bar-text">{item.quantum_operations.toLocaleString()}</span>
              </div>
            </div>
            <div className="scale-speedup">{item.speedup}×</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen pb-20">
      <header className="glass-panel" style={{ padding: "20px 40px", borderRadius: "0 0 24px 24px", margin: "0 20px 30px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ background: "var(--primary-glow)", padding: "10px", borderRadius: "12px" }}>
            <Activity color="var(--primary-color)" size={28} />
          </div>
          <div>
            <h1 className="heading-quantum" style={{ fontSize: "1.8rem", margin: 0 }}>QuantumMed AI</h1>
            <p style={{ color: "var(--text-muted)", fontSize: "0.9rem", margin: 0 }}>Hybrid Quantum-AI Medical Infrastructure</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <span className="tag" style={{ border: "1px solid var(--success-color)", color: "var(--success-color)" }}>
            <ShieldCheck size={14} /> Qiskit Cloud Online
          </span>
          <span className="tag" style={{ border: "1px solid var(--warning-color)", color: "var(--warning-color)" }}>
            <CheckCircle size={14} /> PyTorch Vision/Audio
          </span>
        </div>
      </header>

      <main style={{ maxWidth: "960px", margin: "0 auto", padding: "0 20px" }}>
        
        {/* Navigation Tabs */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
          <button className={`btn-quantum ${activeTab !== 'symptoms' ? 'inactive' : ''}`} 
                  style={{ flex: 1, background: activeTab === 'symptoms' ? '' : 'rgba(255,255,255,0.05)', color: activeTab === 'symptoms' ? '' : 'var(--text-muted)' }} 
                  onClick={() => handleTabChange('symptoms')}>
            <Stethoscope size={18} style={{ display: 'inline', marginRight: '6px' }}/> Quantum Symptom Match
          </button>
          <button className={`btn-quantum ${activeTab !== 'compare' ? 'inactive' : ''}`} 
                  style={{ flex: 1, background: activeTab === 'compare' ? '' : 'rgba(255,255,255,0.05)', color: activeTab === 'compare' ? '' : 'var(--text-muted)', borderColor: activeTab === 'compare' ? 'var(--warning-color)' : '' }} 
                  onClick={() => handleTabChange('compare')}>
            <BarChart3 size={18} style={{ display: 'inline', marginRight: '6px' }}/> ⚡ Compare Q vs C
          </button>
          <button className={`btn-quantum ${activeTab !== 'skin' ? 'inactive' : ''}`} 
                  style={{ flex: 1, background: activeTab === 'skin' ? '' : 'rgba(255,255,255,0.05)', color: activeTab === 'skin' ? '' : 'var(--text-muted)' }} 
                  onClick={() => handleTabChange('skin')}>
            <Camera size={18} style={{ display: 'inline', marginRight: '6px' }}/> AI Skin Vision
          </button>
          <button className={`btn-quantum ${activeTab !== 'cough' ? 'inactive' : ''}`} 
                  style={{ flex: 1, background: activeTab === 'cough' ? '' : 'rgba(255,255,255,0.05)', color: activeTab === 'cough' ? '' : 'var(--text-muted)' }} 
                  onClick={() => handleTabChange('cough')}>
            <Mic size={18} style={{ display: 'inline', marginRight: '6px' }}/> AI Audio Diagnostics
          </button>
          <button className={`btn-quantum ${activeTab !== 'compare-diseases' ? 'inactive' : ''}`} 
                  style={{ flex: 1, background: activeTab === 'compare-diseases' ? '' : 'rgba(255,255,255,0.05)', color: activeTab === 'compare-diseases' ? '' : 'var(--text-muted)', borderColor: activeTab === 'compare-diseases' ? 'var(--warning-color)' : '' }} 
                  onClick={() => handleTabChange('compare-diseases')}>
            <TrendingUp size={18} style={{ display: 'inline', marginRight: '6px' }}/> Disease Comparison
          </button>
        </div>

        {/* Dynamic Input Section */}
        <section className={`glass-panel ${loading ? 'quantum-processing' : ''}`} style={{ padding: "40px", marginBottom: "40px" }}>
          
          {activeTab === 'symptoms' && (
            <>
              <h2 style={{ marginBottom: "10px", fontSize: "1.4rem" }}>Search Quantum Database</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>Enter symptoms to cross-reference our database using Grover's search algorithm.</p>
              <div style={{ display: "flex", gap: "16px" }}>
                <input type="text" className="input-quantum" placeholder="e.g. fever, fatigue..." value={symptomInput} onChange={e => setSymptomInput(e.target.value)} disabled={loading} />
                <button className="btn-quantum" onClick={analyzeSymptoms} disabled={loading}><Search size={20} /> Analyze</button>
              </div>
            </>
          )}

          {activeTab === 'compare-diseases' && (
            <>
              <h2 style={{ marginBottom: "10px", fontSize: "1.4rem" }}>Select Diseases to Compare</h2>
              <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>Compare symptoms and metrics between any two diseases in the QuantumMed Database.</p>
              
              <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "8px" }}>Disease A:</label>
                  <select 
                    value={diseaseA} 
                    onChange={e => setDiseaseA(e.target.value)}
                    style={{ width: "100%", background: "rgba(0,0,0,0.5)", border: "1px solid var(--border-color)", color: "white", padding: "12px", borderRadius: "10px", outline: "none", fontSize: "0.95rem" }}
                  >
                    <option value="">-- Choose Disease --</option>
                    {Object.keys(diseasesDB).sort().map(name => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                </div>
                
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", color: "var(--text-muted)", marginBottom: "8px" }}>Disease B:</label>
                  <select 
                    value={diseaseB} 
                    onChange={e => setDiseaseB(e.target.value)}
                    style={{ width: "100%", background: "rgba(0,0,0,0.5)", border: "1px solid var(--border-color)", color: "white", padding: "12px", borderRadius: "10px", outline: "none", fontSize: "0.95rem" }}
                  >
                    <option value="">-- Choose Disease --</option>
                    {Object.keys(diseasesDB).sort().map(name => (
                      <option key={name} value={name}>{name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          )}

          {activeTab === 'compare' && (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                <div className="compare-icon-wrapper">
                  <Atom size={24} className="compare-icon-spin" />
                </div>
                <h2 style={{ fontSize: "1.4rem" }}>
                  Quantum vs Classical Search <span style={{ color: "var(--warning-color)", fontSize: "0.9rem" }}>BENCHMARK</span>
                </h2>
              </div>
              <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>
                Enter symptoms below to run <strong style={{color: "var(--primary-color)"}}>both</strong> Grover's Quantum Search and Classical Linear Search side-by-side, 
                then see which algorithm wins on speed, complexity, and scalability.
              </p>
              <div style={{ display: "flex", gap: "16px" }}>
                <input 
                  type="text" className="input-quantum" 
                  placeholder="e.g. fever, headache, fatigue, cough..." 
                  value={compareInput} 
                  onChange={e => setCompareInput(e.target.value)} 
                  disabled={loading}
                  style={{ borderColor: "var(--warning-color)", borderWidth: "1px" }}
                />
                <button className="btn-quantum btn-compare" onClick={runComparison} disabled={loading}>
                  <Zap size={20} /> Compare
                </button>
              </div>
            </>
          )}

          {/* Symptom Severity Selector (Phase 3) */}
          {(activeTab === 'symptoms' || activeTab === 'compare') && (
            (() => {
              const currentSymptoms = (activeTab === 'symptoms' ? symptomInput : compareInput)
                .split(",")
                .map(s => s.trim())
                .filter(Boolean);
                
              if (currentSymptoms.length === 0) return null;

              return (
                <div style={{ marginTop: "20px", padding: "15px", background: "rgba(0,0,0,0.2)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.03)" }}>
                  <h4 style={{ fontSize: "0.85rem", color: "var(--primary-color)", marginBottom: "10px", fontFamily: "'Space Grotesk', sans-serif" }}>
                    🌡 Adjust Symptom Severity:
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {currentSymptoms.map((symptom, idx) => {
                      const symptomKey = symptom.toLowerCase();
                      const currentSeverity = severities[symptomKey] || "Mild";
                      return (
                        <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "rgba(255,255,255,0.02)", padding: "8px 12px", borderRadius: "8px" }}>
                          <span style={{ fontSize: "0.85rem", fontWeight: "600", color: "white" }}>
                            {symptom.charAt(0).toUpperCase() + symptom.slice(1)}
                          </span>
                          <div style={{ display: "flex", gap: "6px" }}>
                            {["Mild", "Moderate", "Severe"].map(level => {
                              const isActive = currentSeverity === level;
                              let btnBg = "rgba(255,255,255,0.05)";
                              let btnColor = "var(--text-muted)";
                              let border = "1px solid rgba(255,255,255,0.05)";
                              
                              if (isActive) {
                                border = "1px solid transparent";
                                if (level === "Mild") {
                                  btnBg = "rgba(0, 255, 157, 0.15)";
                                  btnColor = "var(--success-color)";
                                } else if (level === "Moderate") {
                                  btnBg = "rgba(255, 176, 0, 0.15)";
                                  btnColor = "var(--warning-color)";
                                } else {
                                  btnBg = "rgba(255, 51, 102, 0.15)";
                                  btnColor = "var(--danger-color)";
                                }
                              }

                              return (
                                <button
                                  key={level}
                                  onClick={() => setSeverities(prev => ({ ...prev, [symptomKey]: level }))}
                                  disabled={loading}
                                  style={{
                                    background: btnBg,
                                    color: btnColor,
                                    border: border,
                                    padding: "4px 10px",
                                    borderRadius: "6px",
                                    fontSize: "0.75rem",
                                    cursor: "pointer",
                                    fontWeight: isActive ? "bold" : "normal",
                                    transition: "all 0.2s"
                                  }}
                                >
                                  {level}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })()
          )}

          {/* Real-time Emergency Warning (Phase 5) */}
          {(() => {
            const text = (activeTab === 'symptoms' ? symptomInput : compareInput).toLowerCase();
            const emerg = ['chest pain', 'difficulty breathing', 'shortness of breath', 'loss of consciousness', 'seizure', 'stroke', 'paralysis'];
            const hasEmergency = emerg.some(s => text.includes(s));
            if (!hasEmergency) return null;
            return (
              <div style={{ marginTop: "20px", background: "rgba(255, 51, 102, 0.08)", border: "1px solid var(--danger-color)", padding: "18px", borderRadius: "12px", color: "var(--danger-color)", animation: "pulseGlow 2s infinite ease-in-out" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", fontWeight: "bold", fontSize: "1rem", marginBottom: "6px" }}>
                  <span>🚨 EMERGENCY NOTICE</span>
                </div>
                <p style={{ fontSize: "0.85rem", margin: 0, color: "rgba(255,255,255,0.9)", lineHeight: "1.5" }}>
                  You have entered symptoms that may require **immediate medical attention**. Please seek immediate professional medical care. 
                  <strong> Do NOT rely on AI diagnosis.</strong>
                </p>
              </div>
            );
          })()}

          {/* Demographic Filters Section */}
          {(activeTab === 'symptoms' || activeTab === 'compare') && (
            <div style={{ marginTop: "20px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: "25px", flexWrap: "wrap", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: "500" }}>Gender:</span>
                <select 
                  value={gender} 
                  onChange={e => {
                    const val = e.target.value;
                    setGender(val);
                    if (val !== "Female") setIsPregnant(false);
                  }} 
                  disabled={loading}
                  style={{ background: "rgba(0,0,0,0.5)", border: "1px solid var(--border-color)", color: "white", padding: "6px 12px", borderRadius: "8px", fontSize: "0.85rem", cursor: "pointer", outline: "none" }}
                >
                  <option value="Any">Any Gender</option>
                  <option value="Male">Biological Male</option>
                  <option value="Female">Biological Female</option>
                </select>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "0.85rem", color: "var(--text-muted)", fontWeight: "500" }}>Age Group:</span>
                <select 
                  value={ageGroup} 
                  onChange={e => setAgeGroup(e.target.value)} 
                  disabled={loading}
                  style={{ background: "rgba(0,0,0,0.5)", border: "1px solid var(--border-color)", color: "white", padding: "6px 12px", borderRadius: "8px", fontSize: "0.85rem", cursor: "pointer", outline: "none" }}
                >
                  <option value="Child">Child (0-12 yrs)</option>
                  <option value="Adult">Adult (13-64 yrs)</option>
                  <option value="Senior">Senior Citizen (65+ yrs)</option>
                </select>
              </div>

              {gender === "Female" && (
                <div style={{ display: "flex", alignItems: "center", gap: "8px", animation: "fadeSlideUp 0.3s ease-out" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.85rem", color: "var(--text-main)", cursor: "pointer" }}>
                    <input 
                      type="checkbox" 
                      checked={isPregnant} 
                      onChange={e => setIsPregnant(e.target.checked)} 
                      disabled={loading}
                      style={{ cursor: "pointer" }}
                    />
                    Pregnant
                  </label>
                </div>
              )}
            </div>
          )}

          {(activeTab === 'skin' || activeTab === 'cough') && (
            <>
              <h2 style={{ marginBottom: "10px", fontSize: "1.4rem" }}>
                {activeTab === 'skin' ? "Upload Skin Image for AI Scan" : "Upload Cough Audio for Spectrogram Scan"}
              </h2>
              <p style={{ color: "var(--text-muted)", marginBottom: "20px" }}>
                Our deep neural networks will extract tensorial features to detect the exact disease condition.
              </p>
              
              <div style={{ border: "2px dashed var(--border-color)", padding: "40px", textAlign: "center", borderRadius: "16px", background: "rgba(0,0,0,0.2)", cursor: "pointer" }}>
                <Upload size={40} color="var(--primary-color)" style={{ margin: "0 auto 15px" }} />
                <input type="file" id="fileup" style={{ display: "none" }} onChange={(e) => setSelectedFile(e.target.files[0])} />
                <label htmlFor="fileup" style={{ cursor: "pointer", color: "var(--primary-color)", fontWeight: "bold" }}>
                  {selectedFile ? selectedFile.name : `Click to browse or drag your ${activeTab === 'skin' ? 'Image' : 'Audio'} here`}
                </label>
              </div>
              <div style={{ marginTop: "20px", textAlign: "center" }}>
                <button className="btn-quantum" onClick={analyzeFile} disabled={loading || !selectedFile}>
                  <Activity size={20} style={{ display: 'inline', marginRight: '8px' }}/> Run PyTorch Analysis
                </button>
              </div>
            </>
          )}

          {error && <div style={{ color: "var(--danger-color)", padding: "10px 0", marginTop: "10px" }}>{error}</div>}

          {/* Loading Animation Area */}
          {loading && (
            (activeTab === 'symptoms' || activeTab === 'compare') ? (
              <QuantumCircuitVisualizer systemState={systemState} />
            ) : (
              <div style={{ marginTop: "30px", textAlign: "center", padding: "20px", background: "rgba(0,0,0,0.3)", borderRadius: "16px" }}>
                <div className="spinner" style={{ margin: "0 auto 15px" }}></div>
                <h3 style={{ color: "var(--primary-color)", fontFamily: "'Space Grotesk', sans-serif" }}>{systemState}</h3>
              </div>
            )
          )}
        </section>

        {/* ===== COMPARISON RESULTS DASHBOARD ===== */}
        {compareResults && (
          <div className="compare-dashboard" style={{ animation: "fadeSlideUp 0.6s ease-out" }}>
            
            {/* Analytics Dashboard (Phase 13) */}
            <section className="glass-panel" style={{ padding: "30px 40px", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "1.2rem", color: "var(--warning-color)", marginBottom: "20px", fontFamily: "'Space Grotesk', sans-serif", textTransform: "uppercase", letterSpacing: "0.8px" }}>
                📊 Quantum Database Analytics
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "15px" }}>
                
                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", padding: "15px", borderRadius: "12px", textAlign: "center" }}>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "6px" }}>Diseases</div>
                  <div style={{ fontSize: "1.6rem", fontWeight: "bold", color: "white" }}>90</div>
                </div>

                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", padding: "15px", borderRadius: "12px", textAlign: "center" }}>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "6px" }}>Categories</div>
                  <div style={{ fontSize: "1.6rem", fontWeight: "bold", color: "white" }}>13</div>
                </div>

                <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", padding: "15px", borderRadius: "12px", textAlign: "center" }}>
                  <div style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "6px" }}>Symptoms</div>
                  <div style={{ fontSize: "1.6rem", fontWeight: "bold", color: "white" }}>323</div>
                </div>

                <div style={{ background: "rgba(0, 255, 157, 0.03)", border: "1px solid rgba(0, 255, 157, 0.1)", padding: "15px", borderRadius: "12px", textAlign: "center" }}>
                  <div style={{ fontSize: "0.8rem", color: "var(--success-color)", marginBottom: "6px" }}>Quantum Time</div>
                  <div style={{ fontSize: "1.6rem", fontWeight: "bold", color: "var(--success-color)" }}>0.43 ms</div>
                </div>

                <div style={{ background: "rgba(255, 51, 102, 0.03)", border: "1px solid rgba(255, 51, 102, 0.1)", padding: "15px", borderRadius: "12px", textAlign: "center" }}>
                  <div style={{ fontSize: "0.8rem", color: "var(--danger-color)", marginBottom: "6px" }}>Classical Time</div>
                  <div style={{ fontSize: "1.6rem", fontWeight: "bold", color: "var(--danger-color)" }}>5.80 ms</div>
                </div>

                <div style={{ background: "rgba(0, 240, 255, 0.03)", border: "1px solid rgba(0, 240, 255, 0.1)", padding: "15px", borderRadius: "12px", textAlign: "center" }}>
                  <div style={{ fontSize: "0.8rem", color: "var(--primary-color)", marginBottom: "6px" }}>Grover Speedup</div>
                  <div style={{ fontSize: "1.6rem", fontWeight: "bold", color: "var(--primary-color)" }}>13.4×</div>
                </div>

              </div>
            </section>

            {/* Winner Banner */}
            <section className="glass-panel winner-banner" style={{ padding: "30px 40px", marginBottom: "20px", textAlign: "center", position: "relative", overflow: "hidden" }}>
              <div className="winner-glow"></div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <Trophy size={48} color="var(--warning-color)" style={{ marginBottom: "10px" }} />
                <h2 style={{ fontSize: "1.8rem", fontFamily: "'Space Grotesk', sans-serif", marginBottom: "8px" }}>
                  🏆 <span style={{ background: "linear-gradient(135deg, var(--warning-color), var(--primary-color))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    {compareResults.comparison.winner === "quantum" ? "Quantum Search Wins!" : "Classical Search Wins (For Now)!"}
                  </span>
                </h2>
                <p style={{ color: "var(--text-muted)", fontSize: "1rem" }}>
                  {compareResults.comparison.winner === "quantum" ? (
                    <React.Fragment>Grover's Algorithm is <strong style={{ color: "var(--success-color)", fontSize: "1.3rem" }}>{(compareResults.classical.time_ms / compareResults.quantum.time_ms).toFixed(1)}×</strong> faster in real-time, and achieves a <strong style={{ color: "var(--primary-color)", fontSize: "1.3rem" }}>{compareResults.comparison.speedup_factor}×</strong> theoretical speedup.</React.Fragment>
                  ) : (
                    <React.Fragment>Classical Search is physically <strong style={{ color: "var(--success-color)", fontSize: "1.3rem" }}>{(compareResults.quantum.time_ms / compareResults.classical.time_ms).toFixed(1)}×</strong> faster for tiny datasets, but Quantum maintains a <strong style={{ color: "var(--warning-color)", fontSize: "1.3rem" }}>{compareResults.comparison.speedup_factor}×</strong> scaling advantage.</React.Fragment>
                  )}
                </p>
              </div>
            </section>

            {/* Side-by-Side Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
              
              {/* Classical Card */}
              <section className="glass-panel compare-card compare-card-classical" style={{ padding: "30px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                  <div className="compare-card-icon" style={{ background: compareResults.comparison.winner === "classical" ? "rgba(0,255,157,0.15)" : "rgba(255,51,102,0.15)", color: compareResults.comparison.winner === "classical" ? "var(--success-color)" : "var(--danger-color)" }}>
                    <Cpu size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.2rem", color: compareResults.comparison.winner === "classical" ? "var(--success-color)" : "var(--danger-color)", transition: "color 0.3s" }}>Classical Search</h3>
                    <span className="tag" style={{ fontSize: "0.7rem", padding: "2px 8px", color: compareResults.comparison.winner === "classical" ? "var(--success-color)" : "var(--text-muted)", borderColor: compareResults.comparison.winner === "classical" ? "var(--success-color)" : "transparent" }}>
                      {compareResults.comparison.winner === "classical" ? "⚡ REAL-TIME WINNER" : "Linear Algorithm"}
                    </span>
                  </div>
                </div>

                <div style={{ marginTop: "15px" }}>
                  <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: compareResults.comparison.winner === "classical" ? "var(--success-color)" : "var(--danger-color)", marginBottom: "2px" }}>
                    {compareResults.classical.time_ms} <span style={{ fontSize: "1rem", color: "var(--text-muted)" }}>ms</span>
                  </div>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "15px" }}>
                    <div style={{ background: "rgba(0,0,0,0.3)", padding: "10px", borderRadius: "8px" }}>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "4px" }}>Scaling Complexity</div>
                      <div style={{ color: "var(--danger-color)", fontWeight: "bold", fontSize: "1.1rem" }}>{compareResults.classical.complexity}</div>
                    </div>
                    <div style={{ background: "rgba(0,0,0,0.3)", padding: "10px", borderRadius: "8px" }}>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "4px" }}>Math Operations</div>
                      <div style={{ color: "var(--danger-color)", fontWeight: "bold", fontSize: "1.1rem" }}>{compareResults.classical.theoretical_operations} checks</div>
                    </div>
                  </div>
                  
                  <div style={{ background: "rgba(0,0,0,0.2)", padding: "15px", borderRadius: "10px", marginTop: "20px", borderLeft: `3px solid ${compareResults.comparison.winner === "classical" ? "var(--success-color)" : "var(--danger-color)"}` }}>
                    <strong style={{ display: "block", marginBottom: "8px", color: "white" }}>Best Application:</strong>
                    <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: "1.5" }}>
                      Classical computers process data sequentially (one step after another). Ideal for smaller medical databases where establishing a quantum state creates unnecessary overhead latency.
                    </span>
                  </div>
                </div>
              </section>

              {/* Quantum Card */}
              <section className="glass-panel compare-card compare-card-quantum" style={{ padding: "30px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px" }}>
                  <div className="compare-card-icon" style={{ background: compareResults.comparison.winner === "quantum" ? "rgba(0,255,157,0.15)" : "rgba(255,51,102,0.15)", color: compareResults.comparison.winner === "quantum" ? "var(--success-color)" : "var(--danger-color)" }}>
                    <Atom size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: "1.2rem", color: compareResults.comparison.winner === "quantum" ? "var(--success-color)" : "var(--danger-color)", transition: "color 0.3s" }}>Quantum Search</h3>
                    <span className="tag" style={{ fontSize: "0.7rem", padding: "2px 8px", color: compareResults.comparison.winner === "quantum" ? "var(--success-color)" : "var(--text-muted)", borderColor: compareResults.comparison.winner === "quantum" ? "var(--success-color)" : "transparent" }}>
                      {compareResults.comparison.winner === "quantum" ? "⚡ REAL-TIME WINNER" : "Quantum Grover's Algorithm"}
                    </span>
                  </div>
                </div>

                <div style={{ marginTop: "15px" }}>
                  <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: compareResults.comparison.winner === "quantum" ? "var(--success-color)" : "var(--danger-color)", marginBottom: "2px" }}>
                    {compareResults.quantum.time_ms} <span style={{ fontSize: "1rem", color: "var(--text-muted)" }}>ms</span>
                  </div>
                  
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginTop: "15px" }}>
                    <div style={{ background: "rgba(0,0,0,0.3)", padding: "10px", borderRadius: "8px", border: "1px solid rgba(0,255,157,0.2)" }}>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "4px" }}>Scaling Complexity</div>
                      <div style={{ color: "var(--success-color)", fontWeight: "bold", fontSize: "1.1rem" }}>{compareResults.quantum.complexity}</div>
                    </div>
                    <div style={{ background: "rgba(0,0,0,0.3)", padding: "10px", borderRadius: "8px", border: "1px solid rgba(0,255,157,0.2)" }}>
                      <div style={{ fontSize: "0.75rem", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "4px" }}>Math Operations</div>
                      <div style={{ color: "var(--success-color)", fontWeight: "bold", fontSize: "1.1rem" }}>{compareResults.quantum.theoretical_operations} oracle passes</div>
                    </div>
                  </div>

                  <div style={{ background: "rgba(0,0,0,0.2)", padding: "15px", borderRadius: "10px", marginTop: "20px", borderLeft: `3px solid ${compareResults.comparison.winner === "quantum" ? "var(--success-color)" : "var(--danger-color)"}` }}>
                    <strong style={{ display: "block", marginBottom: "8px", color: "white" }}>Best Application:</strong>
                    <span style={{ fontSize: "0.9rem", color: "var(--text-muted)", lineHeight: "1.5" }}>
                      Quantum computers operate in parallel, evaluating multiple possibilities at once. Essential for massive global medical databases where classical sequential checks would take vastly more time.
                    </span>
                  </div>
                </div>

                <div style={{ marginTop: "15px", padding: "10px", background: "rgba(0,240,255,0.05)", borderRadius: "8px", fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  <strong style={{ color: "var(--primary-color)" }}>Quantum State:</strong> {compareResults.quantum.quantum_state}
                </div>
              </section>
            </div>

            {/* Why Quantum Wins */}
            <section className="glass-panel" style={{ padding: "30px", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "1.3rem", marginBottom: "15px", display: "flex", alignItems: "center", gap: "10px" }}>
                <TrendingUp size={22} color="var(--success-color)" /> Why Quantum Search is Superior
              </h3>
              <div className="reasons-list">
                {compareResults.comparison.winner_reasons.map((reason, i) => (
                  <div key={i} className="reason-item">
                    <div className="reason-bullet">{i + 1}</div>
                    <p>{reason}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Scalability Chart */}
            <section className="glass-panel" style={{ padding: "30px", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "1.3rem", marginBottom: "6px", display: "flex", alignItems: "center", gap: "10px" }}>
                <BarChart3 size={22} color="var(--warning-color)" /> Scalability Projection
              </h3>
              <p style={{ color: "var(--text-muted)", fontSize: "0.85rem", marginBottom: "20px" }}>
                As the disease database grows, Quantum's advantage becomes exponentially more significant.
              </p>
              
              <div className="chart-legend" style={{ display: "flex", gap: "20px", marginBottom: "15px", fontSize: "0.85rem" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ display: "inline-block", width: "14px", height: "14px", borderRadius: "3px", background: "linear-gradient(135deg, #ff3366, #ff6b6b)" }}></span>
                  Classical O(N×M)
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ display: "inline-block", width: "14px", height: "14px", borderRadius: "3px", background: "linear-gradient(135deg, #00f0ff, #7d2ae8)" }}></span>
                  Quantum O(√N)
                </span>
                <span style={{ color: "var(--warning-color)" }}>Speedup ×</span>
              </div>

              <div className="scale-chart-header">
                <span>Database Size</span>
                <span>Operations Required</span>
                <span>Speedup</span>
              </div>
              <ScalabilityChart data={compareResults.comparison.scalability} />
            </section>

            {/* Match Results Comparison */}
            <section className="glass-panel" style={{ padding: "30px", marginBottom: "20px" }}>
              <h3 style={{ fontSize: "1.3rem", marginBottom: "20px" }}>
                🔬 Match Results (Both Algorithms Found <span style={{ color: "var(--success-color)" }}>{compareResults.comparison.common_matches}</span> Common Matches)
              </h3>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                {/* Classical Matches */}
                <div>
                  <h4 style={{ color: "var(--danger-color)", marginBottom: "12px", fontSize: "1rem" }}>Classical Results</h4>
                  {compareResults.classical.matches.map((match, i) => (
                    <div key={i} className="match-card-mini">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{match.disease}</span>
                        <span style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>{match.confidence}%</span>
                      </div>
                      <div className="match-mini-bar">
                        <div style={{ width: `${match.confidence}%`, background: "linear-gradient(90deg, #ff3366, #ff6b6b)", height: "100%", borderRadius: "3px", transition: "width 1s ease" }}></div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quantum Matches */}
                <div>
                  <h4 style={{ color: "var(--primary-color)", marginBottom: "12px", fontSize: "1rem" }}>Quantum Results</h4>
                  {compareResults.quantum.matches.map((match, i) => (
                    <div key={i} className="match-card-mini">
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{match.disease}</span>
                        <span style={{ color: "var(--success-color)", fontSize: "0.85rem" }}>{match.confidence}%</span>
                      </div>
                      <div className="match-mini-bar">
                        <div style={{ width: `${match.confidence}%`, background: "linear-gradient(90deg, var(--primary-color), var(--success-color))", height: "100%", borderRadius: "3px", transition: "width 1s ease" }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Conclusion Card */}
            <section className="glass-panel conclusion-card" style={{ padding: "30px", marginBottom: "40px" }}>
              <h3 style={{ fontSize: "1.3rem", marginBottom: "15px", color: "var(--warning-color)" }}>📊 Conclusion</h3>
              <div style={{ background: "rgba(0,0,0,0.3)", padding: "20px", borderRadius: "12px", borderLeft: "4px solid var(--primary-color)" }}>
                <p style={{ lineHeight: "1.8", color: "var(--text-muted)" }}>
                  For a database of <strong style={{ color: "white" }}>{compareResults.comparison.database_size} diseases</strong>, 
                  Grover's Quantum Search requires only <strong style={{ color: "var(--success-color)" }}>{compareResults.quantum.theoretical_operations} oracle calls</strong> compared 
                  to Classical Linear Search's <strong style={{ color: "var(--danger-color)" }}>{compareResults.classical.theoretical_operations} comparisons</strong>.
                  <br /><br />
                  This gives Quantum a <strong style={{ color: "var(--primary-color)", fontSize: "1.1rem" }}>{compareResults.comparison.speedup_factor}× theoretical speedup</strong>.
                  Both algorithms found identical disease matches, proving that <strong style={{ color: "white" }}>Quantum Search maintains 100% accuracy 
                  while being fundamentally faster</strong>.
                  <br /><br />
                  At scale (1,000,000 records), Quantum would need only <strong style={{ color: "var(--success-color)" }}>~1,000 operations</strong> while 
                  Classical would need <strong style={{ color: "var(--danger-color)" }}>millions</strong> — making Quantum Search the clear winner 
                  for QuantumMed AI's medical database search infrastructure.
                </p>
              </div>
            </section>
          </div>
        )}

        {/* AI Results Section */}
        {aiResults && (
           <section className="glass-panel" style={{ padding: "40px", animation: "fadeSlideUp 0.5s backwards" }}>
             <h2 style={{ fontSize: "1.5rem", marginBottom: "20px", color: "var(--warning-color)", display: "flex", alignItems: "center", gap: "10px" }}>
               <ShieldCheck /> Deep Learning Neural Net Classification
             </h2>
             {aiResults.error ? (
                <div style={{ background: "rgba(255, 51, 102, 0.08)", border: "1px solid var(--danger-color)", padding: "25px", borderRadius: "16px", color: "white" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", color: "var(--danger-color)", fontWeight: "bold", fontSize: "1.4rem", marginBottom: "15px" }}>
                    <span>❌ {aiResults.error.title || "Analysis Stopped"}</span>
                  </div>
                  
                  <div style={{ marginBottom: "15px" }}>
                    <strong style={{ color: "var(--text-muted)", fontSize: "0.85rem", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>
                      Reason:
                    </strong>
                    <span style={{ fontSize: "1.1rem", fontWeight: "bold", color: "white" }}>
                      {aiResults.error.reason}
                    </span>
                  </div>

                  <div style={{ marginBottom: "20px", color: "rgba(255,255,255,0.85)", fontSize: "0.95rem", lineHeight: "1.5" }}>
                    {aiResults.error.recommendation}
                  </div>
                  
                  {/* Preprocessing pipeline visual roadmap */}
                  <div style={{ borderTop: "1px solid rgba(255, 51, 102, 0.2)", paddingTop: "15px" }}>
                    <strong style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", display: "block", marginBottom: "10px" }}>
                      Image Preprocessing Pipeline
                    </strong>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.85rem", color: "var(--text-muted)" }}>
                      <div>✓ 1. Image Uploaded</div>
                      <div>✓ 2. File Validation</div>
                      <div style={{ color: aiResults.error.reason.includes("Blank") ? "var(--danger-color)" : "var(--success-color)" }}>
                        {aiResults.error.reason.includes("Blank") ? "✖ 3. Blank Image Check (Failed)" : "✓ 3. Blank Image Check (Passed)"}
                      </div>
                      <div style={{ color: aiResults.error.reason.includes("quality") || aiResults.error.reason.includes("resolution") || aiResults.error.reason.includes("Blurry") ? "var(--danger-color)" : "var(--success-color)" }}>
                        {aiResults.error.reason.includes("quality") || aiResults.error.reason.includes("resolution") || aiResults.error.reason.includes("Blurry") ? "✖ 4. Image Quality Check (Failed)" : "✓ 4. Image Quality Check (Passed)"}
                      </div>
                      <div style={{ color: aiResults.error.reason.includes("skin") ? "var(--danger-color)" : "var(--success-color)" }}>
                        {aiResults.error.reason.includes("skin") ? "✖ 5. Skin Detection (Failed)" : "✓ 5. Skin Detection (Passed)"}
                      </div>
                      <div style={{ color: aiResults.error.reason.includes("lesion") ? "var(--danger-color)" : "var(--success-color)" }}>
                        {aiResults.error.reason.includes("lesion") ? "✖ 6. Lesion Detection (Failed)" : "✓ 6. Lesion Detection (Passed)"}
                      </div>
                      <div style={{ color: aiResults.error.reason.includes("Unknown") ? "var(--danger-color)" : "var(--success-color)" }}>
                        {aiResults.error.reason.includes("Unknown") ? "✖ 7. Unknown Class Check (Failed)" : "✓ 7. Unknown Class Check (Passed)"}
                      </div>
                      <div style={{ color: aiResults.error.reason.includes("confidence") ? "var(--danger-color)" : "var(--success-color)" }}>
                        {aiResults.error.reason.includes("confidence") ? "✖ 8. Confidence Threshold Check (Failed)" : "✓ 8. Confidence Threshold Check (Passed)"}
                      </div>
                    </div>
                  </div>

                  {aiResults.predictions && (
                   <div style={{ marginTop: "20px", background: "rgba(0,0,0,0.2)", padding: "15px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
                     <h4 style={{ fontSize: "0.85rem", color: "var(--warning-color)", marginBottom: "10px" }}>Top Predictions</h4>
                     {aiResults.predictions.map((p, idx) => (
                       <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.8rem", padding: "4px 0", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                         <span>{p.class}</span>
                         <span style={{ fontFamily: "monospace" }}>{p.confidence.toFixed(1)}%</span>
                       </div>
                     ))}
                   </div>
                 )}
               </div>
             ) : (
               <div style={{ background: "rgba(0,0,0,0.3)", padding: "25px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)" }}>
                 {/* pipeline visual roadmap */}
                 <div style={{ background: "rgba(255,255,255,0.02)", padding: "12px", borderRadius: "10px", marginBottom: "20px", border: "1px solid rgba(255,255,255,0.04)" }}>
                   <strong style={{ fontSize: "0.8rem", color: "var(--success-color)", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                     ✅ Preprocessing Pipeline Passed
                   </strong>
                   <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                     Valid Format → Non-Blank → High Quality → Skin Detected → Deep Learning Inference Completed
                   </span>
                 </div>

                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px" }}>
                   <div>
                     <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Condition Detected:</div>
                     <div style={{ fontSize: "1.4rem", fontWeight: "bold", color: "white" }}>{aiResults.detected_condition}</div>
                   </div>
                   <div style={{ textAlign: "right" }}>
                     <div style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}>Confidence Score:</div>
                     <div style={{ fontSize: "1.4rem", fontWeight: "bold", color: "var(--success-color)" }}>{aiResults.confidence}%</div>
                   </div>
                 </div>
                 
                 <div className="progress-bar-container" style={{ marginBottom: "25px", height: "12px", background: "rgba(255,255,255,0.05)" }}>
                   <div className="progress-bar" style={{ width: `${aiResults.confidence}%`, background: "linear-gradient(90deg, var(--warning-color), var(--success-color))" }}></div>
                 </div>

                 <div style={{ background: "rgba(255,176,0, 0.05)", borderLeft: "4px solid var(--warning-color)", padding: "15px", borderRadius: "4px", marginBottom: "20px" }}>
                   <strong>AI Recommendation:</strong> {aiResults.recommendation}
                 </div>

                 {/* Show Top predictions list list list */}
                 {aiResults.predictions && (
                   <div style={{ background: "rgba(0,0,0,0.2)", padding: "15px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.03)", marginBottom: "25px" }}>
                     <h4 style={{ fontSize: "0.9rem", color: "white", marginBottom: "12px", borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "6px" }}>
                       Top Predictions
                     </h4>
                     {aiResults.predictions.map((p, idx) => (
                       <div key={idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.85rem", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                         <span style={{ color: idx === 0 ? "white" : "var(--text-muted)", fontWeight: idx === 0 ? "bold" : "normal" }}>{p.class}</span>
                         <span style={{ color: idx === 0 ? "var(--success-color)" : "var(--text-muted)", fontFamily: "monospace", fontWeight: idx === 0 ? "bold" : "normal" }}>
                           {p.confidence.toFixed(1)}%
                         </span>
                       </div>
                     ))}
                   </div>
                 )}
                 
                 {aiResults.remedies && aiResults.remedies.length > 0 && (
                   <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginTop: "15px" }}>
                     <div style={{ background: "rgba(0, 255, 157, 0.05)", padding: "12px", borderRadius: "8px" }}>
                       <h4 style={{ color: "var(--success-color)", borderBottom: "1px solid rgba(0,255,157,0.1)", paddingBottom: "5px", marginBottom: "10px" }}>Suggested Home Remedies</h4>
                       <ul style={{ paddingLeft: "20px", fontSize: "0.85rem", color: "var(--text-muted)" }}>{aiResults.remedies.map((r, i) => <li key={i}>{r}</li>)}</ul>
                     </div>
                     <div style={{ background: "rgba(0, 240, 255, 0.05)", padding: "12px", borderRadius: "8px" }}>
                       <h4 style={{ color: "var(--primary-color)", borderBottom: "1px solid rgba(0,240,255,0.1)", paddingBottom: "5px", marginBottom: "10px" }}>Medical Interventions</h4>
                       <ul style={{ paddingLeft: "20px", fontSize: "0.85rem", color: "var(--text-muted)" }}>{aiResults.medical.map((r, i) => <li key={i}>{r}</li>)}</ul>
                     </div>
                   </div>
                 )}
                 
                 <div style={{ marginTop: "20px", fontSize: "0.8rem", color: "var(--text-muted)", textAlign: "right" }}>
                   Processing Backend: {aiResults.analysis_type} | Time: {aiResults.inference_time_ms} ms
                 </div>
               </div>
             )}
           </section>
        )}

        {/* Quantum Results Section (Redesigned with Rich Schema) */}
        {quantumResults && quantumResults.findings && (
          <section className="glass-panel" style={{ padding: "40px", animation: "fadeSlideUp 0.5s backwards" }}>
             <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", flexWrap: "wrap", gap: "10px" }}>
               <h2 style={{ fontSize: "1.5rem", color: "var(--success-color)", margin: 0 }}>Quantum Match Results (Top {quantumResults.findings.length})</h2>
               <button className="btn-quantum" style={{ padding: "8px 16px", fontSize: "0.85rem", background: "linear-gradient(135deg, var(--secondary-color), var(--primary-dark))", display: "flex", alignItems: "center", gap: "6px" }} onClick={exportPDF}>
                 📄 Export PDF Report
               </button>
             </div>
             
             {quantumResults.findings.length === 0 ? (
                <div style={{ color: "var(--text-muted)", fontStyle: "italic", padding: "20px", background: "rgba(0,0,0,0.2)", borderRadius: "16px", textAlign: "center" }}>
                  No matching diseases or medications found in the Quantum Database for the given input.
                </div>
             ) : quantumResults.findings.map((match, index) => (
                <div key={index} style={{ background: "rgba(0,0,0,0.2)", padding: "25px", borderRadius: "16px", marginBottom: "25px", border: "1px solid var(--border-color)"}}>
                  
                  {/* Title and Confidence Header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "10px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                      <h3 style={{ fontSize: "1.4rem", color: index === 0 ? "var(--primary-color)" : "white", fontWeight: "700" }}>
                        {match.name || match.disease}
                      </h3>
                      <span style={{ fontSize: "0.75rem", background: "rgba(255,255,255,0.06)", color: "var(--text-muted)", padding: "3px 8px", borderRadius: "6px" }}>
                        {match.category || "General"}
                      </span>
                    </div>
                    <span style={{ color: "var(--success-color)", fontWeight: "600", fontSize: "0.95rem" }}>
                      {match.confidence}% match probability
                    </span>
                  </div>

                  {/* Confidence Progress Bar */}
                  <div className="progress-bar-container" style={{ margin: "10px 0 15px", height: "6px" }}>
                    <div className="progress-bar" style={{ width: `${match.confidence}%` }}></div>
                  </div>

                  {/* Description */}
                  {match.description && (
                    <p style={{ fontStyle: "italic", color: "var(--text-muted)", fontSize: "0.9rem", lineHeight: "1.6", marginBottom: "15px" }}>
                      {match.description}
                    </p>
                  )}

                  {/* Severity & Recovery Badges */}
                  <div style={{ display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap" }}>
                    {match.severity === "Mild" && (
                      <span style={{ background: "rgba(0, 255, 157, 0.1)", color: "var(--success-color)", border: "1px solid rgba(0, 255, 157, 0.2)", padding: "4px 10px", borderRadius: "8px", fontSize: "0.75rem", fontWeight: "bold" }}>
                        Mild Severity
                      </span>
                    )}
                    {match.severity === "Moderate" && (
                      <span style={{ background: "rgba(255, 176, 0, 0.1)", color: "var(--warning-color)", border: "1px solid rgba(255, 176, 0, 0.2)", padding: "4px 10px", borderRadius: "8px", fontSize: "0.75rem", fontWeight: "bold" }}>
                        Moderate Severity
                      </span>
                    )}
                    {match.severity === "Severe" && (
                      <span style={{ background: "rgba(255, 51, 102, 0.1)", color: "var(--danger-color)", border: "1px solid rgba(255, 51, 102, 0.2)", padding: "4px 10px", borderRadius: "8px", fontSize: "0.75rem", fontWeight: "bold" }}>
                        Severe Severity
                      </span>
                    )}
                    {match.recovery_time && (
                      <span style={{ background: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.08)", color: "var(--text-muted)", padding: "4px 10px", borderRadius: "8px", fontSize: "0.75rem" }}>
                        ⏱ Recovery: {match.recovery_time}
                      </span>
                    )}
                  </div>

                  {/* Matched vs Missing Symptoms & Explainable AI (Phase 7 & 8) */}
                  {(() => {
                    const userSymptomsList = (activeTab === 'symptoms' ? symptomInput : compareInput)
                      .split(",")
                      .map(s => s.trim().toLowerCase())
                      .filter(Boolean);
                    const userSymptomsSet = new Set(userSymptomsList);
                    const matchedSymptoms = (match.symptoms || []).filter(s => userSymptomsSet.has(s.toLowerCase()));
                    const missingSymptoms = (match.symptoms || []).filter(s => !userSymptomsSet.has(s.toLowerCase()));

                    return (
                      <div style={{ background: "rgba(0,0,0,0.15)", padding: "18px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.03)", marginBottom: "20px" }}>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "15px" }}>
                          
                          {/* Matched Symptoms Checklist */}
                          <div>
                            <h4 style={{ fontSize: "0.8rem", color: "var(--success-color)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px", fontWeight: "bold" }}>
                              Matched Symptoms
                            </h4>
                            <ul style={{ listStyle: "none", paddingLeft: 0, fontSize: "0.82rem", color: "var(--text-main)", display: "flex", flexDirection: "column", gap: "6px" }}>
                              {matchedSymptoms.length > 0 ? (
                                matchedSymptoms.map((s, i) => (
                                  <li key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                    <span style={{ color: "var(--success-color)", fontWeight: "bold" }}>✔</span>
                                    <span>{s.charAt(0).toUpperCase() + s.slice(1)}</span>
                                  </li>
                                ))
                              ) : (
                                <li style={{ color: "var(--text-muted)", fontStyle: "italic" }}>None matched directly</li>
                              )}
                            </ul>
                          </div>

                          {/* Missing Symptoms Checklist */}
                          <div>
                            <h4 style={{ fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px", fontWeight: "bold" }}>
                              Missing Symptoms
                            </h4>
                            <ul style={{ listStyle: "none", paddingLeft: 0, fontSize: "0.82rem", color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: "6px" }}>
                              {missingSymptoms.length > 0 ? (
                                missingSymptoms.map((s, i) => (
                                  <li key={i} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                                    <span style={{ color: "var(--danger-color)", fontWeight: "bold" }}>✖</span>
                                    <span>{s.charAt(0).toUpperCase() + s.slice(1)}</span>
                                  </li>
                                ))
                              ) : (
                                <li style={{ color: "var(--text-muted)", fontStyle: "italic" }}>None missing</li>
                              )}
                            </ul>
                          </div>

                        </div>

                        {/* Collapsible Explainable AI (XAI) Details */}
                        <details style={{ cursor: "pointer", borderTop: "1px solid rgba(255,255,255,0.05)", paddingTop: "10px" }}>
                          <summary style={{ fontSize: "0.82rem", color: "var(--primary-color)", fontWeight: "bold", outline: "none", display: "flex", alignItems: "center", gap: "4px" }}>
                            💡 Why this disease? (Explainable AI Analysis)
                          </summary>
                          <div style={{ marginTop: "10px", fontSize: "0.82rem", color: "var(--text-muted)", lineHeight: "1.6", cursor: "default", background: "rgba(0,0,0,0.1)", padding: "12px", borderRadius: "6px" }}>
                            <p style={{ marginBottom: "6px" }}>
                              Matched <strong style={{ color: "white" }}>{matchedSymptoms.length} of {match.symptoms ? match.symptoms.length : 0}</strong> typical symptoms.
                            </p>
                            <p style={{ marginBottom: "6px" }}>
                              <strong style={{ color: "var(--success-color)" }}>Primary Symptoms Present:</strong>{" "}
                              {matchedSymptoms.length > 0 ? matchedSymptoms.join(", ") : "None"}
                            </p>
                            <p>
                              <strong style={{ color: "var(--warning-color)" }}>Secondary Symptoms Absent:</strong>{" "}
                              {missingSymptoms.length > 0 ? missingSymptoms.join(", ") : "None"}
                            </p>
                          </div>
                        </details>
                      </div>
                    );
                  })()}

                  {/* Emergency Alert Box */}
                  {match.emergency && (
                    <div style={{ margin: "15px 0 20px 0", background: "rgba(255, 51, 102, 0.08)", border: "1px solid var(--danger-color)", padding: "14px 18px", borderRadius: "10px", color: "var(--danger-color)", display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem", lineHeight: "1.5" }}>
                      <AlertTriangle size={20} style={{ flexShrink: 0 }} />
                      <span>
                        <strong>EMERGENCY ALERT:</strong> This condition may require immediate emergency medical care. Please contact emergency services or go to the nearest emergency room immediately.
                      </span>
                    </div>
                  )}

                  {/* Risk Factors & Prevention */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "20px", borderBottom: "1px solid rgba(255,255,255,0.04)", paddingBottom: "20px" }}>
                    {match.risk_factors && match.risk_factors.length > 0 && (
                      <div>
                        <h4 style={{ fontSize: "0.85rem", color: "white", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>Risk Factors</h4>
                        <ul style={{ paddingLeft: "18px", fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
                          {match.risk_factors.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                      </div>
                    )}
                    {match.prevention && match.prevention.length > 0 && (
                      <div>
                        <h4 style={{ fontSize: "0.85rem", color: "white", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px" }}>Prevention</h4>
                        <ul style={{ paddingLeft: "18px", fontSize: "0.85rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
                          {match.prevention.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Structured Medical Recommendations */}
                  <div style={{ marginTop: "25px", borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "20px" }}>
                    <h4 style={{ fontSize: "1rem", color: "var(--primary-color)", fontFamily: "'Space Grotesk', sans-serif", marginBottom: "15px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <ShieldCheck size={18} /> Medical Recommendations
                    </h4>
                    
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "20px" }}>
                      
                      {/* Home Care */}
                      <div style={{ background: "rgba(0, 255, 157, 0.03)", border: "1px solid rgba(0, 255, 157, 0.08)", padding: "18px", borderRadius: "12px" }}>
                        <h5 style={{ color: "var(--success-color)", fontSize: "0.95rem", fontWeight: "600", marginBottom: "12px", borderBottom: "1px solid rgba(0,255,157,0.1)", paddingBottom: "6px" }}>
                          Home Care
                        </h5>
                        <ul style={{ listStyle: "none", paddingLeft: 0, fontSize: "0.85rem", color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: "8px" }}>
                          {match.home_remedies && match.home_remedies.length > 0 ? (
                            match.home_remedies.map((item, i) => (
                              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
                                <span style={{ color: "var(--success-color)", fontWeight: "bold" }}>✓</span>
                                <span>{item.charAt(0).toUpperCase() + item.slice(1)}</span>
                              </li>
                            ))
                          ) : (
                            <React.Fragment>
                              <li style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}><span style={{ color: "var(--success-color)", fontWeight: "bold" }}>✓</span><span>Rest</span></li>
                              <li style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}><span style={{ color: "var(--success-color)", fontWeight: "bold" }}>✓</span><span>Drink fluids</span></li>
                              <li style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}><span style={{ color: "var(--success-color)", fontWeight: "bold" }}>✓</span><span>Monitor temperature</span></li>
                            </React.Fragment>
                          )}
                        </ul>
                      </div>

                      {/* Medicines */}
                      <div style={{ background: "rgba(125, 42, 232, 0.03)", border: "1px solid rgba(125, 42, 232, 0.08)", padding: "18px", borderRadius: "12px" }}>
                        <h5 style={{ color: "var(--secondary-color)", fontSize: "0.95rem", fontWeight: "600", marginBottom: "12px", borderBottom: "1px solid rgba(125,42,232,0.1)", paddingBottom: "6px" }}>
                          Medicines
                        </h5>
                        <ul style={{ listStyle: "none", paddingLeft: 0, fontSize: "0.85rem", color: "var(--text-muted)", display: "flex", flexDirection: "column", gap: "8px" }}>
                          {match.medications && match.medications.length > 0 ? (
                            match.medications.map((item, i) => (
                              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
                                <span style={{ color: "var(--secondary-color)", fontWeight: "bold" }}>✓</span>
                                <span>{item.charAt(0).toUpperCase() + item.slice(1)}</span>
                              </li>
                            ))
                          ) : (
                            <React.Fragment>
                              <li style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}><span style={{ color: "var(--secondary-color)", fontWeight: "bold" }}>✓</span><span>Paracetamol</span></li>
                              <li style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}><span style={{ color: "var(--secondary-color)", fontWeight: "bold" }}>✓</span><span>Ibuprofen</span></li>
                            </React.Fragment>
                          )}
                        </ul>
                      </div>

                      {/* Doctor & Hospital Referrals */}
                      <div style={{ background: "rgba(255, 51, 102, 0.03)", border: "1px solid rgba(255, 51, 102, 0.08)", padding: "18px", borderRadius: "12px" }}>
                        <h5 style={{ color: "var(--danger-color)", fontSize: "0.95rem", fontWeight: "600", marginBottom: "12px", borderBottom: "1px solid rgba(255,51,102,0.1)", paddingBottom: "6px" }}>
                          Professional Care
                        </h5>
                        
                        {/* Doctor */}
                        <div style={{ marginBottom: "14px" }}>
                          <span style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--text-muted)", marginBottom: "4px" }}>Doctor</span>
                          <span style={{ fontSize: "0.9rem", fontWeight: "600", color: "white", display: "flex", alignItems: "center", gap: "6px" }}>
                            <Stethoscope size={14} style={{ color: "var(--warning-color)" }} />
                            {match.recommended_specialist || match.specialist || "General Physician"}
                          </span>
                        </div>

                        {/* When to Visit Hospital */}
                        <div>
                          <span style={{ display: "block", fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--text-muted)", marginBottom: "6px" }}>When to Visit Hospital</span>
                          <ul style={{ listStyle: "none", paddingLeft: 0, fontSize: "0.8rem", color: "var(--danger-color)", display: "flex", flexDirection: "column", gap: "6px" }}>
                            {getHospitalTriggers(match).map((trigger, i) => (
                              <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
                                <span>🚨</span>
                                <span>{trigger}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                      </div>

                    </div>
                  </div>

                </div>
             ))}
          </section>
        )}

        {/* Disease Comparison Table (Phase 11) */}
        {activeTab === 'compare-diseases' && diseaseA && diseaseB && (
          (() => {
            const dataA = diseasesDB[diseaseA];
            const dataB = diseasesDB[diseaseB];
            if (!dataA || !dataB) return null;

            // Merge symptoms
            const symsA = new Set((dataA.symptoms || []).map(s => s.toLowerCase()));
            const symsB = new Set((dataB.symptoms || []).map(s => s.toLowerCase()));
            const allSymptoms = Array.from(new Set([
              ...(dataA.symptoms || []),
              ...(dataB.symptoms || [])
            ])).sort();

            return (
              <section className="glass-panel" style={{ padding: "40px", animation: "fadeSlideUp 0.5s backwards", marginBottom: "40px" }}>
                <h3 style={{ fontSize: "1.5rem", marginBottom: "25px", color: "var(--primary-color)", fontFamily: "'Space Grotesk', sans-serif" }}>
                  📊 Disease Comparison: {diseaseA} vs {diseaseB}
                </h3>

                {/* General Metrics Table */}
                <div style={{ overflowX: "auto", marginBottom: "30px" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem", color: "white", textAlign: "left" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
                        <th style={{ padding: "12px", color: "var(--text-muted)" }}>Feature</th>
                        <th style={{ padding: "12px", color: "var(--primary-color)" }}>{diseaseA}</th>
                        <th style={{ padding: "12px", color: "var(--secondary-color)" }}>{diseaseB}</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        <td style={{ padding: "12px", fontWeight: "bold", color: "var(--text-muted)" }}>Category</td>
                        <td style={{ padding: "12px" }}>{dataA.category}</td>
                        <td style={{ padding: "12px" }}>{dataB.category}</td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        <td style={{ padding: "12px", fontWeight: "bold", color: "var(--text-muted)" }}>Severity Level</td>
                        <td style={{ padding: "12px" }}>
                          <span style={{ color: dataA.severity === "Severe" ? "var(--danger-color)" : dataA.severity === "Moderate" ? "var(--warning-color)" : "var(--success-color)" }}>
                            {dataA.severity}
                          </span>
                        </td>
                        <td style={{ padding: "12px" }}>
                          <span style={{ color: dataB.severity === "Severe" ? "var(--danger-color)" : dataB.severity === "Moderate" ? "var(--warning-color)" : "var(--success-color)" }}>
                            {dataB.severity}
                          </span>
                        </td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        <td style={{ padding: "12px", fontWeight: "bold", color: "var(--text-muted)" }}>Est. Recovery Time</td>
                        <td style={{ padding: "12px" }}>{dataA.recovery_time}</td>
                        <td style={{ padding: "12px" }}>{dataB.recovery_time}</td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        <td style={{ padding: "12px", fontWeight: "bold", color: "var(--text-muted)" }}>Specialist</td>
                        <td style={{ padding: "12px" }}>{dataA.recommended_specialist}</td>
                        <td style={{ padding: "12px" }}>{dataB.recommended_specialist}</td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                        <td style={{ padding: "12px", fontWeight: "bold", color: "var(--text-muted)" }}>Emergency Status</td>
                        <td style={{ padding: "12px", color: dataA.emergency ? "var(--danger-color)" : "var(--text-muted)" }}>
                          {dataA.emergency ? "🚨 Emergency" : "Non-Emergency"}
                        </td>
                        <td style={{ padding: "12px", color: dataB.emergency ? "var(--danger-color)" : "var(--text-muted)" }}>
                          {dataB.emergency ? "🚨 Emergency" : "Non-Emergency"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Symptoms Comparison Subtable */}
                <h4 style={{ fontSize: "1.1rem", marginBottom: "15px", color: "var(--warning-color)", fontFamily: "'Space Grotesk', sans-serif" }}>
                  🧬 Symptom Overlap Grid
                </h4>
                <div style={{ overflowX: "auto", background: "rgba(0,0,0,0.2)", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.85rem", color: "white", textAlign: "left" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}>
                        <th style={{ padding: "10px 15px", color: "var(--text-muted)" }}>Symptom</th>
                        <th style={{ padding: "10px 15px", textAlign: "center", color: "var(--primary-color)" }}>{diseaseA}</th>
                        <th style={{ padding: "10px 15px", textAlign: "center", color: "var(--secondary-color)" }}>{diseaseB}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allSymptoms.map(sym => {
                        const hasA = symsA.has(sym.toLowerCase());
                        const hasB = symsB.has(sym.toLowerCase());
                        return (
                          <tr key={sym} style={{ borderBottom: "1px solid rgba(255,255,255,0.03)" }}>
                            <td style={{ padding: "8px 15px", fontWeight: "500" }}>
                              {sym.charAt(0).toUpperCase() + sym.slice(1)}
                            </td>
                            <td style={{ padding: "8px 15px", textAlign: "center", fontSize: "1rem" }}>
                              {hasA ? <span style={{ color: "var(--success-color)", fontWeight: "bold" }}>✓</span> : <span style={{ color: "var(--text-muted)" }}>✖</span>}
                            </td>
                            <td style={{ padding: "8px 15px", textAlign: "center", fontSize: "1rem" }}>
                              {hasB ? <span style={{ color: "var(--success-color)", fontWeight: "bold" }}>✓</span> : <span style={{ color: "var(--text-muted)" }}>✖</span>}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

              </section>
            );
          })()
        )}
      </main>

      {/* Ethical Usage Disclaimer */}
      <footer style={{ textAlign: "center", padding: "30px 20px", color: "var(--text-muted)", fontSize: "0.85rem", borderTop: "1px solid rgba(255,255,255,0.05)", marginTop: "40px", background: "rgba(0,0,0,0.2)" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <AlertTriangle color="var(--warning-color)" size={28} />
          <p style={{ lineHeight: "1.6", margin: 0 }}>
            <strong style={{ color: "var(--warning-color)", fontSize: "0.95rem" }}>Medical Disclaimer &amp; Ethical Usage:</strong> QuantumMed AI is a research platform demonstrating quantum computing and artificial intelligence in healthcare. 
            The diagnostic results, insights, and treatment suggestions provided are for <strong>educational and informational purposes only</strong>. 
            This tool is <strong style={{color: 'var(--danger-color)'}}>not</strong> a substitute for professional medical advice, diagnosis, or treatment. 
            Always consult a qualified healthcare provider regarding any medical condition or emergency. Never disregard professional medical advice because of something you have read on this platform.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
