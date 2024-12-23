import express from "express";
import SubjectController from "../controller/SubjectController.js";

const router = express.Router();

// Subject Grade Class Routes
router.get("/api/admin/subject", SubjectController.getSubjects);
router.get(
  "/api/admin/subject/view",
  SubjectController.getViewAdminSettingSubjectGradeClass
);
router.post("/api/admin/subject/input", SubjectController.createSubject);
router.patch("/api/admin/subject/update", SubjectController.updateSubject);
router.delete("/api/admin/subject/delete", SubjectController.deleteSubject);

export default router;
