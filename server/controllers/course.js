const Course = require("../models/course.js")

// getCurrentCourses, getCompletedCourses)
// addCurrentCourse, addCompletedCourse
// req, res, next?
const getAddedCourses = async (req, res) => {
    try {
        const addedCourses = await Course.find();
        
        return res.status(200).json(addedCourses)
        // return res.status(200).json({success: true, count: addeCourses.length, data: addedCourses})
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}

const addCourse = async (req, res) => {
    const course = req.body;
    const newCourse = new Course(course)
    try {
        await newCourse.save()
        return res.status(201).json(newCourse)
    } catch (error) {
        return res.status(409).json({message: error.message});
    }
}

const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({
                success: false,
                error: 'Course not found.'
            })
        }
        await course.remove();
        return res.status(200).json({
            success: true,
            data: {}
        });
    } catch (error) {
        return res.status(409).json({message: error.message});
    }
}

module.exports = {
    getAddedCourses,
    addCourse,
    deleteCourse
}