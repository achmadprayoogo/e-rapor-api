import { id_ID, fakerID_ID } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

let prisma = new PrismaClient();
const faker = fakerID_ID;

export function setPrismaClient(client) {
  prisma = client;
}

export async function seedScores() {
  try {
    const students = await prisma.students.findMany();
    const subjects = await prisma.subject.findMany();
    const scores = [];

    if (!students?.length || !subjects?.length) {
      throw new Error("No students or subjects found. Please seed them first.");
    }

    // For each student, create scores for each subject
    for (const student of students) {
      for (const subject of subjects) {
        // Generate a realistic score between 60 and 100
        const score = faker.number.int({ min: 60, max: 100 });

        scores.push({
          student_id: student.id,
          subject_id: subject.id,
          score: score,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
    }

    // Bulk create all scores
    const result = await prisma.scores.createMany({
      data: scores,
      skipDuplicates: true,
    });

    console.log(`✅ Successfully seeded ${result.count} scores`);
    return result;
  } catch (error) {
    console.error("❌ Error seeding scores:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
