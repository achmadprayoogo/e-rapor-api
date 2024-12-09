import academicYear from "../models/academicYearModel.js";
import gradeClass from "../models/gradeClassModel.js";
import classMember from "../models/classMemberModel.js";
import className from "../models/classNameModel.js";
import biodata from "../models/biodataModel.js";

const layout = "../views/layout.ejs";
const style = "../public/styles/";
const pages = "../views/pages/";
let timeStamp;

async function getAcademicYearAndGradeClass(arrayData) {
  for (const element of arrayData) {
    element.class_name = await className.getClassNameByID(
      element.class_name_id
    );
    element.grade_class = await gradeClass.findGradeClassById(
      element.class_name.grade_class_id
    );
    element.academic_year = await academicYear.getAcademicYearById(
      element.grade_class.academic_year_id
    );
    element.student = await biodata.getBiodataByNIS(element.nis);
  }
}

async function getDataRender() {
  const gradeClasses = await gradeClass.getAll();
  const academicYears = await academicYear.getAll();
  const classMembers = await classMember.getAll();

  await getAcademicYearAndGradeClass(classMembers);
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
    classMembers,
    gradeClassByAcademicYear,
  };

  return data;
}

const getViewAdminClassMember = async (req, res) => {
  const data = await getDataRender();
  console.log(data);

  res.render(layout, {
    title: "Admin E-Rapor",
    style: style + "style-admin-dashboard.html",
    page: pages + "admin/admin-class-member.ejs",
    pagePath: "Data Kelas",
    // data
    data,
  });
};
export default { getViewAdminClassMember };
