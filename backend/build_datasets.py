import json
import csv
import os
import urllib.request
import random
import numpy as np

# Absolute paths
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BACKEND_DIR = os.path.join(BASE_DIR, "backend")
DISEASES_JSON_PATH = os.path.join(BACKEND_DIR, "diseases.json")
SYMPTOMS_CSV_PATH = os.path.join(BACKEND_DIR, "symptoms.csv")
PATIENT_HISTORY_CSV_PATH = os.path.join(BACKEND_DIR, "patient_history.csv")

print(f"Backend directory: {BACKEND_DIR}")

# 1. Load diseases.json
if not os.path.exists(DISEASES_JSON_PATH):
    raise FileNotFoundError(f"Cannot find diseases.json at {DISEASES_JSON_PATH}")

with open(DISEASES_JSON_PATH, "r", encoding="utf-8") as f:
    disease_db = json.load(f)

# Extract all unique symptoms from diseases.json
db_symptoms = set()
for disease_name, info in disease_db.items():
    for sym in info.get("symptoms", []):
        db_symptoms.add(sym.strip().lower())

db_symptoms = sorted(list(db_symptoms))
print(f"Found {len(disease_db)} diseases and {len(db_symptoms)} unique symptoms in diseases.json")

# 2. Download raw ML training dataset
raw_url = "https://raw.githubusercontent.com/anujdutt9/Disease-Prediction-from-Symptoms/master/dataset/training_data.csv"
temp_raw_path = os.path.join(BACKEND_DIR, "raw_training_data.csv")

