const mongoose = require('mongoose');

const currentCourseSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
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
  courseDays: [String],
  courseLocation: String,
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
