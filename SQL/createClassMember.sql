CREATE TABLE student_status (
    id SERIAL PRIMARY KEY,
    academic_year_id INTEGER NOT NULL,
    nis INTEGER NOT NULL,
    status_name TEXT NOT NULL CHECK (status_name IN ('active', 'dropout', 'graduate')) default 'active',
    UNIQUE (academic_year_id, nis),
    FOREIGN KEY (academic_year_id) REFERENCES academic_year(academic_year_id),
    FOREIGN KEY (nis) REFERENCES biodata(nis)
);

