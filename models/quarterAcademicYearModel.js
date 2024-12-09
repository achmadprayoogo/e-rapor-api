import Model from "../prisma/Model.js"; // Import the Prisma model
import academicYear from "./academicYearModel.js"; // Import the academicYear model

class QuarterAcademicYear {
  static async getAll() {
    try {
      const result = await Model.prisma.quarter_academic_year.findMany({
        orderBy: {
          quarter_academic_year_id: "asc",
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  static async addQuarterAcademicYear(data) {
    console.log(data);
    const academicYearID = await academicYear.getAcademicYearIDByYearName(
      data.yearName
    );
    const quarterCount =
      data.quarterCount.length > 0 ? data.quarterCount : null;
    const startDate = data.startDate.length > 0 ? data.startDate : null;
    const endDate = data.endDate.length > 0 ? data.endDate : null;

    try {
      const result = await Model.prisma.quarter_academic_year.create({
        data: {
          academic_year_id: academicYearID,
          quarter_academic_year: parseInt(quarterCount),
          start_date: new Date(startDate),
          end_date: new Date(endDate),
        },
      });

      console.log({ result: result });
      return {
        quarterAcademicYear: `${data.quarterCount}-${data.yearName}`,
        status: "success",
        message: "Insert data is successful",
      };
    } catch (error) {
      console.log("error");
      console.log(JSON.parse(JSON.stringify(error.message)));
      return {
        quarterAcademicYear: `${data.quarterCount}-${data.yearName}`,
        status: "error",
        message: error.message,
      };
    }
  }

  static async updateQuarterAcademicYear(data) {
    const quarterCount = data.quarterCount;
    const startDate = data.startDate.length > 0 ? data.startDate : null;
    const endDate = data.endDate.length > 0 ? data.endDate : null;

    try {
      const result = await Model.prisma.quarter_academic_year.update({
        where: {
          quarter_academic_year_id: data.id,
        },
        data: {
          quarter_academic_year: parseInt(quarterCount),
          start_date: new Date(startDate),
          end_date: new Date(endDate),
        },
      });

      return {
        quarterAcademicYear: data.newId,
        status: "success",
        message: "Update data is successful",
      };
    } catch (error) {
      console.log(error);
      return {
        quarterAcademicYear: data.newId,
        status: "error",
        message: error.message.trim(),
      };
    }
  }

  static async deleteQuarterAcademicYear(data) {
    const deletedID = data.id;
    const deletedQuarterAcademicYear = data.deletedData;

    try {
      const result = await Model.prisma.quarter_academic_year.delete({
        where: {
          quarter_academic_year_id: deletedID,
        },
      });

      return {
        quarterAcademicYear: deletedQuarterAcademicYear,
        status: "success",
        message: "Delete data is successful",
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

export default QuarterAcademicYear;
