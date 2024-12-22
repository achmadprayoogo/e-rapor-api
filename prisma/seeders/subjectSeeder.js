import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedSubjects() {
  try {
    // Get all grade classes first
    const gradeClasses = await prisma.grade_class.findMany();
    if (!gradeClasses.length) {
      throw new Error("No grade classes found. Please seed grade classes first.");
    }

    const subjects = [];

    // Define the subjects for each level
    const subjectsByLevel = {
      wustho: [
        "Nahwu",
        "Shorof",
        "Fiqih",
        "Tauhid",
        "Hadits",
        "Tafsir",
        "Akhlaq",
      ],
      ulya: [
        "Nahwu Lanjut",
        "Shorof Lanjut",
        "Fiqih Lanjut",
        "Tauhid Lanjut",
        "Hadits Lanjut",
        "Tafsir Lanjut",
        "Akhlaq Lanjut",
        "Ushul Fiqh",
        "Balaghah",
      ],
      awaliyah: [
        "Nahwu Dasar",
        "Shorof Dasar",
        "Fiqih Dasar",
        "Tauhid Dasar",
        "Hadits Dasar",
        "Tafsir Dasar",
        "Akhlaq Dasar",
      ],
    };

    // For each grade class, assign appropriate subjects based on the level
    for (const gradeClass of gradeClasses) {
      let level;
      if (gradeClass.grade_class.includes("Wustho")) {
        level = "wustho";
      } else if (gradeClass.grade_class.includes("Ulya")) {
        level = "ulya";
      } else if (gradeClass.grade_class.includes("Awaliyah")) {
        level = "awaliyah";
      }

      if (level) {
        for (const subjectName of subjectsByLevel[level]) {
          subjects.push({
            grade_class_id: gradeClass.id,
            subject_name: subjectName,
          });
        }
      }
    }

    // Bulk create all subjects
    const result = await prisma.subject.createMany({
      data: subjects,
      skipDuplicates: true,
    });

    console.log(`✅ Successfully seeded ${result.count} subjects`);
    return result;
  } catch (error) {
    console.error("❌ Error seeding subjects:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
