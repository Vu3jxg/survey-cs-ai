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

CREATE TYPE response_option AS ENUM ('A', 'B', 'C', 'D','E');
CREATE TYPE boards_options AS ENUM ('State', 'CBSE', 'ICSE', 'ISC');

CREATE TABLE responses
(
	id bigint primary key generated always as identity,
	school_code int,
	class_name int,
	section varchar(1),
	board boards_options,
	gender varchar(1),
	lang varchar(15),
	rollno varchar(15),
	q1 response_option,
	q2 response_option,
	q3 varchar(15),
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
	q21 response_option,
	q22 response_option,
	q23 response_option,
	q24 response_option,
	q25 response_option,
	q26 response_option,
	q27 response_option,
	q28 varchar(12)
);

CREATE UNIQUE INDEX unique_entry ON responses (school_code, class_name, section, board, rollno);