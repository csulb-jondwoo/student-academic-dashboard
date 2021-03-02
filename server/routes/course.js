const express = require('express');
const router = express.Router();
const { getAddedCourses, addCourse, deleteCourse } = require("../controllers/course.js");

// getCurrentCourses, getCompletedCourses)
// addCurrentCourse, addCompletedCourse
router.get('/', getAddedCourses);
router.post('/', addCourse);
router.delete('/:id', deleteCourse)

module.exports = router;