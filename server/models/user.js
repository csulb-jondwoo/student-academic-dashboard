const mongoose = require('mongoose');
//const currentCourse = require('./currentCourse.js');
//const completedCourse = require('./completedCourse.js')

const completedCourseSchema = mongoose.Schema({
  userID: String,
  courseType: String,
  courseNo: String, 
  courseTitle: String, 
  courseUnits: String, 
  courseTerm: String,
  courseYear: String, 
  designation: String, // unnecessary? nice for display, don't really need to save it.
  courseGrade: String
})

const currentCourseSchema = mongoose.Schema({
  userID: String,
  courseNo: String, 
  courseTitle: String, 
  courseUnits: String, 
  designation: String, // unnecessary? nice for display, don't really need to save it.
  additionalReq: String, // unnecessary???
  courseStatus: Boolean, // unnecessary???

  // start, end time (how to save? toString()?)
  // days of week [String]
  // location String
})

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
  completedCourses: [completedCourseSchema]
});

module.exports = mongoose.model('User', userSchema);
//module.exports = mongoose.model('CurrentCourse', currentCourseSchema);
//module.exports = mongoose.model('CompletedCourse', completedCourseSchema);
