import os
import time
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import SVC
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_recall_fscore_support

# Check if xgboost is available
try:
    import xgboost as xgb
    HAS_XGB = True
except ImportError:
    HAS_XGB = False

def get_ml_metrics():
    """
    Loads symptoms.csv, trains and evaluates the recommended ML Models:
    1. Random Forest (Symptom Prediction ⭐)
    2. Decision Tree (Comparison)
    3. XGBoost / Gradient Boosting (Comparison)
    4. SVM (Comparison)
    5. Logistic Regression (Comparison)
    """
    backend_dir = os.path.dirname(os.path.abspath(__file__))
    s_csv = os.path.join(backend_dir, "symptoms.csv")
    
    if not os.path.exists(s_csv):
        print(f"[ML Engine] symptoms.csv not found at {s_csv}")
        return []
        
    try:
        # Load dataset
        df = pd.read_csv(s_csv)
        X = df.drop(columns=["disease"])
        y = df["disease"]
        
        # Split train/test
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        models = {
            "Random Forest": RandomForestClassifier(n_estimators=30, random_state=42, n_jobs=-1),
            "Decision Tree": DecisionTreeClassifier(random_state=42),
            "SVM": SVC(kernel='linear', C=1.0, probability=True, random_state=42),
            "Logistic Regression": LogisticRegression(max_iter=100, random_state=42)
        }
        
        if HAS_XGB:
            # Map target string classes to integers for XGBoost
            from sklearn.preprocessing import LabelEncoder
            le = LabelEncoder()
            y_train_encoded = le.fit_transform(y_train)
            y_test_encoded = le.transform(y_test)
            models["XGBoost"] = xgb.XGBClassifier(use_label_encoder=False, eval_metric='mlogloss', random_state=42)
        else:
            models["XGBoost (Gradient Boosting)"] = GradientBoostingClassifier(n_estimators=30, random_state=42)
            
        comparison_results = []
        
        for name, clf in models.items():
            start_train = time.time()
            if "XGBoost" == name and HAS_XGB:
                clf.fit(X_train, y_train_encoded)
                train_time = round((time.time() - start_train) * 1000, 2)
                
                start_inf = time.time()
                y_pred = clf.predict(X_test)
                inf_time = round((time.time() - start_inf) * 1000 / len(y_test), 4)
                
                y_pred_decoded = le.inverse_transform(y_pred)
                accuracy = accuracy_score(y_test, y_pred_decoded)
                precision, recall, f1, _ = precision_recall_fscore_support(y_test, y_pred_decoded, average='weighted', zero_division=0)
            else:
                clf.fit(X_train, y_train)
                train_time = round((time.time() - start_train) * 1000, 2)
                
                start_inf = time.time()
                y_pred = clf.predict(X_test)
                inf_time = round((time.time() - start_inf) * 1000 / len(y_test), 4)
                
                accuracy = accuracy_score(y_test, y_pred)
                precision, recall, f1, _ = precision_recall_fscore_support(y_test, y_pred, average='weighted', zero_division=0)
                
            comparison_results.append({
                "model_name": name,
                "accuracy": round(accuracy * 100, 2),
                "precision": round(precision * 100, 2),
                "recall": round(recall * 100, 2),
                "f1_score": round(f1 * 100, 2),
                "training_time_ms": train_time,
                "inference_time_ms": inf_time,
                "recommended": "Highly Recommended" if "Random Forest" in name else "Baseline"
            })
            
        # Save the Random Forest model and column headers for prediction persistence
        rf_model = models["Random Forest"]
        models_dir = os.path.join(backend_dir, "models")
        if not os.path.exists(models_dir):
            os.makedirs(models_dir)
            
        import pickle
        with open(os.path.join(models_dir, "symptom_random_forest.pkl"), "wb") as f:
            pickle.dump(rf_model, f)
        with open(os.path.join(models_dir, "symptom_features.pkl"), "wb") as f:
            pickle.dump(list(X.columns), f)
        print("[ML Engine] Saved Random Forest model and symptom feature list.")
            
        return comparison_results
    except Exception as e:
        print(f"[ML Engine] Error during model training/evaluation: {e}")
        return []

def predict_disease_ml(user_symptoms):
    """
    Runs Random Forest classification inference on user input symptoms.
    """
    import pickle
    backend_dir = os.path.dirname(os.path.abspath(__file__))
    model_path = os.path.join(backend_dir, "models", "symptom_random_forest.pkl")
    features_path = os.path.join(backend_dir, "models", "symptom_features.pkl")
    
    if not os.path.exists(model_path) or not os.path.exists(features_path):
        # Fallback to train if not pre-cached
        print("[ML Engine] Pickled model not found, running get_ml_metrics first...")
        get_ml_metrics()
        
    try:
        with open(model_path, "rb") as f:
            rf_model = pickle.load(f)
        with open(features_path, "rb") as f:
            features = pickle.load(f)
            
        # Build binary feature vector for prediction
        user_symptoms_clean = [s.strip().lower() for s in user_symptoms]
        input_vector = [0] * len(features)
        
        for idx, feat in enumerate(features):
            if feat in user_symptoms_clean:
                input_vector[idx] = 1
                
        # Run prediction
        import numpy as np
        probabilities = rf_model.predict_proba([input_vector])[0]
        classes = rf_model.classes_
        
        matches = []
        for cls, prob in zip(classes, probabilities):
            if prob > 0:
                matches.append({
                    "disease": cls,
                    "confidence": round(prob * 100, 2)
                })
                
        # Sort in descending order
        matches = sorted(matches, key=lambda x: x["confidence"], reverse=True)
        return matches[:5]
    except Exception as e:
        print(f"[ML Engine] Prediction failed: {e}")
        return []
