import { th } from "@faker-js/faker";
import DatabaseError from "../Errors/DatabaseError.js";
import Model from "../prisma/Model.js";

export default class StudentStatusRepository {
  static async setStatus(data) {
    try {
      const result = await Model.prisma.student_status.create({
        data: {
          student: {
            connect: {
              id: data.student_id,
            },
          },
          academic_year: {
            connect: {
              id: data.academic_year_id,
            },
          },
        },
        include: {
          student: true,
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
      const result = await Model.prisma.student_status.findMany({
        include: {
          student: true,
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
      const result = await Model.prisma.student_status.findUnique({
        where: { id },
        include: {
          student: true,
          academic_year: true,
        },
      });
      return result;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async update(id, data) {
    try {
      const result = await Model.prisma.student_status.update({
        where: { id },
        data: data,
      });
      return result;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async delete(id) {
    try {
      const result = await Model.prisma.student_status.delete({
        where: { id },
        include: {
          student: true,
          academic_year: true,
        },
      });

      return this.setUpRelationships(result);
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async findByStudentId(studentId) {
    try {
      const result = await Model.prisma.student_status.findMany({
        where: {
          student_id: studentId,
        },
        include: {
          academic_year: true,
        },
      });
      return result;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async findByAcademicYearId(academicYearId) {
    try {
      const result = await Model.prisma.student_status.findMany({
        where: {
          academic_year_id: academicYearId,
        },
        include: {
          student: true,
        },
      });
      return result;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async findByStudentIdAndGradeClassId(studentId, gradeClassId) {
    try {
      const result = await Model.prisma.student_status.findFirst({
        where: {
          student_id: studentId,
          grade_class_id: gradeClassId,
        },
        include: {
          student: true,
          grade_class: {
            include: {
              academic_year: true,
            },
          },
        },
      });
      return this.setUpRelationships(result);
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async findByGradeClassId(gradeClassId) {
    try {
      const result = await Model.prisma.student_status.findMany({
        where: {
          grade_class_id: gradeClassId,
        },
        include: {
          student: true,
          grade_class: {
            include: {
              academic_year: true,
            },
          },
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
          student: element.student,
          academic_year: element.academic_year,
        };
        element.student = undefined;
        element.academic_year = undefined;
      });
      return result;
    }

    return {
      ...result,
      relationships: {
        student: result.student,
        academic_year: result.academic_year,
      },
      student: undefined,
      academic_year: undefined,
    };
  }
}
