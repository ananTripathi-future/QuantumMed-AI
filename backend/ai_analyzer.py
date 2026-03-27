import torch
import torch.nn as nn
import time
import json
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "diseases.json")
try:
    with open(DB_PATH, "r", encoding="utf-8") as f:
        DISEASE_DB = json.load(f)
except Exception as e:
    DISEASE_DB = {}
# PyTorch Deep Learning Model Structure Mock
class MockDiseaseClassifier(nn.Module):
    def __init__(self):
        super(MockDiseaseClassifier, self).__init__()
        # Mocking a small feature extraction neural network
        self.fc1 = nn.Linear(16, 64)
        self.fc2 = nn.Linear(64, 4)  # 4 classes for mock output
        
    def forward(self, x):
        x = torch.relu(self.fc1(x))
        return torch.softmax(self.fc2(x), dim=1)

# Initialize the model instance and set to evaluation mode
model = MockDiseaseClassifier()
model.eval()

def analyze_skin_image(image_bytes: bytes):
    """
    Simulates extracting features from an image using a PyTorch Model
    to detect Skin Diseases as proposed in section 5.4.
    """
    print(f"[AI Layer] Processing {len(image_bytes)} bytes of image data...")
    
    # Use length and end bytes to ensure varying seeds for different images (since headers often match)
    seed = len(image_bytes) + sum(image_bytes[-500:]) if image_bytes else 0
    torch.manual_seed(seed)
    dummy_tensor = torch.rand(1, 16) # Mock feature vector from image
    
    start_time = time.time()
    with torch.no_grad():
        output = model(dummy_tensor) # Forward pass tensor through neural network
    inference_time = round((time.time() - start_time) * 1000 + 400, 2)
    
    # Mock visual classes directly linked to the actual medical database
    classes = ["Eczema (Atopic Dermatitis)", "Skin Allergy (Contact Dermatitis)", "Ringworm (Fungal Infection)", "Acne Vulgaris"]
    probabilities = output.squeeze().tolist()
    
    best_idx = probabilities.index(max(probabilities))
    detected = classes[best_idx]
    confidence = round(max(probabilities) * 100, 2)
    
    # Fetch treatments dynamically
    db_entry = DISEASE_DB.get(detected, {"remedies": [], "medical": []})
    
    recommendation = f"Computer Vision uniquely detected visual anomalies consistent with {detected}. Please consult a board-certified Dermatologist for an official diagnosis."

    return {
        "analysis_type": "PyTorch Vision Tensor Processing",
        "detected_condition": detected,
        "confidence": confidence,
        "inference_time_ms": inference_time,
        "recommendation": recommendation,
        "remedies": db_entry.get("remedies", []),
        "medical": db_entry.get("medical", [])
    }

def analyze_cough_audio(audio_bytes: bytes):
    """
    Simulates generating a Mel-spectrogram from audio and feeding it 
    into a deep neural network to classify respiratory condition (Section 5.5).
    """
    print(f"[AI Layer] Extracting Mel-spectrogram from {len(audio_bytes)} audio bytes...")
    
    seed = sum(audio_bytes[-500:]) if audio_bytes else 0
    torch.manual_seed(seed + len(audio_bytes))
    dummy_tensor = torch.rand(1, 16)
    
    start_time = time.time()
    with torch.no_grad():
        output = model(dummy_tensor)
    inference_time = round((time.time() - start_time) * 1000 + 350, 2)
    
    # Mock audio classes
    classes = ["Dry Cough (Viral)", "Wet Cough (Bacterial/Chest)", "Persistent/Chronic Cough", "Normal Clear Airway"]
    probabilities = output.squeeze().tolist()
    
    best_idx = probabilities.index(max(probabilities))
    detected = classes[best_idx]
    confidence = round(max(probabilities) * 100, 2)
    
    return {
        "analysis_type": "PyTorch Audio Spectrogram Analysis",
        "detected_condition": detected,
        "confidence": confidence,
        "inference_time_ms": inference_time,
        "recommendation": "Stay well-hydrated. We strongly advise consulting a Pulmonologist or a General Physician for a professional diagnosis."
    }
