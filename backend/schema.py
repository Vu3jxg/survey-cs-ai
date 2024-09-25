from pydantic import BaseModel
from typing import Optional
from enum import Enum

class ResponseOption(str,Enum):
    A = "A"
    B = "B"
    C = "C"
    D = "D"
    E = "E"

class BoardsOptions(str,Enum):
    STATE = "State"
    CBSE = "CBSE"
    ICSE = "ICSE"
    ISC = "ISC"

class ElementaryBase(BaseModel): #base model for elementary school data
    school_code: int
    class_name: int
    section: str
    board: BoardsOptions
    gender: str
    lang: str
    rollno: str
    q1: Optional[ResponseOption] = None
    q2: Optional[ResponseOption] = None
    q3: Optional[ResponseOption] = None
    q4: Optional[ResponseOption] = None
    q5: Optional[ResponseOption] = None
    q6: Optional[ResponseOption] = None
    q7: Optional[ResponseOption] = None
    q8: Optional[ResponseOption] = None
    q9: Optional[ResponseOption] = None
    q10: Optional[ResponseOption] = None
    rating: Optional[int] = None

class ElementaryCreate(ElementaryBase): #model for creating a new elementary school record. Inherits all attributes from ElementaryBase
    pass

class ElementaryUpdate(BaseModel): #model for updating an existing elementary school record
    school_code: Optional[int] = None
    class_name: Optional[int] = None
    section: Optional[str] = None
    board: Optional[BoardsOptions] = None
    gender: Optional[str] = None
    lang: Optional[str] = None
    rollno: Optional[str] = None
    q1: Optional[ResponseOption] = None
    q2: Optional[ResponseOption] = None
    q3: Optional[ResponseOption] = None
    q4: Optional[ResponseOption] = None
    q5: Optional[ResponseOption] = None
    q6: Optional[ResponseOption] = None
    q7: Optional[ResponseOption] = None
    q8: Optional[ResponseOption] = None
    q9: Optional[ResponseOption] = None
    q10: Optional[ResponseOption] = None
    rating: Optional[int] = None

class Elementary(ElementaryBase): #model for returning elementary school record details, including the unique identifier
    id: int

    class Config:
        from_attributes = True

class MiddleBase(BaseModel): #base model for middle school data
    school_code: int
    class_name: int
    section: str
    board: BoardsOptions
    gender: str
    lang: str
    rollno: str
    q1: Optional[ResponseOption] = None
    q2: Optional[ResponseOption] = None
    q3: Optional[ResponseOption] = None
    q4: Optional[ResponseOption] = None
    q5: Optional[ResponseOption] = None
    q6: Optional[ResponseOption] = None
    q7: Optional[ResponseOption] = None
    q8: Optional[ResponseOption] = None
    q9: Optional[ResponseOption] = None
    q10: Optional[ResponseOption] = None
    q11: Optional[ResponseOption] = None
    q12: Optional[ResponseOption] = None
    q13: Optional[ResponseOption] = None
    q14: Optional[ResponseOption] = None
    q15: Optional[ResponseOption] = None
    q16: Optional[ResponseOption] = None
    q17: Optional[ResponseOption] = None
    q18: Optional[ResponseOption] = None
    q19: Optional[ResponseOption] = None
    q20: Optional[ResponseOption] = None
    rating: Optional[int] = None

class MiddleCreate(MiddleBase): #model for creating a new middle school record. Inherits all attributes from MiddleBase
    pass

