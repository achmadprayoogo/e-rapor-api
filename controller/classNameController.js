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
      errorHandler(res, err);
    }
  };

  static createClassName = async (req, res) => {
    try {
      const result = await ClassNameRepository.create(req.body);
      const data = JsonApi.remakeResponseData(this.type, result);

      res.status(200).json(data);
    } catch (err) {
      errorHandler(res, err);
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
      errorHandler(res, err);
    }
  };

  static deleteClassName = async (req, res) => {
    try {
      const result = await ClassNameRepository.delete(req.query.id);
      const data = JsonApi.remakeResponseData(this.type, result);

      res.status(200).json(data);
    } catch (err) {
      errorHandler(res, err);
    }
  };
}
