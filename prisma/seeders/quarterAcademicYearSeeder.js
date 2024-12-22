import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedQuarterAcademicYears() {
  try {
    const academicYears = await prisma.academic_year.findMany();
    if (!academicYears.length) {
      throw new Error(
        "No academic years found. Please seed academic years first."
      );
    }

    const quarters = [];

    for (const academicYear of academicYears) {
      const startYear = new Date(academicYear.start_date).getFullYear();

      // Create 3 quarters for each academic year, each approximately 4 months
      for (let quarter = 1; quarter <= 3; quarter++) {
        let startDate, endDate;

        switch (quarter) {
          case 1:
            startDate = new Date(startYear, 6, 1); // July 1
            endDate = new Date(startYear, 9, 31); // October 31
            break;
          case 2:
            startDate = new Date(startYear, 10, 1); // November 1
            endDate = new Date(startYear + 1, 1, 28); // February 28/29
            break;
          case 3:
            startDate = new Date(startYear + 1, 2, 1); // March 1
            endDate = new Date(startYear + 1, 5, 30); // June 30
            break;
        }

        quarters.push({
          academic_year_id: academicYear.id,
          quarter_academic_year: quarter,
          start_date: startDate,
          end_date: endDate,
        });
      }
    }

    // Bulk create all quarters
    const result = await prisma.quarter_academic_year.createMany({
      data: quarters,
      skipDuplicates: true,
    });

    console.log(`✅ Successfully seeded ${result.count} academic quarters`);
    return result;
  } catch (error) {
    console.error("❌ Error seeding academic quarters:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
