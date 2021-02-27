import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const googleLogout = () =>
  API.get('/auth/logout', { withCredentials: true });
export const fetchUser = () => API.get('/user', { withCredentials: true });
export const getCourses = () => API.get('/course');
export const addCourse = (newCourse) => axios.post(baseURL, newCourse)
