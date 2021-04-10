import React, {
  createContext,
  useEffect,
  useState,
  useReducer,
  useCallback,
} from 'react'
import AppReducer from './AppReducer'
import * as api from '../api'

const initialState = {
  completedCourses: [],
  currentCourses: [],
  error: null,
  isLoading: true,
}

// Create Context
export const myContext = createContext(initialState)

// Provider Component
export default function Context(props) {
  const [user, setUser] = useState(localStorage.getItem('user'))
  const [state, dispatch] = useReducer(AppReducer, initialState)

  // actions
  // Auth
  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google'
  }
  const handleLogout = () => {
    api.googleLogout().then((res) => {
      if (res.data === 'done') {
        localStorage.clear()
        window.location.href = 'http://localhost:3000/login'
      }
    })
  }

  useEffect(() => {
    api.fetchUser().then((res) => {
      if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data))
        setUser(localStorage.getItem('user'))
      }
    })
  }, [])

  const updateUserAfterTranscriptUpload = async () => {
    localStorage.clear()
    await api.fetchUser().then((res) => {
      if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data))
        setUser(localStorage.getItem('user'))
      }
    })
  }

  // Get courses
  // useCallback to stabilize function on renders when called
  const getCurrentCourses = useCallback(async (userID) => {
    try {
      const res = await api.getCurrentCourses(userID)

      dispatch({
        type: 'GET_CURRENT_COURSES',
        payload: res.data.data,
      })
      return res
    } catch (err) {
      dispatch({
        type: 'COURSE_ERROR',
        payload: err.response.data.error,
      })
    }
  }, [])

  // useCallback to stabilize function on renders when called
  const getCompletedCourses = useCallback(async (userID) => {
    try {
      const res = await api.getCompletedCourses(userID)

      dispatch({
        type: 'GET_COMPLETED_COURSES',
        payload: res.data.data,
      })
      return res
    } catch (err) {
      dispatch({
        type: 'COURSE_ERROR',
        payload: err.response.data.error,
      })
    }
  }, [])

  // Delete courses
  async function deleteCurrentCourse(data) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const res = await api.deleteCurrentCourse(data, config)

      dispatch({
        type: 'DELETE_COURSE',
        payload: null,
      })
      return res
    } catch (error) {
      dispatch({
        type: 'COURSE_ERROR',
        payload: error.response.data.error,
      })
    }
  }

  async function deleteCompletedCourse(data) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    try {
      const res = await api.deleteCompletedCourse(data, config)

      dispatch({
        type: 'DELETE_COURSE',
        payload: null,
      })
      return res
    } catch (error) {
      dispatch({
        type: 'COURSE_ERROR',
        payload: error.response.data.error,
      })
    }
  }

  // Add courses
  async function addCurrentCourse(course) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    try {
      const res = await api.addCurrentCourse(course, config)

      dispatch({
        type: 'ADD_CURRENT_COURSE',
        payload: res.data.data,
      })
      return res
    } catch (error) {
      dispatch({
        type: 'COURSE_ERROR',
        payload: error.response.data.error,
      })
    }
  }

  async function addCompletedCourse(course) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    try {
      const res = await api.addCompletedCourse(course, config)

      dispatch({
        type: 'ADD_COMPLETED_COURSE',
        payload: res.data.data,
      })
      return res
    } catch (error) {
      dispatch({
        type: 'COURSE_ERROR',
        payload: error.response.data.error,
      })
    }
  }

  // Update courses
  async function updateCurrentCourse({ newCourse, oldCourse }) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    try {
      const res = await api.updateCurrentCourse(
        { newCourse, oldCourse },
        config
      )

      dispatch({
        type: 'UPDATE_COURSE',
        payload: res.data.data,
      })
      return res
    } catch (error) {
      dispatch({
        type: 'COURSE_ERROR',
        payload: error.response.data.error,
      })
    }
  }

  async function updateCompletedCourse({ newCourse, oldCourse }) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    try {
      const res = await api.updateCompletedCourse(
        { newCourse, oldCourse },
        config
      )

      dispatch({
        type: 'UPDATE_COURSE',
        payload: res.data.data,
      })
      return res
    } catch (error) {
      dispatch({
        type: 'COURSE_ERROR',
        payload: error.response.data.error,
      })
    }
  }

  return (
    <myContext.Provider
      value={{
        user,
        currentCourses: state.currentCourses,
        completedCourses: state.completedCourses,
        loading: state.loading,
        handleLogin,
        handleLogout,
        getCompletedCourses,
        getCurrentCourses,
        addCurrentCourse,
        addCompletedCourse,
        deleteCurrentCourse,
        deleteCompletedCourse,
        updateCurrentCourse,
        updateCompletedCourse,
        updateUserAfterTranscriptUpload,
      }}
    >
      {props.children}
    </myContext.Provider>
  )
}
