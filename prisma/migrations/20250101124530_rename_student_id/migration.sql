/*
  Warnings:

  - You are about to drop the column `stunedt_id` on the `class_member` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[class_name_id,student_id]` on the table `class_member` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `student_id` to the `class_member` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "class_member" DROP CONSTRAINT "class_member_stunedt_id_fkey";

-- DropIndex
DROP INDEX "unique_class_name_id_student_id";

-- AlterTable
ALTER TABLE "class_member" DROP COLUMN "stunedt_id",
ADD COLUMN     "student_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "unique_class_name_id_student_id" ON "class_member"("class_name_id", "student_id");

-- AddForeignKey
ALTER TABLE "class_member" ADD CONSTRAINT "class_member_student_id_fkey" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
