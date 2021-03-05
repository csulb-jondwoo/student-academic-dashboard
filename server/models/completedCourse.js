const mongoose = require('mongoose');

const completedCourseSchema = mongoose.Schema({
    courseNo: String, 
    courseTitle: String, 
    courseUnits: String, 
    courseTerm: String,
    courseYear: String, 
    designation: String, // unnecessary? nice for display, don't really need to save it.
    courseGrade: String
});

module.exports = mongoose.model('completedCourse', completedCourseSchema);
