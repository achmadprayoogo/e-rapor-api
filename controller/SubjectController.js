import SubjectRepository from "../Repositories/SubjectRepository.js";
import errorHandler from "../Errors/errorHandler.js";
import JsonApi from "../Api/JsonApi.js";
import academicYear from "../Repositories/AcademicYearRepository.js";
import gradeClass from "../Repositories/GradeClassRepository.js";

export default class SubjectController {
  static type = "subject";

  static async getAcademicYearAndGradeClass(arrayData) {
    for (const element of arrayData) {
      element.grade_class = await gradeClass.findGradeClassById(
        element.grade_class_id
      );
      element.academic_year = await academicYear.getAcademicYearById(
        element.grade_class.academic_year_id
      );
    }
  }

  static async getDataRender() {
    try {
      const gradeClasses = await gradeClass.getData();
      const academicYears = await academicYear.getData();
      const subjects = await SubjectRepository.getData();

      await this.getAcademicYearAndGradeClass(subjects);

      const gradeClassByAcademicYear = academicYears.map((element) => {
        const filteredGradeClasses = gradeClasses
          .filter((gc) => gc.academic_year_id === element.academic_year_id)
          .map((gc) => ({
            gradeClassId: gc.grade_class_id,
            gradeClassName: gc.grade_class,
          }));

        return {
          academicYearId: element.academic_year_id,
          academicYear: element.academic_year,
          gradeClass: filteredGradeClasses,
        };
      });

      const data = {
        subjects,
        gradeClassByAcademicYear,
      };

      return data;
    } catch (err) {
      errorHandler(err);
    }
  }

  static getViewAdminSettingSubjectGradeClass = async (req, res) => {
    try {
      const results = await SubjectRepository.getData();
      await this.getAcademicYearAndGradeClass(results);
      const data = JsonApi.remakeResponseData(this.type, results);

      res.status(200).json(data);
    } catch (err) {
      errorHandler(res, err);
    }
  };

  static getSubjects = async (req, res) => {
    try {
      const data = await SubjectRepository.getData();
      const dataResponse = JsonApi.remakeResponseData(this.type, data);

      res.status(200).json(dataResponse);
    } catch (err) {
      errorHandler(res, err);
    }
  };

  static createSubject = async (req, res) => {
    try {
      const result = await SubjectRepository.create(req.body);
      const data = JsonApi.remakeResponseData(this.type, result);

      res.status(200).json(data);
    } catch (err) {
      errorHandler(res, err);
    }
  };

  static updateSubject = async (req, res) => {
    try {
      const dataUpdates = req.body;
      const results = [];

      for (const data of dataUpdates) {
        const result = await SubjectRepository.update(data);
        results.push(result);
      }

      const data = JsonApi.remakeResponseData(this.type, results);

      res.status(200).json(data);
    } catch (err) {
      errorHandler(res, err);
    }
  };

  static deleteSubject = async (req, res) => {
    console.log(req.query.id);
    try {
      const result = await SubjectRepository.delete(req.query.id);
      const data = JsonApi.remakeResponseData(this.type, result);

      res.status(200).json(data);
    } catch (err) {
      errorHandler(res, err);
    }
  };
}
