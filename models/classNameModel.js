import pg from "pg";
import academicYear from "./academicYearModel.js";
import gradeClass from "./gradeClassModel.js";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: process.env.DB,
  password: process.env.DB_PASSWORD,
  port: process.env.BD_PORT,
});

db.connect();

class className {
  static async getAll() {
    try {
      const result = await db.query(
        "SELECT * FROM public.class_name ORDER BY class_name_id ASC"
      );
      return result.rows;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  static async addClassName(data) {
    const academicYearID = await academicYear.getAcademicYearIDByYearName(
      data.yearName
    );
    const gradeClassID = await gradeClass.getGradeClassIDByGradeClassName(
      data.gradeClassName
    );

    try {
      const result = await db.query(
        "INSERT INTO public.class_name (academic_year_id, grade_class_id, class_name, homeroom_teacher) VALUES ($1, $2, $3, $4)",
        [
          academicYearID,
          gradeClassID,
          data.className.toLowerCase(),
          data.homeroomTeacher.toLowerCase(),
        ]
      );
      return result.rowCount > 0
        ? {
            className: `${data.className} - ${data.gradeClassName} - ${data.yearName}`,
            status: "success",
            message: "insert data is success",
          }
        : {
            className: `${data.className} - ${data.gradeClassName} - ${data.yearName}`,
            status: "failed",
            message: "insert data is failed with some reason",
          };
    } catch (error) {
      return {
        className: `${data.className} - ${data.gradeClassName} - ${data.yearName}`,
        status: "error",
        message: error.message,
      };
    }
  }

  static async updateClassName(data) {
    const className =
      data.className.length > 0 ? data.className.toLowerCase() : null;
    const homeroomTeacher =
      data.homeroomTeacher.length > 0
        ? data.homeroomTeacher.toLowerCase()
        : null;
    const id = data.id.length > 0 ? data.id : null;

    try {
      const result = await db.query(
        "UPDATE public.class_name SET class_name = $1, homeroom_teacher = $2 WHERE class_name_id = $3",
        [className, homeroomTeacher, data.id]
      );
      return result.rowCount > 0
        ? {
            updatedData: `${data.className} - ${data.gradeClassName} - ${data.academicYear}`,
            status: "success",
            message: "update data is success",
          }
        : {
            updatedData: `${data.className} - ${data.gradeClassName} - ${data.academicYear}`,
            status: "failed",
            message: "update data is failed with some reason",
          };
    } catch (error) {
      return {
        updatedData: `${data.className} - ${data.gradeClassName} - ${data.academicYear}`,
        status: "error",
        message: error.message,
      };
    }
  }

  static async deleteClassName(data) {
    try {
      const result = await db.query(
        "DELETE FROM public.class_name WHERE class_name_id = $1",
        [data.id]
      );
      return result.rowCount > 0
        ? {
            className: data.deletedData,
            status: "success",
            message: "delete data is success",
          }
        : {
            className: data.deletedData,
            status: "failed",
            message: "delete data is failed with some reason",
          };
    } catch (error) {
      return {
        className: data.deletedData,
        status: "error",
        message: error.message,
      };
    }
  }
}

export default className;
