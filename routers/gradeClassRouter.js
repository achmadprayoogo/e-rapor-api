import express from "express";
import GradeClassController from "../controller/gradeClassController.js";

const router = express.Router();

router.get("/api/admin/gradeclass", GradeClassController.getGradeClasses);
router.get(
  "/api/admin/gradeclass/:academic_year_id",
  GradeClassController.getGradeClassesByAcademicYearId
);
router.post(
  "/api/admin/gradeclass/input",
  GradeClassController.createGradeClass
);
router.patch(
  "/api/admin/gradeclass/update",
  GradeClassController.updateGradeClass
);
router.delete(
  "/api/admin/gradeclass/delete",
  GradeClassController.deleteGradeClass
);

export default router;
