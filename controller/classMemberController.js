import ClassMemberRepository from "../Repositories/ClassMemberRepository.js";
import JsonApi from "../Api/JsonApi.js";
import errorHandler from "../Errors/errorHandler.js";

export default class ClassMemberController {
  static type = "class_member";

  static getClassMembers = async (req, res) => {
    try {
      const result = await ClassMemberRepository.getData();
      const data = JsonApi.remakeResponseData(this.type, result);

      res.status(200).json(data);
    } catch (error) {
      errorHandler(res, error);
    }
  };

  static joinClassMember = async (req, res) => {
    try {
      const result = await ClassMemberRepository.create(req.body);
      const data = JsonApi.remakeResponseData(this.type, result);

      res.status(200).json(data);
    } catch (error) {
      errorHandler(res, error);
    }
  };

  static updateClassMember = async (req, res) => {
    try {
      const dataUpdates = req.body;
      const results = [];

      for (const data of dataUpdates) {
        const result = await ClassMemberRepository.update(data);
        results.push(result);
      }

      const data = JsonApi.remakeResponseData(this.type, results);

      res.status(200).json(data);
    } catch (error) {
      errorHandler(res, error);
    }
  };

  static deleteClassMember = async (req, res) => {
    try {
      const result = await ClassMemberRepository.delete(req.query.id);
      const data = JsonApi.remakeResponseData(this.type, result);

      res.status(200).json(data);
    } catch (error) {
      errorHandler(res, error);
    }
  };
}
