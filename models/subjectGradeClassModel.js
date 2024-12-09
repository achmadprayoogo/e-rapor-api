import Model from "../prisma/Model.js"; // Import the Prisma model

class SubjectGradeClassModel {
  static async getAll() {
    try {
      const result = await Model.prisma.subject_grade_class.findMany({
        orderBy: {
          subject_grade_class_id: "asc",
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  static async inputSubjectGradeClass(data) {
    console.log(data);
    try {
      const gradeClassID = data.gradeClass.split("|")[0];
      const subjectGradeClassName =
        data.subjectGradeClassName.length > 0
          ? data.subjectGradeClassName.toLowerCase()
          : null;

      const result = await Model.prisma.subject_grade_class.create({
        data: {
          grade_class_id: gradeClassID,
          subject_grade_class_name: subjectGradeClassName,
        },
      });

      return {
        subjectGradeClassName: `${data.subjectGradeClassName} - ${
          data.gradeClass.split("|")[1]
        } - ${data.academicYear.split("|")[1]}`,
        status: "success",
        message: "Insert data is successful",
      };
    } catch (error) {
      console.log(error);
      return {
        subjectGradeClassName: `${data.subjectGradeClassName} - ${
          data.gradeClass.split("|")[1]
        } - ${data.academicYear.split("|")[1]}`,
        status: "error",
        message: error.message,
      };
    }
  }

  static async updateSubjectGradeClass(data) {
    const subjectGradeClassName =
      data.subjectGradeClassName.length > 0
        ? data.subjectGradeClassName.toLowerCase()
        : null;
    const id = data.id.length > 0 ? data.id : null;

    try {
      const result = await Model.prisma.subject_grade_class.update({
        where: {
          subject_grade_class_id: id,
        },
        data: {
          subject_grade_class_name: subjectGradeClassName,
        },
      });

      return {
        updatedData: `${data.subjectGradeClassName} - ${data.gradeClassName} - ${data.academicYear}`,
        status: "success",
        message: "Update data is successful",
      };
    } catch (error) {
      return {
        updatedData: `${data.subjectGradeClassName} - ${data.gradeClassName} - ${data.academicYear}`,
        status: "error",
        message: error.message,
      };
    }
  }

  static async deleteSubjectGradeClass(data) {
    try {
      const result = await Model.prisma.subject_grade_class.delete({
        where: {
          subject_grade_class_id: data.id,
        },
      });

      return {
        subjectGradeClassName: data.deletedData,
        status: "success",
        message: "Delete data is successful",
      };
    } catch (error) {
      return {
        subjectGradeClassName: data.deletedData,
        status: "error",
        message: error.message,
      };
    }
  }
}

export default SubjectGradeClassModel;
// import pg from "pg";

// const db = new pg.Client({
//   user: "postgres",
//   host: "localhost",
//   database: process.env.DB,
//   password: process.env.DB_PASSWORD,
//   port: process.env.BD_PORT,
// });

// db.connect();

// class subjectGradeClassModel {
//   static async getAll() {
//     try {
//       const result = await db.query(
//         "SELECT * FROM public.subject_grade_class ORDER BY subject_grade_class_id ASC"
//       );
//       return result.rows;
//     } catch (error) {
//       console.log(error);
//       return error.message;
//     }
//   }

//   static async inputSubjectGradeClass(data) {
//     try {
//       const gradeClassID = parseInt(data.gradeClass.split("-")[0]);
//       const subjectGradeClassName =
//         data.subjectGradeClassName.length > 0
//           ? data.subjectGradeClassName.toLowerCase()
//           : null;
//       const result = await db.query(
//         "INSERT INTO public.subject_grade_class (grade_class_id, subject_grade_class_name) VALUES ($1, $2)",
//         [gradeClassID, subjectGradeClassName]
//       );
//       return result.rowCount > 0
//         ? {
//             subjectGradeClassName: `${data.subjectGradeClassName} - ${
//               data.gradeClass.split("-")[1]
//             } - ${data.academicYear.split("-")[1]}`,
//             status: "success",
//             message: "insert data is success",
//           }
//         : {
//             subjectGradeClassName: `${data.subjectGradeClassName} - ${
//               data.gradeClass.split("-")[1]
//             } - ${data.academicYear.split("-")[1]}`,
//             status: "failed",
//             message: "insert data is failed with some reason",
//           };
//     } catch (error) {
//       return {
//         subjectGradeClassName: `${data.subjectGradeClassName} - ${
//           data.gradeClass.split("-")[1]
//         } - ${data.academicYear.split("-")[1]}`,
//         status: "error",
//         message: error.message,
//       };
//     }
//   }

//   static async updateSubjectGradeClass(data) {
//     const subjectGradeClassName =
//       data.subjectGradeClassName.length > 0
//         ? data.subjectGradeClassName.toLowerCase()
//         : null;
//     const id = data.id.length > 0 ? parseInt(data.id) : null;

//     try {
//       const result = await db.query(
//         "UPDATE public.subject_grade_class SET subject_grade_class_name = $1 WHERE subject_grade_class_id = $2 ",
//         [subjectGradeClassName, id]
//       );
//       return result.rowCount > 0
//         ? {
//             updatedData: `${data.subjectGradeClassName} - ${data.gradeClassName} - ${data.academicYear}`,
//             status: "success",
//             message: "update data is success",
//           }
//         : {
//             updatedData: `${data.subjectGradeClassName} - ${data.gradeClassName} - ${data.academicYear}`,
//             status: "failed",
//             message: "update data is failed with some reason",
//           };
//     } catch (error) {
//       return {
//         updatedData: `${data.subjectGradeClassName} - ${data.gradeClassName} - ${data.academicYear}`,
//         status: "error",
//         message: error.message,
//       };
//     }
//   }

//   static async deleteSubjectGradeClass(data) {
//     try {
//       const result = await db.query(
//         "DELETE FROM public.subject_grade_class WHERE subject_grade_class_id = $1",
//         [data.id]
//       );
//       return result.rowCount > 0
//         ? {
//             subjectGradeClassName: data.deletedData,
//             status: "success",
//             message: "delete data is success",
//           }
//         : {
//             subjectGradeClassName: data.deletedData,
//             status: "failed",
//             message: "delete data is failed with some reason",
//           };
//     } catch (error) {
//       return {
//         subjectGradeClassName: data.deletedData,
//         status: "error",
//         message: error.message,
//       };
//     }
//   }
// }

// export default subjectGradeClassModel;
