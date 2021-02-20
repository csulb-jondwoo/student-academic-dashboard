import express from 'express';
import { getAddedCourses, addCourse } from "../controllers/courses.js";

const router = express.Router();

router.get('/courses', getAddedCourses);
router.post('/courses', addCourse);

export default router;