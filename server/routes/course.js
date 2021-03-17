const express = require('express');
const router = express.Router();
const { upload } = require('../utility/multer.js');
const {
  getCurrentCourses,
  getCompletedCourses,
  addCurrentCourse,
  addCompletedCourse,
  deleteCurrentCourse,
  deleteCompletedCourse,
  updateCurrentCourse,
  updateCompletedCourse,
  uploadTranscript,
} = require('../controllers/course.js');

// get routes
router.get('/current', getCurrentCourses);
router.get('/completed', getCompletedCourses);

// post routes
router.post('/current', addCurrentCourse);
router.post('/completed', addCompletedCourse);

router.post('/upload', upload.single('file'), uploadTranscript);

// delete routes
router.delete('/delete-current', deleteCurrentCourse);
router.delete('/delete-completed', deleteCompletedCourse);

// put routes
router.put('/current', updateCurrentCourse);
router.put('/completed', updateCompletedCourse);

module.exports = router;
