from pydantic import BaseModel, Field, EmailStr
from datetime import datetime
from typing import Optional, List


class BlogBase(BaseModel):
    """Base schema for blog with common fields."""
    title: str = Field(..., min_length=1, max_length=200, description="Blog post title")
    content: str = Field(..., min_length=1, description="Blog post content")
    author: str = Field(..., min_length=1, max_length=100, description="Author name")


class BlogCreate(BlogBase):
    """Schema for creating a new blog post."""
    pass


class BlogUpdate(BaseModel):
    """Schema for updating a blog post (all fields optional)."""
    title: Optional[str] = Field(None, min_length=1, max_length=200, description="Blog post title")
    content: Optional[str] = Field(None, min_length=1, description="Blog post content")
    author: Optional[str] = Field(None, min_length=1, max_length=100, description="Author name")


class BlogResponse(BlogBase):
    """Schema for blog response."""
    id: int
    likes: int
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class BlogListResponse(BaseModel):
    """Schema for blog list response with metadata."""
    blogs: List[BlogResponse]
    total: int
    sort_by: str
    order: str


class MessageResponse(BaseModel):
    """Schema for simple message responses."""
    message: str


class ContactCreate(BaseModel):
    """Schema for creating a new contact form submission."""
    name: str = Field(..., min_length=1, max_length=100, description="Contact name")
    email: EmailStr = Field(..., description="Contact email address")
    message: str = Field(..., min_length=1, description="Contact message")


class ContactResponse(BaseModel):
    """Schema for contact form response."""
    id: int
    name: str
    email: str
    message: str
    created_at: datetime
    
    class Config:
        from_attributes = True


class ContactListResponse(BaseModel):
    """Schema for contact list response with metadata."""
    contacts: List[ContactResponse]
    total: int


