/*
  Warnings:

  - The primary key for the `academic_year` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `academic_year_id` on the `academic_year` table. All the data in the column will be lost.
  - The primary key for the `class_member` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `class_member_id` on the `class_member` table. All the data in the column will be lost.
  - The primary key for the `class_name` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `class_name_id` on the `class_name` table. All the data in the column will be lost.
  - The primary key for the `grade_class` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `grade_class_id` on the `grade_class` table. All the data in the column will be lost.
  - The primary key for the `quarter_academic_year` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `quarter_academic_year_id` on the `quarter_academic_year` table. All the data in the column will be lost.
  - The primary key for the `subject_grade_class` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `subject_grade_class_id` on the `subject_grade_class` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `academic_year` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `class_member` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `class_name` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `grade_class` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `quarter_academic_year` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id]` on the table `subject_grade_class` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `academic_year` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `class_member` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `class_name` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `grade_class` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `quarter_academic_year` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - The required column `id` was added to the `subject_grade_class` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- DropForeignKey
ALTER TABLE "class_member" DROP CONSTRAINT "class_member_class_name_id_fkey";

-- DropForeignKey
ALTER TABLE "class_name" DROP CONSTRAINT "class_name_grade_class_id_fkey";

-- DropForeignKey
ALTER TABLE "grade_class" DROP CONSTRAINT "grade_class_academic_year_id_fkey";

-- DropForeignKey
ALTER TABLE "quarter_academic_year" DROP CONSTRAINT "quarter_academic_year_academic_year_id_fkey";

-- DropForeignKey
ALTER TABLE "student_status" DROP CONSTRAINT "student_status_academic_year_id_fkey";

-- DropForeignKey
ALTER TABLE "subject_grade_class" DROP CONSTRAINT "subject_grade_class_grade_class_id_fkey";

-- DropIndex
DROP INDEX "academic_year_academic_year_id_key";

-- DropIndex
DROP INDEX "class_member_class_member_id_key";

-- DropIndex
DROP INDEX "class_name_class_name_id_key";

-- DropIndex
DROP INDEX "grade_class_grade_class_id_key";

-- DropIndex
DROP INDEX "quarter_academic_year_quarter_academic_year_id_key";

-- DropIndex
DROP INDEX "subject_grade_class_subject_grade_class_id_key";

-- AlterTable
ALTER TABLE "academic_year" DROP CONSTRAINT "academic_year_pkey",
DROP COLUMN "academic_year_id",
ADD COLUMN     "id" CHAR(36) NOT NULL,
ADD CONSTRAINT "academic_year_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "class_member" DROP CONSTRAINT "class_member_pkey",
DROP COLUMN "class_member_id",
ADD COLUMN     "id" CHAR(36) NOT NULL,
ADD CONSTRAINT "class_member_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "class_name" DROP CONSTRAINT "class_name_pkey",
DROP COLUMN "class_name_id",
ADD COLUMN     "id" CHAR(36) NOT NULL,
ADD CONSTRAINT "class_name_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "grade_class" DROP CONSTRAINT "grade_class_pkey",
DROP COLUMN "grade_class_id",
ADD COLUMN     "id" CHAR(36) NOT NULL,
ADD CONSTRAINT "grade_class_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "quarter_academic_year" DROP CONSTRAINT "quarter_academic_year_pkey",
DROP COLUMN "quarter_academic_year_id",
ADD COLUMN     "id" CHAR(36) NOT NULL,
ADD CONSTRAINT "quarter_academic_year_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "subject_grade_class" DROP CONSTRAINT "subject_grade_class_pkey",
DROP COLUMN "subject_grade_class_id",
ADD COLUMN     "id" CHAR(36) NOT NULL,
ADD CONSTRAINT "subject_grade_class_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "academic_year_id_key" ON "academic_year"("id");

-- CreateIndex
CREATE UNIQUE INDEX "class_member_id_key" ON "class_member"("id");

-- CreateIndex
CREATE UNIQUE INDEX "class_name_id_key" ON "class_name"("id");

-- CreateIndex
CREATE UNIQUE INDEX "grade_class_id_key" ON "grade_class"("id");

-- CreateIndex
CREATE UNIQUE INDEX "quarter_academic_year_id_key" ON "quarter_academic_year"("id");

-- CreateIndex
CREATE UNIQUE INDEX "subject_grade_class_id_key" ON "subject_grade_class"("id");

-- AddForeignKey
ALTER TABLE "class_member" ADD CONSTRAINT "class_member_class_name_id_fkey" FOREIGN KEY ("class_name_id") REFERENCES "class_name"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "class_name" ADD CONSTRAINT "class_name_grade_class_id_fkey" FOREIGN KEY ("grade_class_id") REFERENCES "grade_class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "grade_class" ADD CONSTRAINT "grade_class_academic_year_id_fkey" FOREIGN KEY ("academic_year_id") REFERENCES "academic_year"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "quarter_academic_year" ADD CONSTRAINT "quarter_academic_year_academic_year_id_fkey" FOREIGN KEY ("academic_year_id") REFERENCES "academic_year"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "student_status" ADD CONSTRAINT "student_status_academic_year_id_fkey" FOREIGN KEY ("academic_year_id") REFERENCES "academic_year"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subject_grade_class" ADD CONSTRAINT "subject_grade_class_grade_class_id_fkey" FOREIGN KEY ("grade_class_id") REFERENCES "grade_class"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
