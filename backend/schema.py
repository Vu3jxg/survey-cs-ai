from pydantic import BaseModel
from typing import Optional

class ElementaryBase(BaseModel): #base model for elementary school data
    school_code: int
    class_name: int
    section: str
    board: str
    gender: str
    lang: str
    rollno: str
    q1: Optional[str] = None
    q2: Optional[str] = None
    q3: Optional[str] = None
    q4: Optional[str] = None
    q5: Optional[str] = None

class ElementaryCreate(ElementaryBase): #model for creating a new elementary school record. Inherits all attributes from ElementaryBase
    pass

class ElementaryUpdate(BaseModel): #model for updating an existing elementary school record
    school_code: Optional[int] = None
    class_name: Optional[int] = None
    section: Optional[str] = None
    board: Optional[str] = None
    gender: Optional[str] = None
    lang: Optional[str] = None
    rollno: Optional[str] = None
    q1: Optional[str] = None
    q2: Optional[str] = None
    q3: Optional[str] = None
    q4: Optional[str] = None
    q5: Optional[str] = None

class Elementary(ElementaryBase): #model for returning elementary school record details, including the unique identifier
    id: int

    class Config:
        orm_mode = True

class MiddleBase(BaseModel): #base model for middle school data
    school_code: int
    class_name: int
    section: str
    board: str
    gender: str
    lang: str
    rollno: str
    q1: Optional[str] = None
    q2: Optional[str] = None
    q3: Optional[str] = None
    q4: Optional[str] = None
    q5: Optional[str] = None
    q6: Optional[str] = None
    q7: Optional[str] = None
    q8: Optional[str] = None
    q9: Optional[str] = None
    q10: Optional[str] = None

class MiddleCreate(MiddleBase): #model for creating a new middle school record. Inherits all attributes from MiddleBase
    pass

class MiddleUpdate(BaseModel): #model for updating an existing middle school record
    school_code: Optional[int] = None
    class_name: Optional[int] = None
    section: Optional[str] = None
    board: Optional[str] = None
    gender: Optional[str] = None
    lang: Optional[str] = None
    rollno: Optional[str] = None
    q1: Optional[str] = None
    q2: Optional[str] = None
    q3: Optional[str] = None
    q4: Optional[str] = None
    q5: Optional[str] = None
    q6: Optional[str] = None
    q7: Optional[str] = None
    q8: Optional[str] = None
    q9: Optional[str] = None
    q10: Optional[str] = None

class Middle(MiddleBase): #model for returning middle school record details, including the unique identifier
    id: int

    class Config:
        orm_mode = True

#the rest of the classes work the same as the previous ones did, but for high school record details
class HighBase(BaseModel):
    school_code: int
    class_name: int
    section: str
    board: str
    gender: str
    lang: str
    rollno: str
    q1: Optional[str] = None
    q2: Optional[str] = None
    q3: Optional[str] = None
    q4: Optional[str] = None
    q5: Optional[str] = None
    q6: Optional[str] = None
    q7: Optional[str] = None
    q8: Optional[str] = None
    q9: Optional[str] = None
    q10: Optional[str] = None
    q11: Optional[str] = None
    q12: Optional[str] = None
    q13: Optional[str] = None
    q14: Optional[str] = None
    q15: Optional[str] = None

class HighCreate(HighBase):
    pass

class HighUpdate(BaseModel):
    school_code: Optional[int] = None
    class_name: Optional[int] = None
    section: Optional[str] = None
    board: Optional[str] = None
    gender: Optional[str] = None
    lang: Optional[str] = None
    rollno: Optional[str] = None
    q1: Optional[str] = None
    q2: Optional[str] = None
    q3: Optional[str] = None
    q4: Optional[str] = None
    q5: Optional[str] = None
    q6: Optional[str] = None
    q7: Optional[str] = None
    q8: Optional[str] = None
    q9: Optional[str] = None
    q10: Optional[str] = None
    q11: Optional[str] = None
    q12: Optional[str] = None
    q13: Optional[str] = None
    q14: Optional[str] = None
    q15: Optional[str] = None

class High(HighBase):
    id: int

    class Config:
        orm_mode = True
