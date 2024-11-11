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

export default quarterAcademicYear;
