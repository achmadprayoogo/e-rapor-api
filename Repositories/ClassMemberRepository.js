import DatabaseError from "../Errors/DatabaseError.js";
import Model from "../prisma/Model.js";

export default class ClassMemberRepository {
  static async getAllClassNames() {
    try {
      const result = await Model.prisma.class_name.findMany();
      return result;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async getAllStudents() {
    try {
      const result = await Model.prisma.students.findMany();
      return result;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async getData() {
    try {
      let result = await Model.prisma.class_member.findMany({
        include: {
          student: true,
          class_name: {
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

      result = this.setUpRelationships(result);

      return result;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async getById(id) {
    try {
      const result = await Model.prisma.class_member.findUnique({
        where: {
          id: id,
        },
        include: {
          student: true,
          class_name: {
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
      return result;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async create(data) {
    try {
      let result = await Model.prisma.class_member.create({
        data: {
          student: {
            connect: {
              id: data.student_id,
            },
          },
          class_name: {
            connect: {
              id: data.class_name_id,
            },
          },
        },
        include: {
          student: true,
          class_name: {
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

      result = this.setUpRelationships(result);

      return result;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async update(data) {
    try {
      let result = await Model.prisma.class_member.update({
        where: {
          id: data.id,
        },
        data: {
          student: {
            connect: {
              id: data.student_id,
            },
          },
          class_name: {
            connect: {
              id: data.class_name_id,
            },
          },
        },
        include: {
          student: true,
          class_name: {
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

      result = this.setUpRelationships(result);

      return result;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async delete(id) {
    try {
      let result = await Model.prisma.class_member.delete({
        where: {
          id: id,
        },
        include: {
          student: true,
          class_name: {
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

      result = this.setUpRelationships(result);

      return result;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async findByClassNameId(classNameId) {
    try {
      const result = await Model.prisma.class_member.findMany({
        where: {
          class_name_id: classNameId,
        },
        include: {
          student: true,
          class_name: true,
        },
      });
      return result;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static setUpRelationships(result) {
    if (Array.isArray(result)) {
      return result.map((item) => {
        item = {
          ...item,
          relationships: {
            student: item.student,
            class_name: {
              ...item.class_name,
              relationships: {
                grade_class: {
                  ...item.class_name.grade_class,
                  relationships: {
                    academic_year: item.class_name.grade_class.academic_year,
                  },
                },
              },
            },
          },
        };
        item.student = undefined;
        item.class_name = undefined;
        item.relationships.class_name.grade_class = undefined;
        item.relationships.class_name.relationships.grade_class.academic_year =
          undefined;

        return item;
      });
    }

    result = {
      ...result,
      relationships: {
        student: result.student,
        class_name: {
          ...result.class_name,
          relationships: {
            grade_class: {
              ...result.class_name.grade_class,
              relationships: {
                academic_year: result.class_name.grade_class.academic_year,
              },
            },
          },
        },
      },
    };

    result.student = undefined;
    result.class_name = undefined;
    result.relationships.class_name.grade_class = undefined;
    result.relationships.class_name.relationships.grade_class.academic_year =
      undefined;

    return result;
  }
}
