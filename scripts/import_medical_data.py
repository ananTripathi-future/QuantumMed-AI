import os
import sys

# Add backend to path to import database module
sys.path.append(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "backend"))
import database

def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    json_path = os.path.join(base_dir, "backend", "diseases.json")
    print(f"Starting database migration/seeding from: {json_path}")
    database.seed_db_from_json(json_path)
    print("Database initialization check passed.")

if __name__ == "__main__":
    main()
