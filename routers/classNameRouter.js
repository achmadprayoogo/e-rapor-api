import express from "express";
import classNameController from "../controller/classNameController.js";

const router = express.Router();

// Class Name
router.get("/api/admin/classname", classNameController.getClassNames);
router.get(
  "/api/admin/classname/:grade_class_id",
  classNameController.getClassNamesByGradeClassId
);
router.get(
  "/api/admin/classname/find/:class_name_id",
  classNameController.getClassNamesById
);
router.post("/api/admin/classname/input", classNameController.createClassName);
router.patch(
  "/api/admin/classname/update",
  classNameController.updateClassName
);
router.delete(
  "/api/admin/classname/delete",
  classNameController.deleteClassName
);

export default router;
