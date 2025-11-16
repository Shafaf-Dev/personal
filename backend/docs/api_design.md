# API Design Documentation

## Overview

This document describes the RESTful API endpoints for the Blogging API backend system. The API is built with FastAPI and follows RESTful principles with JSON request/response formats.

## Base URL

- **Development**: `http://localhost:8000`
- **API Prefix**: `/api/v1`
- **Full Base URL**: `http://localhost:8000/api/v1`

## Authentication

Currently, the API does not require authentication. All endpoints are publicly accessible.

## API Endpoints

### 1. Create Blog Post

Create a new blog post.

**Endpoint**: `POST /api/v1/blogs`

**Request Body**:
```json
{
  "title": "My First Blog Post",
  "content": "This is the content of my blog post...",
  "author": "John Doe"
}
```

**Request Schema**:
- `title` (string, required): Blog post title (1-200 characters)
- `content` (string, required): Blog post content (minimum 1 character)
- `author` (string, required): Author name (1-100 characters)

**Response**: `201 Created`

**Response Body**:
```json
{
  "id": 1,
  "title": "My First Blog Post",
  "content": "This is the content of my blog post...",
  "author": "John Doe",
  "likes": 0,
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

**Error Responses**:
- `422 Unprocessable Entity`: Validation error (invalid input data)

---

### 2. Get All Blog Posts

Retrieve all blog posts with optional sorting.

**Endpoint**: `GET /api/v1/blogs`

**Query Parameters**:
- `sort_by` (string, optional): Sort field - `"likes"` or `"date"` (default: `"date"`)
- `order` (string, optional): Sort order - `"asc"` or `"desc"` (default: `"desc"`)

**Examples**:
- `GET /api/v1/blogs` - Get all blogs sorted by date (newest first)
- `GET /api/v1/blogs?sort_by=likes&order=desc` - Get all blogs sorted by likes (most liked first)
- `GET /api/v1/blogs?sort_by=date&order=asc` - Get all blogs sorted by date (oldest first)

**Response**: `200 OK`

**Response Body**:
```json
{
  "blogs": [
    {
      "id": 1,
      "title": "My First Blog Post",
      "content": "This is the content...",
      "author": "John Doe",
      "likes": 5,
      "created_at": "2024-01-15T10:30:00Z",
      "updated_at": "2024-01-15T10:30:00Z"
    },
    {
      "id": 2,
      "title": "Another Blog Post",
      "content": "More content here...",
      "author": "Jane Smith",
      "likes": 3,
      "created_at": "2024-01-14T09:20:00Z",
      "updated_at": "2024-01-14T09:20:00Z"
    }
  ],
  "total": 2,
  "sort_by": "likes",
  "order": "desc"
}
```

**Response Schema**:
- `blogs` (array): List of blog post objects
- `total` (integer): Total number of blog posts
- `sort_by` (string): Sort field used
- `order` (string): Sort order used

---

### 3. Get Single Blog Post

Retrieve a specific blog post by ID.

**Endpoint**: `GET /api/v1/blogs/{blog_id}`

**Path Parameters**:
- `blog_id` (integer, required): The ID of the blog post

**Example**: `GET /api/v1/blogs/1`

**Response**: `200 OK`

**Response Body**:
```json
{
  "id": 1,
  "title": "My First Blog Post",
  "content": "This is the content of my blog post...",
  "author": "John Doe",
  "likes": 5,
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

**Error Responses**:
- `404 Not Found`: Blog post with the given ID does not exist

---

### 4. Update Blog Post

Update an existing blog post. All fields are optional - only provided fields will be updated.

**Endpoint**: `PUT /api/v1/blogs/{blog_id}`

**Path Parameters**:
- `blog_id` (integer, required): The ID of the blog post to update

**Request Body** (all fields optional):
```json
{
  "title": "Updated Title",
  "content": "Updated content...",
  "author": "Updated Author"
}
```

**Request Schema**:
- `title` (string, optional): Blog post title (1-200 characters)
- `content` (string, optional): Blog post content (minimum 1 character)
- `author` (string, optional): Author name (1-100 characters)

**Response**: `200 OK`

**Response Body**:
```json
{
  "id": 1,
  "title": "Updated Title",
  "content": "Updated content...",
  "author": "Updated Author",
  "likes": 5,
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T11:45:00Z"
}
```

**Error Responses**:
- `404 Not Found`: Blog post with the given ID does not exist
- `422 Unprocessable Entity`: Validation error (invalid input data)

---

### 5. Delete Blog Post

Delete a blog post by ID.

**Endpoint**: `DELETE /api/v1/blogs/{blog_id}`

**Path Parameters**:
- `blog_id` (integer, required): The ID of the blog post to delete

**Example**: `DELETE /api/v1/blogs/1`

**Response**: `200 OK`

**Response Body**:
```json
{
  "message": "Blog deleted successfully"
}
```

**Error Responses**:
- `404 Not Found`: Blog post with the given ID does not exist

---

### 6. Like Blog Post

Increment the like count for a blog post.

**Endpoint**: `POST /api/v1/blogs/{blog_id}/like`

**Path Parameters**:
- `blog_id` (integer, required): The ID of the blog post to like

**Example**: `POST /api/v1/blogs/1/like`

**Request Body**: None

**Response**: `200 OK`

**Response Body**:
```json
{
  "id": 1,
  "title": "My First Blog Post",
  "content": "This is the content...",
  "author": "John Doe",
  "likes": 6,
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

**Error Responses**:
- `404 Not Found`: Blog post with the given ID does not exist

**Note**: This endpoint increments the likes count by 1 each time it's called. There is no user tracking, so the same blog can be liked multiple times.

---

## Additional Endpoints

### Health Check

**Endpoint**: `GET /health`

**Response**: `200 OK`

**Response Body**:
```json
{
  "status": "healthy"
}
```

### Root Endpoint

**Endpoint**: `GET /`

**Response**: `200 OK`

**Response Body**:
```json
{
  "message": "Welcome to Blogging API",
  "version": "1.0.0",
  "docs": "/docs"
}
```

---

## Data Models

### BlogResponse

```json
{
  "id": 1,
  "title": "string",
  "content": "string",
  "author": "string",
  "likes": 0,
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

### BlogCreate

```json
{
  "title": "string",
  "content": "string",
  "author": "string"
}
```

### BlogUpdate

```json
{
  "title": "string (optional)",
  "content": "string (optional)",
  "author": "string (optional)"
}
```

### BlogListResponse

```json
{
  "blogs": [BlogResponse],
  "total": 0,
  "sort_by": "string",
  "order": "string"
}
```

### MessageResponse

```json
{
  "message": "string"
}
```

---

## HTTP Status Codes

| Status Code | Description |
|------------|-------------|
| `200 OK` | Request successful |
| `201 Created` | Resource created successfully |
| `404 Not Found` | Resource not found |
| `422 Unprocessable Entity` | Validation error or invalid input |
| `500 Internal Server Error` | Server error |

---

## Error Response Format

All error responses follow this format:

```json
{
  "detail": "Error message description"
}
```

**Example**:
```json
{
  "detail": "Blog not found"
}
```

---

## Sorting Options

### Sort By Fields

- `likes`: Sort by number of likes
- `date`: Sort by creation date (default)

### Sort Order

- `asc`: Ascending order (lowest to highest, oldest to newest)
- `desc`: Descending order (highest to lowest, newest to oldest) (default)

### Examples

1. **Most liked blogs first**:
   ```
   GET /api/v1/blogs?sort_by=likes&order=desc
   ```

2. **Least liked blogs first**:
   ```
   GET /api/v1/blogs?sort_by=likes&order=asc
   ```

3. **Newest blogs first** (default):
   ```
   GET /api/v1/blogs?sort_by=date&order=desc
   ```

4. **Oldest blogs first**:
   ```
   GET /api/v1/blogs?sort_by=date&order=asc
   ```

---

## API Documentation

FastAPI automatically generates interactive API documentation:

- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`
- **OpenAPI JSON**: `http://localhost:8000/openapi.json`

These interactive docs allow you to:
- View all available endpoints
- See request/response schemas
- Test endpoints directly from the browser
- View example requests and responses

---

## Example Usage

### cURL Examples

**Create a blog post**:
```bash
curl -X POST "http://localhost:8000/api/v1/blogs" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Blog",
    "content": "This is my first blog post content.",
    "author": "John Doe"
  }'
```

**Get all blogs sorted by likes**:
```bash
curl -X GET "http://localhost:8000/api/v1/blogs?sort_by=likes&order=desc"
```

**Get a specific blog**:
```bash
curl -X GET "http://localhost:8000/api/v1/blogs/1"
```

**Update a blog**:
```bash
curl -X PUT "http://localhost:8000/api/v1/blogs/1" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Title"
  }'
```

**Like a blog**:
```bash
curl -X POST "http://localhost:8000/api/v1/blogs/1/like"
```

**Delete a blog**:
```bash
curl -X DELETE "http://localhost:8000/api/v1/blogs/1"
```

### Python Example

```python
import requests

base_url = "http://localhost:8000/api/v1"

# Create a blog
response = requests.post(f"{base_url}/blogs", json={
    "title": "My Blog Post",
    "content": "Content here",
    "author": "John Doe"
})
blog = response.json()

# Get all blogs sorted by likes
response = requests.get(f"{base_url}/blogs?sort_by=likes&order=desc")
blogs = response.json()

# Like a blog
response = requests.post(f"{base_url}/blogs/{blog['id']}/like")
updated_blog = response.json()
```

---

## Rate Limiting

Currently, there is no rate limiting implemented. Consider adding rate limiting in production environments.

## CORS

CORS is enabled for all origins (`*`). In production, restrict this to specific domains.

