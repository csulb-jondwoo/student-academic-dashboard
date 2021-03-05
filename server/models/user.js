const mongoose = require('mongoose');
//const currentCourse = require('./currentCourse.js');
//const completedCourse = require('./completedCourse.js')

const completedCourse = {
  courseNo: String, 
  courseTitle: String, 
  courseUnits: String, 
  courseTerm: String,
  courseYear: String, 
  designation: String, // unnecessary? nice for display, don't really need to save it.
  courseGrade: String
};

const currentCourse = {
  courseNo: String, 
  courseTitle: String, 
  courseUnits: String, 
  designation: String, // unnecessary? nice for display, don't really need to save it.
  additionalReq: String, // unnecessary???
  courseStatus: Boolean, // unnecessary???

  // start, end time (how to save? toString()?)
  // days of week [String]
  // location String
};

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
  currentCourses: {
    type: [currentCourse],
    required: false
  },
  completedCourses: {
    type: [completedCourse],
    required: false
  },
});

module.exports = mongoose.model('User', userSchema);
