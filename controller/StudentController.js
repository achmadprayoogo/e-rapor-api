import { util } from "../util/util.js";
import errorHandler from "../Errors/errorHandler.js";
import StudentRepository from "../Repositories/StudentRepository.js";
import JsonApi from "../Api/JsonApi.js";

let timeStamp;

export default class StudentController {
  static type = "student";

  static getStudents = async (req, res) => {
    const searchQuery = req.query.search;
    const pageNumber = parseInt(req.query.page.number);
    const pageSize = parseInt(req.query.page.size);
    const offsite = (pageNumber - 1) * pageSize;

    const pagingation = {
      take: pageSize,
      skip: offsite,
    };

    try {
      if (searchQuery) {
        await this.getStudentsBySearchQuery(req, res);
        return;
      }
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

  static async getStudentsBySearchQuery(req, res) {
    const pageNumber = parseInt(req.query.page.number);
    const pageSize = parseInt(req.query.page.size);
    const offsite = (pageNumber - 1) * pageSize;
    const searchQuery = req.query.search.toLowerCase();

    const pagingation = {
      take: pageSize,
      skip: offsite,
    };

    const data = await StudentRepository.getDataSearch(
      pagingation,
      searchQuery
    );
    const total = await StudentRepository.getTotalDataSearch(searchQuery);

    const protocol = req.protocol;
    const host = req.get("host");
    const originalUrl = req.originalUrl;
    const routePath = req.route.path;

    const self = `${protocol}://${host}${originalUrl}`;
    const first = `${protocol}://${host}${routePath}?page[number]=1&page[size]=${pageSize}&search=${searchQuery}`;
    const prev =
      pageNumber > 1
        ? `${req.protocol}://${host}${routePath}?page[number]=${
            pageNumber - 1
          }&page[size]=${pageSize}&search=${searchQuery}`
        : null;
    const next =
      offsite + pageSize < total
        ? `${req.protocol}://${host}${routePath}?page[number]=${
            pageNumber + 1
          }&page[size]=${pageSize}&search=${searchQuery}`
        : null;
    const last = `${
      req.protocol
    }://${host}${routePath}?page[number]=${Math.ceil(
      total / pageSize
    )}&page[size]=${pageSize}&search=${searchQuery}`;

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
  }

  static getStudentById = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await StudentRepository.findById(id);

      res.status(200).json({
        data: JsonApi.remakeResponseData(this.type, result),
      });
    } catch (error) {
      errorHandler(error, res);
    }
  };

  static createStudent = async (req, res) => {
    try {
      const student = this.remakeDataRequest(req.body);
      const result = await StudentRepository.create(student);
      const data = JsonApi.remakeResponseData(result);
      res.status(201).json({
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
      const data = req.body;
      let result = await StudentRepository.update(data);
      result = this.remakeDataResponse(result);

      timeStamp = new Date();

      res.status(200).json({
        data: result,
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
