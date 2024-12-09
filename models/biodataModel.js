import Model from "../prisma/Model.js";
import { parse } from "dotenv";

class biodata {
  static async getAll() {
    const result = await Model.prisma.biodata.findMany({
      orderBy: {
        nis: "asc",
      },
    });
    const items = result;
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

  static async getBiodataByNIS(nis) {
    const result = await Model.prisma.biodata.findUnique({
      where: {
        nis: nis,
      },
    });
    console.log(result);
    const items = result;
    const data = {
      nis: items.nis,
      fullname: items.fullname,
      age: new Date().getFullYear() - items.dateofbirth.getFullYear(),
      cityofbirth: items.cityofbirth,
      dateofbirth: items.dateofbirth,
      fathername: items.fathername,
      mothername: items.mothername,
      guardianname: items.guardianname,
      status: items.status,
      address: items.address,
    };
    if (!items) {
      return null;
    }
    return data;
  }

  static async inputBiodata(data) {
    try {
      const result = await Model.prisma.biodata.create({
        data: {
          nis: data.nis,
          fullname: data.fullName,
          cityofbirth: data.cityOfBirth,
          dateofbirth: data.dateOfBirth,
          fathername: data.fatherName,
          mothername: data.motherName,
          guardianname: data.guardianName,
          status: data.status,
          address: data.address,
        },
      });

      return result
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
      console.log(error);
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
        try {
          const result = await Model.prisma.biodata.create({
            data: {
              nis: parseInt(data.nis),
              fullname: data.fullName,
              cityofbirth: data.cityOfBirth,
              dateofbirth: new Date(data.dateOfBirth),
              fathername: data.fatherName,
              mothername: data.motherName,
              guardianname: data.guardianName,
              status: data.status,
              address: data.address,
            },
          });
          return result
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
      const result = await Model.prisma.biodata.update({
        where: {
          nis: data.nis, // The current NIS to find the record
        },
        data: {
          nis: data.newNIS, // New NIS value
          fullname: data.fullName,
          cityofbirth: data.cityOfBirth,
          dateofbirth: data.dateOfBirth,
          fathername: data.fatherName,
          mothername: data.motherName,
          guardianname: data.guardianName,
          status: data.status,
          address: data.address,
          updated_at: new Date(),
        },
      });
      return result
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
      const result = await Model.prisma.biodata.delete({
        where: {
          nis: nis,
        },
      });
      return result
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
