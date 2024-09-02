from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Retrieve the database URL from environment variables
DATABASE_URL_DB1 = os.getenv('DATABASE_URL_DB1')
DATABASE_URL_DB2 = os.getenv('DATABASE_URL_DB2')
DATABASE_URL_DB3 = os.getenv('DATABASE_URL_DB3')

# Create engines
engine_db1 = create_engine(DATABASE_URL_DB1)
engine_db2 = create_engine(DATABASE_URL_DB2)
engine_db3 = create_engine(DATABASE_URL_DB3)

# Create sessionmakers
SessionLocal_db1 = sessionmaker(autocommit=False, autoflush=False, bind=engine_db1)
SessionLocal_db2 = sessionmaker(autocommit=False, autoflush=False, bind=engine_db2)
SessionLocal_db3 = sessionmaker(autocommit=False, autoflush=False, bind=engine_db3)

# Creating base classes for SQLAlchemy models
# All model classes should inherit from these base classes
Base_db1 = declarative_base()
Base_db2 = declarative_base()
Base_db3 = declarative_base()