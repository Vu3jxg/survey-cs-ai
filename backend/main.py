from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from .database import SessionLocal_db1, engine_db1, SessionLocal_db2, engine_db2, SessionLocal_db3, engine_db3, Base_db1, Base_db2, Base_db3
from . import crud
from . import schema

# Create all tables in the respective databases that are defined by models inheriting from the base classes
Base_db1.metadata.create_all(bind=engine_db1)  # For Elementary DB
Base_db2.metadata.create_all(bind=engine_db2)  # For Middle DB
Base_db3.metadata.create_all(bind=engine_db3)  # For High DB

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Allow requests from this origin, Replace http://localhost:5173 with the origin of your frontend application.
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

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

# Routes for Elementary model

@app.post("/elementary/", response_model=schema.Elementary)
def create_elementary(elementary: schema.ElementaryCreate, db: Session = Depends(get_db_elementary)):
    return crud.create_elementary(db=db, elementary=elementary)

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

# Routes for Middle model

@app.post("/middle/", response_model=schema.Middle)
def create_middle(middle: schema.MiddleCreate, db: Session = Depends(get_db_middle)):
    return crud.create_middle(db=db, middle=middle)

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

# Routes for High model

@app.post("/high/", response_model=schema.High)
def create_high(high: schema.HighCreate, db: Session = Depends(get_db_high)):
    return crud.create_high(db=db, high=high)

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