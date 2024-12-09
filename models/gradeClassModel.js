import Model from "../prisma/Model.js"; // Import the Prisma model
import academicYear from "./academicYearModel.js"; // Import the academicYear model

class GradeClass {
  static async getAll() {
    try {
      const result = await Model.prisma.grade_class.findMany({
        orderBy: {
          academic_year_id: "asc",
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  static async getGradeClassIDByGradeClassName(gradeClassName) {
    try {
      const result = await Model.prisma.grade_class.findUnique({
        where: {
          grade_class: gradeClassName,
        },
      });
      console.log(result);
      return result ? result.grade_class_id : null; // Return null if not found
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  static async findGradeClassById(id) {
    try {
      const result = await Model.prisma.grade_class.findUnique({
        where: {
          grade_class_id: id,
        },
      });
      return result; // Return null if not found
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  static async addGradeClass(data) {
    const academicYearID = await academicYear.getAcademicYearIDByYearName(
      data.yearName
    );
    const gradeClassName =
      data.gradeClassName.length > 0 ? data.gradeClassName.toLowerCase() : null;

    try {
      const result = await Model.prisma.grade_class.create({
        data: {
          academic_year_id: academicYearID,
          grade_class: gradeClassName,
        },
      });

      return {
        gradeClass: `${data.gradeClassName} - ${data.yearName}`,
        status: "success",
        message: "Insert data is successful",
      };
    } catch (error) {
      return {
        gradeClass: `${data.gradeClassName} - ${data.yearName}`,
        status: "error",
        message: error.message,
      };
    }
  }

  static async updateGradeClass(data) {
    const id = data.id;
    const gradeClassName =
      data.gradeClassName.length > 0 ? data.gradeClassName.toLowerCase() : null;

    try {
      const result = await Model.prisma.grade_class.update({
        where: {
          grade_class_id: id,
        },
        data: {
          grade_class: gradeClassName,
        },
      });

      return {
        gradeClass: `${data.gradeClassName} - ${data.academicYear}`,
        status: "success",
        message: "Update data is successful",
      };
    } catch (error) {
      return {
        gradeClass: `${data.gradeClassName} - ${data.academicYear}`,
        status: "error",
        message: error.message,
      };
    }
  }

  static async deleteGradeClass(data) {
    const deletedID = data.id;
    const deletedGradeClass = data.deletedData;

    try {
      const result = await Model.prisma.grade_class.delete({
        where: {
          grade_class_id: deletedID,
        },
      });

      return {
        gradeClass: deletedGradeClass,
        status: "success",
        message: "Delete data is successful",
      };
    } catch (error) {
      return {
        gradeClass: deletedGradeClass,
        status: "error",
        message: error.message,
      };
    }
  }
}

export default GradeClass;
// import pg from "pg";
// import academicYear from "./academicYearModel.js";

// const db = new pg.Client({
//   user: "postgres",
//   host: "localhost",
//   database: process.env.DB,
//   password: process.env.DB_PASSWORD,
//   port: process.env.BD_PORT,
// });

// db.connect();

// class gradeClass {
//   static async getAll() {
//     try {
//       const result = await db.query(
//         "SELECT * FROM public.grade_class ORDER BY academic_year_id ASC"
//       );
//       return result.rows;
//     } catch (error) {
//       console.log(error);
//       return error.message;
//     }
//   }

//   static async getGradeClassIDByGradeClassName(gradeClassName) {
//     try {
//       const result = await db.query(
//         "SELECT * FROM public.grade_class WHERE grade_class = $1",
//         [gradeClassName]
//       );
//       console.log(result.rows);
//       return result.rows[0].grade_class_id;
//     } catch (error) {
//       console.log(error);
//       return error.message;
//     }
//   }

//   static async findGradeClassById(id) {
//     try {
//       const result = await db.query(
//         "SELECT * FROM public.grade_class WHERE grade_class_id = $1",
//         [id]
//       );
//       return result.rows[0];
//     } catch (error) {
//       console.log(error);
//       return error.message;
//     }
//   }

//   static async addGradeClass(data) {
//     const academicYearID = await academicYear.getAcademicYearIDByYearName(
//       data.yearName
//     );
//     const gradeClassName =
//       data.gradeClassName.length > 0 ? data.gradeClassName.toLowerCase() : null;
//     try {
//       const result = await db.query(
//         "INSERT INTO public.grade_class (academic_year_id, grade_class ) VALUES ($1, $2)",
//         [academicYearID, data.gradeClassName.toLowerCase()]
//       );
//       return result.rowCount > 0
//         ? {
//             gradeClass: `${data.gradeClassName} - ${data.yearName}`,
//             status: "success",
//             message: "insert data is success",
//           }
//         : {
//             gradeClass: `${data.gradeClassName} - ${data.yearName}`,
//             status: "failed",
//             message: "insert data is failed with some reason",
//           };
//     } catch (error) {
//       return {
//         gradeClass: `${data.gradeClassName} - ${data.yearName}`,
//         status: "error",
//         message: error.message,
//       };
//     }
//   }

//   static async updateGradeClass(data) {
//     const id = parseInt(data.id);
//     const gradeClassName =
//       data.gradeClassName.length > 0 ? data.gradeClassName.toLowerCase() : null;
//     try {
//       const result = await db.query(
//         "UPDATE public.grade_class SET grade_class = $2 WHERE grade_class_id = $1",
//         [id, gradeClassName]
//       );
//       return result.rowCount > 0
//         ? {
//             gradeClass: `${data.gradeClassName} - ${data.academicYear}`,
//             status: "success",
//             message: "update data is success",
//           }
//         : {
//             gradeClass: `${data.gradeClassName} - ${data.academicYear}`,
//             status: "failed",
//             message: "update data is failed with some reason",
//           };
//     } catch (error) {
//       return {
//         gradeClass: `${data.gradeClassName} - ${data.academicYear}`,
//         status: "error",
//         message: error.message,
//       };
//     }
//   }

//   static async deleteGradeClass(data) {
//     const deletedID = parseInt(data.id);
//     const deletedGradeClass = data.deletedData;

//     try {
//       const result = await db.query(
//         "DELETE FROM public.grade_class WHERE grade_class_id = $1",
//         [deletedID]
//       );

//       return result.rowCount > 0
//         ? {
//             gradeClass: deletedGradeClass,
//             status: "success",
//             message: "delete data is success",
//           }
//         : {
//             gradeClass: deletedGradeClass,
//             status: "failed",
//             message: "delete data is failed with some reason",
//           };
//     } catch (error) {
//       return {
//         gradeClass: deletedGradeClass,
//         status: "error",
//         message: error.message,
//       };
//     }
//   }
// }

// export default gradeClass;
