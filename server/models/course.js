const mongoose = require('mongoose');

// currentCourseSchema, completedCourseSchema
/* 
courseNo: {
    type: String,
    required: [true, 'Please enter a course number.']
}
*/
const courseSchema = mongoose.Schema({
    userID: String,
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

