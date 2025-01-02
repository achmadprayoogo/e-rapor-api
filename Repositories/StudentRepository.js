import Model from "../prisma/Model.js";
import DatabaseError from "../Errors/DatabaseError.js";
import { it } from "@faker-js/faker";

export default class StudentRepository {
  static async getData(pagingation) {
    try {
      const result = await Model.prisma.students.findMany({
        take: pagingation.take,
        skip: pagingation.skip,
        orderBy: {
          fullname: "asc",
        },
      });

      return result;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async getDataSearch(pagingation, query) {
    try {
      const result = await Model.prisma.students.findMany({
        take: pagingation.take,
        skip: pagingation.skip,
        where: {
          OR: [
            // if query is a number, search by including nis
            ...(query && !isNaN(parseInt(query))
              ? [
                  {
                    nis: {
                      in: [parseInt(query)],
                    },
                  },
                ]
              : []),
            {
              fullname: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              city_of_birth: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              father_name: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              mother_name: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              address: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
        },
        orderBy: {
          fullname: "asc",
        },
      });
      return result;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async getTotalDataSearch(query) {
    try {
      return await Model.prisma.students.count({
        where: {
          OR: [
            // if query is a number, search by including nis
            ...(query && !isNaN(parseInt(query))
              ? [
                  {
                    nis: {
                      in: [parseInt(query)],
                    },
                  },
                ]
              : []),
            {
              fullname: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              city_of_birth: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              father_name: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              mother_name: {
                contains: query,
                mode: "insensitive",
              },
            },
            {
              address: {
                contains: query,
                mode: "insensitive",
              },
            },
          ],
        },
      });
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async getTotal() {
    try {
      return await Model.prisma.students.count();
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async findById(id) {
    try {
      const result = await Model.prisma.students.findUnique({
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
    try {
      const result = await Model.prisma.students.create({
        include: {
          class_member: {
            include: {
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
          },
        },
        data: {
          nis: parseInt(data.nis),
          fullname: data.fullname.toLowerCase(),
          city_of_birth: data.city_of_birth.toLowerCase(),
          birthdate: new Date(data.birthdate),
          father_name: data.father_name.toLowerCase(),
          mother_name: data.mother_name.toLowerCase(),
          guardian_name: data.guardian_name
            ? data.guardian_name.toLowerCase()
            : null,
          address: data.address.toLowerCase(),
          class_member: {
            create: {
              class_name_id: data.class_name_id,
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
      const result = await Model.prisma.students.update({
        where: {
          id: data.id,
        },
        data: {
          nis: parseInt(data.nis),
          fullname: data.fullname.toLowerCase(),
          city_of_birth: data.city_of_birth.toLowerCase(),
          birthdate: new Date(data.birthdate),
          father_name: data.father_name.toLowerCase(),
          mother_name: data.mother_name.toLowerCase(),
          guardian_name: data.guardian_name
            ? data.guardian_name.toLowerCase()
            : null,
          address: data.address.toLowerCase(),
        },
      });
      return result;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async delete(id) {
    try {
      const [scores, class_member, student_status, students] =
        await Model.prisma.$transaction([
          Model.prisma.scores.deleteMany({
            where: {
              student_id: id,
            },
          }),
          Model.prisma.class_member.deleteMany({
            where: {
              student_id: id,
            },
          }),
          Model.prisma.student_status.deleteMany({
            where: {
              student_id: id,
            },
          }),
          Model.prisma.students.delete({
            where: {
              id: id,
            },
          }),
        ]);
      console.log(scores, class_member, student_status, students);
      return students;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async findByNis(nis) {
    try {
      const result = await Model.prisma.students.findFirst({
        where: {
          nis: nis,
        },
      });
      return result;
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static setUpRelationships(result) {
    if (Array.isArray(result)) {
      result.forEach((item) => {
        item = {
          ...item,
          relationships: {
            class_member: item.class_member.map((classMember) => {
              classMember = {
                ...classMember,
                relationships: {
                  class_name: {
                    ...classMember.class_name,
                    relationships: {
                      grade_class: {
                        ...classMember.class_name.grade_class,
                        relationships: {
                          academic_year:
                            classMember.class_name.grade_class.academic_year,
                        },
                      },
                    },
                  },
                },
              };

              classMember.class_name = undefined;
              classMember.relationships.class_name.grade_class = undefined;
              classMember.relationships.class_name.relationships.grade_class.academic_year =
                undefined;

              return classMember;
            }),
          },
        };

        item.class_member = undefined;
      });

      return result;
    }

    result = {
      ...result,
      relationships: {
        class_member: result.class_member.map((item) => {
          item = {
            ...item,
            relationships: {
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

          item.class_name = undefined;
          item.relationships.class_name.grade_class = undefined;
          item.relationships.class_name.relationships.grade_class.academic_year =
            undefined;

          return item;
        }),
      },
    };

    result.class_member = undefined;

    return result;
  }
}
