import express from 'express';
import GradeClassController from '../controller/gradeClassController.js';

const router = express.Router();

router.get('/admin/gradeclass', GradeClassController.getGradeClasses);
router.post('/admin/gradeclass/input', GradeClassController.createGradeClass);
router.patch('/admin/gradeclass/update', GradeClassController.updateGradeClass);
router.delete('/admin/gradeclass/delete', GradeClassController.deleteGradeClass);

export default router;
