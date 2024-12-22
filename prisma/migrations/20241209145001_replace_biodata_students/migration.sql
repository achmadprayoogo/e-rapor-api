/*
  Warnings:

  - You are about to drop the `biodata` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "class_member" DROP CONSTRAINT "class_member_nis_fkey";

-- DropForeignKey
ALTER TABLE "student_status" DROP CONSTRAINT "student_status_nis_fkey";

-- DropTable
DROP TABLE "biodata";

-- CreateTable
CREATE TABLE "students" (
    "id" CHAR(36) NOT NULL,
    "nis" INTEGER NOT NULL,
    "fullname" VARCHAR(80) NOT NULL,
    "cityofbirth" VARCHAR(80) NOT NULL,
    "dateofbirth" DATE NOT NULL,
    "fathername" VARCHAR(80) NOT NULL,
    "mothername" VARCHAR(80) NOT NULL,
    "guardianname" VARCHAR(80),
    "status" VARCHAR(20),
    "address" VARCHAR(80) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "students_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "students_id_key" ON "students"("id");

-- CreateIndex
CREATE UNIQUE INDEX "students_nis_key" ON "students"("nis");

-- AddForeignKey
ALTER TABLE "class_member" ADD CONSTRAINT "class_member_nis_fkey" FOREIGN KEY ("nis") REFERENCES "students"("nis") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "student_status" ADD CONSTRAINT "student_status_nis_fkey" FOREIGN KEY ("nis") REFERENCES "students"("nis") ON DELETE NO ACTION ON UPDATE NO ACTION;
