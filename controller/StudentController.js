import { util } from "../util/util.js";
import errorHandler from "../Errors/errorHandler.js";
import StudentRepository from "../Repositories/StudentRepository.js";
import JsonApi from "../Api/JsonApi.js";

let timeStamp;

export default class StudentController {
  static type = "student";

  static getStudents = async (req, res) => {
    const pageNumber = parseInt(req.query.page.number);
    const pageSize = parseInt(req.query.page.size);
    const offsite = (pageNumber - 1) * pageSize;
    const search = req.query.search;
    const sortBy = req.query.sort;

    const pagingation = {
      take: pageSize,
      skip: offsite,
    };

    try {
      let data;
      let total;
      let query = "";
      const sortQuery = "sort[by]=" + (sortBy.by || "") + "&sort[order]=" + (sortBy.order || ""); // prettier-ignore

      if (search) {
        console.log("search query", search, "academic year", req.query.filter); ///////////////////////////////
        const result = await this.getStudentsBySearchQuery(
          pagingation,
          search,
          req.query.filter.academic_year_id
        );
        console.log("result", result.data.length, result.data[0]); ///////////////////////////////

        data = result.data;
        total = result.total;
        query = "search=" + search + "&" + sortQuery;
      } else if (req.query.filter && req.query.filter.academic_year_id) {
        console.log(
          "filter academic year id",
          req.query.filter.academic_year_id
        ); ///////////////////////////////
        const result = await this.getStudentsByAcademicYearId(
          pagingation,
          sortBy,
          req.query.filter.academic_year_id
        );

        data = result.data;
        total = result.total;
        query = sortQuery + "&filter[academic_year_id]=" + req.query.filter.academic_year_id; // prettier-ignore
      } else {
        console.log("get all data"); ///////////////////////////////
        data = await StudentRepository.getDataAll(pagingation, sortBy);
        console.log("data", data.length, data[0]); ///////////////////////////////
        total = await StudentRepository.getTotalAll();
        query = sortQuery;
        console.log("query", query); ///////////////////////////////
      }

      const baseUrl = req.protocol + "://" + req.get("host");
      const routePath = req.route.path;
      const pathUrl = baseUrl + routePath;
      const originalUrl = req.originalUrl;

      const nextPage = pageNumber + 1;
      const prevPage = pageNumber - 1;
      const lastPage = Math.ceil(total / pageSize);

      res.status(200).json({
        links: {
          self: baseUrl + originalUrl,
          first: `${pathUrl}?${query}&page[number]=1&page[size]=${pageSize}`,
          prev:  pageNumber > 1 ? `${pathUrl}?${query}&page[number]=${prevPage}&page[size]=${pageSize}`: null, // prettier-ignore
          next:  offsite + pageSize < total ? `${pathUrl}?${query}&page[number]=${nextPage}&page[size]=${pageSize}`: null, // prettier-ignore
          last: `${pathUrl}?${query}&page[number]=${lastPage}&page[size]=${pageSize}&${query}`,
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
      errorHandler(error, req, res);
    }
  };

  static async getStudentsByAcademicYearId(
    pagingation,
    sortBy,
    academicYearId
  ) {
    const data = await StudentRepository.getDataContainAcademicYearId(
      pagingation,
      sortBy,
      academicYearId
    );
    const total = await StudentRepository.getTotalAllDataContainAcademicYearId(
      academicYearId
    );

    return {
      data,
      total,
    };
  }

  static async getStudentsBySearchQuery(
    pagingation,
    searchQuery,
    academicYearId
  ) {
    const data = await StudentRepository.getDataSearch(
      pagingation,
      searchQuery,
      academicYearId
    );
    const total = await StudentRepository.getTotalDataSearch(searchQuery);
    return {
      data,
      total,
    };
  }

  static getStudentById = async (req, res) => {
    try {
      const id = req.params.id;
      const result = await StudentRepository.findById(id);

      res.status(200).json({
        data: JsonApi.remakeResponseData(this.type, result),
      });
    } catch (error) {
      errorHandler(error, res, req);
    }
  };

  static createStudent = async (req, res) => {
    try {
      const student = this.remakeDataRequest(req.body);
      const result = await StudentRepository.create(student);
      const data = JsonApi.remakeResponseData(this.type, result);
      res.status(201).json({
        data,
      });
    } catch (error) {
      errorHandler(error, res, req);
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
      errorHandler(error, res, req);
    }
  };

  static updateStudents = async (req, res) => {
    try {
      let result = await StudentRepository.update(req.body);
      result = this.remakeDataResponse(result);

      timeStamp = new Date();

      res.status(200).json({
        data: result,
        meta: {
          info: util.getLastUpdate(timeStamp),
        },
      });
    } catch (error) {
      errorHandler(error, res, req);
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
      errorHandler(error, res, req);
    }
  };
}
