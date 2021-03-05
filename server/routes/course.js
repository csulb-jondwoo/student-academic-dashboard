const express = require('express');
const router = express.Router();
const { getCurrentCourses, getCompletedCourses, addCurrentCourse, addCompletedCourse, deleteCourse } = require("../controllers/course.js");

//router.get('/', getAddedCourses);
router.get('/current', getCurrentCourses);
router.get('/completed', getCompletedCourses);
//router.post('/', addCourse);
router.post('/current', addCurrentCourse);
router.post('/completed', addCompletedCourse);
router.delete('/:id', deleteCourse)

module.exports = router;