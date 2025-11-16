import pytest
from fastapi import status


class TestCreateBlog:
    """Test cases for creating blog posts."""
    
    def test_create_blog_success(self, client, sample_blog_data):
        """Test successful blog creation."""
        response = client.post("/api/v1/blogs", json=sample_blog_data)
        
        assert response.status_code == status.HTTP_201_CREATED
        data = response.json()
        assert data["title"] == sample_blog_data["title"]
        assert data["content"] == sample_blog_data["content"]
        assert data["author"] == sample_blog_data["author"]
        assert data["likes"] == 0
        assert "id" in data
        assert "created_at" in data
        assert "updated_at" in data
    
    def test_create_blog_missing_title(self, client, sample_blog_data):
        """Test blog creation with missing title."""
        del sample_blog_data["title"]
        response = client.post("/api/v1/blogs", json=sample_blog_data)
        
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
    
    def test_create_blog_missing_content(self, client, sample_blog_data):
        """Test blog creation with missing content."""
        del sample_blog_data["content"]
        response = client.post("/api/v1/blogs", json=sample_blog_data)
        
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
    
    def test_create_blog_missing_author(self, client, sample_blog_data):
        """Test blog creation with missing author."""
        del sample_blog_data["author"]
        response = client.post("/api/v1/blogs", json=sample_blog_data)
        
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
    
    def test_create_blog_empty_title(self, client):
        """Test blog creation with empty title."""
        response = client.post("/api/v1/blogs", json={
            "title": "",
            "content": "Content",
            "author": "Author"
        })
        
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
    
    def test_create_blog_empty_content(self, client):
        """Test blog creation with empty content."""
        response = client.post("/api/v1/blogs", json={
            "title": "Title",
            "content": "",
            "author": "Author"
        })
        
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY
    
    def test_create_blog_long_title(self, client):
        """Test blog creation with title exceeding max length."""
        response = client.post("/api/v1/blogs", json={
            "title": "a" * 201,  # Exceeds 200 character limit
            "content": "Content",
            "author": "Author"
        })
        
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY


class TestGetBlog:
    """Test cases for getting a single blog post."""
    
    def test_get_blog_success(self, client, sample_blog):
        """Test successful retrieval of a blog post."""
        blog_id = sample_blog["id"]
        response = client.get(f"/api/v1/blogs/{blog_id}")
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["id"] == blog_id
        assert data["title"] == sample_blog["title"]
        assert data["content"] == sample_blog["content"]
        assert data["author"] == sample_blog["author"]
    
    def test_get_blog_not_found(self, client):
        """Test retrieval of non-existent blog post."""
        response = client.get("/api/v1/blogs/99999")
        
        assert response.status_code == status.HTTP_404_NOT_FOUND
        assert "detail" in response.json()
        assert "not found" in response.json()["detail"].lower()
    
    def test_get_blog_invalid_id(self, client):
        """Test retrieval with invalid blog ID."""
        response = client.get("/api/v1/blogs/invalid")
        
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY


class TestGetBlogs:
    """Test cases for getting all blog posts."""
    
    def test_get_blogs_empty(self, client):
        """Test getting blogs when database is empty."""
        response = client.get("/api/v1/blogs")
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["total"] == 0
        assert data["blogs"] == []
        assert data["sort_by"] == "date"
        assert data["order"] == "desc"
    
    def test_get_blogs_default_sort(self, client, multiple_blogs):
        """Test getting blogs with default sorting (date, desc)."""
        response = client.get("/api/v1/blogs")
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["total"] == 3
        assert len(data["blogs"]) == 3
        assert data["sort_by"] == "date"
        assert data["order"] == "desc"
        
        # Verify blogs are sorted by date (newest first)
        blogs = data["blogs"]
        for i in range(len(blogs) - 1):
            assert blogs[i]["created_at"] >= blogs[i + 1]["created_at"]
    
    def test_get_blogs_sort_by_likes_desc(self, client, multiple_blogs):
        """Test getting blogs sorted by likes descending."""
        # Add likes to blogs
        client.post(f"/api/v1/blogs/{multiple_blogs[0]['id']}/like")
        client.post(f"/api/v1/blogs/{multiple_blogs[0]['id']}/like")
        client.post(f"/api/v1/blogs/{multiple_blogs[1]['id']}/like")
        
        response = client.get("/api/v1/blogs?sort_by=likes&order=desc")
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["sort_by"] == "likes"
        assert data["order"] == "desc"
        
        # Verify blogs are sorted by likes (highest first)
        blogs = data["blogs"]
        for i in range(len(blogs) - 1):
            assert blogs[i]["likes"] >= blogs[i + 1]["likes"]
    
    def test_get_blogs_sort_by_likes_asc(self, client, multiple_blogs):
        """Test getting blogs sorted by likes ascending."""
        # Add likes to blogs
        client.post(f"/api/v1/blogs/{multiple_blogs[0]['id']}/like")
        client.post(f"/api/v1/blogs/{multiple_blogs[0]['id']}/like")
        client.post(f"/api/v1/blogs/{multiple_blogs[1]['id']}/like")
        
        response = client.get("/api/v1/blogs?sort_by=likes&order=asc")
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["sort_by"] == "likes"
        assert data["order"] == "asc"
        
        # Verify blogs are sorted by likes (lowest first)
        blogs = data["blogs"]
        for i in range(len(blogs) - 1):
            assert blogs[i]["likes"] <= blogs[i + 1]["likes"]
    
    def test_get_blogs_sort_by_date_asc(self, client, multiple_blogs):
        """Test getting blogs sorted by date ascending."""
        response = client.get("/api/v1/blogs?sort_by=date&order=asc")
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["sort_by"] == "date"
        assert data["order"] == "asc"
        
        # Verify blogs are sorted by date (oldest first)
        blogs = data["blogs"]
        for i in range(len(blogs) - 1):
            assert blogs[i]["created_at"] <= blogs[i + 1]["created_at"]
    
    def test_get_blogs_invalid_sort_by(self, client, multiple_blogs):
        """Test getting blogs with invalid sort_by parameter."""
        response = client.get("/api/v1/blogs?sort_by=invalid&order=desc")
        
        assert response.status_code == status.HTTP_200_OK
        # Should default to "date"
        data = response.json()
        assert data["sort_by"] == "date"
    
    def test_get_blogs_invalid_order(self, client, multiple_blogs):
        """Test getting blogs with invalid order parameter."""
        response = client.get("/api/v1/blogs?sort_by=likes&order=invalid")
        
        assert response.status_code == status.HTTP_200_OK
        # Should default to "desc"
        data = response.json()
        assert data["order"] == "desc"


