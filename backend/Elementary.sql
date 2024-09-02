-- Database: Elementary

-- DROP DATABASE IF EXISTS "Elementary";

CREATE DATABASE "Elementary"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_India.utf8'
    LC_CTYPE = 'English_India.utf8'
    LOCALE_PROVIDER = 'libc'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

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
	q5 char(1)
);