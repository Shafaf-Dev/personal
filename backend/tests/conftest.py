import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from app.database import Base, get_db
from app.main import app
from app.models import Blog


# Test database URL (using SQLite in-memory database for testing)
TEST_DATABASE_URL = "sqlite:///:memory:"

# Create test database engine
test_engine = create_engine(
    TEST_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)

# Create test session factory
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)


@pytest.fixture(scope="function")
def db_session():
    """Create a fresh database session for each test."""
    # Create tables
    Base.metadata.create_all(bind=test_engine)
    
    # Create session
    session = TestingSessionLocal()
    
    try:
        yield session
    finally:
        session.close()
        # Drop tables after test
        Base.metadata.drop_all(bind=test_engine)


@pytest.fixture(scope="function")
def client(db_session):
    """Create a test client with database override."""
    def override_get_db():
        try:
            yield db_session
        finally:
            pass
    
    app.dependency_overrides[get_db] = override_get_db
    
    with TestClient(app) as test_client:
        yield test_client
    
    app.dependency_overrides.clear()


@pytest.fixture
def sample_blog_data():
    """Sample blog data for testing."""
    return {
        "title": "Test Blog Post",
        "content": "This is a test blog post content.",
        "author": "Test Author"
    }


@pytest.fixture
def sample_blog(client, sample_blog_data):
    """Create a sample blog in the database."""
    response = client.post("/api/v1/blogs", json=sample_blog_data)
    return response.json()


@pytest.fixture
def multiple_blogs(client):
    """Create multiple sample blogs for testing."""
    blogs_data = [
        {
            "title": "First Blog",
            "content": "Content of first blog",
            "author": "Author One"
        },
        {
            "title": "Second Blog",
            "content": "Content of second blog",
            "author": "Author Two"
        },
        {
            "title": "Third Blog",
            "content": "Content of third blog",
            "author": "Author One"
        }
    ]
    
    blogs = []
    for blog_data in blogs_data:
        response = client.post("/api/v1/blogs", json=blog_data)
        blogs.append(response.json())
    
    return blogs

