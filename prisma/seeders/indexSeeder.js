import { PrismaClient } from "@prisma/client";
import { seedAcademicYears } from "./academicYearSeeder.js";
import { seedStudents } from "./studentsSeeder.js";
import { seedGradeClasses } from "./gradeClassSeeder.js";
import { seedClassNames } from "./classNameSeeder.js";
import { seedClassMembers } from "./classMemberSeeder.js";
import { seedQuarterAcademicYears } from "./quarterAcademicYearSeeder.js";
import { seedStudentStatuses } from "./studentStatusSeeder.js";
import { seedSubjects } from "./subjectSeeder.js";
import { seedScores } from "./scoresSeeder.js";

const prisma = new PrismaClient();

async function clearDatabase() {
  try {
    // Delete in reverse order of dependencies
    await prisma.scores.deleteMany();
    console.log("⚠ Scores cleared");

    await prisma.subject.deleteMany();
    console.log("⚠ Subjects cleared");

    await prisma.student_status.deleteMany();
    console.log("⚠ Student statuses cleared");

    await prisma.quarter_academic_year.deleteMany();
    console.log("⚠ Quarter academic years cleared");

    await prisma.class_member.deleteMany();
    console.log("⚠ Class members cleared");

    await prisma.class_name.deleteMany();
    console.log("⚠ Class names cleared");

    await prisma.grade_class.deleteMany();
    console.log("⚠ Grade classes cleared");

    await prisma.students.deleteMany();
    console.log("⚠ Students cleared");

    await prisma.academic_year.deleteMany();
    console.log("⚠ Academic years cleared");

    console.log("✅ Database cleared successfully!");
  } catch (error) {
    console.error("Error clearing database:", error);
    throw error;
  }
}

async function seedAll() {
  try {
    const newLocal = "✈ Starting database seeding...";
    console.log(newLocal);

    // Clear all existing data first
    await clearDatabase();

    // Seed in order of dependencies
    await seedStudents(100);
    console.log("✅ Students seeded");

    await seedAcademicYears(5);
    console.log("✅ Academic years seeded");

    await seedQuarterAcademicYears();
    console.log("✅ Quarter academic years seeded");

    await seedGradeClasses();
    console.log("✅ Grade classes seeded");

    await seedSubjects();
    console.log("✅ Subjects seeded");

    await seedStudentStatuses();
    console.log("✅ Student statuses seeded");

    await seedClassNames();
    console.log("✅ Class names seeded");

    await seedClassMembers();
    console.log("✅ Class members seeded");

    await seedScores();
    console.log("✅ Scores seeded");

    console.log("Database seeding completed successfully!");
  } catch (error) {
    console.error("Error during seeding:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedAll();
