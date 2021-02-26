const mongoose = require('mongoose');

// currentCourseSchema, completedCourseSchema
const courseSchema = mongoose.Schema({
    courseNo: String, 
    courseTitle: String, 
    courseUnits: String, 
    courseTerm: String, 
    courseYear: String, 
    designation: String, 
    additionalReq: String,
    courseStatus: Boolean,
    courseGrade: String
});

module.exports = mongoose.model('Course', courseSchema);

