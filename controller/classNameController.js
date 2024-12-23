import ClassNameRepository from "../Repositories/ClassNameRepository.js";
import errorHandler from "../Errors/errorHandler.js";
import JsonApi from "../Api/JsonApi.js";

export default class ClassNameController {
  static type = "class_name";

  static getClassNames = async (req, res) => {
    try {
      const results = await ClassNameRepository.getData();
      const data = JsonApi.remakeResponseData(this.type, results);

      res.status(200).json(data);
    } catch (err) {
      errorHandler(err, res);
    }
  };

  static getClassNamesById = async (req, res) => {
    const id = req.params.class_name_id;

    try {
      const results = await ClassNameRepository.findById(id);
      const data = JsonApi.remakeResponseData(this.type, results);

      res.status(200).json(data);
    } catch (err) {
      errorHandler(err, res);
    }
  };

  static getClassNamesByGradeClassId = async (req, res) => {
    const gradeClassId = req.params.grade_class_id;

    try {
      const results = await ClassNameRepository.getClaassNameByGradeClassId(
        gradeClassId
      );
      const data = JsonApi.remakeResponseData(this.type, results);

      res.status(200).json(data);
    } catch (err) {
      errorHandler(err, res);
    }
  };

  static createClassName = async (req, res) => {
    try {
      const result = await ClassNameRepository.create(req.body);
      const data = JsonApi.remakeResponseData(this.type, result);

      res.status(200).json(data);
    } catch (err) {
      errorHandler(err, res);
    }
  };

  static updateClassName = async (req, res) => {
    try {
      const dataUpdates = req.body;
      const results = [];

      for (const data of dataUpdates) {
        const result = await ClassNameRepository.update(data);
        results.push(result);
      }

      const data = JsonApi.remakeResponseData(this.type, results);

      res.status(200).json(data);
    } catch (err) {
      errorHandler(err, res);
    }
  };

  static deleteClassName = async (req, res) => {
    try {
      const result = await ClassNameRepository.delete(req.query.id);
      const data = JsonApi.remakeResponseData(this.type, result);

      res.status(200).json(data);
    } catch (err) {
      errorHandler(err, res);
    }
  };
}
