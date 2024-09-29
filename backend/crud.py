from sqlalchemy.orm import Session
from .models import Elementary, Middle, High
from .schema import ElementaryCreate, MiddleCreate, HighCreate, ElementaryUpdate, MiddleUpdate, HighUpdate

# CRUD Operations for Elementary DB

def create_elementary(db: Session, elementary: ElementaryCreate):
    db_elementary = Elementary(**elementary.model_dump())
    db.add(db_elementary)
    db.commit()
    db.refresh(db_elementary)
    return db_elementary

#returns record with that particular id
def get_elementary(db: Session, item_id: int):
    return db.query(Elementary).filter(Elementary.id == item_id).first()

#returns first ten records i.e., limit = 10. use skip to skip record with that id
def get_elementaries(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Elementary).offset(skip).limit(limit).all()

def update_elementary(db: Session, item_id: int, update_data: ElementaryUpdate):
    db_elementary = db.query(Elementary).filter(Elementary.id == item_id).first()
    if db_elementary is None:
        return None
    
    update_data_dict = update_data.model_dump(exclude_unset=True)  #convert pydantic model to dict, exclude unset fields

    for key, value in update_data_dict.items():
        if hasattr(db_elementary, key):
            setattr(db_elementary, key, value)
    
    db.commit()
    db.refresh(db_elementary)
    return db_elementary

def delete_elementary(db: Session, item_id: int):
    db_item = db.query(Elementary).filter(Elementary.id == item_id).first()
    if db_item:
        db.delete(db_item)
        db.commit()
        return db_item
    return None

# CRUD Operations for Middle DB

def create_middle(db: Session, middle: MiddleCreate):
    db_middle = Middle(**middle.model_dump())
    db.add(db_middle)
    db.commit()
    db.refresh(db_middle)
    return db_middle

def get_middle(db: Session, item_id: int):
    return db.query(Middle).filter(Middle.id == item_id).first()

def get_middles(db: Session, skip: int = 0, limit: int = 10):
    return db.query(Middle).offset(skip).limit(limit).all()

def update_middle(db: Session, item_id: int, update_data: MiddleUpdate):
    db_middle = db.query(Middle).filter(Middle.id == item_id).first()
    if db_middle is None:
        return None
    
    update_data_dict = update_data.model_dump(exclude_unset=True)  #convert pydantic model to dict, exclude unset fields
    
    for key, value in update_data_dict.items():
        if hasattr(db_middle, key):
            setattr(db_middle, key, value)
    
    db.commit()
    db.refresh(db_middle)
    return db_middle

def delete_middle(db: Session, item_id: int):
    db_item = db.query(Middle).filter(Middle.id == item_id).first()
    if db_item:
        db.delete(db_item)
        db.commit()
        return db_item
    return None

# CRUD Operations for High DB

def create_high(db: Session, high: HighCreate):
    db_high = High(**high.model_dump())
    db.add(db_high)
    db.commit()
    db.refresh(db_high)
    return db_high

def get_high(db: Session, item_id: int):
    return db.query(High).filter(High.id == item_id).first()

def get_highs(db: Session, skip: int = 0, limit: int = 10):
    return db.query(High).offset(skip).limit(limit).all()

def update_high(db: Session, item_id: int, update_data: HighUpdate):
    db_high = db.query(High).filter(High.id == item_id).first()
    if db_high is None:
        return None
    
    update_data_dict = update_data.model_dump(exclude_unset=True)  #convert pydantic model to dict, exclude unset fields

    for key, value in update_data_dict.items():
        if hasattr(db_high, key):
            setattr(db_high, key, value)
    
    db.commit()
    db.refresh(db_high)
    return db_high

def delete_high(db: Session, item_id: int):
    db_item = db.query(High).filter(High.id == item_id).first()
    if db_item:
        db.delete(db_item)
        db.commit()
        return db_item
    return None