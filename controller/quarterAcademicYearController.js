import { util } from "../util/util.js";
import academicYear from "../models/academicYearModel.js";
import quarterAcademicYear from "../models/quarterAcademicYearModel.js";

const layout = "../views/layout.ejs";
const styleDir = "../public/styles/";
const pagesDir = "../views/pages/";
const title = "Admin E-Rapor";
const style = styleDir + "style-admin-dashboard.html";
const page = pagesDir + "admin/admin-setting-quarter.ejs";
const pagePath = "Pengaturan / Cawu";

const render = {
  title,
  style,
  page,
  pagePath,
  // data
  data: undefined,
  action: undefined,
  quarterAcademicYear: undefined,
  status: undefined,
  message: undefined,
};

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

  render.data = data;

  res.render(layout, render);
};

const addQuarterAcademicYear = async (req, res) => {
  const result = await quarterAcademicYear.addQuarterAcademicYear(req.body);
  console.log(result);
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

  render.data = data;

  res.render(layout, render);
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

  render.data = data;
  render.result = arrayResult;
  res.render(layout, render);
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

  res.render(layout, render);
};

export default {
  getViewAdminSettingQuarterAcademicYear,
  addQuarterAcademicYear,
  updateQuarterAcademicYear,
  deleteQuarterAcademicYear,
};
