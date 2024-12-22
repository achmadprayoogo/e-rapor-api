import { id_ID, fakerID_ID } from "@faker-js/faker";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const faker = fakerID_ID;

export async function seedStudents(times) {
  try {
    const students = [];
    const usedNIS = new Set();

    for (let i = 0; i < times; i++) {
      let nis;
      do {
        nis = parseInt(faker.number.int({ min: 10000000, max: 99999999 }));
      } while (usedNIS.has(nis));
      usedNIS.add(nis);

      // Using Indonesian specific data
      const student = {
        nis: nis,
        fullname: `${faker.person.firstName()} ${faker.person.lastName()}`,
        city_of_birth: faker.location.city(), // Will use Indonesian cities
        birthdate: faker.date.between({
          from: "2005-01-01",
          to: "2008-12-31",
        }),
        father_name: `${faker.person.firstName(
          "male"
        )} ${faker.person.lastName()}`,
        mother_name: `${faker.person.firstName(
          "female"
        )} ${faker.person.lastName()}`,
        guardian_name: faker.helpers.maybe(
          () => `${faker.person.firstName()} ${faker.person.lastName()}`,
          { probability: 0.3 }
        ),
        address: `${faker.location.street()}, ${faker.location.city()}, ${faker.location.state()}`,
      };

      students.push(student);
    }

    // Use Prisma client directly instead of repository
    const result = await prisma.students.createMany({
      data: students,
      skipDuplicates: true,
    });

    console.log(`✅ Successfully seeded ${result.count} students`);
    return result;
  } catch (error) {
    console.error("❌ Error seeding students:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}
