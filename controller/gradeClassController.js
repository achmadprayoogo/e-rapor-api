import GradeClassRepository from "../Repositories/GradeClassRepository.js";
import errorHandler from "../Errors/errorHandler.js";
import JsonApi from "../Api/JsonApi.js";

export default class GradeClassController {
  static type = "grade_class";

  static getGradeClasses = async (req, res) => {
    try {
      const results = await GradeClassRepository.getData();
      const data = JsonApi.remakeResponseData(this.type, results);

      res.status(200).json(data);
    } catch (err) {
      errorHandler(res, err);
    }
  };

  static getGradeClassesByAcademicYearId = async (req, res) => {
    const academicYearId = req.params.academic_year_id;

    try {
      const results = await GradeClassRepository.getDataByAcademicYearId(
        academicYearId
      );
      const data = JsonApi.remakeResponseData(this.type, results);

      res.status(200).json(data);
    } catch (err) {
      errorHandler(res, err);
    }
  };

  static createGradeClass = async (req, res) => {
    try {
      const result = await GradeClassRepository.create(req.body);
      const data = JsonApi.remakeResponseData(this.type, result);

      res.status(200).json(data);
    } catch (err) {
      errorHandler(res, err);
    }
  };

  static updateGradeClass = async (req, res) => {
    try {
      const dataUpdates = req.body;
      const results = [];

      for (const data of dataUpdates) {
        const result = await GradeClassRepository.update(data);
        results.push(result);
      }

      const data = JsonApi.remakeResponseData(this.type, results);

      res.status(200).json(data);
    } catch (err) {
      errorHandler(res, err);
    }
  };

  static deleteGradeClass = async (req, res) => {
    try {
      const result = await GradeClassRepository.delete(req.query.id);
      const data = JsonApi.remakeResponseData(this.type, result);

      res.status(200).json(data);
    } catch (err) {
      errorHandler(res, err);
    }
  };
}
