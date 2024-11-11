import pg from "pg";
import academicYear from "./academicYearModel.js";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: process.env.DB,
  password: process.env.DB_PASSWORD,
  port: process.env.BD_PORT,
});

db.connect();

class gradeClass {
  static async getAll() {
    try {
      const result = await db.query(
        "SELECT * FROM public.grade_class ORDER BY academic_year_id ASC"
      );
      return result.rows;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  static async addGradeClass(data) {
    const academicYearID = await academicYear.getAcademicYearIDByYearName(
      data.yearName
    );

    try {
      const result = await db.query(
        "INSERT INTO public.grade_class (academic_year_id, grade_class ) VALUES ($1, $2)",
        [academicYearID, data.gradeClassName]
      );
      return result.rowCount > 0
        ? {
            gradeClass: `${data.gradeClassName} - ${data.yearName}`,
            status: "success",
            message: "insert data is success",
          }
        : {
            gradeClass: `${data.gradeClassName} - ${data.yearName}`,
            status: "failed",
            message: "insert data is failed with some reason",
          };
    } catch (error) {
      return {
        gradeClass: `${data.gradeClassName} - ${data.yearName}`,
        status: "error",
        message: error.message,
      };
    }
  }

  static async updateGradeClass(data) {
    console.log(data);
    try {
      const result = await db.query(
        "UPDATE public.grade_class SET grade_class = $2 WHERE grade_class_id = $1",
        [data.id, data.gradeClassName]
      );
      return result.rowCount > 0
        ? {
            gradeClass: `${data.gradeClassName} - ${data.academicYear}`,
            status: "success",
            message: "update data is success",
          }
        : {
            gradeClass: `${data.gradeClassName} - ${data.academicYear}`,
            status: "failed",
            message: "update data is failed with some reason",
          };
    } catch (error) {
      return {
        gradeClass: `${data.gradeClassName} - ${data.academicYear}`,
        status: "error",
        message: error.message,
      };
    }
  }

  static async deleteGradeClass(data) {
    const deletedID = parseInt(data.id);
    const deletedGradeClass = data.deletedData;

    try {
      const result = await db.query(
        "DELETE FROM public.grade_class WHERE grade_class_id = $1",
        [deletedID]
      );

      return result.rowCount > 0
        ? {
            gradeClass: deletedGradeClass,
            status: "success",
            message: "delete data is success",
          }
        : {
            gradeClass: deletedGradeClass,
            status: "failed",
            message: "delete data is failed with some reason",
          };
    } catch (error) {
      return {
        gradeClass: deletedGradeClass,
        status: "error",
        message: error.message,
      };
    }
  }
}

export default gradeClass;
