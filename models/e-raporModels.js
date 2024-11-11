import pg from "pg";
import { faker } from "@faker-js/faker";
import { util } from "../util/util.js";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: process.env.DB,
  password: process.env.DB_PASSWORD,
  port: process.env.BD_PORT,
});

db.connect();

const cawu = [1, 2, 3];
const grade = [
  "1 WUSTHO",
  "2 WUSTHO",
  "3 WUSTHO",
  "4 ULYA",
  "5 ULYA",
  "6 ULYA",
];
const className = ["A", "B", "C", "D", "E"];
const biodataFaker = [];

for (let i = 0; i < 25; i++) {
  biodataFaker.push({
    name: faker.person.fullName(),
    nis: faker.number.int({ min: 2000000000, max: 3000000000 }),
    age: faker.number.int({ min: 11, max: 40 }),
    status: util.get_random(["SANTRI AKTIF", "LULUS", "BOYONG"]),
    placeOfBirth: faker.location.city(),
    dateOfBirth: faker.date.birthdate({ min: 1995, max: 2010 }),
    fatherName: faker.person.firstName() + " " + faker.person.lastName(),
    motherName: faker.person.firstName() + " " + faker.person.lastName(),
    guardianName: util.get_random(["-", faker.person.fullName()]),
    address: faker.location.streetAddress() + " " + faker.location.city(),
    grade: util.get_random(grade),
    className: util.get_random(className),
    homeRoomTeacher: "Ust. Antono",
  });
}

class data {
  static getAll() {
    return biodataFaker;
  }

  static getById(id) {
    return biodataFaker.find((student) => student.id === parseInt(id));
  }
}

export { data, cawu, grade, className };
