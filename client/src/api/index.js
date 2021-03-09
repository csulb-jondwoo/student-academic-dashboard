import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const googleLogout = () =>
  API.get('/auth/logout', { withCredentials: true });
export const fetchUser = () => API.get('/user', { withCredentials: true });
export const getCurrentCourses = () => API.get('/course/current');
export const getCompletedCourses = () => API.get('/course/completed');
export const addCurrentCourse = (course, config) =>
  API.post('/course/current', course, config);
export const addCompletedCourse = (course, config) =>
  API.post('/course/completed', course, config);
export const deleteCurrentCourse = (id) => API.delete(`/course/${id}`);
export const deleteCompletedCourse = (id) => API.delete(`/course/${id}`);
export const uploadCourse = (data) => API.post('/course/upload', data);
