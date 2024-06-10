var express = require("express");
const router = express.Router();

//importing studentController class
const teacherController = require('../controller/teacherController');

router.post('/teacherLoginPage',teacherController.teacher_login_post);
router.get('/teacherLoginPage',teacherController.teacher_login_get);
router.get('/teacherOption',teacherController.teacher_back_option);
router.post('/add',teacherController.teacher_studentAdd_post);
router.get('/add',teacherController.teacher_fetch_get);
router.get('/viewAllStudentData',teacherController.teacher_viewAllData_get);
router.get('/editStudentData/:id',teacherController.teacher_studentDataEdit_get);
router.post('/editStudentData/:id',teacherController.teacher_studentDataEdit_post);
router.get('/delete/:id',teacherController.teacher_deleteStudentData_get);

module.exports = router;