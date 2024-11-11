import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: process.env.DB,
  password: process.env.DB_PASSWORD,
  port: process.env.BD_PORT,
});

db.connect();

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

export default academicYear;
