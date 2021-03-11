const mongoose = require('mongoose');

const currentCourseSchema = mongoose.Schema({
  courseType: String,
  courseNo: Number,
  courseTitle: String,
  courseUnits: Number,
  courseTerm: String,
  courseYear: Number,
  designation: String, // unnecessary? nice for display, don't really need to save it.
  additionalReq: String, // unnecessary???
  courseSection: Number,
  courseStartTime: String,
  courseEndTime: String,
  courseDays: Array,
  courseLocation: String,
});

module.exports = mongoose.model('currentCourse', currentCourseSchema);
