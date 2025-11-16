"""
Seed data script for populating the database with sample blog posts.

Usage:
    python -m scripts.seed_data
    or
    python scripts/seed_data.py
"""

import sys
from pathlib import Path

# Add parent directory to path to import app modules
sys.path.insert(0, str(Path(__file__).parent.parent))

from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import Blog


# Sample blog data
SAMPLE_BLOGS = [
    {
        "title": "Getting Started with FastAPI",
        "content": """
FastAPI is a modern, fast (high-performance), web framework for building APIs with Python 3.7+ 
based on standard Python type hints. It's designed to be easy to use and learn, fast to code, 
ready for production, and based on open standards.

Key features:
- Fast: Very high performance, on par with NodeJS and Go
- Easy: Designed to be easy to use and learn
- Standards-based: Based on (and fully compatible with) the open standards for APIs: OpenAPI and JSON Schema
- Automatic docs: Interactive API documentation
        """.strip(),
        "author": "John Doe",
        "likes": 15
    },
    {
        "title": "Understanding SQLAlchemy ORM",
        "content": """
SQLAlchemy is the Python SQL toolkit and Object-Relational Mapping (ORM) library that gives 
application developers the full power and flexibility of SQL. It provides a set of tools for 
working with databases using Python objects.

Benefits:
- Database abstraction: Write database-agnostic code
- Type safety: Leverage Python's type system
- Migration support: Use Alembic for database migrations
- Relationship management: Easy handling of foreign keys and relationships
        """.strip(),
        "author": "Jane Smith",
        "likes": 23
    },
    {
        "title": "RESTful API Design Best Practices",
        "content": """
REST (Representational State Transfer) is an architectural style for designing networked applications. 
A RESTful API is an API that conforms to the constraints of REST architectural style.

Best practices:
- Use proper HTTP methods (GET, POST, PUT, DELETE)
- Use meaningful resource names
- Return appropriate HTTP status codes
- Implement proper error handling
- Use versioning for your API
- Document your API thoroughly
        """.strip(),
        "author": "Alice Johnson",
        "likes": 8
    },
    {
        "title": "Python Testing with Pytest",
        "content": """
Pytest is a testing framework that makes it easy to write simple and scalable tests in Python. 
It provides a powerful fixture system and plugin architecture.

Features:
- Simple test discovery
- Fixtures for setup and teardown
- Parametrized tests
- Rich assertion introspection
- Plugin ecosystem
        """.strip(),
        "author": "Bob Williams",
        "likes": 12
    },
    {
        "title": "Database Migrations with Alembic",
        "content": """
Alembic is a database migration tool for use with SQLAlchemy. It allows you to version control 
your database schema and apply changes incrementally.

Key concepts:
- Revisions: Individual migration scripts
- Upgrade: Apply changes to database
- Downgrade: Rollback changes
- Autogenerate: Automatically create migrations from model changes
        """.strip(),
        "author": "John Doe",
        "likes": 19
    },
    {
        "title": "Building Scalable Web Applications",
        "content": """
Scalability is the capability of a system to handle a growing amount of work by adding resources. 
When building web applications, it's important to design with scalability in mind from the start.

Considerations:
- Database optimization and indexing
- Caching strategies
- Load balancing
- Horizontal vs vertical scaling
- Microservices architecture
- API rate limiting
        """.strip(),
        "author": "Charlie Brown",
        "likes": 6
    },
    {
        "title": "Introduction to Pydantic",
        "content": """
Pydantic is a data validation library for Python that uses Python type annotations. It's widely 
used in FastAPI for request/response validation.

Benefits:
- Type validation: Automatic validation based on type hints
- Data parsing: Convert data types automatically
- Error messages: Clear, detailed error messages
- JSON schema: Automatic JSON schema generation
- IDE support: Full IDE support with type hints
        """.strip(),
        "author": "Diana Prince",
        "likes": 31
    },
    {
        "title": "Docker for Development",
        "content": """
Docker is a platform for developing, shipping, and running applications using containerization. 
It allows you to package an application with all its dependencies into a container.

Advantages:
- Consistency: Same environment across development, staging, and production
- Isolation: Containers are isolated from each other
- Portability: Run anywhere Docker is installed
- Efficiency: Lightweight compared to virtual machines
- Easy deployment: Simple deployment process
        """.strip(),
        "author": "Eve Adams",
        "likes": 14
    },
    {
        "title": "API Documentation with OpenAPI",
        "content": """
OpenAPI (formerly Swagger) is a specification for building REST APIs. It provides a standard way 
to describe REST APIs, making it easier for developers to understand and integrate with your API.

Benefits:
- Interactive documentation: Auto-generated interactive docs
- Code generation: Generate client libraries automatically
- Testing: Test APIs directly from documentation
- Standardization: Industry-standard format
        """.strip(),
        "author": "Frank Miller",
        "likes": 9
    },
    {
        "title": "Best Practices for Error Handling",
        "content": """
Proper error handling is crucial for building robust APIs. It improves user experience and makes 
debugging easier.

Best practices:
- Use appropriate HTTP status codes
- Provide clear error messages
- Log errors for debugging
- Don't expose sensitive information
- Handle edge cases gracefully
- Implement retry logic where appropriate
        """.strip(),
        "author": "Grace Lee",
        "likes": 17
    }
]


def seed_database(db: Session, clear_existing: bool = False):
    """
    Seed the database with sample blog posts.
    
    Args:
        db: Database session
        clear_existing: If True, delete all existing blogs before seeding
    """
    if clear_existing:
        print("Clearing existing blogs...")
        db.query(Blog).delete()
        db.commit()
        print("Existing blogs cleared.")
    
    print(f"Seeding database with {len(SAMPLE_BLOGS)} blog posts...")
    
    created_count = 0
    for blog_data in SAMPLE_BLOGS:
        # Check if blog with same title already exists
        existing = db.query(Blog).filter(Blog.title == blog_data["title"]).first()
        if existing:
            print(f"  Skipping '{blog_data['title']}' (already exists)")
            continue
        
        blog = Blog(**blog_data)
        db.add(blog)
        created_count += 1
        print(f"  Created: '{blog_data['title']}' by {blog_data['author']}")
    
    db.commit()
    print(f"\nSeeding complete! Created {created_count} new blog posts.")


def main():
    """Main function to run the seed script."""
    print("=" * 60)
    print("Blog Database Seeding Script")
    print("=" * 60)
    
    db: Session = SessionLocal()
    
    try:
        # Ask user if they want to clear existing data
        response = input("\nDo you want to clear existing blogs? (y/N): ").strip().lower()
        clear_existing = response == 'y'
        
        seed_database(db, clear_existing=clear_existing)
        
        # Show summary
        total_blogs = db.query(Blog).count()
        print(f"\nTotal blogs in database: {total_blogs}")
        
    except Exception as e:
        print(f"\nError seeding database: {e}")
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    main()

