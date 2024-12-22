import DatabaseError from "../Errors/DatabaseError.js";
import Model from "../prisma/Model.js";

export default class ClassNameRepository {
  static async create(data) {
    try {
      const result = await Model.prisma.class_name.create({
        data: {
          class_name: data.class_name.toLowerCase(),
          homeroom_teacher: data.homeroom_teacher.toLowerCase(),
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
      const result = await Model.prisma.class_name.findMany({
        orderBy: {
          class_name: "asc",
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

  static async findById(id) {
    try {
      const result = await Model.prisma.class_name.findUnique({
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
      const result = await Model.prisma.class_name.findMany({
        where: {
          grade_class_id: gradeClassId,
        },
        include: {
          grade_class: {
            include: {
              academic_year: true,
            },
          },
          class_members: {
            include: {
              student: true,
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
      const result = await Model.prisma.class_name.update({
        where: { id: data.id },
        data: {
          class_name: data.class_name.toLowerCase(),
          homeroom_teacher: data.homeroom_teacher.toLowerCase(),
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
      const result = await Model.prisma.class_name.delete({
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
        element.relationships.grade_class.academic_year = undefined;
        element.grade_class = undefined;
      });
      return result;
    }

    return {
      ...result,
      relationships: {
        grade_class: {
          ...result.grade_class,
          relationships: {
            academic_year: result.grade_class.academic_year,
          },
        },
      },
      grade_class: undefined,
    };
  }
}
