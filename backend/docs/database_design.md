# Database Design Documentation

## Overview

This document describes the database schema for the Blogging API backend system. The database uses PostgreSQL and is managed through SQLAlchemy ORM with Alembic migrations.

## Database Schema

### Table: `blogs`

The `blogs` table stores all blog post information including content, metadata, and engagement metrics.

#### Table Structure

| Column Name | Data Type | Constraints | Description |
|------------|-----------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTO INCREMENT, INDEXED | Unique identifier for each blog post |
| `title` | VARCHAR(200) | NOT NULL, INDEXED | Blog post title (max 200 characters) |
| `content` | TEXT | NOT NULL | Full blog post content |
| `author` | VARCHAR(100) | NOT NULL, INDEXED | Author name (max 100 characters) |
| `likes` | INTEGER | NOT NULL, DEFAULT 0 | Number of likes received |
| `created_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT NOW() | Timestamp when blog was created |
| `updated_at` | TIMESTAMP WITH TIME ZONE | NOT NULL, DEFAULT NOW(), ON UPDATE NOW() | Timestamp when blog was last updated |

#### Entity Relationship Diagram

```
┌─────────────────┐
│     blogs       │
├─────────────────┤
│ id (PK)         │
│ title           │
│ content         │
│ author          │
│ likes           │
│ created_at      │
│ updated_at      │
└─────────────────┘
```

#### Field Descriptions

**id**
- Type: Integer (Primary Key)
- Auto-incrementing unique identifier
- Indexed for fast lookups
- Used as the primary key for all blog operations

**title**
- Type: String (VARCHAR 200)
- Required field
- Maximum length: 200 characters
- Indexed for search and sorting operations
- Represents the blog post title

**content**
- Type: Text
- Required field
- No length limit (uses TEXT type for long content)
- Stores the full blog post body/content

**author**
- Type: String (VARCHAR 100)
- Required field
- Maximum length: 100 characters
- Indexed for filtering and grouping by author
- Stores the name of the blog post author

**likes**
- Type: Integer
- Default value: 0
- Non-negative integer
- Incremented when users like a blog post
- Used for sorting and popularity metrics

**created_at**
- Type: Timestamp with Time Zone
- Automatically set on record creation
- Uses server's current timestamp
- Used for sorting blogs by creation date

**updated_at**
- Type: Timestamp with Time Zone
- Automatically set on record creation
- Automatically updated on record modification
- Tracks when blog was last edited

## Indexes

The following indexes are created for performance optimization:

1. **Primary Key Index on `id`**
   - Automatically created by PostgreSQL
   - Used for fast primary key lookups

2. **Index on `title`**
   - Improves search and filtering performance
   - Useful for title-based queries

3. **Index on `author`**
   - Improves filtering and grouping by author
   - Enables efficient author-based queries

## Constraints

### Primary Key Constraint
- `id` is the primary key, ensuring uniqueness and non-null values

### Not Null Constraints
- `title`, `content`, `author`, `likes`, `created_at`, `updated_at` are all NOT NULL
- Ensures data integrity and prevents incomplete records

### Default Values
- `likes` defaults to 0 for new blog posts
- `created_at` and `updated_at` are automatically set by the database

## Relationships

Currently, the database has a single table with no foreign key relationships. The design is intentionally simple for this blogging system. Future enhancements could include:

- User table with foreign key relationship
- Comments table with foreign key to blogs
- Categories/Tags tables with many-to-many relationships

## Data Types Rationale

- **INTEGER for id and likes**: Efficient storage and fast operations
- **VARCHAR for title and author**: Fixed maximum length prevents excessive storage while allowing reasonable flexibility
- **TEXT for content**: No length limit allows for long-form blog posts
- **TIMESTAMP WITH TIME ZONE**: Ensures accurate time tracking across different time zones

## Migration Strategy

Database schema changes are managed through Alembic migrations:

1. Models are defined in `app/models.py` using SQLAlchemy
2. Migrations are generated using: `alembic revision --autogenerate -m "description"`
3. Migrations are applied using: `alembic upgrade head`
4. Migrations can be rolled back using: `alembic downgrade -1`

## Performance Considerations

1. **Indexes**: Title and author fields are indexed for common query patterns
2. **Sorting**: Indexes on `likes` and `created_at` (via primary key) enable efficient sorting
3. **Connection Pooling**: Database connections are pooled (pool_size=10, max_overflow=20) for better performance under load

## Future Enhancements

Potential database schema enhancements:

1. **User Management**
   - Add `users` table
   - Add `user_id` foreign key to `blogs` table
   - Add authentication and authorization

2. **Comments System**
   - Add `comments` table
   - Foreign key relationship to `blogs`
   - Support for nested comments

3. **Categories and Tags**
   - Add `categories` and `tags` tables
   - Many-to-many relationships with blogs

4. **Soft Deletes**
   - Add `deleted_at` timestamp field
   - Implement soft delete pattern

5. **Full-Text Search**
   - Add full-text search indexes on `title` and `content`
   - Implement PostgreSQL full-text search capabilities

