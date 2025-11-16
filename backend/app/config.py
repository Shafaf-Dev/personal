import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    """Application configuration settings."""
    
    # Database configuration
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "postgresql://postgres:password@localhost:5432/fastapi"
    )
    
    # API configuration
    API_V1_PREFIX: str = "/api/v1"
    PROJECT_NAME: str = "Blogging API"
    PROJECT_VERSION: str = "1.0.0"
    
    # CORS settings
    CORS_ORIGINS: list = ["*"]

    # FastAPI configuration
    FASTAPI_DEBUG: bool = os.getenv("FASTAPI_DEBUG", "false").lower() == "true"


settings = Settings()

