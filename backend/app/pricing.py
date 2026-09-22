import json
from decimal import Decimal
from pathlib import Path

CATALOG = json.loads((Path(__file__).parent / "catalog.json").read_text(encoding="utf-8"))


def calculate_price(items: dict, service: str) -> Decimal:
    total = Decimal("0")
    for category, quantities in items.items():
        if category not in CATALOG:
            raise ValueError(f"Unknown clothing category: {category}")
        prices = {item["name"]: item["prices"] for item in CATALOG[category]}
        for name, count in quantities.items():
            if name not in prices or service not in prices[name]:
                raise ValueError(f"Unknown clothing item or service: {name}")
            total += Decimal(str(prices[name][service])) * count
    return total.quantize(Decimal("0.01"))
