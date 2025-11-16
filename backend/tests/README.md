# Testing Documentation

## Overview

This directory contains comprehensive test cases for the Blogging API. Tests are written using pytest and cover all API endpoints.

## Test Structure

- `conftest.py`: Test fixtures and configuration
- `test_blog_api.py`: Test cases for all blog API endpoints

## Running Tests

### Install Dependencies

First, make sure all dependencies are installed:

```bash
pip install -r requirements.txt
```

### Run All Tests

```bash
pytest
```

or

```bash
pytest tests/
```

### Run Tests with Coverage

```bash
pytest --cov=app --cov-report=html
```

This will generate an HTML coverage report in `htmlcov/index.html`.

### Run Specific Test Classes

```bash
pytest tests/test_blog_api.py::TestCreateBlog
```

### Run Specific Test Methods

```bash
pytest tests/test_blog_api.py::TestCreateBlog::test_create_blog_success
```

### Run Tests Verbosely

```bash
pytest -v
```

### Run Tests with Output

```bash
pytest -s
```

## Test Coverage

The test suite covers:

1. **Create Blog** (`TestCreateBlog`)
   - Successful creation
   - Missing required fields
   - Empty fields
   - Field length validation

2. **Get Single Blog** (`TestGetBlog`)
   - Successful retrieval
   - Not found scenarios
   - Invalid ID handling

3. **Get All Blogs** (`TestGetBlogs`)
   - Empty database
   - Default sorting (date, desc)
   - Sorting by likes (asc/desc)
   - Sorting by date (asc/desc)
   - Invalid sort parameters

4. **Update Blog** (`TestUpdateBlog`)
   - Full update
   - Partial update
   - Not found scenarios
   - Validation errors

5. **Delete Blog** (`TestDeleteBlog`)
   - Successful deletion
   - Not found scenarios

6. **Like Blog** (`TestLikeBlog`)
   - Single like
   - Multiple likes
   - Not found scenarios

7. **Health Endpoints** (`TestHealthEndpoints`)
   - Root endpoint
   - Health check endpoint

## Test Fixtures

The following fixtures are available in `conftest.py`:

- `db_session`: Fresh database session for each test
- `client`: Test client with database override
- `sample_blog_data`: Sample blog data dictionary
- `sample_blog`: Pre-created blog in database
- `multiple_blogs`: Multiple pre-created blogs

## Test Database

Tests use an in-memory SQLite database to ensure:
- Fast test execution
- Isolation between tests
- No impact on development database

Each test gets a fresh database session, and tables are created and dropped for each test.

## Continuous Integration

These tests can be integrated into CI/CD pipelines. Example GitHub Actions workflow:

```yaml
name: Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-python@v2
        with:
          python-version: '3.9'
      - run: pip install -r requirements.txt
      - run: pytest --cov=app --cov-report=xml
```

