-- Database: Middle

-- DROP DATABASE IF EXISTS "Middle";

CREATE DATABASE "Middle"
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_India.utf8'
    LC_CTYPE = 'English_India.utf8'
    LOCALE_PROVIDER = 'libc'
	TEMPLATE = template0
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

COMMENT ON DATABASE "Middle"
    IS 'To store responses of students from 6th to 8th grade';

CREATE TYPE response_option AS ENUM ('A', 'B', 'C', 'D','E');
CREATE TYPE boards_options AS ENUM ('State', 'CBSE', 'ICSE', 'ISC');

CREATE TABLE responses
(
	id bigint primary key generated always as identity,
	school_code int,
	other_name varchar(100),
	state_n varchar(20),
	district varchar(20),
	class_name int,
	section varchar(1),
	board boards_options,
	gender varchar(1),
	lang varchar(15),
	rollno varchar(15),
	q1 response_option,
	q2 response_option,
	q3 response_option,
	q4 response_option,
	q5 response_option,
	q6 response_option,
	q7 response_option,
	q8 response_option,
	q9 response_option,
	q10 response_option,
	q11 response_option,
	q12 response_option,
	q13 response_option,
	q14 response_option,
	q15 response_option,
	q16 response_option,
	q17 response_option,
	q18 response_option,
	q19 response_option,
	q20 response_option,
	rating int
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX unique_entry ON responses (school_code, class_name, section, board, rollno);