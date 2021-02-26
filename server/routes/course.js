const express = require('express');
const router = express.Router();
const { getAddedCourses } = require("../controllers/course.js");
const { addCourse } = require("../controllers/course.js");

// getCurrentCourses, getCompletedCourses)
// addCurrentCourse, addCompletedCourse
router.get('/', getAddedCourses);
router.post('/', addCourse);

module.exports = router;