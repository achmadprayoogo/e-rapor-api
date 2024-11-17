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

class subjectGradeClassModel {
  static async getAll() {
    try {
      const result = await db.query(
        "SELECT * FROM public.subject_grade_class ORDER BY subject_grade_class_id ASC"
      );
      return result.rows;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  static async inputSubjectGradeClass(data) {
    try {
      const academicYearID = await academicYear.getAcademicYearIDByYearName(
        data.yearName
      );
      const gradeClassID = await gradeClass.getGradeClassIDByGradeClassName(
        data.gradeClassName
      );
      const result = await db.query(
        "INSERT INTO public.subject_grade_class (academic_year_id, grade_class_id, subject_grade_class_name) VALUES ($1, $2, $3) RETURNING *",
        [academicYearID, gradeClassID, data.subjectGradeClassName.toLowerCase()]
      );
      return result.rowCount > 0
        ? {
            subjectGradeClassName: `${data.subjectGradeClassName} - ${data.gradeClassName} - ${data.yearName}`,
            status: "success",
            message: "insert data is success",
          }
        : {
            subjectGradeClassName: `${data.subjectGradeClassName} - ${data.gradeClassName} - ${data.yearName}`,
            status: "failed",
            message: "insert data is failed with some reason",
          };
    } catch (error) {
      return {
        subjectGradeClassName: `${data.subjectGradeClassName} - ${data.gradeClassName} - ${data.yearName}`,
        status: "error",
        message: error.message,
      };
    }
  }

  static async updateSubjectGradeClass(data) {
    const subjectGradeClassName =
      data.subjectGradeClassName.length > 0
        ? data.subjectGradeClassName.toLowerCase()
        : null;
    const id = data.id.length > 0 ? parseInt(data.id) : null;

    try {
      const result = await db.query(
        "UPDATE public.subject_grade_class SET subject_grade_class_name = $1 WHERE subject_grade_class_id = $2 ",
        [subjectGradeClassName, id]
      );
      return result.rowCount > 0
        ? {
            updatedData: `${data.subjectGradeClassName} - ${data.gradeClassName} - ${data.academicYear}`,
            status: "success",
            message: "update data is success",
          }
        : {
            updatedData: `${data.subjectGradeClassName} - ${data.gradeClassName} - ${data.academicYear}`,
            status: "failed",
            message: "update data is failed with some reason",
          };
    } catch (error) {
      return {
        updatedData: `${data.subjectGradeClassName} - ${data.gradeClassName} - ${data.academicYear}`,
        status: "error",
        message: error.message,
      };
    }
  }

  static async deleteSubjectGradeClass(data) {
    try {
      const result = await db.query(
        "DELETE FROM public.subject_grade_class WHERE subject_grade_class_id = $1",
        [data.id]
      );
      return result.rowCount > 0
        ? {
            subjectGradeClassName: data.deletedData,
            status: "success",
            message: "delete data is success",
          }
        : {
            subjectGradeClassName: data.deletedData,
            status: "failed",
            message: "delete data is failed with some reason",
          };
    } catch (error) {
      return {
        subjectGradeClassName: data.deletedData,
        status: "error",
        message: error.message,
      };
    }
  }
}

export default subjectGradeClassModel;
