from datetime import date, datetime, timedelta, timezone
from io import BytesIO

import jwt
from PIL import Image

from app.config import Settings, settings
from app.schemas import Profile


def pickup_payload():
    tomorrow = date.today() + timedelta(days=1)
    return {"store": "Bellandur", "serviceType": "Wash & Fold",
            "clothingItems": {"men": {"Half-Sleeve Shirt": 2}, "women": {}, "kids": {}, "household": {}},
            "pickupAddress": "123 Main Road", "pickupDate": tomorrow.isoformat(), "pickupTime": "9 AM - 12 PM",
            "deliveryAddress": "123 Main Road", "deliveryDate": (tomorrow + timedelta(days=1)).isoformat(),
            "deliveryTime": "12 PM - 3 PM", "totalPrice": 1}


def test_auth_profile_and_email_change(client, account):
    headers = account()
    assert client.get("/api/users/profile").status_code == 401
    profile = client.get("/api/users/profile", headers=headers).json()
    assert profile["fullName"] == "Alice"
    assert "password" not in profile
    response = client.patch("/api/users/profile", headers=headers, json={"email": "new@example.com", "address": "New address"})
    assert response.status_code == 200
    assert client.get("/api/users/profile", headers=headers).json()["email"] == "new@example.com"
    assert client.post("/api/users/login", json={"email": "new@example.com", "password": "test-password-123"}).status_code == 200
    assert client.post("/api/users/login", json={"email": "new@example.com", "password": "wrong"}).status_code == 401


def test_duplicate_and_cross_account_profile(client, account):
    alice, bob = account(), account("bob")
    response = client.patch("/api/users/profile", headers=alice, json={"email": "bob@example.com", "fullName": "Changed"})
    assert response.status_code == 409
    assert client.get("/api/users/profile", headers=bob).json()["fullName"] == "Bob"
    assert client.get("/api/users/profile", headers=alice).json()["fullName"] == "Alice"


def test_order_lifecycle_and_ownership(client, account):
    alice, bob = account(), account("bob")
    payload = pickup_payload()
    assert client.post("/api/pickups/schedule", json=payload).status_code == 401
    response = client.post("/api/pickups/schedule", headers=alice, json=payload)
    assert response.status_code == 201
    assert response.json()["totalPrice"] == 50  # The server ignores tampered client totals.
    order_id = response.json()["orderId"]
    path = f"/api/pickups/{order_id}"
    assert client.get(path, headers=bob).status_code == 404
    assert client.patch(path, headers=bob, json={"deliveryAddress": "Other"}).status_code == 404
    assert client.delete(path + "/cancel", headers=bob).status_code == 404
    assert client.get("/api/pickups/history", headers=bob).json() == []
    assert len(client.get("/api/pickups/history", headers=alice).json()) == 1
    assert len(client.get("/api/pickups/service/Wash%20%26%20Fold", headers=alice).json()) == 1
    assert len(client.get("/api/pickups/date/after", params={"date": date.today().isoformat()}, headers=alice).json()) == 1
    assert len(client.get("/api/pickups/date/between", params={"startDate": payload["pickupDate"], "endDate": payload["deliveryDate"]}, headers=alice).json()) == 1
    assert client.patch(path, headers=alice, json={"deliveryAddress": "New destination"}).status_code == 200
    assert client.get(path, headers=alice).json()["deliveryAddress"] == "New destination"
    assert client.delete(path + "/cancel", headers=alice).status_code == 200
    assert client.get(path, headers=alice).json()["status"] == "cancelled"
    assert client.patch(path, headers=alice, json={"deliveryAddress": "Too late"}).status_code == 409


def test_pickup_validation(client, account):
    headers = account()
    for changes in [
        {"clothingItems": {"men": {"Half-Sleeve Shirt": -1}}},
        {"clothingItems": {}},
        {"clothingItems": {"men": {"Unknown": 1}}},
        {"pickupDate": "2020-01-01"},
        {"deliveryDate": "2020-01-01"},
        {"pickupTime": "invalid"},
        {"serviceType": "Unknown"},
    ]:
        assert client.post("/api/pickups/schedule", headers=headers, json={**pickup_payload(), **changes}).status_code == 422
    payload = pickup_payload()
    payload.update(deliveryDate=payload["pickupDate"], deliveryTime=payload["pickupTime"])
    assert client.post("/api/pickups/schedule", headers=headers, json=payload).status_code == 422


def test_contact_and_upload(client, account):
    payload = {"name": "Alice", "email": "alice@example.com", "phone": "1234567890", "message": "Hello"}
    assert client.post("/api/contact/submit", json=payload).status_code == 201
    assert client.post("/api/contact/submit", json=payload).status_code == 201
    assert client.post("/api/contact/submit", json={**payload, "email": "invalid"}).status_code == 422
    headers = account()
    assert client.post("/api/users/upload-avatar", headers=headers, files={"avatar": ("fake.png", b"not an image", "image/png")}).status_code == 400
    image = BytesIO()
    Image.new("RGB", (10, 10), "blue").save(image, format="PNG")
    response = client.post("/api/users/upload-avatar", headers=headers, files={"avatar": ("../../avatar.png", image.getvalue(), "image/png")})
    assert response.status_code == 200
    avatar = response.json()["avatarUrl"]
    assert avatar.startswith("/uploads/") and ".." not in avatar
    assert client.get("/api/users/profile", headers=headers).json()["avatarUrl"] == avatar
    assert (settings.upload_dir / avatar.split("/")[-1]).exists()


def test_expired_token_and_cors(client, account):
    account()
    token = jwt.encode({"sub": "1", "iat": datetime.now(timezone.utc) - timedelta(hours=2),
                        "exp": datetime.now(timezone.utc) - timedelta(hours=1)}, settings.jwt_secret, algorithm="HS256")
    assert client.get("/api/users/profile", headers={"Authorization": f"Bearer {token}"}).status_code == 401
    assert client.get("/api/users/profile", headers={"Authorization": "Bearer invalid"}).status_code == 401
    response = client.options("/api/pickups/history", headers={"Origin": "http://localhost:3000", "Access-Control-Request-Method": "GET", "Access-Control-Request-Headers": "Authorization"})
    assert response.status_code == 200
    assert response.headers["access-control-allow-origin"] == "http://localhost:3000"
    assert client.options("/api/pickups/history", headers={"Origin": "https://unknown.example", "Access-Control-Request-Method": "GET"}).status_code == 400


def test_health(client):
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json()["database"] == "postgresql"


def test_deployment_settings_require_real_secret():
    import pytest
    from pydantic import ValidationError
    with pytest.raises(ValidationError):
        Settings(_env_file=None, app_env="deployment", jwt_secret="replace-with-a-random-secret-at-least-32-characters", cors_origins=["https://laundry.example.com"])
