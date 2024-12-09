import Model from "../prisma/Model.js"; // Import the Prisma model

class AcademicYear {
  static async getAll() {
    const result = await Model.prisma.academic_year.findMany({
      orderBy: {
        academic_year: "asc",
      },
    });

    return result;
  }

  static async getAcademicYearIDByYearName(academicYearName) {
    const result = await Model.prisma.academic_year.findUnique({
      where: {
        academic_year: academicYearName,
      },
      select: {
        academic_year_id: true,
      },
    });

    return result ? result.academic_year_id : null; // Return null if not found
  }

  static async getAcademicYearById(id) {
    const result = await Model.prisma.academic_year.findUnique({
      where: {
        academic_year_id: id,
      },
    });

    return result; // Return null if not found
  }

  static async inputAcademicYear(data) {
    const academicYear =
      data.academicYear.length > 0 ? data.academicYear : null;
    const startDate = data.startDate.length > 0 ? data.startDate : null;
    const endDate = data.endDate.length > 0 ? data.endDate : null;

    try {
      const result = await Model.prisma.academic_year.create({
        data: {
          academic_year: academicYear,
          start_date: new Date(startDate),
          end_date: new Date(endDate),
        },
      });
      console.log(result);
      return {
        academicYear: result.academic_year,
        status: "success",
        message: "Insert data is successful",
      };
    } catch (error) {
      console.log(error);
      return {
        academicYear: academicYear,
        status: "error",
        message: error.message,
      };
    }
  }

  static async updateAcademicYear(data) {
    try {
      const result = await Model.prisma.academic_year.update({
        where: {
          academic_year_id: data.academicYearID,
        },
        data: {
          academic_year: data.academicYear,
          start_date: new Date(data.startDate),
          end_date: new Date(data.endDate),
        },
      });

      return {
        academicYear: result.academic_year,
        status: "success",
        message: "Update data is successful",
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
      const result = await Model.prisma.academic_year.delete({
        where: {
          academic_year_id: academicYearID,
        },
      });

      return {
        academicYear: deletedAcademicYear,
        status: "success",
        message: "Delete data is successful",
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

export default AcademicYear;
