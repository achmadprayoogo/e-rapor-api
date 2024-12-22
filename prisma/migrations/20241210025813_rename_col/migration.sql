/*
  Warnings:

  - You are about to drop the column `cityofbirth` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `dateofbirth` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `fathername` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `guardianname` on the `students` table. All the data in the column will be lost.
  - You are about to drop the column `mothername` on the `students` table. All the data in the column will be lost.
  - Added the required column `birthdate` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city_of_birth` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `father_name` to the `students` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mother_name` to the `students` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "students" DROP COLUMN "cityofbirth",
DROP COLUMN "dateofbirth",
DROP COLUMN "fathername",
DROP COLUMN "guardianname",
DROP COLUMN "mothername",
ADD COLUMN     "birthdate" DATE NOT NULL,
ADD COLUMN     "city_of_birth" VARCHAR(80) NOT NULL,
ADD COLUMN     "father_name" VARCHAR(80) NOT NULL,
ADD COLUMN     "guardian_name" VARCHAR(80),
ADD COLUMN     "mother_name" VARCHAR(80) NOT NULL;
