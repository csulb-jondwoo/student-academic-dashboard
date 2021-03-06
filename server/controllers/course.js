const currentCourse = require('../models/user.js');
const completedCourse = require('../models/user.js');
const userSchema = require('../models/user.js')
const fetchUser = require('./user.js')

const addCompletedCourse = async (req, res) => {
    try {
        const { userID } = req.body; // userID = googleId passed from completed course form
        const completed = req.body;
        await new completedCourse(completed).save()


        await userSchema.findOneAndUpdate({
            googleId: userID,
        }, {
            $addToSet: {
                completedCourses: completed
            }
        })

        return res.status(201).json({
            success: true,
            data: completed
        });
    } catch (error) {
        return res.status(409).json({message: error.message});
    }
}

const addCurrentCourse = async (req, res) => {
    try {
        const { userID } = req.body;
        const current = req.body;
        await new currentCourse(current).save()
        
        await userSchema.findOneAndUpdate({
            googleId: userID
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