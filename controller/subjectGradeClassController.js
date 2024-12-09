import academicYear from "../models/academicYearModel.js";
import gradeClass from "../models/gradeClassModel.js";
import subjectGradeClass from "../models/subjectGradeClassModel.js";

const layout = "../views/layout.ejs";
const style = "../public/styles/";
const pages = "../views/pages/";
let timeStamp;

async function getAcademicYearAndGradeClass(arrayData) {
  for (const element of arrayData) {
    element.grade_class = await gradeClass.findGradeClassById(
      element.grade_class_id
    );
    element.academic_year = await academicYear.getAcademicYearById(
      element.grade_class.academic_year_id
    );
  }
}

async function getDataRender() {
  const gradeClasses = await gradeClass.getAll();
  const academicYears = await academicYear.getAll();
  const subjectGradeClasses = await subjectGradeClass.getAll();

  await getAcademicYearAndGradeClass(subjectGradeClasses);
  // Mengumpulkan grade_class berdasarkan academic_year
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
    subjectGradeClasses,
    gradeClassByAcademicYear,
  };

  return data;
}

const getViewAdminSettingSubjectGradeClass = async (req, res) => {
  const data = await getDataRender();

  res.render(layout, {
    title: "Admin E-Rapor",
    style: style + "style-admin-dashboard.html",
    page: pages + "admin/admin-setting-subject.ejs",
    pagePath: "Pengaturan / Mapel",
    // data
    data,
  });
};

const inputSubjectGradeClass = async (req, res) => {
  const result = await subjectGradeClass.inputSubjectGradeClass(req.body);
  res.render(layout, {
    title: "Admin E-Rapor",
    style: style + "style-admin-dashboard.html",
    page: pages + "admin/admin-setting-subject.ejs",
    pagePath: "Pengaturan / Mapel",
    // data
    data: await getDataRender(),
    action: "add",
    subjectGradeClassName: result.subjectGradeClassName,
    status: result.status,
    message: result.message,
  });
};

const updateSubjectGradeClass = async (req, res) => {
  const arrayResult = [];
  try {
    let updatedData = req.body.updatedData;
    updatedData = JSON.parse(updatedData);
    updatedData.forEach(async (element) => {
      const result = await subjectGradeClass.updateSubjectGradeClass(element);
      arrayResult.push(result);
    });
  } catch (error) {
    arrayResult.push({
      updatedData: "sesion expired",
      status: "error",
      message: error.message,
    });
  }
  res.render(layout, {
    title: "Admin E-Rapor",
    style: style + "style-admin-dashboard.html",
    page: pages + "admin/admin-setting-subject.ejs",
    pagePath: "Pengaturan / Mapel",
    // data
    data: await getDataRender(),
    action: "update",
    result: arrayResult,
  });
};

const deleteSubjectGradeClass = async (req, res) => {
  const result = await subjectGradeClass.deleteSubjectGradeClass(req.body);

  res.render(layout, {
    title: "Admin E-Rapor",
    style: style + "style-admin-dashboard.html",
    page: pages + "admin/admin-setting-subject.ejs",
    pagePath: "Pengaturan / Mapel",
    // data
    data: await getDataRender(),
    action: "delete",
    subjectGradeClassName: result.subjectGradeClassName,
    status: result.status,
    message: result.message,
  });
};

export default {
  getDataRender,
  getViewAdminSettingSubjectGradeClass,
  inputSubjectGradeClass,
  updateSubjectGradeClass,
  deleteSubjectGradeClass,
};
