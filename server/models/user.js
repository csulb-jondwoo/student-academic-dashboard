const mongoose = require('mongoose');

const currentCourseSchema = mongoose.Schema({
  type: String,
  number: String, // sometimes includes letters (i.e 491B)
  dept: String,
  title: String,
  units: Number,
  term: String,
  year: Number,
  designation: String,
  additionalReq: String,
  section: Number,
  startTime: String,
  endTime: String,
  days: Array,
  location: String,
});

const completedCourseSchema = mongoose.Schema({
  type: String,
  number: String, // sometimes includes letters (i.e 491B)
  dept: String,
  title: String,
  units: Number,
  term: String,
  year: Number,
  grade: String,
  designation: String,
  additionalReq: String,
});

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
  completedCourses: [completedCourseSchema],
});

module.exports = mongoose.model('user', userSchema);
