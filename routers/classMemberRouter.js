import express from "express";
import ClassMemberController from "../controller/classMemberController.js";

const router = express.Router();

router.get("/admin/classmember", ClassMemberController.getClassMembers);
router.post("/admin/classmember/join", ClassMemberController.joinClassMember);
router.patch(
  "/admin/classmember/update",
  ClassMemberController.updateClassMember
);
router.delete(
  "/admin/classmember/delete",
  ClassMemberController.deleteClassMember
);

export default router;
