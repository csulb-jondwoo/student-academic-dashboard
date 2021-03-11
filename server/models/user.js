const mongoose = require('mongoose');

const currentCourseSchema = mongoose.Schema({
  type: String,
  number: Number,
  title: String,
  units: Number,
  term: String,
  year: Number,
  designation: String, // unnecessary? nice for display, don't really need to save it.
  additionalReq: String, // unnecessary???
  section: Number,
  startTime: String,
  endTime: String,
  days: Array,
  location: String,
});

// const completedCourseSchema = mongoose.Schema({
//   courseNo: String,
//   courseTitle: String,
//   courseUnits: String,
//   courseTerm: String,
//   courseYear: String,
//   designation: String, // unnecessary? nice for display, don't really need to save it.
//   courseGrade: String,
// });

const userSchema = mongoose.Schema({
  googleId: {
    required: true,
    type: String,
  },
  name: {
    required: true,
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  currentCourses: [currentCourseSchema],
});

module.exports = mongoose.model('user', userSchema);
