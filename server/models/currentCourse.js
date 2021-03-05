const mongoose = require('mongoose');

const currentCourseSchema = mongoose.Schema({
    courseNo: String, 
    courseTitle: String, 
    courseUnits: String, 
    designation: String, // unnecessary? nice for display, don't really need to save it.
    additionalReq: String, // unnecessary???
    courseStatus: Boolean, // unnecessary???

    // start, end time (how to save? toString()?)
    // days of week [String]
    // location String
});

module.exports = mongoose.model('currentCourse', currentCourseSchema);

