import StudentStatusRepository from "../Repositories/StudentStatusRepository.js";
import JsonApi from "../Api/JsonApi.js";
import errorHandler from "../Errors/errorHandler.js";

export default class StudentStatusController {
  static type = "student_status";

  static getStudentStatus = async (req, res) => {
    try {
      const results = await StudentStatusRepository.getData();
      const data = JsonApi.remakeResponseData(this.type, results);
      res.status(200).json(data);
    } catch (err) {
      errorHandler(res, err);
    }
  };

  static createStudentStatus = async (req, res) => {
    try {
      const result = await StudentStatusRepository.setStatus(req.body);
      const data = JsonApi.remakeResponseData(this.type, result);
      res.status(200).json(data);
    } catch (err) {
      errorHandler(res, err);
    }
  };

  static updateStudentStatus = async (req, res) => {
    try {
      const dataUpdates = req.body;
      const results = [];

      for (const data of dataUpdates) {
        const result = await StudentStatusRepository.update(data);
        results.push(result);
      }

      const data = JsonApi.remakeResponseData(this.type, results);

      res.status(200).json(data);
    } catch (err) {
      errorHandler(res, err);
    }
  };

  static deleteStudentStatus = async (req, res) => {
    try {
      const result = await StudentStatusRepository.delete(req.query.id);
      const data = JsonApi.remakeResponseData(this.type, result);
      res.status(200).json(data);
    } catch (err) {
      errorHandler(res, err);
    }
  };
}
