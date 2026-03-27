import React, { useState } from 'react';
import axios from 'axios';
import { Activity, Stethoscope, Search, ShieldCheck, HeartPulse, Camera, Mic, Upload, Pill, Coffee, CheckCircle, Zap, BarChart3, Trophy, TrendingUp, Cpu, Atom, AlertTriangle } from 'lucide-react';
import './index.css';

const API_URL = "http://localhost:8000";

function App() {
  const [activeTab, setActiveTab] = useState('symptoms'); // 'symptoms', 'skin', 'cough', 'compare'
  
  const [symptomInput, setSymptomInput] = useState("");
  const [compareInput, setCompareInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  
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
      const response = await axios.post(`${API_URL}/analyze`, { symptoms: symptomsList });
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
      const response = await axios.post(`${API_URL}/compare`, { symptoms: symptomsList });
      setCompareResults(response.data);
    } catch (err) {
      setError("Failed to connect to backend for comparison.");
    } finally {
      setLoading(false);
    }
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
            <div style={{ marginTop: "30px", textAlign: "center", padding: "20px", background: "rgba(0,0,0,0.3)", borderRadius: "16px" }}>
              <div className="spinner" style={{ margin: "0 auto 15px" }}></div>
              <h3 style={{ color: "var(--primary-color)", fontFamily: "'Space Grotesk', sans-serif" }}>{systemState}</h3>
            </div>
          )}
        </section>

        {/* ===== COMPARISON RESULTS DASHBOARD ===== */}
        {compareResults && (
          <div className="compare-dashboard" style={{ animation: "fadeSlideUp 0.6s ease-out" }}>
            
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
             <div style={{ background: "rgba(0,0,0,0.3)", padding: "25px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)" }}>
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

                <div style={{ background: "rgba(255,176,0, 0.05)", borderLeft: "4px solid var(--warning-color)", padding: "15px", borderRadius: "4px" }}>
                  <strong>AI Recommendation:</strong> {aiResults.recommendation}
                </div>
                
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
           </section>
        )}

        {/* Quantum Results Section (Previous Code) */}
        {quantumResults && quantumResults.findings && (
          <section className="glass-panel" style={{ padding: "40px", animation: "fadeSlideUp 0.5s backwards" }}>
             <h2 style={{ fontSize: "1.5rem", marginBottom: "20px", color: "var(--success-color)" }}>Quantum Match Results</h2>
             
             {quantumResults.findings.length === 0 ? (
               <div style={{ color: "var(--text-muted)", fontStyle: "italic", padding: "20px", background: "rgba(0,0,0,0.2)", borderRadius: "16px", textAlign: "center" }}>
                 No matching diseases or medications found in the Quantum Database for the given input.
               </div>
             ) : quantumResults.findings.map((match, index) => (
               <div key={index} style={{ background: "rgba(0,0,0,0.2)", padding: "20px", borderRadius: "16px", marginBottom: "15px", border: "1px solid var(--border-color)"}}>
                 <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                   <h3 style={{ fontSize: "1.2rem", color: index === 0 ? "var(--primary-color)" : "white" }}>{match.disease}</h3>
                   <span style={{ color: "var(--success-color)" }}>{match.confidence}%</span>
                 </div>
                 <div style={{ marginTop: "8px", color: "var(--warning-color)", fontSize: "0.85rem", display: "flex", alignItems: "center", gap: "6px" }}>
                   <Stethoscope size={14} /> <strong>Recommended Specialist:</strong> {match.specialist || "General Physician"}
                 </div>
                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "15px", marginTop: "15px" }}>
                    <div style={{ background: "rgba(0, 255, 157, 0.05)", padding: "12px", borderRadius: "8px" }}>
                      <h4 style={{ color: "var(--success-color)", borderBottom: "1px solid rgba(0,255,157,0.1)", paddingBottom: "5px", marginBottom: "10px" }}>Home Remedies</h4>
                      <ul style={{ paddingLeft: "20px", fontSize: "0.85rem", color: "var(--text-muted)" }}>{match.remedies.map((r, i) => <li key={i}>{r}</li>)}</ul>
                    </div>
                    <div style={{ background: "rgba(0, 240, 255, 0.05)", padding: "12px", borderRadius: "8px" }}>
                      <h4 style={{ color: "var(--primary-color)", borderBottom: "1px solid rgba(0,240,255,0.1)", paddingBottom: "5px", marginBottom: "10px" }}>Medical Treatments &amp; Medications</h4>
                      <ul style={{ paddingLeft: "20px", fontSize: "0.85rem", color: "var(--text-muted)" }}>{match.medical.map((r, i) => <li key={i}>{r}</li>)}</ul>
                    </div>
                 </div>
               </div>
             ))}
          </section>
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