class MiddleUpdate(BaseModel): #model for updating an existing middle school record
    school_code: Optional[int] = None
    class_name: Optional[int] = None
    section: Optional[str] = None
    board: Optional[BoardsOptions] = None
    gender: Optional[str] = None
    lang: Optional[str] = None
    rollno: Optional[str] = None
    q1: Optional[ResponseOption] = None
    q2: Optional[ResponseOption] = None
    q3: Optional[ResponseOption] = None
    q4: Optional[ResponseOption] = None
    q5: Optional[ResponseOption] = None
    q6: Optional[ResponseOption] = None
    q7: Optional[ResponseOption] = None
    q8: Optional[ResponseOption] = None
    q9: Optional[ResponseOption] = None
    q10: Optional[ResponseOption] = None
    q11: Optional[ResponseOption] = None
    q12: Optional[ResponseOption] = None
    q13: Optional[ResponseOption] = None
    q14: Optional[ResponseOption] = None
    q15: Optional[ResponseOption] = None
    q16: Optional[ResponseOption] = None
    q17: Optional[ResponseOption] = None
    q18: Optional[ResponseOption] = None
    q19: Optional[ResponseOption] = None
    q20: Optional[ResponseOption] = None
    rating: Optional[int] = None

class Middle(MiddleBase): #model for returning middle school record details, including the unique identifier
    id: int

    class Config:
        from_attributes = True

#the rest of the classes work the same as the previous ones did, but for high school record details
class HighBase(BaseModel):
    school_code: int
    class_name: int
    section: str
    board: BoardsOptions
    gender: str
    lang: str
    rollno: str
    q1: Optional[ResponseOption] = None
    q2: Optional[ResponseOption] = None
    q3: Optional[str] = None
    q4: Optional[ResponseOption] = None
    q5: Optional[ResponseOption] = None
    q6: Optional[ResponseOption] = None
    q7: Optional[ResponseOption] = None
    q8: Optional[ResponseOption] = None
    q9: Optional[ResponseOption] = None
    q10: Optional[ResponseOption] = None
    q11: Optional[ResponseOption] = None
    q12: Optional[ResponseOption] = None
    q13: Optional[ResponseOption] = None
    q14: Optional[ResponseOption] = None
    q15: Optional[ResponseOption] = None
    q16: Optional[ResponseOption] = None
    q17: Optional[ResponseOption] = None
    q18: Optional[ResponseOption] = None
    q19: Optional[ResponseOption] = None
    q20: Optional[ResponseOption] = None
    q21: Optional[ResponseOption] = None
    q22: Optional[ResponseOption] = None
    q23: Optional[ResponseOption] = None
    q24: Optional[ResponseOption] = None
    q25: Optional[ResponseOption] = None
    q26: Optional[ResponseOption] = None
    q27: Optional[ResponseOption] = None
    q28: Optional[str] = None
    rating: Optional[int] = None

class HighCreate(HighBase):
    pass

class HighUpdate(BaseModel):
    school_code: Optional[int] = None
    class_name: Optional[int] = None
    section: Optional[str] = None
    board: Optional[BoardsOptions] = None
    gender: Optional[str] = None
    lang: Optional[str] = None
    rollno: Optional[str] = None
    q1: Optional[ResponseOption] = None
    q2: Optional[ResponseOption] = None
    q3: Optional[str] = None
    q4: Optional[ResponseOption] = None
    q5: Optional[ResponseOption] = None
    q6: Optional[ResponseOption] = None
    q7: Optional[ResponseOption] = None
    q8: Optional[ResponseOption] = None
    q9: Optional[ResponseOption] = None
    q10: Optional[ResponseOption] = None
    q11: Optional[ResponseOption] = None
    q12: Optional[ResponseOption] = None
    q13: Optional[ResponseOption] = None
    q14: Optional[ResponseOption] = None
    q15: Optional[ResponseOption] = None
    q16: Optional[ResponseOption] = None
    q17: Optional[ResponseOption] = None
    q18: Optional[ResponseOption] = None
    q19: Optional[ResponseOption] = None
    q20: Optional[ResponseOption] = None
    q21: Optional[ResponseOption] = None
    q22: Optional[ResponseOption] = None
    q23: Optional[ResponseOption] = None
    q24: Optional[ResponseOption] = None
    q25: Optional[ResponseOption] = None
    q26: Optional[ResponseOption] = None
    q27: Optional[ResponseOption] = None
    q28: Optional[str] = None
    rating: Optional[int] = None

class High(HighBase):
    id: int

    class Config:
        from_attributes = True