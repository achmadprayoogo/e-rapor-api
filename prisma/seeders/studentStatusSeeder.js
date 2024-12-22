import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedStudentStatuses() {
  try {
    const academicYears = await prisma.academic_year.findMany();
    const students = await prisma.students.findMany();

    if (!academicYears.length || !students.length) {
      throw new Error(
        "No academic years or students found. Please seed them first."
      );
    }

    const statuses = [];

    for (const academicYear of academicYears) {
      for (const student of students) {
        // For each student in each academic year, randomly assign a status
        // Most students should be 'active'
        const randomNum = Math.random();
        let status;
        if (randomNum < 0.9) {
          status = "active";
        } else if (randomNum < 0.95) {
          status = "dropout";
        } else {
          status = "graduate";
        }

        statuses.push({
          student_id: student.id,
          academic_year_id: academicYear.id,
          status: status,
        });
      }
    }

    // Bulk create all student statuses
    const result = await prisma.student_status.createMany({
      data: statuses,
      skipDuplicates: true,
    });

    console.log(`✅ Successfully seeded ${result.count} student statuses`);
    return result;
  } catch (error) {
    console.error("❌ Error seeding student statuses:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
