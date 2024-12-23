import DatabaseError from "../Errors/DatabaseError.js";
import Model from "../prisma/Model.js";

export default class GradeClassRepository {
  static async create(data) {
    try {
      const result = await Model.prisma.grade_class.create({
        data: {
          grade_class: data.grade_class.toLowerCase(),
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

  static async getData() {
    try {
      const result = await Model.prisma.grade_class.findMany({
        orderBy: {
          grade_class: "asc",
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

  static async getDataByAcademicYearId(academicYearId) {
    try {
      const result = await Model.prisma.grade_class.findMany({
        orderBy: {
          grade_class: "asc",
        },
        where: {
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

  static async findById(id) {
    try {
      const result = await Model.prisma.grade_class.findUnique({
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

  static async findByAcademicYearId(academicYearId) {
    try {
      const result = await Model.prisma.grade_class.findMany({
        where: {
          academic_year_id: academicYearId,
        },
        include: {
          academic_year: true,
          class_names: true,
        },
      });
      return this.setUpRelationships(result);
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async update(data) {
    console.log(data);
    try {
      const result = await Model.prisma.grade_class.update({
        where: {
          id: data.id,
        },
        data: {
          grade_class: data.grade_class.toLowerCase(),
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
    try {
      const result = await Model.prisma.grade_class.delete({
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
