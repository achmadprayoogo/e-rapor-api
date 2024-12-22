import express from "express";
import ScoreController from "../controller/ScoreController.js";

const router = express.Router();

router.get("/admin/score", ScoreController.getScores);
router.post("/admin/score/input", ScoreController.createScore);
router.patch("/admin/score/update", ScoreController.updateScore);
router.delete("/admin/score/delete", ScoreController.deleteScore);

export default router;
