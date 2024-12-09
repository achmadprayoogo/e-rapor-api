import Model from "../prisma/Model.js"; // Import the Prisma model

class ClassName {
  static async getAll() {
    try {
      const result = await Model.prisma.class_name.findMany({
        orderBy: {
          grade_class_id: "asc",
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  static async getClassNameByID(id) {
    try {
      const result = await Model.prisma.class_name.findUnique({
        where: {
          class_name_id: id,
        },
      });
      return result; // Return null if not found
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  static async addClassName(data) {
    console.log(data);
    const gradeClassID = data.gradeClass.split("|")[0];
    const className =
      data.className.length > 0 ? data.className.toLowerCase() : null;
    const homeroomTeacher =
      data.homeroomTeacher.length > 0
        ? data.homeroomTeacher.toLowerCase()
        : null;

    try {
      const result = await Model.prisma.class_name.create({
        data: {
          grade_class_id: gradeClassID,
          class_name: className,
          homeroom_teacher: homeroomTeacher,
        },
      });

      console.log({ result: result });

      return {
        className: `${data.className} - ${data.gradeClass.split("-")[1]} - ${
          data.academicYear.split("-")[1]
        }`,
        status: "success",
        message: "Insert data is successful",
      };
    } catch (error) {
      console.log(error);
      return {
        className: `${data.className} - ${data.gradeClass.split("-")[1]} - ${
          data.academicYear.split("-")[1]
        }`,
        status: "error",
        message: error.message,
      };
    }
  }

  static async updateClassName(data) {
    const className =
      data.className.length > 0 ? data.className.toLowerCase() : null;
    const homeroomTeacher =
      data.homeroomTeacher.length > 0
        ? data.homeroomTeacher.toLowerCase()
        : null;
    const id = data.id.length > 0 ? data.id : null;

    try {
      const result = await Model.prisma.class_name.update({
        where: {
          class_name_id: id,
        },
        data: {
          class_name: className,
          homeroom_teacher: homeroomTeacher,
        },
      });

      return {
        updatedData: `${data.className} - ${data.gradeClassName} - ${data.academicYear}`,
        status: "success",
        message: "Update data is successful",
      };
    } catch (error) {
      return {
        updatedData: `${data.className} - ${data.gradeClassName} - ${data.academicYear}`,
        status: "error",
        message: error.message,
      };
    }
  }

  static async deleteClassName(data) {
    try {
      const result = await Model.prisma.class_name.delete({
        where: {
          class_name_id: data.id,
        },
      });

      return {
        className: data.deletedData,
        status: "success",
        message: "Delete data is successful",
      };
    } catch (error) {
      return {
        className: data.deletedData,
        status: "error",
        message: error.message,
      };
    }
  }
}

export default ClassName;
