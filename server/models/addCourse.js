import mongoose from 'mongoose';

const addCourseSchema = mongoose.Schema({
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

const addCourse = mongoose.model('addCourse', addCourseSchema);

export default addCourse;