class TestUpdateBlog:
    """Test cases for updating blog posts."""
    
    def test_update_blog_success(self, client, sample_blog):
        """Test successful blog update."""
        blog_id = sample_blog["id"]
        update_data = {
            "title": "Updated Title",
            "content": "Updated content"
        }
        
        response = client.put(f"/api/v1/blogs/{blog_id}", json=update_data)
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["id"] == blog_id
        assert data["title"] == update_data["title"]
        assert data["content"] == update_data["content"]
        assert data["author"] == sample_blog["author"]  # Unchanged
    
    def test_update_blog_partial(self, client, sample_blog):
        """Test partial blog update (only title)."""
        blog_id = sample_blog["id"]
        update_data = {"title": "Only Title Updated"}
        
        response = client.put(f"/api/v1/blogs/{blog_id}", json=update_data)
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["title"] == update_data["title"]
        assert data["content"] == sample_blog["content"]  # Unchanged
        assert data["author"] == sample_blog["author"]  # Unchanged
    
    def test_update_blog_not_found(self, client):
        """Test update of non-existent blog post."""
        response = client.put("/api/v1/blogs/99999", json={"title": "Updated"})
        
        assert response.status_code == status.HTTP_404_NOT_FOUND
    
    def test_update_blog_empty_title(self, client, sample_blog):
        """Test blog update with empty title."""
        blog_id = sample_blog["id"]
        response = client.put(f"/api/v1/blogs/{blog_id}", json={"title": ""})
        
        assert response.status_code == status.HTTP_422_UNPROCESSABLE_ENTITY


class TestDeleteBlog:
    """Test cases for deleting blog posts."""
    
    def test_delete_blog_success(self, client, sample_blog):
        """Test successful blog deletion."""
        blog_id = sample_blog["id"]
        response = client.delete(f"/api/v1/blogs/{blog_id}")
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert "message" in data
        assert "deleted" in data["message"].lower()
        
        # Verify blog is actually deleted
        get_response = client.get(f"/api/v1/blogs/{blog_id}")
        assert get_response.status_code == status.HTTP_404_NOT_FOUND
    
    def test_delete_blog_not_found(self, client):
        """Test deletion of non-existent blog post."""
        response = client.delete("/api/v1/blogs/99999")
        
        assert response.status_code == status.HTTP_404_NOT_FOUND


class TestLikeBlog:
    """Test cases for liking blog posts."""
    
    def test_like_blog_success(self, client, sample_blog):
        """Test successful blog like."""
        blog_id = sample_blog["id"]
        initial_likes = sample_blog["likes"]
        
        response = client.post(f"/api/v1/blogs/{blog_id}/like")
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["likes"] == initial_likes + 1
        assert data["id"] == blog_id
    
    def test_like_blog_multiple_times(self, client, sample_blog):
        """Test liking a blog multiple times."""
        blog_id = sample_blog["id"]
        initial_likes = sample_blog["likes"]
        
        # Like the blog 3 times
        for _ in range(3):
            response = client.post(f"/api/v1/blogs/{blog_id}/like")
            assert response.status_code == status.HTTP_200_OK
        
        # Verify final like count
        get_response = client.get(f"/api/v1/blogs/{blog_id}")
        assert get_response.status_code == status.HTTP_200_OK
        data = get_response.json()
        assert data["likes"] == initial_likes + 3
    
    def test_like_blog_not_found(self, client):
        """Test liking non-existent blog post."""
        response = client.post("/api/v1/blogs/99999/like")
        
        assert response.status_code == status.HTTP_404_NOT_FOUND


class TestHealthEndpoints:
    """Test cases for health check endpoints."""
    
    def test_root_endpoint(self, client):
        """Test root endpoint."""
        response = client.get("/")
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert "message" in data
        assert "version" in data
        assert "docs" in data
    
    def test_health_endpoint(self, client):
        """Test health check endpoint."""
        response = client.get("/health")
        
        assert response.status_code == status.HTTP_200_OK
        data = response.json()
        assert data["status"] == "healthy"

