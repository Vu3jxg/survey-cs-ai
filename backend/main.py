from fastapi import FastAPI, Request, HTTPException, Depends
import requests
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import SessionLocal_db1, SessionLocal_db2, SessionLocal_db3, Base_db1, Base_db2, Base_db3, engine_db1, engine_db2, engine_db3
from . import crud
from . import schema
from . import models
import httpx

# Create all tables for Elementary, Middle, and High databases
Base_db1.metadata.create_all(bind=engine_db1)
Base_db2.metadata.create_all(bind=engine_db2)
Base_db3.metadata.create_all(bind=engine_db3)

app = FastAPI()

visitor_count = 0

@app.get("/api/visitor_count")
def get_visitor_count():
    global visitor_count
    return {"count": visitor_count}

@app.post("/api/increment_visitor_count")
def increment_visitor_count():
    global visitor_count
    visitor_count += 1
    return {"count": visitor_count}

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Update this with your frontend's origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# reCAPTCHA secret key (replace this with your actual secret key)
RECAPTCHA_SECRET_KEY = "6LeByWIqAAAAAGbPWyYaCm4jeB3o-o561b1PzMEP"

# Dependency to get the SQLAlchemy session for Elementary model
def get_db_elementary():
    db = SessionLocal_db1()
    try:
        yield db
    finally:
        db.close()

# Dependency to get the SQLAlchemy session for Middle model
def get_db_middle():
    db = SessionLocal_db2()
    try:
        yield db
    finally:
        db.close()

# Dependency to get the SQLAlchemy session for High model
def get_db_high():
    db = SessionLocal_db3()
    try:
        yield db
    finally:
        db.close()

# Function to verify reCAPTCHA
async def verify_recaptcha(captcha_token: str) -> bool:
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://www.google.com/recaptcha/api/siteverify",
            data={
                "secret": RECAPTCHA_SECRET_KEY,
                "response": captcha_token
            }
        )
        result = response.json()
        return result.get("success", False)

# API endpoint to verify reCAPTCHA and handle form submission
@app.post("/api/submit-form")
async def verify_recaptcha_and_submit(request: Request, db: Session = Depends(get_db_elementary)):
    body = await request.json()
    captcha_token = body.get("recaptcha_token")

    if not captcha_token:
        raise HTTPException(status_code=400, detail="Captcha token missing")

    # Verify captcha token with Google
    is_human = await verify_recaptcha(captcha_token)
    if not is_human:
        raise HTTPException(status_code=400, detail="Captcha verification failed")

    # Proceed with your logic after successful captcha verification
    # You can access other fields in the body here
    # For example: school_code = body.get("school_code")
    
    return {"message": "Form submitted successfully"}

# CRUD Operations for Elementary Model
@app.post("/elementary/", response_model=schema.Elementary)
async def create_elementary(request: Request, db: Session = Depends(get_db_elementary)):
    data = await request.json()
    recaptcha_token = data.get("recaptcha_token")
    
    if not recaptcha_token:
        raise HTTPException(status_code=400, detail="reCAPTCHA token missing")

    # Verify reCAPTCHA
    is_human = await verify_recaptcha(recaptcha_token)
    if not is_human:
        raise HTTPException(status_code=400, detail="reCAPTCHA verification failed")

    # Proceed with creating the Elementary record
    elementary_data = schema.ElementaryCreate(**data)
    existing_elementary = db.query(models.Elementary).filter(
        models.Elementary.school_code == elementary_data.school_code,
        models.Elementary.class_name == elementary_data.class_name,
        models.Elementary.rollno == elementary_data.rollno,
        models.Elementary.board == elementary_data.board
    ).first()

    if existing_elementary:
        return existing_elementary
    else:
        return crud.create_elementary(db=db, elementary=elementary_data)

@app.get("/elementary/{elementary_id}", response_model=schema.Elementary)
def read_elementary(elementary_id: int, db: Session = Depends(get_db_elementary)):
    db_elementary = crud.get_elementary(db, elementary_id)
    if db_elementary is None:
        raise HTTPException(status_code=404, detail="Elementary record not found")
    return db_elementary

@app.get("/elementary/")
def read_elementaries(skip: int = 0, limit: int = 10, db: Session = Depends(get_db_elementary)):
    return crud.get_elementaries(db=db, skip=skip, limit=limit)

@app.put("/elementary/{elementary_id}", response_model=schema.Elementary)
def update_elementary(elementary_id: int, update_data: schema.ElementaryUpdate, db: Session = Depends(get_db_elementary)):
    db_elementary = crud.update_elementary(db=db, item_id=elementary_id, update_data=update_data)
    if db_elementary is None:
        raise HTTPException(status_code=404, detail="Elementary record not found")
    return db_elementary

