import express from 'express';
import classNameController from '../controller/classNameController.js';

const router = express.Router();

// Class Name
router.get('/admin/classname', classNameController.getClassNames);
router.post('/admin/classname/input', classNameController.createClassName);
router.patch('/admin/classname/update', classNameController.updateClassName);
router.delete('/admin/classname/delete', classNameController.deleteClassName);

export default router;
