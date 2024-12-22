import DatabaseError from "../Errors/DatabaseError.js";
import Model from "../prisma/Model.js";

export default class AcademicYearRepository {
  static async getData() {
    try {
      const result = await Model.prisma.academic_year.findMany({
        orderBy: {
          academic_year: "asc",
        },
      });
      return result;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async getById(id) {
    try {
      const result = await Model.prisma.academic_year.findUnique({
        where: {
          id: id,
        },
      });
      return result;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async create(data) {
    console.log(data);
    try {
      const result = await Model.prisma.academic_year.create({
        data: {
          academic_year: data.academic_year,
          start_date: data.start_date,
          end_date: data.end_date,
        },
      });
      return result;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async update(data) {
    try {
      const result = await Model.prisma.academic_year.update({
        where: {
          id: data.id,
        },
        data: {
          academic_year: data.academic_year,
          start_date: new Date(data.start_date),
          end_date: new Date(data.end_date),
        },
      });
      return result;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async delete(id) {
    try {
      const result = await Model.prisma.academic_year.delete({
        where: {
          id: id,
        },
      });

      return result;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async findByAcademicYear(academicYear) {
    try {
      const result = await Model.prisma.academic_year.findFirst({
        where: {
          academic_year: academicYear,
        },
      });
      return result;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }
}
