import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedGradeClasses() {
  try {
    // First get all academic years
    const academicYears = await prisma.academic_year.findMany();
    if (!academicYears.length) {
      throw new Error(
        "No academic years found. Please seed academic years first."
      );
    }

    // Define the grades for each level
    const grades = {
      wustho: [1, 2, 3],          // 3 grades for Wustho
      ulya: [1, 2, 3, 4, 5, 6],   // 6 grades for Ulya
      awaliyah: [1, 2, 3, 4, 5, 6] // 6 grades for Awaliyah
    };

    const gradeClasses = [];

    for (const academicYear of academicYears) {
      // Create Wustho classes
      for (const grade of grades.wustho) {
        gradeClasses.push({
          academic_year_id: academicYear.id,
          grade_class: `${grade} Wustho`,
        });
      }

      // Create Ulya classes
      for (const grade of grades.ulya) {
        gradeClasses.push({
          academic_year_id: academicYear.id,
          grade_class: `${grade} Ulya`,
        });
      }

      // Create Awaliyah classes
      for (const grade of grades.awaliyah) {
        gradeClasses.push({
          academic_year_id: academicYear.id,
          grade_class: `${grade} Awaliyah`,
        });
      }
    }

    // Bulk create all grade classes
    const result = await prisma.grade_class.createMany({
      data: gradeClasses,
      skipDuplicates: true,
    });

    console.log(`✅ Successfully seeded ${result.count} grade classes`);
    return result;
  } catch (error) {
    console.error("❌ Error seeding grade classes:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
