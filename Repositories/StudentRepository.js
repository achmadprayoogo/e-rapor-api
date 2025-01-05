import Model from "../prisma/Model.js";
import DatabaseError from "../Errors/DatabaseError.js";

export default class StudentRepository {
  static async getDataAll(pagingation, sort) {
    try {
      const result = await Model.prisma.students.findMany({
        take: pagingation.take,
        skip: pagingation.skip,
        orderBy: {
          [sort.by || "fullname"]: sort.order || "asc",
        },
        include: {
          student_status: true,
        },
      });
      return this.setUpRelationships(result);
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async getDataContainAcademicYearId(pagingation, sort, academicYearId) {
    console.log("repo", sort); ///////////////////////////
    try {
      const result = await Model.prisma.students.findMany({
        take: pagingation.take,
        skip: pagingation.skip,
        orderBy: {
          [sort.by]: sort.order,
        },
        where: {
          student_status: {
            some: {
              academic_year_id: academicYearId,
            },
          },
        },
        include: {
          student_status: {
            where: {
              academic_year_id: academicYearId,
            },
          },
        },
      });

      return this.setUpRelationships(result);
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async getTotalAllDataContainAcademicYearId(academicYearId) {
    try {
      return await Model.prisma.students.count({
        where: {
          student_status: {
            some: {
              academic_year_id: academicYearId,
            },
          },
        },
      });
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async getDataSearch(pagingation, query, academicYearId) {
    try {
      const whereCondition = {};
      const includeCondition = {};

      if (academicYearId !== (null || undefined || "")) {
        console.log("repo", academicYearId); ///////////////////////////
        whereCondition.student_status = {
          some: {
            academic_year_id: academicYearId,
          },
        };
        includeCondition.student_status = {
          where: {
            academic_year_id: academicYearId,
          },
        };
      }

      if (query) {
        const queryNumber = parseInt(query);
        whereCondition.OR = [
          ...(isNaN(queryNumber) ? [] : [{ nis: { in: [queryNumber] } }]),
          { fullname: { contains: query, mode: "insensitive" } },
          { city_of_birth: { contains: query, mode: "insensitive" } },
          { father_name: { contains: query, mode: "insensitive" } },
          { mother_name: { contains: query, mode: "insensitive" } },
          { address: { contains: query, mode: "insensitive" } },
        ];
      }
      console.log(whereCondition); ///////////////////////////
      const result = await Model.prisma.students.findMany({
        take: pagingation.take,
        skip: pagingation.skip,
        where: whereCondition,
        include: includeCondition,
        orderBy: {
          fullname: "asc",
        },
      });

      return this.setUpRelationships(result);
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

  static async getTotalAll() {
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
          student_status: {
            create: {
              status: data.status,
              academic_year_id: data.academic_year_id,
            },
          },
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
      return result.map((item) => {
        let studentStatus = [];
        if (Array.isArray(item.student_status)) {
          studentStatus = item.student_status?.map((item) => {
            return {
              type: "student_status",
              id: item.id,
              attributes: {
                ...item,
                id: undefined,
              },
            };
          });
        }

        const classMembers = item.class_member?.map((item) => {
          const classMember = {
            type: "class_member",
            id: item.class_member.id,
            attributes: {
              ...item.class_member,
              id: undefined,
            },
          };

          const className = {
            type: "class_name",
            id: item.class_member.class_name.id,
            attributes: {
              ...item.class_member.class_name,
              id: undefined,
            },
          };

          const gradeClass = {
            type: "grade_class",
            id: item.class_member.class_name.grade_class.id,
            attributes: {
              ...item.class_member.class_name.grade_class,
              id: undefined,
            },
          };

          const academicYear = {
            type: "academic_year",
            id: item.class_member.class_name.grade_class.academic_year.id,
            attributes: {
              ...item.class_member.class_name.grade_class.academic_year,
              id: undefined,
            },
          };

          return {
            ...classMember,
            relationships: {
              class_name: {
                ...className,
                relationships: {
                  grade_class: {
                    ...gradeClass,
                    relationships: {
                      academic_year: {
                        ...academicYear,
                      },
                    },
                  },
                },
              },
            },
          };
        });

        const newItem = {
          ...item,
          relationships: {
            student_status: studentStatus,
            class_member: classMembers,
          },
        };

        delete newItem.class_member;
        delete newItem.student_status;

        return newItem;
      });
    }

    let studentStatus = [];
    if (Array.isArray(item.student_status)) {
      studentStatus = item.student_status?.map((item) => {
        return {
          type: "student_status",
          id: item.id,
          attributes: {
            ...item,
            id: undefined,
          },
        };
      });
    }

    const classMembers = result.class_member?.map((item) => {
      const classMember = {
        type: "class_member",
        id: item.id,
        attributes: {
          ...item,
          id: undefined,
        },
      };

      const className = {
        type: "class_name",
        id: item.class_name.id,
        attributes: {
          ...item.class_name,
          id: undefined,
        },
      };

      const gradeClass = {
        type: "grade_class",
        id: item.class_name.grade_class.id,
        attributes: {
          ...item.class_name.grade_class,
          id: undefined,
        },
      };

      const academicYear = {
        type: "academic_year",
        id: item.class_name.grade_class.academic_year.id,
        attributes: {
          ...item.class_name.grade_class.academic_year,
          id: undefined,
        },
      };

      return {
        ...classMember,
        relationships: {
          class_name: {
            ...className,
            relationships: {
              grade_class: {
                ...gradeClass,
                relationships: {
                  academic_year: {
                    ...academicYear,
                  },
                },
              },
            },
          },
        },
      };
    });

    const newResult = {
      ...result,
      relationships: {
        student_status: studentStatus,
        class_member: classMembers,
      },
    };

    delete newResult.class_member;
    delete newResult.student_status;

    return newResult;
  }
}
