import os
from pathlib import Path

import pytest
from sqlalchemy.engine import make_url

test_url = os.getenv("TEST_DATABASE_URL")
if not test_url or not (make_url(test_url).database or "").endswith("_test"):
    raise RuntimeError("Set TEST_DATABASE_URL to a dedicated PostgreSQL database ending in _test")
os.environ["DATABASE_URL"] = test_url
os.environ["APP_ENV"] = "test"
os.environ["JWT_SECRET"] = "test-only-secret-at-least-thirty-two-characters"

from alembic import command
from alembic.config import Config
from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.config import settings
from app.database import engine, get_db
from app.main import app


@pytest.fixture(scope="session", autouse=True)
def migrated_database():
    command.upgrade(Config(str(Path(__file__).resolve().parents[1] / "alembic.ini")), "head")
    yield
    engine.dispose()


@pytest.fixture
def client(tmp_path):
    with engine.connect() as connection:
        transaction = connection.begin()
        with Session(bind=connection, join_transaction_mode="create_savepoint", expire_on_commit=False) as session:
            def override_db():
                yield session
            app.dependency_overrides[get_db] = override_db
            old_upload_dir = settings.upload_dir
            settings.upload_dir = tmp_path
            try:
                with TestClient(app) as api:
                    yield api
            finally:
                settings.upload_dir = old_upload_dir
                app.dependency_overrides.clear()
        transaction.rollback()


@pytest.fixture
def account(client):
    def create(name="alice"):
        payload = {"fullName": name.title(), "username": name,
                   "email": f"{name}@example.com", "password": "test-password-123"}
        assert client.post("/api/users/register", json=payload).status_code == 200
        response = client.post("/api/users/login", json={"email": payload["email"], "password": payload["password"]})
        assert response.status_code == 200
        return {"Authorization": f"Bearer {response.json()['token']}"}
    return create
