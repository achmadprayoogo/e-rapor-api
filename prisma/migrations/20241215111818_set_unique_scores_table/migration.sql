/*
  Warnings:

  - A unique constraint covering the columns `[student_id,subject_id]` on the table `scores` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "scores_student_id_subject_id_key" ON "scores"("student_id", "subject_id");
