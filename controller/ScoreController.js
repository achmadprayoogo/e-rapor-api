import ScoreRepository from "../Repositories/ScoreRepository.js";
import JsonApi from "../Api/JsonApi.js";
import errorHandler from "../Errors/errorHandler.js";

export default class ScoreController {
  static type = "score";

  static getScores = async (req, res) => {
    try {
      const results = await ScoreRepository.getData();
      const data = JsonApi.remakeResponseData(this.type, results);
      res.status(200).json(data);
    } catch (err) {
      errorHandler(res, err);
    }
  };

  static createScore = async (req, res) => {
    try {
      const result = await ScoreRepository.create(req.body);
      const data = JsonApi.remakeResponseData(this.type, result);
      res.status(200).json(data);
    } catch (err) {
      errorHandler(res, err);
    }
  };

  static updateScore = async (req, res) => {
    try {
      const dataUpdates = req.body;
      const results = [];
      for (const data of dataUpdates) {
        const result = await ScoreRepository.update(data);
        results.push(result);
      }
      const data = JsonApi.remakeResponseData(this.type, results);
      res.status(200).json(data);
    } catch (err) {
      errorHandler(res, err);
    }
  };

  static deleteScore = async (req, res) => {
    try {
      const result = await ScoreRepository.delete(req.query.id);
      const data = JsonApi.remakeResponseData(this.type, result);
      res.status(200).json(data);
    } catch (err) {
      errorHandler(res, err);
    }
  };
}
