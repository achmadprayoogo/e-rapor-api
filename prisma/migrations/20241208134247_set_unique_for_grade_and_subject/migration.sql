/*
  Warnings:

  - A unique constraint covering the columns `[subject_grade_class_name,grade_class_id]` on the table `subject_grade_class` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "subject_grade_class_subject_grade_class_name_grade_class_id_key" ON "subject_grade_class"("subject_grade_class_name", "grade_class_id");
