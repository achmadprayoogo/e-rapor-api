import AcademicYearRepository from "../Repositories/AcademicYearRepository.js";
import errorHandler from "../Errors/errorHandler.js";
import JsonApi from "../Api/JsonApi.js";

export default class AcademicYearController {
  static type = "academic_year";

  static remakeResponseData(data) {
    return {
      type: "academic_year",
      id: data.id,
      attributes: {
        ...data,
        id: undefined,
      },
    };
  }

  static getAcademicYears = async (req, res) => {
    try {
      const results = await AcademicYearRepository.getData();

      const data = JsonApi.remakeResponseData(this.type, results);

      res.status(200).json(data);
    } catch (err) {
      errorHandler(err, req, res);
    }
  };

  static createAcademicYear = async (req, res) => {
    try {
      const result = await AcademicYearRepository.create(req.body);
      const data = JsonApi.remakeResponseData(this.type, result);

      res.status(200).json(data);
    } catch (err) {
      errorHandler(res, err);
    }
  };

  static updateAcademicYears = async (req, res) => {
    try {
      const dataUpdates = req.body;
      const results = [];

      for (const data of dataUpdates) {
        const result = await AcademicYearRepository.update(data);
        results.push(result);
      }

      const data = JsonApi.remakeResponseData(this.type, results);

      res.status(200).json(data);
    } catch (err) {
      errorHandler(res, err);
    }
  };

  static deleteAcademicYear = async (req, res) => {
    try {
      const result = await AcademicYearRepository.delete(req.query.id);
      const data = JsonApi.remakeResponseData(this.type, result);

      res.status(200).json(data);
    } catch (err) {
      errorHandler(res, err);
    }
  };
}
