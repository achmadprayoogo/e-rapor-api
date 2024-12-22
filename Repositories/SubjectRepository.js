import DatabaseError from "../Errors/DatabaseError.js";
import Model from "../prisma/Model.js";

export default class SubjectRepository {
  static async create(data) {
    console.log(data);
    try {
      let result = await Model.prisma.subject.create({
        data: {
          subject_name: data.subject_name.toLowerCase(),
          grade_class: {
            connect: {
              id: data.grade_class_id,
            },
          },
        },
        include: {
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

  static async getData() {
    try {
      const result = await Model.prisma.subject.findMany({
        include: {
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

  static async findById(id) {
    try {
      const result = await Model.prisma.subject.findUnique({
        where: { id },
        include: {
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

  static async update(data) {
    try {
      const result = await Model.prisma.subject.update({
        where: { id: data.id },
        data: {
          subject_name: data.subject_name.toLowerCase(),
        },
        include: {
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

  static async delete(id) {
    try {
      const result = await Model.prisma.subject.delete({
        where: { id },
        include: {
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
      const result = await Model.prisma.subject.findMany({
        where: {
          grade_class_id: gradeClassId,
        },
        include: {
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

  static async findByTeacherName(teacherName) {
    try {
      const result = await Model.prisma.subject.findMany({
        where: {
          teacher_name: {
            contains: teacherName,
            mode: "insensitive",
          },
        },
        include: {
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
          grade_class: {
            ...element.grade_class,
            relationships: {
              academic_year: element.grade_class.academic_year,
            },
          },
        };
        element.grade_class = undefined;
        element.relationships.grade_class.academic_year = undefined;
      });
      return result;
    }

    result = {
      ...result,
      relationships: {
        grade_class: {
          ...result.grade_class,
          relationships: {
            academic_year: result.grade_class.academic_year,
          },
        },
      },
    };
    result.grade_class = undefined;
    result.relationships.grade_class.academic_year = undefined;

    return result;
  }
}
