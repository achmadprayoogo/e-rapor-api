import DatabaseError from "../Errors/DatabaseError.js";
import Model from "../prisma/Model.js";

export default class QuarterAcademicYearRepository {
  static async getData() {
    try {
      const result = await Model.prisma.quarter_academic_year.findMany({
        orderBy: {
          quarter_academic_year: "asc",
        },
        include: {
          academic_year: true,
        },
      });

      return this.setUpRelationships(result);
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async getById(id) {
    try {
      const result = await Model.prisma.quarter_academic_year.findUnique({
        where: {
          id: id,
        },
        include: {
          academic_year: true,
        },
      });
      return this.setUpRelationships(result);
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async create(data) {
    try {
      const result = await Model.prisma.quarter_academic_year.create({
        data: {
          quarter_academic_year: parseInt(data.quarter_academic_year),
          start_date: new Date(data.start_date),
          end_date: new Date(data.end_date),
          academic_year: {
            connect: {
              id: data.academic_year_id,
            },
          },
        },
        include: {
          academic_year: true,
        },
      });

      return this.setUpRelationships(result);
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async update(data) {
    try {
      const result = await Model.prisma.quarter_academic_year.update({
        where: {
          id: data.id,
        },
        data: {
          quarter_academic_year: parseInt(data.quarter_academic_year),
          start_date: new Date(data.start_date),
          end_date: new Date(data.end_date),
        },
        include: {
          academic_year: true,
        },
      });
      return this.setUpRelationships(result);
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async delete(id) {
    console.log(id);
    try {
      const result = await Model.prisma.quarter_academic_year.delete({
        where: {
          id: id,
        },
        include: {
          academic_year: true,
        },
      });
      return this.setUpRelationships(result);
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async getAllAcademicYears() {
    try {
      return await Model.prisma.academic_year.findMany();
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async findAll() {
    try {
      return await Model.prisma.quarter_academic_year.findMany({
        include: {
          academic_year: true,
        },
      });
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async findById(id) {
    try {
      return await Model.prisma.quarter_academic_year.findUnique({
        where: { id },
        include: {
          academic_year: true,
        },
      });
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async updateId(id, data) {
    try {
      return await Model.prisma.quarter_academic_year.update({
        where: { id },
        data: data,
      });
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async deleteId(id) {
    try {
      return await Model.prisma.quarter_academic_year.delete({
        where: { id },
      });
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async findByQuarterAndAcademicYearId(quarter, academicYearId) {
    try {
      const result = await Model.prisma.quarter_academic_year.findFirst({
        where: {
          quarter_academic_year: quarter,
          academic_year_id: academicYearId,
        },
        include: {
          academic_year: true,
        },
      });
      return this.setUpRelationships(result);
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async findByQuarterAndAcademicYearId(quarter, academicYearId) {
    try {
      const result = await Model.prisma.quarter_academic_year.findFirst({
        where: {
          quarter: quarter,
          academic_year_id: academicYearId,
        },
        include: {
          academic_year: true,
        },
      });
      return this.setUpRelationships(result);
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static setUpRelationships(result) {
    if (Array.isArray(result)) {
      result.forEach((element) => {
        element.relationships = {
          academic_year: element.academic_year,
        };
        element.academic_year = undefined;
      });
      return result;
    }

    return {
      ...result,
      relationships: {
        academic_year: result.academic_year,
      },
      academic_year: undefined,
    };
  }
}
