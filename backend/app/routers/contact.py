from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..auth import get_current_active_user
from ..database import get_db
from ..models import ContactInfo as ContactInfoModel, ContactMessage as ContactMessageModel, User
from ..schemas import ContactInfo, ContactInfoCreate, ContactInfoUpdate, ContactMessage, ContactMessageCreate

router = APIRouter(prefix="/contact", tags=["Contact"])

@router.get("/info", response_model=ContactInfo)
async def get_contact_info(db: Session = Depends(get_db)):
    """Get contact information."""
    contact_info = db.query(ContactInfoModel).first()
    if not contact_info:
        raise HTTPException(status_code=404, detail="Contact information not found")
    return contact_info

@router.post("/info", response_model=ContactInfo)
async def create_contact_info(
    contact_info: ContactInfoCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Create contact information."""
    # Check if contact info already exists
    existing_info = db.query(ContactInfoModel).first()
    if existing_info:
        raise HTTPException(status_code=400, detail="Contact information already exists. Use PUT to update.")
    
    db_contact_info = ContactInfoModel(**contact_info.dict())
    db.add(db_contact_info)
    db.commit()
    db.refresh(db_contact_info)
    return db_contact_info

@router.put("/info", response_model=ContactInfo)
async def update_contact_info(
    contact_info: ContactInfoUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update contact information."""
    db_contact_info = db.query(ContactInfoModel).first()
    if not db_contact_info:
        raise HTTPException(status_code=404, detail="Contact information not found")
    
    update_data = contact_info.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_contact_info, field, value)
    
    db.commit()
    db.refresh(db_contact_info)
    return db_contact_info

@router.post("/messages", response_model=ContactMessage)
async def create_contact_message(
    message: ContactMessageCreate,
    db: Session = Depends(get_db)
):
    """Create a new contact message."""
    db_message = ContactMessageModel(**message.dict())
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

@router.get("/messages", response_model=List[ContactMessage])
async def get_contact_messages(
    skip: int = 0,
    limit: int = 100,
    unread_only: bool = False,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get all contact messages."""
    query = db.query(ContactMessageModel)
    if unread_only:
        query = query.filter(ContactMessageModel.is_read == False)
    messages = query.offset(skip).limit(limit).order_by(ContactMessageModel.created_at.desc()).all()
    return messages

@router.put("/messages/{message_id}/read")
async def mark_message_as_read(
    message_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Mark a message as read."""
    db_message = db.query(ContactMessageModel).filter(ContactMessageModel.id == message_id).first()
    if not db_message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    db_message.is_read = True
    db.commit()
    return {"message": "Message marked as read"}

@router.delete("/messages/{message_id}")
async def delete_contact_message(
    message_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Delete a contact message."""
    db_message = db.query(ContactMessageModel).filter(ContactMessageModel.id == message_id).first()
    if not db_message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    db.delete(db_message)
    db.commit()
    return {"message": "Contact message deleted successfully"}