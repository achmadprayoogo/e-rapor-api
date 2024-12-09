/*
  Warnings:

  - The primary key for the `biodata` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `nis` column on the `biodata` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[id]` on the table `biodata` will be added. If there are existing duplicate values, this will fail.
  - The required column `id` was added to the `biodata` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.
  - Changed the type of `nis` on the `class_member` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `nis` on the `student_status` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "class_member" DROP CONSTRAINT "class_member_nis_fkey";

-- DropForeignKey
ALTER TABLE "student_status" DROP CONSTRAINT "student_status_nis_fkey";

-- AlterTable
ALTER TABLE "biodata" DROP CONSTRAINT "biodata_pkey",
ADD COLUMN     "id" CHAR(36) NOT NULL,
DROP COLUMN "nis",
ADD COLUMN     "nis" INTEGER,
ADD CONSTRAINT "biodata_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "class_member" DROP COLUMN "nis",
ADD COLUMN     "nis" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "student_status" DROP COLUMN "nis",
ADD COLUMN     "nis" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "biodata_id_key" ON "biodata"("id");

-- CreateIndex
CREATE UNIQUE INDEX "biodata_nis_key" ON "biodata"("nis");

-- CreateIndex
CREATE UNIQUE INDEX "unique_class_name_id_nis" ON "class_member"("class_name_id", "nis");

-- CreateIndex
CREATE UNIQUE INDEX "student_status_academic_year_id_nis_key" ON "student_status"("academic_year_id", "nis");

-- AddForeignKey
ALTER TABLE "class_member" ADD CONSTRAINT "class_member_nis_fkey" FOREIGN KEY ("nis") REFERENCES "biodata"("nis") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "student_status" ADD CONSTRAINT "student_status_nis_fkey" FOREIGN KEY ("nis") REFERENCES "biodata"("nis") ON DELETE NO ACTION ON UPDATE NO ACTION;
