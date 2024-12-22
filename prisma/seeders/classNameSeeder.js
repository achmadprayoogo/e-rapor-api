import { id_ID, fakerID_ID } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const faker = fakerID_ID;

export async function seedClassNames() {
  try {
    // Get all grade classes
    const gradeClasses = await prisma.grade_class.findMany();
    if (!gradeClasses.length) {
      throw new Error(
        "No grade classes found. Please seed grade classes first."
      );
    }

    const classLetters = ["A", "B", "C", "D"];
    const classNames = [];

    for (const gradeClass of gradeClasses) {
      for (const letter of classLetters) {
        // Generate a shorter name that fits within 20 characters
        const firstName = faker.person.firstName().slice(0, 9);  // Max 9 chars
        const lastName = faker.person.lastName().slice(0, 9);   // Max 9 chars
        const teacherName = `${firstName} ${lastName}`.slice(0, 20); // Ensure total is max 20

        classNames.push({
          grade_class_id: gradeClass.id,
          class_name: letter,
          homeroom_teacher: teacherName,
        });
      }
    }

    // Bulk create all class names
    const result = await prisma.class_name.createMany({
      data: classNames,
      skipDuplicates: true,
    });

    console.log(`✅ Successfully seeded ${result.count} class names`);
    return result;
  } catch (error) {
    console.error("❌ Error seeding class names:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
