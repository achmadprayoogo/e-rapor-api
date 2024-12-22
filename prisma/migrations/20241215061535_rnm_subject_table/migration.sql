/*
  Warnings:

  - You are about to drop the `subject_grade_class` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "subject_grade_class" DROP CONSTRAINT "subject_grade_class_grade_class_id_fkey";

-- DropTable
DROP TABLE "subject_grade_class";

-- CreateTable
CREATE TABLE "subject" (
    "id" CHAR(36) NOT NULL,
    "grade_class_id" TEXT NOT NULL,
    "subject_name" VARCHAR(30) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "subject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subject_id_key" ON "subject"("id");

-- CreateIndex
CREATE UNIQUE INDEX "subject_subject_name_grade_class_id_key" ON "subject"("subject_name", "grade_class_id");

-- AddForeignKey
ALTER TABLE "subject" ADD CONSTRAINT "subject_grade_class_id_fkey" FOREIGN KEY ("grade_class_id") REFERENCES "grade_class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
