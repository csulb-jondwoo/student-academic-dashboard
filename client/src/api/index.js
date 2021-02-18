import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

// export const signIn = (formData) => API.post('/user/signin', formData);
// export const signUp = (formData) => API.post('/user/signup', formData);
export const googleLogin = () => API.get('/auth/google');
export const googleLogout = () =>
  API.get('/auth/logout', { withCredentials: true });
export const getCourses = () => API.get('/courses')
