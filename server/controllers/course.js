const currentCourse = require('../models/currentCourse.js');
const completedCourse = require('../models/completedCourse.js');
// may need to just bring in the new user model and change functions appropriately. Example: (User.currentCourse.find)

const addCompletedCourse = async (req, res) => {
    try {
        const completed = req.body;
        //const newCompletedCourse = await completedCourse.create(completed);
        await completedCourse.findOneAndUpdate({
            googleId: ""
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
        const newCurrentCourse = await currentCourse.create(current);

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