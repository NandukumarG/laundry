"""Copy the backend price catalog into the React source before rebuilding."""
from pathlib import Path

root = Path(__file__).resolve().parents[1]
source = root / "backend/app/catalog.json"
target = root / "frontend/src/catalog.json"
target.write_bytes(source.read_bytes())
print("Updated frontend/src/catalog.json from backend/app/catalog.json")
