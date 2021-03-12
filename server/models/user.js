const mongoose = require('mongoose');

const reqString = {
  type: String,
  required: true
}

const reqNumber = {
  type: Number,
  required: true
}

const currentCourseSchema = mongoose.Schema({
  type: reqString,
  number: reqString, // sometimes includes letters (i.e 491B)
  dept: reqString,
  title: reqString,
  units: reqNumber,
  term: reqString,
  year: reqNumber,
  designation: reqString,
  additionalReq: reqString,
  section: reqNumber,
  startTime: reqString,
  endTime: reqString,
  days: {
    type: Array,
    required: true
  },
  location: reqString,
});

const completedCourseSchema = mongoose.Schema({
  type: reqString,
  number: reqString, // sometimes includes letters (i.e 491B)
  dept: reqString,
  title: reqString,
  units: reqNumber,
  term: reqString,
  year: reqNumber,
  grade: reqString,
  designation: reqString,
  additionalReq: reqString,
});

const userSchema = mongoose.Schema({
  googleId: reqString,
  name: reqString,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  currentCourses: [currentCourseSchema],
  completedCourses: [completedCourseSchema],
});

module.exports = mongoose.model('user', userSchema);
