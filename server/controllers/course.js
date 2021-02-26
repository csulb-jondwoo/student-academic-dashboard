const Course = require("../models/course.js")

// getCurrentCourses, getCompletedCourses)
// addCurrentCourse, addCompletedCourse
const getAddedCourses = async (req, res) => {
    try {
        const addedCourses = await Course.find();
        
        res.status(200).json(addedCourses)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

const addCourse = async (req, res) => {
    const course = req.body;
    const newCourse = new Course(course)
    try {
        await newCourse.save()
        res.status(201).json(newCourse)
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}

module.exports = {
    getAddedCourses,
    addCourse
}