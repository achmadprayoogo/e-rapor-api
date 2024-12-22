import academicYear from "../Repositories/AcademicYearRepository.js";
import gradeClass from "../Repositories/gradeClassModel.js";
import classMember from "../Repositories/classMemberModel.js";
import className from "../Repositories/classNameModel.js";
import biodata from "../Repositories/StudentRepository.js";

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
  const classNames = await className.getAll();

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

  gradeClassByAcademicYear.forEach((element) => {
    element.gradeClass.forEach((gradeClass) => {
      const filteredClassNames = classNames
        .filter((cn) => cn.grade_class_id === gradeClass.gradeClassId)
        .map((cn) => ({
          classNameId: cn.class_name_id,
          className: cn.class_name,
          homeroomTeacher: cn.homeroom_teacher,
        }));

      //console.log(filteredClassNames);
      gradeClass.className = filteredClassNames;
    });
  });

  const data = {
    gradeClassByAcademicYear,
  };

  return data;
}

const getViewAdminClassMember = async (req, res) => {
  const data = await getDataRender();

  res.status(200).json({
    data: {
      type: "classMembers",
      attributes: {
        gradeClassByAcademicYear: data.gradeClassByAcademicYear,
      },
    },
  });
};

const getPreviewAdminClassMember = async (req, res) => {
  const data = await getDataRender();

  res.status(200).json({
    data: {
      type: "classMembers",
      attributes: {
        gradeClassByAcademicYear: data.gradeClassByAcademicYear,
      },
    },
  });
};

export default { getViewAdminClassMember };
