/*
  Warnings:

  - You are about to drop the column `nis` on the `class_member` table. All the data in the column will be lost.
  - You are about to drop the column `student_status_id` on the `class_member` table. All the data in the column will be lost.
  - You are about to drop the column `nis` on the `student_status` table. All the data in the column will be lost.
  - You are about to drop the column `status_name` on the `student_status` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `students` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[class_name_id,stunedt_id]` on the table `class_member` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[academic_year_id,student_id]` on the table `student_status` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `stunedt_id` to the `class_member` table without a default value. This is not possible if the table is not empty.
  - Added the required column `student_id` to the `student_status` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "class_member" DROP CONSTRAINT "class_member_nis_fkey";

-- DropForeignKey
ALTER TABLE "class_member" DROP CONSTRAINT "class_member_student_status_id_fkey";

-- DropForeignKey
ALTER TABLE "student_status" DROP CONSTRAINT "student_status_nis_fkey";

-- DropIndex
DROP INDEX "unique_class_name_id_nis";

-- DropIndex
DROP INDEX "student_status_academic_year_id_nis_key";

-- AlterTable
ALTER TABLE "class_member" DROP COLUMN "nis",
DROP COLUMN "student_status_id",
ADD COLUMN     "stunedt_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "student_status" DROP COLUMN "nis",
DROP COLUMN "status_name",
ADD COLUMN     "status" "StudentStatus" NOT NULL DEFAULT 'active',
ADD COLUMN     "student_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "students" DROP COLUMN "status";

-- CreateIndex
CREATE UNIQUE INDEX "unique_class_name_id_student_id" ON "class_member"("class_name_id", "stunedt_id");

-- CreateIndex
CREATE UNIQUE INDEX "student_status_academic_year_id_student_id_key" ON "student_status"("academic_year_id", "student_id");

-- AddForeignKey
ALTER TABLE "class_member" ADD CONSTRAINT "class_member_stunedt_id_fkey" FOREIGN KEY ("stunedt_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "student_status" ADD CONSTRAINT "student_status_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
