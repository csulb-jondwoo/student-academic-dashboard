import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const googleLogin = () => API.get('/auth/google');
export const googleLogout = () =>
  API.get('/auth/logout', { withCredentials: true });
export const getCourses = () => API.get('/courses')
