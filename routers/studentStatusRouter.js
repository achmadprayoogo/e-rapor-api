import express from "express";
import StudentStatusController from "../controller/StudentStatusController.js";

const router = express.Router();

router.get("/admin/studentstatus", StudentStatusController.getStudentStatus);
router.post(
  "/admin/studentstatus/input",
  StudentStatusController.createStudentStatus
);
router.patch(
  "/admin/studentstatus/update",
  StudentStatusController.updateStudentStatus
);
router.delete(
  "/admin/studentstatus/delete",
  StudentStatusController.deleteStudentStatus
);

export default router;
