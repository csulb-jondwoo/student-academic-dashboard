import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

// Login/Logout
export const googleLogout = () =>
  API.get('/auth/logout', { withCredentials: true });

// Get user
export const fetchUser = () => API.get('/user', { withCredentials: true });

// Get courses
export const getCurrentCourses = (userID) =>
  API.get('/course/current', {
    params: {
      ID: userID,
    },
  });
export const getCompletedCourses = (userID) =>
  API.get('/course/completed', {
    params: {
      ID: userID,
    },
  });

// Add courses
export const addCurrentCourse = (course, config) =>
  API.post('/course/current', course, config);
export const addCompletedCourse = (course, config) =>
  API.post('/course/completed', course, config);

// Delete courses
export const deleteCurrentCourse = (id) => API.delete(`/course/${id}`);
export const deleteCompletedCourse = (id) => API.delete(`/course/${id}`);

// Update courses
export const updateCurrentCourse = ({ newCourse, oldCourse }, config) =>
  API.put('/course/current', { newCourse, oldCourse }, config);
export const updateCompletedCourse = ({ newCourse, oldCourse }, config) =>
  API.put('/course/completed', { newCourse, oldCourse }, config);

// Upload Transcript
export const uploadTranscript = (data, userID) =>
  API.post('/course/upload', { data, userID });
