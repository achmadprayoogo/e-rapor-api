import academicYear from "../models/academicYearModel.js";
import gradeClass from "../models/gradeClassModel.js";
import className from "../models/classNameModel.js";

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
  let classNames = await className.getAll();
  const gradeClasses = await gradeClass.getAll();
  const academicYears = await academicYear.getAll();

  await getAcademicYearAndGradeClass(classNames);

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
    classNames,
    gradeClassByAcademicYear,
  };

  return data;
}

const getViewAdminSettingClassName = async (req, res) => {
  const data = await getDataRender();

  res.render(layout, {
    title: "Admin E-Rapor",
    style: style + "style-admin-dashboard.html",
    page: pages + "admin/admin-setting-class-name.ejs",
    pagePath: "Pengaturan / Kelas",
    // data
    data,
  });
};

const inputClassName = async (req, res) => {
  const result = await className.addClassName(req.body);

  res.render(layout, {
    title: "Admin E-Rapor",
    style: style + "style-admin-dashboard.html",
    page: pages + "admin/admin-setting-class-name.ejs",
    pagePath: "Pengaturan / Kelas",
    // data
    data: await getDataRender(),
    action: "add",
    className: result.className,
    status: result.status,
    message: result.message,
  });
};

const updateClassName = async (req, res) => {
  const arrayResult = [];
  try {
    let updatedData = req.body.updatedData;
    updatedData = JSON.parse(updatedData);
    updatedData.forEach(async (element) => {
      const result = await className.updateClassName(element);
      arrayResult.push(result);
    });
    console.log(updatedData);
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
    page: pages + "admin/admin-setting-class-name.ejs",
    pagePath: "Pengaturan / Kelas",
    // data
    data: await getDataRender(),
    action: "update",
    result: arrayResult,
  });
};

const deleteClassName = async (req, res) => {
  const result = await className.deleteClassName(req.body);

  res.render(layout, {
    title: "Admin E-Rapor",
    style: style + "style-admin-dashboard.html",
    page: pages + "admin/admin-setting-class-name.ejs",
    pagePath: "Pengaturan / Kelas",
    // data
    data: await getDataRender(),
    action: "delete",
    className: result.className,
    status: result.status,
    message: result.message,
  });
};

export default {
  getViewAdminSettingClassName,
  inputClassName,
  updateClassName,
  deleteClassName,
};
