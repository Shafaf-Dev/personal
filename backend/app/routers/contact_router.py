from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Contact
from app.schemas import (
    ContactCreate,
    ContactResponse,
    ContactListResponse
)


class ContactRouter:
    """Class-based router for contact form endpoints."""
    
    def __init__(self):
        self.router = APIRouter(
            prefix="/contact",
            tags=["contact"]
        )
        self._register_routes()
    
    def _register_routes(self):
        """Register all contact routes."""
        self.router.add_api_route(
            "",
            self.submit_contact_form,
            methods=["POST"],
            response_model=ContactResponse,
            status_code=201,
            summary="Submit a contact form"
        )
        self.router.add_api_route(
            "",
            self.get_contacts,
            methods=["GET"],
            response_model=ContactListResponse,
            summary="Get all contact submissions"
        )
        self.router.add_api_route(
            "/{contact_id}",
            self.get_contact,
            methods=["GET"],
            response_model=ContactResponse,
            summary="Get a specific contact submission by ID"
        )
    
    def submit_contact_form(
        self,
        contact: ContactCreate,
        db: Session = Depends(get_db)
    ) -> ContactResponse:
        """Submit a contact form."""
        db_contact = Contact(
            name=contact.name,
            email=contact.email,
            message=contact.message
        )
        db.add(db_contact)
        db.commit()
        db.refresh(db_contact)
        return ContactResponse.model_validate(db_contact)

    def get_contacts(
        self,
        db: Session = Depends(get_db)
    ) -> ContactListResponse:
        """Get all contact submissions."""
        contacts = db.query(Contact).all()
        total = len(contacts)
        return List(
            contacts=[ContactResponse.model_validate(contact) for contact in contacts],
            total=total
        )
    
    
    def get_contact(
        self,
        contact_id: int,
        db: Session = Depends(get_db)
    ) -> ContactResponse:
        """Get a specific contact submission by ID."""
        contact = db.query(Contact).filter(Contact.id == contact_id).first()
        if not contact:
            raise HTTPException(status_code=404, detail="Contact submission not found")
        return ContactResponse.model_validate(contact)


# Create router instance
contact_router = ContactRouter().router

