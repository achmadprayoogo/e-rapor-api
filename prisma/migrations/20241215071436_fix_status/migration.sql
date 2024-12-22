/*
  Warnings:

  - You are about to drop the column `student_status` on the `class_member` table. All the data in the column will be lost.
  - Added the required column `student_status_id` to the `class_member` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "class_member" DROP COLUMN "student_status",
ADD COLUMN     "student_status_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "class_member" ADD CONSTRAINT "class_member_student_status_id_fkey" FOREIGN KEY ("student_status_id") REFERENCES "student_status"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
