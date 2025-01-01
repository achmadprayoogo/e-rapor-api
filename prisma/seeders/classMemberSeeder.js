import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedClassMembers() {
  try {
    const students = await prisma.students.findMany();
    const classNames = await prisma.class_name.findMany({
      include: {
        grade_class: true,
      },
    });

    if (!students.length || !classNames.length) {
      throw new Error(
        "No students or class names found. Please seed them first."
      );
    }

    const classMembers = [];
    let studentIndex = 0;

    // Distribute students evenly across classes
    for (const className of classNames) {
      // Calculate how many students should be in this class
      // We'll aim for about 20-25 students per class
      const studentsPerClass = Math.floor(Math.random() * 6) + 20; // Random number between 20-25

      for (
        let i = 0;
        i < studentsPerClass && studentIndex < students.length;
        i++
      ) {
        classMembers.push({
          student_id: students[studentIndex].id,
          class_name_id: className.id,
        });
        studentIndex = (studentIndex + 1) % students.length;
      }
    }

    // Bulk create all class members
    const result = await prisma.class_member.createMany({
      data: classMembers,
      skipDuplicates: true,
    });

    console.log(`✅ Successfully seeded ${result.count} class members`);
    return result;
  } catch (error) {
    console.error("❌ Error seeding class members:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
