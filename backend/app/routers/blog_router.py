from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import desc, asc
from typing import Optional
from app.database import get_db
from app.models import Blog
from app.schemas import (
    BlogCreate,
    BlogUpdate,
    BlogResponse,
    BlogListResponse,
    MessageResponse
)


class BlogRouter:
    """Class-based router for blog endpoints."""
    
    def __init__(self):
        self.router = APIRouter(
            prefix="/blogs",
            tags=["blogs"]
        )
        self._register_routes()
    
    def _register_routes(self):
        """Register all blog routes."""
        self.router.add_api_route(
            "",
            self.create_blog,
            methods=["POST"],
            response_model=BlogResponse,
            status_code=201,
            summary="Create a new blog post"
        )
        self.router.add_api_route(
            "",
            self.get_blogs,
            methods=["GET"],
            response_model=BlogListResponse,
            summary="Get all blog posts with sorting"
        )
        self.router.add_api_route(
            "/{blog_id}",
            self.get_blog,
            methods=["GET"],
            response_model=BlogResponse,
            summary="Get a specific blog post by ID"
        )
        self.router.add_api_route(
            "/{blog_id}",
            self.update_blog,
            methods=["PUT"],
            response_model=BlogResponse,
            summary="Update a blog post"
        )
        self.router.add_api_route(
            "/{blog_id}",
            self.delete_blog,
            methods=["DELETE"],
            response_model=MessageResponse,
            summary="Delete a blog post"
        )
        self.router.add_api_route(
            "/{blog_id}/like",
            self.like_blog,
            methods=["POST"],
            response_model=BlogResponse,
            summary="Like a blog post (increment likes count)"
        )
    
    def create_blog(self, blog: BlogCreate, db: Session = Depends(get_db)) -> BlogResponse:
        """Create a new blog post."""
        db_blog = Blog(
            title=blog.title,
            content=blog.content,
            author=blog.author,
            likes=0
        )
        db.add(db_blog)
        db.commit()
        db.refresh(db_blog)
        return BlogResponse.model_validate(db_blog)
    
    def get_blog(self, blog_id: int, db: Session = Depends(get_db)) -> BlogResponse:
        """Get a specific blog post by ID."""
        blog = db.query(Blog).filter(Blog.id == blog_id).first()
        if not blog:
            raise HTTPException(status_code=404, detail="Blog not found")
        return BlogResponse.model_validate(blog)
    
    def get_blogs(
        self,
        sort_by: Optional[str] = Query("date", description="Sort by 'likes' or 'date'"),
        order: Optional[str] = Query("desc", description="Sort order: 'asc' or 'desc'"),
        db: Session = Depends(get_db)
    ) -> BlogListResponse:
        """Get all blog posts with optional sorting."""
        # Validate sort_by parameter
        if sort_by not in ["likes", "date"]:
            sort_by = "date"
        
        # Validate order parameter
        if order not in ["asc", "desc"]:
            order = "desc"
        
        # Build query
        query = db.query(Blog)
        
        # Apply sorting
        if sort_by == "likes":
            if order == "desc":
                query = query.order_by(desc(Blog.likes))
            else:
                query = query.order_by(asc(Blog.likes))
        else:  # sort_by == "date"
            if order == "desc":
                query = query.order_by(desc(Blog.created_at))
            else:
                query = query.order_by(asc(Blog.created_at))
        
        blogs = query.all()
        total = len(blogs)
        
        return BlogListResponse(
            blogs=[BlogResponse.model_validate(blog) for blog in blogs],
            total=total,
            sort_by=sort_by,
            order=order
        )
    
    def update_blog(
        self,
        blog_id: int,
        blog_update: BlogUpdate,
        db: Session = Depends(get_db)
    ) -> BlogResponse:
        """Update a blog post."""
        db_blog = db.query(Blog).filter(Blog.id == blog_id).first()
        if not db_blog:
            raise HTTPException(status_code=404, detail="Blog not found")
        
        # Update only provided fields
        update_data = blog_update.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_blog, field, value)
        
        db.commit()
        db.refresh(db_blog)
        return BlogResponse.model_validate(db_blog)
    
    def delete_blog(self, blog_id: int, db: Session = Depends(get_db)) -> MessageResponse:
        """Delete a blog post."""
        db_blog = db.query(Blog).filter(Blog.id == blog_id).first()
        if not db_blog:
            raise HTTPException(status_code=404, detail="Blog not found")
        
        db.delete(db_blog)
        db.commit()
        return MessageResponse(message="Blog deleted successfully")
    
    def like_blog(self, blog_id: int, db: Session = Depends(get_db)) -> BlogResponse:
        """Like a blog post (increment likes count)."""
        db_blog = db.query(Blog).filter(Blog.id == blog_id).first()
        if not db_blog:
            raise HTTPException(status_code=404, detail="Blog not found")
        
        db_blog.likes += 1
        db.commit()
        db.refresh(db_blog)
        return BlogResponse.model_validate(db_blog)


# Create router instance
blog_router = BlogRouter().router

