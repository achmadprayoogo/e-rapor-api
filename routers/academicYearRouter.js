import express from "express";
import AcademicYearController from "../controller/AcademicYearController.js";

const router = express.Router();

router.get("/api/admin/academicyear", AcademicYearController.getAcademicYears);
router.post(
  "/api/admin/academicyear/input",
  AcademicYearController.createAcademicYear
);
router.patch(
  "/api/admin/academicyear/update",
  AcademicYearController.updateAcademicYears
);
router.delete(
  "/api/admin/academicyear/delete",
  AcademicYearController.deleteAcademicYear
);

export default router;
