import pg from "pg";
import { faker } from "@faker-js/faker";
import { util } from "../util/util.js";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: process.env.DB,
  password: process.env.DB_PASSWORD,
  port: process.env.PORT,
});

db.connect();

class biodata {
  static async getAll() {
    const result = await db.query(
      "SELECT * FROM public.biodata ORDER BY nis ASC"
    );
    const items = result.rows;
    const data = [];

    items.forEach((element) => {
      data.push({
        nis: element.nis,
        fullname: element.fullname,
        age: new Date().getFullYear() - element.dateofbirth.getFullYear(),
        cityofbirth: element.cityofbirth,
        dateofbirth: element.dateofbirth,
        fathername: element.fathername,
        mothername: element.mothername,
        guardianname: element.guardianname,
        status: element.status,
        address: element.address,
      });
    });

    return data;
  }

  static async inputBiodata(data) {
    try {
      const result = await db.query(
        "INSERT INTO public.biodata (nis, fullname, cityofbirth, dateofbirth, fathername, mothername, guardianname, status, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
        [
          data.nis,
          data.fullName,
          data.cityOfBirth,
          data.dateOfBirth,
          data.fatherName,
          data.motherName,
          data.guardianName,
          data.status,
          data.address,
        ]
      );

      return result.rowCount > 0
        ? {
            nis: data.nis,
            name: data.fullName,
            status: "success",
            message: "insert data is success",
          }
        : {
            nis: data.nis,
            name: data.fullName,
            status: "failed",
            message: "insert data is failed with some reason",
          };
    } catch (error) {
      return {
        nis: data.nis,
        name: data.fullName,
        status: "error",
        message: error.message,
      };
    }
  }

  static async importBiodata(dataArray) {
    const result = await Promise.all(
      dataArray.map(async (data) => {
        const query =
          "INSERT INTO public.biodata (nis, fullname, cityofbirth, dateofbirth, fathername, mothername, guardianname, status, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
        const values = [
          parseInt(data.nis),
          data.fullName,
          data.cityOfBirth,
          data.dateOfBirth,
          data.fatherName,
          data.motherName,
          data.guardianName,
          data.status,
          data.address,
        ];

        try {
          const result = await db.query(query, values);
          return result.rowCount > 0
            ? {
                nis: data.nis,
                name: data.fullName,
                status: "success",
                message: "insert data is success",
              }
            : {
                nis: data.nis,
                name: data.fullName,
                status: "failed",
                message: "insert data is failed with some reason",
              };
        } catch (error) {
          return {
            nis: data.nis,
            name: data.fullName,
            status: "error",
            message: error.message,
          };
        }
      })
    );

    return result;
  }

  static async updateBiodata(data) {
    try {
      const result = await db.query(
        "UPDATE public.biodata SET nis = $2, fullname = $3, cityofbirth = $4, dateofbirth = $5, fathername = $6, mothername = $7, guardianname = $8, status = $9, address = $10 WHERE nis = $1",
        [
          data.nis,
          data.newNIS,
          data.fullName,
          data.cityOfBirth,
          data.dateOfBirth,
          data.fatherName,
          data.motherName,
          data.guardianName,
          data.status,
          data.address,
        ]
      );

      return result.rowCount > 0
        ? {
            nis: data.newNIS,
            name: data.fullName,
            status: "success",
            message: "update data is success",
          }
        : {
            nis: data.nis,
            name: data.fullName,
            status: "failed",
            message: "update data is failed with some reason",
          };
    } catch (error) {
      return {
        nis: data.nis,
        name: data.fullName,
        status: "error",
        message: error.message,
      };
    }
  }

  static async deleteBiodata(nis) {
    try {
      const result = await db.query(
        "DELETE FROM public.biodata WHERE nis = $1",
        [nis]
      );
      return result.rowCount > 0
        ? {
            nis,
            status: "success",
            message: "delete data is success",
          }
        : {
            nis,
            stauts: "failed",
            message: "delete data is failed with some reason",
          };
    } catch (error) {
      return { nis, status: "error", message: error.message };
    }
  }
}

class academicYear {
  static async getAll() {
    const result = await db.query(
      "SELECT * FROM public.academic_year ORDER BY academic_year ASC"
    );

    return result.rows;
  }

  static async getAcademicYearIDByYearName(academicYearName) {
    const result = await db.query(
      "SELECT academic_year_id FROM public.academic_year WHERE academic_year = $1",
      [academicYearName]
    );

    return result.rows[0].academic_year_id;
  }

