import { util } from "../util/util.js";
import { academicYear, quarterAcademicYear } from "../models/e-raporModels.js";

const layout = "../views/layout.ejs";
const style = "../public/styles/";
const pages = "../views/pages/";
let timeStamp;

const getViewAdminSettingQuarterAcademicYear = async (req, res) => {
  const quarterAcademicYears = await quarterAcademicYear.getAll();
  const academicYears = await academicYear.getAll();

  quarterAcademicYears.map((element) => {
    const academicYear = academicYears.find(
      (academicYear) =>
        academicYear.academic_year_id === element.academic_year_id
    );
    element.academic_year = academicYear.academic_year;
  });

  const data = {
    quarterAcademicYears,
    academicYears,
  };

  res.render(layout, {
    title: "Admin E-Rapor",
    style: style + "style-admin-dashboard.html",
    page: pages + "admin/admin-setting-quarter.ejs",
    pagePath: "Pengaturan / Cawu",
    // data
    data,
  });
};

const addQuarterAcademicYear = async (req, res) => {
  const result = await quarterAcademicYear.addQuarterAcademicYear(req.body);
  const quarterAcademicYears = await quarterAcademicYear.getAll();
  const academicYears = await academicYear.getAll();

  quarterAcademicYears.map((element) => {
    const academicYear = academicYears.find(
      (academicYear) =>
        academicYear.academic_year_id === element.academic_year_id
    );
    element.academic_year = academicYear.academic_year;
  });

  const data = {
    quarterAcademicYears,
    academicYears,
  };

  res.render(layout, {
    title: "Admin E-Rapor",
    style: style + "style-admin-dashboard.html",
    page: pages + "admin/admin-setting-quarter.ejs",
    pagePath: "Pengaturan / Cawu",
    // data
    data,
    action: "add",
    quarterAcademicYear: result.quarterAcademicYear,
    status: result.status,
    message: result.message,
  });
};

const updateQuarterAcademicYear = async (req, res) => {
  let updatedData = req.body.updatedData;
  updatedData = JSON.parse(updatedData);
  const arrayResult = [];

  updatedData.forEach(async (element) => {
    const remakedData = {
      id: element.id,
      quarterCount: parseInt(element.quarterCount),
      startDate: util.replaceDateToSystemFormat(element.startDate),
      endDate: util.replaceDateToSystemFormat(element.endDate),
    };
    const result = await quarterAcademicYear.updateQuarterAcademicYear(
      remakedData
    );

    arrayResult.push(result);
  });

  const quarterAcademicYears = await quarterAcademicYear.getAll();
  const academicYears = await academicYear.getAll();

  quarterAcademicYears.map((element) => {
    const academicYear = academicYears.find(
      (academicYear) =>
        academicYear.academic_year_id === element.academic_year_id
    );
    element.academic_year = academicYear.academic_year;
  });

  const data = {
    quarterAcademicYears,
    academicYears,
  };

  res.render(layout, {
    title: "Admin E-Rapor",
    style: style + "style-admin-dashboard.html",
    page: pages + "admin/admin-setting-quarter.ejs",
    pagePath: "Pengaturan / Cawu",
    // data
    data,
    action: "update",
    result: arrayResult,
  });
};

const deleteQuarterAcademicYear = async (req, res) => {
  const result = await quarterAcademicYear.deleteQuarterAcademicYear(req.body);

  const quarterAcademicYears = await quarterAcademicYear.getAll();
  const academicYears = await academicYear.getAll();

  quarterAcademicYears.map((element) => {
    const academicYear = academicYears.find(
      (academicYear) =>
        academicYear.academic_year_id === element.academic_year_id
    );
    element.academic_year = academicYear.academic_year;
  });

  const data = {
    quarterAcademicYears,
    academicYears,
  };

  res.render(layout, {
    title: "Admin E-Rapor",
    style: style + "style-admin-dashboard.html",
    page: pages + "admin/admin-setting-quarter.ejs",
    pagePath: "Pengaturan / Cawu",
    // data
    data,
    action: "delete",
    quarterAcademicYear: result.quarterAcademicYear,
    status: result.status,
    message: result.message,
  });
};

export default {
  getViewAdminSettingQuarterAcademicYear,
  addQuarterAcademicYear,
  updateQuarterAcademicYear,
  deleteQuarterAcademicYear,
};
