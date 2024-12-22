import express from 'express';
import QuarterAcademicYearController from '../controller/quarterAcademicYearController.js';

const router = express.Router();

// Quarter Academic Year
router.get('/admin/quarteracademicyear', QuarterAcademicYearController.getQuarterAcademicYears);
router.post('/admin/quarteracademicyear/input', QuarterAcademicYearController.createQuarterAcademicYear);
router.patch('/admin/quarteracademicyear/update', QuarterAcademicYearController.updateQuarterAcademicYears);
router.delete('/admin/quarteracademicyear/delete', QuarterAcademicYearController.deleteQuarterAcademicYear);

export default router;
