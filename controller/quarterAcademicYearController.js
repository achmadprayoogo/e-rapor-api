import QuarterAcademicYearRepository from "../Repositories/QuarterAcademicYearRepository.js";
import errorHandler from "../Errors/errorHandler.js";
import JsonApi from "../Api/JsonApi.js";

export default class QuarterAcademicYearController {
  static type = "quarter_academic_year";

  static getQuarterAcademicYears = async (req, res) => {
    try {
      const results = await QuarterAcademicYearRepository.getData();
      const data = JsonApi.remakeResponseData(this.type, results);

      res.status(200).json(data);
    } catch (err) {
      errorHandler(res, err);
    }
  };

  static createQuarterAcademicYear = async (req, res) => {
    try {
      const result = await QuarterAcademicYearRepository.create(req.body);
      const data = JsonApi.remakeResponseData(this.type, result);

      res.status(200).json(data);
    } catch (err) {
      errorHandler(res, err);
    }
  };

  static updateQuarterAcademicYears = async (req, res) => {
    try {
      const dataUpdates = req.body;
      const results = [];

      for (const data of dataUpdates) {
        const result = await QuarterAcademicYearRepository.update(data);
        results.push(result);
      }

      const data = JsonApi.remakeResponseData(this.type, results);

      res.status(200).json(data);
    } catch (err) {
      errorHandler(res, err);
    }
  };

  static deleteQuarterAcademicYear = async (req, res) => {
    try {
      const result = await QuarterAcademicYearRepository.delete(req.query.id);
      const data = JsonApi.remakeResponseData(this.type, result);

      res.status(200).json(data);
    } catch (err) {
      errorHandler(res, err);
    }
  };
}
