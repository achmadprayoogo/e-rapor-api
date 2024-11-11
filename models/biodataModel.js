import pg from "pg";

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: process.env.DB,
  password: process.env.DB_PASSWORD,
  port: process.env.BD_PORT,
});

db.connect();

class biodata {
  static async getAll() {
    const result = await db.query(
      "SELECT * FROM public.biodata ORDER BY nis ASC"
    );
    const items = result.rows;
    const data = [];

    items.forEach((element) => {
      data.push({
        nis: element.nis,
        fullname: element.fullname,
        age: new Date().getFullYear() - element.dateofbirth.getFullYear(),
        cityofbirth: element.cityofbirth,
        dateofbirth: element.dateofbirth,
        fathername: element.fathername,
        mothername: element.mothername,
        guardianname: element.guardianname,
        status: element.status,
        address: element.address,
      });
    });

    return data;
  }

  static async inputBiodata(data) {
    try {
      const result = await db.query(
        "INSERT INTO public.biodata (nis, fullname, cityofbirth, dateofbirth, fathername, mothername, guardianname, status, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)",
        [
          data.nis,
          data.fullName,
          data.cityOfBirth,
          data.dateOfBirth,
          data.fatherName,
          data.motherName,
          data.guardianName,
          data.status,
          data.address,
        ]
      );

      return result.rowCount > 0
        ? {
            nis: data.nis,
            name: data.fullName,
            status: "success",
            message: "insert data is success",
          }
        : {
            nis: data.nis,
            name: data.fullName,
            status: "failed",
            message: "insert data is failed with some reason",
          };
    } catch (error) {
      return {
        nis: data.nis,
        name: data.fullName,
        status: "error",
        message: error.message,
      };
    }
  }

  static async importBiodata(dataArray) {
    const result = await Promise.all(
      dataArray.map(async (data) => {
        const query =
          "INSERT INTO public.biodata (nis, fullname, cityofbirth, dateofbirth, fathername, mothername, guardianname, status, address) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)";
        const values = [
          parseInt(data.nis),
          data.fullName,
          data.cityOfBirth,
          data.dateOfBirth,
          data.fatherName,
          data.motherName,
          data.guardianName,
          data.status,
          data.address,
        ];

        try {
          const result = await db.query(query, values);
          return result.rowCount > 0
            ? {
                nis: data.nis,
                name: data.fullName,
                status: "success",
                message: "insert data is success",
              }
            : {
                nis: data.nis,
                name: data.fullName,
                status: "failed",
                message: "insert data is failed with some reason",
              };
        } catch (error) {
          return {
            nis: data.nis,
            name: data.fullName,
            status: "error",
            message: error.message,
          };
        }
      })
    );

    return result;
  }

  static async updateBiodata(data) {
    try {
      const result = await db.query(
        "UPDATE public.biodata SET nis = $2, fullname = $3, cityofbirth = $4, dateofbirth = $5, fathername = $6, mothername = $7, guardianname = $8, status = $9, address = $10 WHERE nis = $1",
        [
          data.nis,
          data.newNIS,
          data.fullName,
          data.cityOfBirth,
          data.dateOfBirth,
          data.fatherName,
          data.motherName,
          data.guardianName,
          data.status,
          data.address,
        ]
      );

      return result.rowCount > 0
        ? {
            nis: data.newNIS,
            name: data.fullName,
            status: "success",
            message: "update data is success",
          }
        : {
            nis: data.nis,
            name: data.fullName,
            status: "failed",
            message: "update data is failed with some reason",
          };
    } catch (error) {
      return {
        nis: data.nis,
        name: data.fullName,
        status: "error",
        message: error.message,
      };
    }
  }

  static async deleteBiodata(nis) {
    try {
      const result = await db.query(
        "DELETE FROM public.biodata WHERE nis = $1",
        [nis]
      );
      return result.rowCount > 0
        ? {
            nis,
            status: "success",
            message: "delete data is success",
          }
        : {
            nis,
            stauts: "failed",
            message: "delete data is failed with some reason",
          };
    } catch (error) {
      return { nis, status: "error", message: error.message };
    }
  }
}

export default biodata;
