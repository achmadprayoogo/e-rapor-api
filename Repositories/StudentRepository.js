import Model from "../prisma/Model.js";
import DatabaseError from "../Errors/DatabaseError.js";

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

  static async getTotal() {
    try {
      return await Model.prisma.students.count();
    } catch (error) {
      throw new DatabaseError(error);
    }
  }

  static async getById(id) {
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
      const result = await Model.prisma.students.delete({
        where: {
          id: id,
        },
      });
      return result;
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
}
