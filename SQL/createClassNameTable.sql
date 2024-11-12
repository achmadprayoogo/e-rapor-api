CREATE TABLE class_name (  
    class_name_id SERIAL PRIMARY KEY,  
    academic_year_id INT NOT NULL,   
    grade_class_id INT NOT NULL,
	class_name VARCHAR(10) NOT NULL,
	homeroom_teacher VARCHAR(20) NOT NULL,
    UNIQUE (academic_year_id, grade_class_id, class_name),  
    FOREIGN KEY (academic_year_id) REFERENCES academic_year(academic_year_id),
	FOREIGN KEY (grade_class_id) REFERENCES grade_class(grade_class_id)
);
