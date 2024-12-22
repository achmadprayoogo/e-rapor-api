import express from 'express';
import SubjectController from '../controller/SubjectController.js';

const router = express.Router();

// Subject Grade Class Routes
router.get('/admin/subject', SubjectController.getSubjects);
router.get('/admin/subject/view', SubjectController.getViewAdminSettingSubjectGradeClass);
router.post('/admin/subject/input', SubjectController.createSubject);
router.patch('/admin/subject/update', SubjectController.updateSubject);
router.delete('/admin/subject/delete', SubjectController.deleteSubject);

export default router;
