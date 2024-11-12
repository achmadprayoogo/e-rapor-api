import academicYear from "../models/academicYearModel.js";
import gradeClass from "../models/gradeClassModel.js";
import className from "../models/classNameModel.js";

const layout = "../views/layout.ejs";
const style = "../public/styles/";
const pages = "../views/pages/";
let timeStamp;

async function getDataRender() {
  const classNames = await className.getAll();
  const gradeClasses = await gradeClass.getAll();
  const academicYears = await academicYear.getAll();

  // Membuat lookup table untuk academicYears dan gradeClasses
  const academicYearsById = new Map(
    academicYears.map((ay) => [ay.academic_year_id, ay])
  );
  const gradeClassesById = new Map(
    gradeClasses.map((gc) => [gc.grade_class_id, gc])
  );

  // Menambahkan academic_year dan grade_class ke classNames
  classNames.forEach((element) => {
    element.academic_year = academicYearsById.get(
      element.academic_year_id
    ).academic_year;
    element.grade_class = gradeClassesById.get(
      element.grade_class_id
    ).grade_class;
  });

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
  console.log(req.body);
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
      className: "sesion expired",
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
  console.log(req.body);
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
