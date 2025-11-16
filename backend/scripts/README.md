# Scripts Documentation

## Seed Data Script

The `seed_data.py` script populates the database with sample blog posts for development and testing purposes.

### Usage

#### Option 1: Run as module
```bash
python -m scripts.seed_data
```

#### Option 2: Run directly
```bash
python scripts/seed_data.py
```

### Features

- Creates 10 sample blog posts with varied content
- Includes different authors
- Pre-populates with different like counts
- Option to clear existing blogs before seeding
- Prevents duplicate entries (checks for existing titles)

### Sample Data

The script creates blog posts covering topics like:
- FastAPI
- SQLAlchemy
- RESTful API Design
- Testing with Pytest
- Database Migrations
- And more...

### Interactive Mode

When you run the script, it will ask:
```
Do you want to clear existing blogs? (y/N):
```

- Type `y` to delete all existing blogs before seeding
- Type `N` or press Enter to keep existing blogs and only add new ones

### Requirements

- Database must be set up and migrations must be run
- Database connection must be configured in `app/config.py` or via `DATABASE_URL` environment variable

### Example Output

```
============================================================
Blog Database Seeding Script
============================================================

Do you want to clear existing blogs? (y/N): n
Seeding database with 10 blog posts...
  Created: 'Getting Started with FastAPI' by John Doe
  Created: 'Understanding SQLAlchemy ORM' by Jane Smith
  Created: 'RESTful API Design Best Practices' by Alice Johnson
  ...

Seeding complete! Created 10 new blog posts.

Total blogs in database: 10
```

