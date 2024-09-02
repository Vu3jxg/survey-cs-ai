-- Database: High

-- DROP DATABASE IF EXISTS "High";

CREATE DATABASE "High"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_India.utf8'
    LC_CTYPE = 'English_India.utf8'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

COMMENT ON DATABASE "High"
    IS 'To store responses of students from 9th to 12th grade';

CREATE TABLE responses
(
	id serial primary key,
	school_code int,
	class_name int,
	section char(1),
	board varchar(5),
	gender char(1),
	lang varchar(15),
	rollno varchar(15),
	q1 char(1),
	q2 char(1),
	q3 char(1),
	q4 char(1),
	q5 char(1),
	q6 char(1),
	q7 char(1),
	q8 char(1),
	q9 char(1),
	q10 char(1),
	q11 char(1),
	q12 char(1),
	q13 char(1),
	q14 char(1),
	q15 char(1)
);