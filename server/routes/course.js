const express = require('express');
const router = express.Router();
const {
  getCurrentCourses,
  getCompletedCourses,
  addCurrentCourse,
  addCompletedCourse,
  deleteCourse,
  uploadTranscript,
} = require('../controllers/course.js');

router.get('/current', getCurrentCourses);
router.get('/completed', getCompletedCourses);
router.post('/current', addCurrentCourse);
router.post('/completed', addCompletedCourse);
router.delete('/:id', deleteCourse)
router.post('/upload', uploadTranscript);

module.exports = router;
