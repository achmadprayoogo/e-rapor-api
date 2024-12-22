import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedAcademicYears(times) {
  try {
    const academicYears = [];
    const currentYear = new Date().getFullYear();

    // Generate only unique academic years
    for (let i = 0; i < times; i++) {
      const startYear = currentYear - i;
      const academicYear = `${startYear}/${startYear + 1}`;

      // Set the time to midnight in local time
      const startDate = new Date(startYear, 6, 1, 0, 0, 0); // July 1st
      const endDate = new Date(startYear + 1, 5, 30, 23, 59, 59); // June 30th

      academicYears.push({
        academic_year: academicYear,
        start_date: startDate,
        end_date: endDate,
      });
    }

    // Use Prisma client directly instead of repository
    const result = await prisma.academic_year.createMany({
      data: academicYears,
      skipDuplicates: true,
    });

    console.log(`✅ Successfully seeded ${result.count} academic years`);
    return result;
  } catch (error) {
    console.error("❌ Error seeding academic years:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
