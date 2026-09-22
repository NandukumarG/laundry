import os
from pathlib import Path
from typing import Literal

from pydantic import Field, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict

BACKEND_DIR = Path(__file__).resolve().parent.parent


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=os.getenv("ENV_FILE", str(BACKEND_DIR / ".env.local")),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    app_env: Literal["local", "deployment", "test"] = "local"
    database_url: str
    jwt_secret: str = Field(min_length=32)
    access_token_expire_minutes: int = Field(default=1440, gt=0)
    cors_origins: list[str] = ["http://localhost:3000"]
    upload_dir: Path = BACKEND_DIR / "uploads"
    max_upload_bytes: int = Field(default=10 * 1024 * 1024, gt=0)

    @model_validator(mode="after")
    def validate_environment(self):
        if self.database_url.startswith("postgres://"):
            self.database_url = self.database_url.replace("postgres://", "postgresql+psycopg://", 1)
        elif self.database_url.startswith("postgresql://"):
            self.database_url = self.database_url.replace("postgresql://", "postgresql+psycopg://", 1)
        if not self.database_url.startswith("postgresql+psycopg://"):
            raise ValueError("DATABASE_URL must use PostgreSQL")
        if self.app_env == "deployment":
            if self.jwt_secret.startswith(("local-", "replace-")):
                raise ValueError("Set a unique JWT_SECRET for deployment")
            if not self.cors_origins or any(not origin.startswith("https://") for origin in self.cors_origins):
                raise ValueError("Deployment CORS_ORIGINS must list explicit HTTPS origins")
        return self


settings = Settings()
