import { util } from "../util/util.js";
import errorHandler from "../Errors/errorHandler.js";
import StudentRepository from "../Repositories/StudentRepository.js";

let timeStamp;

export default class StudentController {
  static getStudents = async (req, res) => {
    const pageNumber = parseInt(req.query.page.number);
    const pageSize = parseInt(req.query.page.size);
    const offsite = (pageNumber - 1) * pageSize;

    const pagingation = {
      take: pageSize,
      skip: offsite,
    };

    try {
      const data = await StudentRepository.getData(pagingation);
      const total = await StudentRepository.getTotal();

      const protocol = req.protocol;
      const host = req.get("host");
      const originalUrl = req.originalUrl;
      const routePath = req.route.path;

      const self = `${protocol}://${host}${originalUrl}`;
      const first = `${protocol}://${host}${routePath}?page[number]=1&page[size]=${pageSize}`;
      const prev =
        pageNumber > 1
          ? `${req.protocol}://${host}${routePath}?page[number]=${
              pageNumber - 1
            }&page[size]=${pageSize}`
          : null;
      const next =
        offsite + pageSize < total
          ? `${req.protocol}://${host}${routePath}?page[number]=${
              pageNumber + 1
            }&page[size]=${pageSize}`
          : null;
      const last = `${
        req.protocol
      }://${host}${routePath}?page[number]=${Math.ceil(
        total / pageSize
      )}&page[size]=${pageSize}`;

      res.status(200).json({
        links: {
          self,
          first,
          prev,
          next,
          last,
        },
        data: this.remakeDataResponse(data),
        meta: {
          page: {
            currentPage: pageNumber,
            from: offsite + 1,
            to: Math.min(offsite + parseInt(pageSize), total),
            lastPage: Math.ceil(total / parseInt(pageSize)),
            perPage: pageSize,
            total,
          },
          info: util.getLastUpdate(timeStamp),
        },
      });
    } catch (error) {
      errorHandler(error, res);
    }
  };

  static createStudent = async (req, res) => {
    try {
      const student = this.remakeDataRequest(req.body);
      const result = await StudentRepository.create(student);
      const data = this.remakeDataResponse(result);
      console.log(
        data.attributes.relationships.class_member[0].relationships.class_name
          .relationships.grade_class
      );
      res.status(200).json({
        data,
      });
    } catch (error) {
      errorHandler(error, res);
    }
  };

  static remakeDataRequest(data) {
    return {
      ...data,
      birthdate: new Date(data.birthdate),
      nis: parseInt(data.nis),
    };
  }

  static remakeDataResponse(data) {
    if (Array.isArray(data)) {
      const remakedData = data.map((item) => {
        return {
          type: "student",
          id: item.id,
          attributes: {
            ...item,
            id: undefined,
          },
        };
      });

      return remakedData;
    }

    return {
      type: "student",
      id: data.id,
      attributes: {
        ...data,
        id: undefined,
      },
    };
  }

  static importStudents = async (req, res) => {
    try {
      const csvData = await req.file.buffer.toString("utf-8");
      const data = [];
      const objKey = [
        "nis",
        "fullname",
        "city_of_birth",
        "birthdate",
        "father_name",
        "mother_name",
        "guardian_name",
        "status",
        "address",
      ];

      const jsonData = util.csvToJSON(csvData, objKey);

      for (const item of jsonData) {
        const JsonDataRemaked = this.remakeDataRequest(item);
        const result = await StudentRepository.create(JsonDataRemaked);
        data.push(this.remakeDataResponse(result));
      }

      res.status(200).json({
        data,
      });
    } catch (error) {
      errorHandler(error, res);
    }
  };

  static updateStudents = async (req, res) => {
    try {
      const data = req.body.students;
      const arrayResults = [];

      await Promise.all(
        data.map(async (element) => {
          let result = await StudentRepository.update(element);
          result = this.remakeDataResponse(result);

          arrayResults.push(result);
        })
      );

      timeStamp = new Date();

      res.status(200).json({
        data: arrayResults,
        meta: {
          info: util.getLastUpdate(timeStamp),
        },
      });
    } catch (error) {
      errorHandler(error, res);
    }
  };

  static deleteStudent = async (req, res) => {
    try {
      const id = req.query.id;

      const result = await StudentRepository.delete(id);
      const data = this.remakeDataResponse(result);

      res.status(200).json({
        data,
      });
    } catch (error) {
      errorHandler(error, res);
    }
  };
}
