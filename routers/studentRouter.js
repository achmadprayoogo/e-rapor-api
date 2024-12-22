import express from "express";
import multer from "multer";
import StudentController from "../controller/StudentController.js";
import StudentRouterValidator from "../validators/router-validator/StudentRouterValidator.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get(
  "/api/admin/students",
  StudentRouterValidator.getValidator(),
  StudentController.getStudents
);
router.post(
  "/api/admin/students/input",
  StudentRouterValidator.inputValidator(),
  StudentController.createStudent
);
router.post(
  "/api/admin/students/import",
  upload.single("file"),
  StudentRouterValidator.importValidator(),
  StudentController.importStudents
);
router.patch(
  "/api/admin/students/update",
  StudentRouterValidator.updateValidator(),
  StudentController.updateStudents
);
router.delete(
  "/api/admin/students/delete",
  StudentRouterValidator.deleteValidator(),
  StudentController.deleteStudent
);

export default router;
