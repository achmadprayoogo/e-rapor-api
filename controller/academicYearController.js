import { util } from "../util/util.js";
import academicYear from "../models/academicYearModel.js";

const layout = "../views/layout.ejs";
const style = "../public/styles/";
const pages = "../views/pages/";
let timeStamp;

const getPageAdminSetting = async (req, res) => {
  const data = await academicYear.getAll();

  res.render(layout, {
    title: "Admin E-Rapor",
    style: style + "style-admin-dashboard.html",
    page: pages + "admin/admin-pengaturan-tahunajaran.ejs",
    pagePath: "Pengaturan / Tahun Ajaran",
    /** data */
    academicYears: data,
  });
};

const inputDataAcademicYear = async (req, res) => {
  const data = req.body;
  const result = await academicYear.inputAcademicYear(data);

  res.render(layout, {
    title: "Admin E-Rapor",
    style: style + "style-admin-dashboard.html",
    page: pages + "admin/admin-pengaturan-tahunajaran.ejs",
    pagePath: "Pengaturan / Tahun Ajaran",
    /** data */
    academicYears: await academicYear.getAll(),
    action: "add",
    academicYear: result.academicYear,
    status: result.status,
    message: result.message,
  });
};

const updateAcademicYear = async (req, res) => {
  let data = req.body.updatedData;
  data = JSON.parse(data);
  const arrayResult = [];

  data.forEach(async (element) => {
    const remakedData = {
      academicYearID: element.id,
      academicYear: element.academicYear,
      startDate: util.replaceDateToSystemFormat(element.startDate),
      endDate: util.replaceDateToSystemFormat(element.endDate),
    };
    const result = await academicYear.updateAcademicYear(remakedData);
    arrayResult.push(result);
  });

  res.render(layout, {
    title: "Admin E-Rapor",
    style: style + "style-admin-dashboard.html",
    page: pages + "admin/admin-pengaturan-tahunajaran.ejs",
    pagePath: "Pengaturan / Tahun Ajaran",
    /** data */
    academicYears: await academicYear.getAll(),
    action: "update",
    result: arrayResult,
  });
};

const deleteAcademicYear = async (req, res) => {
  const data = req.body;
  const result = await academicYear.deleteAcademicYear(data); // id as a yearName

  res.render(layout, {
    title: "Admin E-Rapor",
    style: style + "style-admin-dashboard.html",
    page: pages + "admin/admin-pengaturan-tahunajaran.ejs",
    pagePath: "Pengaturan / Tahun Ajaran",
    /** data */
    academicYears: await academicYear.getAll(),
    action: "delete",
    academicYear: result.academicYear,
    status: result.status,
    message: result.message,
  });
};

export default {
  getPageAdminSetting,
  inputDataAcademicYear,
  updateAcademicYear,
  deleteAcademicYear,
};
