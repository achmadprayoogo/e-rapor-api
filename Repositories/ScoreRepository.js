import { PrismaClient } from "@prisma/client";
import DatabaseError from "../Errors/DatabaseError.js";
import Model from "../prisma/Model.js";

const prisma = new PrismaClient();

export default class ScoreRepository {
  static async create(data) {
    try {
      let result = await prisma.scores.create({
        data: {
          student: {
            connect: {
              id: data.student_id,
            },
          },
          subject: {
            connect: {
              id: data.subject_id,
            },
          },
          score: parseInt(data.score),
        },
        include: {
          student: true,
          subject: {
            include: {
              grade_class: {
                include: {
                  academic_year: true,
                },
              },
            },
          },
        },
      });

      return this.setUpRelationships(result);
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async getAllStudents() {
    try {
      return await prisma.students.findMany();
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async getAllSubjects() {
    try {
      return await prisma.subject.findMany();
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async getData() {
    try {
      const result = await Model.prisma.scores.findMany({
        include: {
          student: true,
          subject: {
            include: {
              grade_class: {
                include: {
                  academic_year: true,
                },
              },
            },
          },
        },
      });

      return this.setUpRelationships(result);
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async findById(id) {
    try {
      return await Model.prisma.scores.findUnique({
        where: { id },
        include: {
          student: true,
          subject: {
            include: {
              grade_class: {
                include: {
                  academic_year: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async findByStudentAndSubject(studentId, subjectId) {
    try {
      const result = await Model.prisma.score.findMany({
        where: {
          student_id: studentId,
          subject_id: subjectId,
        },
        include: {
          student: true,
          subject: true,
          quarter_academic_year: {
            include: {
              academic_year: true,
            },
          },
        },
      });
      return result;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async update(data) {
    try {
      const result = await prisma.scores.update({
        where: { id: data.id },
        data: {
          score: parseInt(data.score),
        },
        include: {
          student: true,
          subject: {
            include: {
              grade_class: {
                include: {
                  academic_year: true,
                },
              },
            },
          },
        },
      });

      return this.setUpRelationships(result);
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async delete(id) {
    try {
      return await prisma.scores.delete({
        where: { id },
        include: {
          student: true,
          subject: {
            include: {
              grade_class: {
                include: {
                  academic_year: true,
                },
              },
            },
          },
        },
      });
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static setUpRelationships(result) {
    if (Array.isArray(result)) {
      result.forEach((element) => {
        element.relationships = {
          student: element.student,
          subject: {
            ...element.subject,
            relationships: {
              grade_class: {
                ...element.subject.grade_class,
                relationships: {
                  academic_year: element.subject.grade_class.academic_year,
                },
              },
            },
          },
        };
        element.student = undefined;
        element.subject = undefined;
        element.relationships.subject.grade_class = undefined;
        element.relationships.subject.relationships.grade_class.academic_year =
          undefined;
      });

      return result;
    }

    result = {
      ...result,
      relationships: {
        student: result.student,
        subject: {
          ...result.subject,
          relationships: {
            grade_class: {
              ...result.subject.grade_class,
              relationships: {
                academic_year: result.subject.grade_class.academic_year,
              },
            },
          },
        },
      },
    };

    result.student = undefined;
    result.subject = undefined;
    result.relationships.subject.grade_class = undefined;
    result.relationships.subject.relationships.grade_class.academic_year =
      undefined;

    return result;
  }
}
