CREATE TABLE grade_class (  
    grade_class_id SERIAL PRIMARY KEY,  
    academic_year_id INT,   
    grade_class VARCHAR(30),  
    UNIQUE (academic_year_id, grade_class),
	FOREIGN KEY (academic_year_id) REFERENCES academic_year(academic_year_id)
);