@app.delete("/elementary/{elementary_id}")
def delete_elementary(elementary_id: int, db: Session = Depends(get_db_elementary)):
    success = crud.delete_elementary(db=db, item_id=elementary_id)
    if not success:
        raise HTTPException(status_code=404, detail="Elementary record not found")
    return {"detail": "Elementary record deleted"}

# CRUD Operations for Middle Model

@app.post("/middle/", response_model=schema.Middle)
async def create_middle(request: Request, db: Session = Depends(get_db_middle)):
    data = await request.json()
    recaptcha_token = data.get("recaptcha_token")
    
    if not recaptcha_token:
        raise HTTPException(status_code=400, detail="reCAPTCHA token missing")

    # Verify reCAPTCHA
    is_human = await verify_recaptcha(recaptcha_token)
    if not is_human:
        raise HTTPException(status_code=400, detail="reCAPTCHA verification failed")

    # Proceed with creating the Middle record
    middle_data = schema.MiddleCreate(**data)
    existing_middle = db.query(models.Middle).filter(
        models.Middle.school_code == middle_data.school_code,
        models.Middle.class_name == middle_data.class_name,
        models.Middle.rollno == middle_data.rollno,
        models.Middle.board == middle_data.board
    ).first()

    if existing_middle:
        return existing_middle
    else:
        return crud.create_middle(db=db, middle=middle_data)

@app.get("/middle/{middle_id}", response_model=schema.Middle)
def read_middle(middle_id: int, db: Session = Depends(get_db_middle)):
    db_middle = crud.get_middle(db, middle_id)
    if db_middle is None:
        raise HTTPException(status_code=404, detail="Middle record not found")
    return db_middle

@app.get("/middle/")
def read_middles(skip: int = 0, limit: int = 10, db: Session = Depends(get_db_middle)):
    return crud.get_middles(db=db, skip=skip, limit=limit)

@app.put("/middle/{middle_id}", response_model=schema.Middle)
def update_middle(middle_id: int, update_data: schema.MiddleUpdate, db: Session = Depends(get_db_middle)):
    db_middle = crud.update_middle(db=db, item_id=middle_id, update_data=update_data)
    if db_middle is None:
        raise HTTPException(status_code=404, detail="Middle record not found")
    return db_middle

@app.delete("/middle/{middle_id}")
def delete_middle(middle_id: int, db: Session = Depends(get_db_middle)):
    success = crud.delete_middle(db=db, item_id=middle_id)
    if not success:
        raise HTTPException(status_code=404, detail="Middle record not found")
    return {"detail": "Middle record deleted"}

# CRUD Operations for High Model

@app.post("/high/", response_model=schema.High)
async def create_high(request: Request, db: Session = Depends(get_db_high)):
    data = await request.json()
    recaptcha_token = data.get("recaptcha_token")
    
    if not recaptcha_token:
        raise HTTPException(status_code=400, detail="reCAPTCHA token missing")

    # Verify reCAPTCHA
    is_human = await verify_recaptcha(recaptcha_token)
    if not is_human:
        raise HTTPException(status_code=400, detail="reCAPTCHA verification failed")

    # Proceed with creating the High record
    high_data = schema.HighCreate(**data)
    existing_high = db.query(models.High).filter(
        models.High.school_code == high_data.school_code,
        models.High.class_name == high_data.class_name,
        models.High.rollno == high_data.rollno,
        models.High.board == high_data.board
    ).first()

    if existing_high:
        return existing_high
    else:
        return crud.create_high(db=db, high=high_data)

@app.get("/high/{high_id}", response_model=schema.High)
def read_high(high_id: int, db: Session = Depends(get_db_high)):
    db_high = crud.get_high(db, high_id)
    if db_high is None:
        raise HTTPException(status_code=404, detail="High record not found")
    return db_high

@app.get("/high/")
def read_highs(skip: int = 0, limit: int = 10, db: Session = Depends(get_db_high)):
    return crud.get_highs(db=db, skip=skip, limit=limit)

@app.put("/high/{high_id}", response_model=schema.High)
def update_high(high_id: int, update_data: schema.HighUpdate, db: Session = Depends(get_db_high)):
    db_high = crud.update_high(db=db, item_id=high_id, update_data=update_data)
    if db_high is None:
        raise HTTPException(status_code=404, detail="High record not found")
    return db_high

@app.delete("/high/{high_id}")
def delete_high(high_id: int, db: Session = Depends(get_db_high)):
    success = crud.delete_high(db=db, item_id=high_id)
    if not success:
        raise HTTPException(status_code=404, detail="High record not found")
    return {"detail": "High record deleted"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
