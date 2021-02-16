import addCourse from "../models/addCourse.js"

export const getAddedCourses = async (req, res) => {
    try {
        const addedCourses = await addCourse.find();
        
        res.status(200).json(addedCourses)
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const addCourse = async (req, res) => {
    const course = req.body;
    const newCourse = new addCourse(course)
    try {
        await newCourse.save()

        res.status(201).json(newCourse)
    } catch (error) {
        res.status(409).json({message: error.message});
    }
}