print("Downloading legitimate training data...")
req = urllib.request.Request(raw_url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as response:
    raw_content = response.read().decode('utf-8')
    with open(temp_raw_path, "w", encoding="utf-8") as f:
        f.write(raw_content)
print("Download complete.")

# 3. Read and parse raw dataset
raw_rows = []
raw_symptoms_headers = []
with open(temp_raw_path, "r", encoding="utf-8") as f:
    reader = csv.reader(f)
    headers = next(reader)
    raw_symptoms_headers = [h.strip().lower().replace("_", " ") for h in headers[:-1]]
    for row in reader:
        if row:
            raw_rows.append(row)

print(f"Raw dataset contains {len(raw_rows)} records and {len(raw_symptoms_headers)} symptom features")

# Clean up temp file
if os.path.exists(temp_raw_path):
    os.remove(temp_raw_path)

# Map raw disease names to diseases.json names
# Let's write a standardizer for disease names
def normalize_disease_name(name):
    name = name.strip().lower().replace("(", "").replace(")", "").replace("  ", " ")
    name = name.replace("peptic ulcer diseae", "peptic ulcer disease")
    name = name.replace("dimorphic hemmorhoids(piles)", "piles")
    name = name.replace("dimorphic hemmorhoids piles", "piles")
    return name

db_disease_map = {normalize_disease_name(k): k for k in disease_db.keys()}

# Let's align all symptoms
# Combine all unique symptoms from raw dataset + diseases.json to create a master list of symptoms
master_symptoms = sorted(list(set(db_symptoms) | set(raw_symptoms_headers)))
print(f"Master symptom list size: {len(master_symptoms)}")

# 4. Generate symptoms.csv ML training data (Preprocessed observations)
# We will generate 50 rows per disease for all 90+ diseases.
# For diseases present in the raw training dataset, we map and augment their actual observations.
# For others, we generate realistic binary observations based on diseases.json definitions.
symptoms_csv_rows = []

# Map raw rows by prognosis name
raw_by_disease = {}
for row in raw_rows:
    prog = row[-1].strip()
    norm_prog = normalize_disease_name(prog)
    if norm_prog not in raw_by_disease:
        raw_by_disease[norm_prog] = []
    raw_by_disease[norm_prog].append(row[:-1])

random.seed(42)

for disease_name, info in disease_db.items():
    norm_db_name = normalize_disease_name(disease_name)
    db_symptom_set = set(s.strip().lower() for s in info.get("symptoms", []))
    
    # Check if we have empirical observations in the raw dataset
    matching_raw_data = []
    for k, rows in raw_by_disease.items():
        if k in norm_db_name or norm_db_name in k:
            matching_raw_data.extend(rows)
            
    if matching_raw_data:
        # Use and augment these actual observations
        for i in range(50):
            # Take a base observation from the empirical dataset
            base_obs = random.choice(matching_raw_data)
            row_dict = {sym: 0 for sym in master_symptoms}
            
            # Map raw symptoms to master list
            for raw_idx, val in enumerate(base_obs):
                if val == '1':
                    raw_sym = raw_symptoms_headers[raw_idx]
                    if raw_sym in row_dict:
                        row_dict[raw_sym] = 1
            
            # Introduce minor clinical variation (dropout of symptoms or additional secondary symptoms)
            for sym in db_symptom_set:
                if sym in row_dict:
                    # Guarantee primary symptoms are mostly present (85% probability)
                    if random.random() < 0.85:
                        row_dict[sym] = 1
            
            row_list = [disease_name] + [row_dict[sym] for sym in master_symptoms]
            symptoms_csv_rows.append(row_list)
    else:
        # Generate 50 realistic patient observations based on diseases.json details
        for _ in range(50):
            row_dict = {sym: 0 for sym in master_symptoms}
            for sym in master_symptoms:
                if sym in db_symptom_set:
                    # Primary symptoms present with 85% probability
                    if random.random() < 0.85:
                        row_dict[sym] = 1
                else:
                    # Rare background symptoms present with 2% probability (noise)
                    if random.random() < 0.02:
                        row_dict[sym] = 1
            row_list = [disease_name] + [row_dict[sym] for sym in master_symptoms]
            symptoms_csv_rows.append(row_list)

# Save symptoms.csv
with open(SYMPTOMS_CSV_PATH, "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["disease"] + master_symptoms)
    writer.writerows(symptoms_csv_rows)

print(f"Generated symptoms.csv containing {len(symptoms_csv_rows)} observations.")

# 5. Generate patient_history.csv (Demographic and Clinical observations)
# Columns: age, sex, symptoms, duration, previous_conditions, risk_factors, disease
patient_history_rows = []

durations = ["2 days", "3 days", "5 days", "1 week", "2 weeks", "3 weeks", "1 month"]
conditions_list = ["Hypertension", "Type 2 Diabetes", "Asthma", "Hypercholesterolemia", "Mild Obesity", "None", "None", "None"]

for i in range(1200):  # Generate 1200 high-fidelity historical patient cases
    disease_name = random.choice(list(disease_db.keys()))
    info = disease_db[disease_name]
    
    # Age distribution based on disease properties / category
    category = info.get("category", "").lower()
    severity = info.get("severity", "").lower()
    
    if "pediatrics" in category:
        age = random.randint(1, 14)
    elif "geriatrics" in category or "oncology" in category or "cardiology" in category:
        age = random.randint(50, 88)
    else:
        age = random.randint(18, 65)
        
    # Sex distribution
    if "gynecology" in category:
        sex = "Female"
    else:
        sex = random.choice(["Male", "Female"])
        
    # Symptoms list (random subset of the disease's typical symptoms)
    db_syms = info.get("symptoms", [])
    num_syms = random.randint(max(1, len(db_syms)-2), len(db_syms))
    selected_syms = random.sample(db_syms, k=min(num_syms, len(db_syms)))
    symptoms_str = ";".join(selected_syms)
    
    # Duration based on severity
    if severity == "severe":
        duration = random.choice(["1 week", "2 weeks", "3 weeks"])
    else:
        duration = random.choice(["2 days", "3 days", "5 days", "1 week"])
        
    # Previous conditions
    prev_cond = random.choice(conditions_list)
    if prev_cond != "None" and age < 20:
        prev_cond = "None"
        
    # Risk factors from the disease database
    r_factors = info.get("risk_factors", [])
    if r_factors:
        r_f_selected = random.sample(r_factors, k=random.randint(0, min(2, len(r_factors))))
        risk_factors_str = ";".join(r_f_selected) if r_f_selected else "None"
    else:
        risk_factors_str = "None"
        
    patient_history_rows.append([
        age,
        sex,
        symptoms_str,
        duration,
        prev_cond,
        risk_factors_str,
        disease_name
    ])

# Save patient_history.csv
with open(PATIENT_HISTORY_CSV_PATH, "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["age", "sex", "symptoms", "duration", "previous_conditions", "risk_factors", "disease"])
    writer.writerows(patient_history_rows)

print(f"Generated patient_history.csv containing {len(patient_history_rows)} patient records.")
print("Dataset generation complete!")
