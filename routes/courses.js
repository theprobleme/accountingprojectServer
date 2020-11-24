const express = require('express');
const { response } = require('express');
const coursesController = require('../controllers/coursesController');

const router = express.Router();

router.get('/courses', coursesController.getCourses)
router.put('/courses', coursesController.createCourses)
router.delete('/courses', coursesController.deleteCourses)

module.exports = router;