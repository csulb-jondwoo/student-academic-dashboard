import axios from 'axios'

// const { REACT_APP_API_BASE_URL } = process.env

const API = axios.create({
  baseURL: 'https://academic-dashboard-server.herokuapp.com',
})

// Login/Logout
export const googleLogout = () => {
  return API.get('/auth/logout', { withCredentials: true })
}

// Get user
export const fetchUser = () => {
  return API.get('/user', { withCredentials: true })
}
// Get courses
export const getCurrentCourses = (userID) => {
  return API.get('/course/current', {
    params: {
      ID: userID,
    },
  })
}

export const getCompletedCourses = (userID) => {
  return API.get('/course/completed', {
    params: {
      ID: userID,
    },
  })
}

// Add courses
export const addCurrentCourse = (course, config) => {
  return API.post('/course/current', course, config)
}

export const addCompletedCourse = (course, config) => {
  return API.post('/course/completed', course, config)
}

// Delete courses
export const deleteCurrentCourse = (payload, config) => {
  return API.delete('/course/delete-current', { data: payload }, config)
}
export const deleteCompletedCourse = (payload, config) => {
  return API.delete('/course/delete-completed', { data: payload }, config)
}

// Update courses
export const updateCurrentCourse = ({ newCourse, oldCourse }, config) => {
  return API.put('/course/current', { newCourse, oldCourse }, config)
}

export const updateCompletedCourse = ({ newCourse, oldCourse }, config) => {
  return API.put('/course/completed', { newCourse, oldCourse }, config)
}

// Upload Transcript
export const uploadTranscript = (formData) => {
  return API.post('/course/upload', formData)
}
