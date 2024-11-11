import academicYear from "../models/academicYearModel.js";
import gradeClass from "../models/gradeClassModel.js";

const layout = "../views/layout.ejs";
const style = "../public/styles/";
const pages = "../views/pages/";
let timeStamp;
const getViewAdminSettingGradeClass = async (req, res) => {
  const gradeClasses = await gradeClass.getAll();
  const academicYears = await academicYear.getAll();

  gradeClasses.map((element) => {
    const academicYear = academicYears.find(
      (academicYear) =>
        academicYear.academic_year_id === element.academic_year_id
    );
    element.academic_year = academicYear.academic_year;
  });

  const data = {
    gradeClasses,
    academicYears,
  };

  res.render(layout, {
    title: "Admin E-Rapor",
    style: style + "style-admin-dashboard.html",
    page: pages + "admin/admin-setting-gradeclass.ejs",
    pagePath: "Pengaturan / Tingkat",
    // data
    data,
  });
};

const inputGradeClass = async (req, res) => {
  const result = await gradeClass.addGradeClass(req.body);
  console.log(result);
  const gradeClasses = await gradeClass.getAll();
  const academicYears = await academicYear.getAll();

  gradeClasses.map((element) => {
    const academicYear = academicYears.find(
      (academicYear) =>
        academicYear.academic_year_id === element.academic_year_id
    );
    element.academic_year = academicYear.academic_year;
  });

  const data = {
    gradeClasses,
    academicYears,
  };

  res.render(layout, {
    title: "Admin E-Rapor",
    style: style + "style-admin-dashboard.html",
    page: pages + "admin/admin-setting-gradeclass.ejs",
    pagePath: "Pengaturan / Tingkat",
    // data
    data,
    action: "add",
    gradeClass: result.gradeClass,
    status: result.status,
    message: result.message,
  });
};

const updateGradeClass = async (req, res) => {
  let updatedData = req.body.updatedData;
  updatedData = JSON.parse(updatedData);
  const arrayResult = [];

  updatedData.forEach(async (element) => {
    const result = await gradeClass.updateGradeClass(element);

    arrayResult.push(result);
  });

  const gradeClasses = await gradeClass.getAll();
  const academicYears = await academicYear.getAll();

  gradeClasses.map((element) => {
    const academicYear = academicYears.find(
      (academicYear) =>
        academicYear.academic_year_id === element.academic_year_id
    );
    element.academic_year = academicYear.academic_year;
  });

  const data = {
    gradeClasses,
    academicYears,
  };

  res.render(layout, {
    title: "Admin E-Rapor",
    style: style + "style-admin-dashboard.html",
    page: pages + "admin/admin-setting-gradeclass.ejs",
    pagePath: "Pengaturan / Tingkat",
    // data
    data,
    action: "update",
    result: arrayResult,
  });
};
const deleteGradeClass = async (req, res) => {
  const result = await gradeClass.deleteGradeClass(req.body);
  console.log(result);
  const gradeClasses = await gradeClass.getAll();
  const academicYears = await academicYear.getAll();

  gradeClasses.map((element) => {
    const academicYear = academicYears.find(
      (academicYear) =>
        academicYear.academic_year_id === element.academic_year_id
    );
    element.academic_year = academicYear.academic_year;
  });

  const data = {
    gradeClasses,
    academicYears,
  };

  res.render(layout, {
    title: "Admin E-Rapor",
    style: style + "style-admin-dashboard.html",
    page: pages + "admin/admin-setting-gradeclass.ejs",
    pagePath: "Pengaturan / Tingkat",
    // data
    data,
    action: "delete",
    gradeClass: result.gradeClass,
    status: result.status,
    message: result.message,
  });
};

export default {
  getViewAdminSettingGradeClass,
  inputGradeClass,
  updateGradeClass,
  deleteGradeClass,
};