  static async inputAcademicYear(data) {
    try {
      const result = await db.query(
        "INSERT INTO public.academic_year (academic_year, start_date, end_date ) VALUES ($1, $2, $3)",
        [data.academicYear, data.startDate, data.endDate]
      );

      return result.rowCount > 0
        ? {
            academicYear: data.academicYear,
            status: "success",
            message: "insert data is success",
          }
        : {
            academicYear: data.academicYear,
            status: "failed",
            message: "insert data is failed with some reason",
          };
    } catch (error) {
      return {
        academicYear: data.academicYear,
        status: "error",
        message: error.message,
      };
    }
  }

  static async updateAcademicYear(data) {
    try {
      const result = await db.query(
        "UPDATE public.academic_year SET academic_year = $2, start_date = $3, end_date = $4 WHERE academic_year_id = $1",
        [data.academicYearID, data.academicYear, data.startDate, data.endDate]
      );

      return result.rowCount > 0
        ? {
            academicYear: data.academicYear,
            status: "success",
            message: "update data is success",
          }
        : {
            academicYear: data.academicYear,
            status: "failed",
            message: "update data is failed with some reason",
          };
    } catch (error) {
      return {
        academicYear: data.academicYear,
        status: "error",
        message: error.message,
      };
    }
  }

  static async deleteAcademicYear(data) {
    const academicYearID = data.id;
    const deletedAcademicYear = data.deletedData;
    try {
      const result = await db.query(
        "DELETE FROM public.academic_year WHERE academic_year_id = $1",
        [academicYearID]
      );

      return result.rowCount > 0
        ? {
            academicYear: deletedAcademicYear,
            status: "success",
            message: "delete data is success",
          }
        : {
            academicYear: deletedAcademicYear,
            status: "failed",
            message: "delete data is failed with some reason",
          };
    } catch (error) {
      return {
        academicYear: deletedAcademicYear,
        status: "error",
        message: error.message,
      };
    }
  }
}

class quarterAcademicYear {
  static async getAll() {
    try {
      const result = await db.query(
        "SELECT * FROM public.quarter_academic_year ORDER BY quarter_academic_year_id ASC"
      );
      return result.rows;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  static async addQuarterAcademicYear(data) {
    const academicYearID = await academicYear.getAcademicYearIDByYearName(
      data.yearName
    );

    try {
      const result = await db.query(
        "INSERT INTO public.quarter_academic_year (academic_year_id, quarter_academic_year, start_date, end_date ) VALUES ($1, $2, $3, $4)",
        [academicYearID, data.quarterCount, data.startDate, data.endDate]
      );
      return result.rowCount > 0
        ? {
            quarterAcademicYear: data.quarterCount + "-" + data.yearName,
            status: "success",
            message: "insert data is success",
          }
        : {
            quarterAcademicYear: data.quarterCount + "-" + data.yearName,
            status: "failed",
            message: "insert data is failed with some reason",
          };
    } catch (error) {
      return {
        quarterAcademicYear: data.quarterCount + "-" + data.yearName,
        status: "error",
        message: error.message,
      };
    }
  }

  static async updateQuarterAcademicYear(data) {
    console.log(data);
    try {
      const result = await db.query(
        "UPDATE public.quarter_academic_year SET quarter_academic_year = $2, start_date = $3, end_date = $4 WHERE quarter_academic_year_id = $1",
        [data.id, data.quarterCount, data.startDate, data.endDate]
      );
      return result.rowCount > 0
        ? {
            quarterAcademicYear: data.newId,
            status: "success",
            message: "update data is success",
          }
        : {
            quarterAcademicYear: data.newId,
            status: "failed",
            message: "update data is failed with some reason",
          };
    } catch (error) {
      return {
        quarterAcademicYear: data.newId,
        status: "error",
        message: error.message,
      };
    }
  }

  static async deleteQuarterAcademicYear(data) {
    const deletedID = data.id;
    const deletedQuarterAcademicYear = data.deletedData;
    try {
      const result = await db.query(
        "DELETE FROM public.quarter_academic_year WHERE quarter_academic_year_id = $1",
        [deletedID]
      );
      return result.rowCount > 0
        ? {
            quarterAcademicYear: deletedQuarterAcademicYear,
            status: "success",
            message: "delete data is success",
          }
        : {
            quarterAcademicYear: deletedQuarterAcademicYear,
            status: "failed",
            message: "delete data is failed with some reason",
          };
    } catch (error) {
      return {
        quarterAcademicYear: deletedQuarterAcademicYear,
        status: "error",
        message: error.message,
      };
    }
  }
}

class gradeClass {
  static async getAll() {
    try {
      const result = await db.query(
        "SELECT * FROM public.grade_class ORDER BY grade_class_id ASC"
      );
      return result.rows;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
}
//////////////////
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

export {
  biodata,
  academicYear,
  quarterAcademicYear,
  gradeClass,
  data,
  cawu,
  grade,
  className,
};
