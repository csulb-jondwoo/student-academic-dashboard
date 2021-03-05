const currentCourse = require('../models/currentCourse.js');
const completedCourse = require('../models/completedCourse.js');
const fetchUser = require('./user.js')

const addCompletedCourse = async (req, res) => {
    try {
        const completed = req.body;
        //const newCompletedCourse = await completedCourse.create(completed);
        const currentUser = await fetchUser();
        console.log(currentUser);
        const { _id } = currentUser
        await completedCourse.findOneAndUpdate({
            _id: ""
        },
        {
            $addToSet: {
                completedCourses: completed
            }
        })

        return res.status(201).json(newCompletedCourse)
    } catch (error) {
        return res.status(409).json({message: error.message});
    }
}

const addCurrentCourse = async (req, res) => {
    try {
        const current = req.body;
        //const newCompletedCourse = await completedCourse.create(completed);
        await currentCourse.findOneAndUpdate({
            _id: ""
        },
        {
            $addToSet: {
                currentCourses: current
            }
        })

        return res.status(201).json(newCurrentCourse)
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

const getCurrentCourses = async (req, res) => {
    try {
        const currentCourses = await currentCourse.find();
        
        return res.status(200).json(currentCourses)
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}

const getCompletedCourses = async (req, res) => {
    try {
        const completedCourses = await completedCourse.find();
        
        return res.status(200).json(completedCourses)
    } catch (error) {
        return res.status(404).json({message: error.message});
    }
}

module.exports = {
    getCurrentCourses,
    getCompletedCourses,
    addCurrentCourse,
    addCompletedCourse,
    deleteCourse
}