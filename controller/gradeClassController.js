import { util } from "../util/util.js";
import { academicYear, gradeClass } from "../models/e-raporModels.js";

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
    page: pages + "admin/admin-pengaturan-tingkat.ejs",
    pagePath: "Pengaturan / Tingkat",
    // data
    data,
  });
};

const inputGradeClass = async (req, res) => {
  const result = await gradeClass.inputGradeClass(req.body);
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
    page: pages + "admin/admin-pengaturan-tingkat.ejs",
    pagePath: "Pengaturan / Tingkat",
    // data
    data,
    action: "add",
    gradeClass: result.gradeClass,
    status: result.status,
    message: result.message,
  });
};

export default {
  getViewAdminSettingGradeClass,
  inputGradeClass,
};
