-- CreateEnum
CREATE TYPE "StudentStatus" AS ENUM ('active', 'dropout', 'graduate');

-- CreateTable
CREATE TABLE "academic_year" (
    "academic_year_id" CHAR(36) NOT NULL,
    "academic_year" VARCHAR(10) NOT NULL,
    "start_date" DATE,
    "end_date" DATE,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "academic_year_pkey" PRIMARY KEY ("academic_year_id")
);

-- CreateTable
CREATE TABLE "biodata" (
    "nis" CHAR(36) NOT NULL,
    "fullname" VARCHAR(80),
    "cityofbirth" VARCHAR(80),
    "dateofbirth" DATE,
    "fathername" VARCHAR(80),
    "mothername" VARCHAR(80),
    "guardianname" VARCHAR(80),
    "status" VARCHAR(20),
    "address" VARCHAR(80),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "biodata_pkey" PRIMARY KEY ("nis")
);

-- CreateTable
CREATE TABLE "class_member" (
    "class_member_id" CHAR(36) NOT NULL,
    "class_name_id" TEXT NOT NULL,
    "nis" TEXT NOT NULL,
    "student_status" VARCHAR(10) NOT NULL DEFAULT 'active',

    CONSTRAINT "class_member_pkey" PRIMARY KEY ("class_member_id")
);

-- CreateTable
CREATE TABLE "class_name" (
    "class_name_id" CHAR(36) NOT NULL,
    "grade_class_id" TEXT NOT NULL,
    "class_name" VARCHAR(10) NOT NULL,
    "homeroom_teacher" VARCHAR(20) NOT NULL,

    CONSTRAINT "class_name_pkey" PRIMARY KEY ("class_name_id")
);

-- CreateTable
CREATE TABLE "grade_class" (
    "grade_class_id" CHAR(36) NOT NULL,
    "academic_year_id" TEXT NOT NULL,
    "grade_class" VARCHAR(30) NOT NULL,

    CONSTRAINT "grade_class_pkey" PRIMARY KEY ("grade_class_id")
);

-- CreateTable
CREATE TABLE "quarter_academic_year" (
    "quarter_academic_year_id" CHAR(36) NOT NULL,
    "academic_year_id" TEXT NOT NULL,
    "quarter_academic_year" INTEGER NOT NULL,
    "start_date" DATE,
    "end_date" DATE,

    CONSTRAINT "quarter_academic_year_pkey" PRIMARY KEY ("quarter_academic_year_id")
);

-- CreateTable
CREATE TABLE "student_status" (
    "id" CHAR(36) NOT NULL,
    "academic_year_id" TEXT NOT NULL,
    "nis" TEXT NOT NULL,
    "status_name" "StudentStatus" NOT NULL DEFAULT 'active',

    CONSTRAINT "student_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subject_grade_class" (
    "subject_grade_class_id" CHAR(36) NOT NULL,
    "grade_class_id" TEXT NOT NULL,
    "subject_grade_class_name" VARCHAR(30) NOT NULL,

    CONSTRAINT "subject_grade_class_pkey" PRIMARY KEY ("subject_grade_class_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "academic_year_academic_year_id_key" ON "academic_year"("academic_year_id");

-- CreateIndex
CREATE UNIQUE INDEX "unique_academic_year" ON "academic_year"("academic_year");

-- CreateIndex
CREATE UNIQUE INDEX "biodata_nis_key" ON "biodata"("nis");

-- CreateIndex
CREATE UNIQUE INDEX "class_member_class_member_id_key" ON "class_member"("class_member_id");

-- CreateIndex
CREATE UNIQUE INDEX "unique_class_name_id_nis" ON "class_member"("class_name_id", "nis");

-- CreateIndex
CREATE UNIQUE INDEX "class_name_class_name_id_key" ON "class_name"("class_name_id");

-- CreateIndex
CREATE UNIQUE INDEX "unique_class_grade" ON "class_name"("class_name", "grade_class_id");

-- CreateIndex
CREATE UNIQUE INDEX "grade_class_grade_class_id_key" ON "grade_class"("grade_class_id");

-- CreateIndex
CREATE UNIQUE INDEX "grade_class_academic_year_id_grade_class_key" ON "grade_class"("academic_year_id", "grade_class");

-- CreateIndex
CREATE UNIQUE INDEX "quarter_academic_year_quarter_academic_year_id_key" ON "quarter_academic_year"("quarter_academic_year_id");

-- CreateIndex
CREATE UNIQUE INDEX "quarter_academic_year_academic_year_id_quarter_academic_yea_key" ON "quarter_academic_year"("academic_year_id", "quarter_academic_year");

-- CreateIndex
CREATE UNIQUE INDEX "student_status_id_key" ON "student_status"("id");

-- CreateIndex
CREATE UNIQUE INDEX "student_status_academic_year_id_nis_key" ON "student_status"("academic_year_id", "nis");

-- CreateIndex
CREATE UNIQUE INDEX "subject_grade_class_subject_grade_class_id_key" ON "subject_grade_class"("subject_grade_class_id");

-- AddForeignKey
ALTER TABLE "class_member" ADD CONSTRAINT "class_member_class_name_id_fkey" FOREIGN KEY ("class_name_id") REFERENCES "class_name"("class_name_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "class_member" ADD CONSTRAINT "class_member_nis_fkey" FOREIGN KEY ("nis") REFERENCES "biodata"("nis") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "class_name" ADD CONSTRAINT "class_name_grade_class_id_fkey" FOREIGN KEY ("grade_class_id") REFERENCES "grade_class"("grade_class_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "grade_class" ADD CONSTRAINT "grade_class_academic_year_id_fkey" FOREIGN KEY ("academic_year_id") REFERENCES "academic_year"("academic_year_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "quarter_academic_year" ADD CONSTRAINT "quarter_academic_year_academic_year_id_fkey" FOREIGN KEY ("academic_year_id") REFERENCES "academic_year"("academic_year_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "student_status" ADD CONSTRAINT "student_status_academic_year_id_fkey" FOREIGN KEY ("academic_year_id") REFERENCES "academic_year"("academic_year_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "student_status" ADD CONSTRAINT "student_status_nis_fkey" FOREIGN KEY ("nis") REFERENCES "biodata"("nis") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "subject_grade_class" ADD CONSTRAINT "subject_grade_class_grade_class_id_fkey" FOREIGN KEY ("grade_class_id") REFERENCES "grade_class"("grade_class_id") ON DELETE NO ACTION ON UPDATE NO ACTION;
