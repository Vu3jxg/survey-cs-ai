-- Database: Elementary

-- DROP DATABASE IF EXISTS "Elementary";

CREATE DATABASE "Elementary"
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


CREATE TYPE response_option AS ENUM ('A', 'B', 'C', 'D', 'E');
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
	q3 response_option,
	q4 response_option,
	q5 response_option,
	q6 response_option,
	q7 response_option,
	q8 response_option,
	q9 response_option,
	q10 response_option,
	rating int
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX unique_entry ON responses (school_code, class_name, section, board, rollno);