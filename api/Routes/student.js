const express = require('express');

const router = express.Router();
const studentCtrl = require('../controllers/studentController');


router.post('/register', (req, res, next) => {
  studentCtrl.createStudent(req, res, next);
});

router.post('/getStudent', (req, res, next) => {
    studentCtrl.getAllStudents(req, res, next);
    }
);

router.post('/updateStudent', (req, res, next) => {
    studentCtrl.updateStudent(req, res, next);
    }
);

router.post('/getStudentById', (req, res, next) => {
    studentCtrl.getStudentById(req, res, next);
    }
);

router.post('/deleteStudent', (req, res, next) => {
    studentCtrl.deleteStudent(req, res, next);
    }
);
module.exports = router;