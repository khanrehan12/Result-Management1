var express = require("express");
const router = express.Router();

//importing studentController class
const studentController = require('../controller/studentController');

router.get('/login',studentController.student_login_get);
router.post('/login',studentController.student_login_post);

module.exports = router;