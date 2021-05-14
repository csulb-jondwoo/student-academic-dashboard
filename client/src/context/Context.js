import React, {
  createContext,
  useEffect,
  useState,
  useReducer,
  useCallback,
} from 'react'

import AppReducer from './AppReducer'
import getGeRemaining from '../components/Tables/RemainingCourses/GeRemaining/getGeRemaining/getGeRemaining'
import getMajorRemaining from '../components/Tables/RemainingCourses/MajorRemaining/getMajorRemaining/getMajorRemaining'

import * as api from '../api'

const initialState = {
  completedCourses: [],
  currentCourses: [],
  error: null,
  isLoading: true,
}

// const {
//   REACT_APP_LOGIN_CALLBACK_URL,
//   REACT_APP_LOGOUT_CALLBACK_URL,
// } = process.env

// Create Context
export const myContext = createContext(initialState)

// Provider Component
export default function Context(props) {
  const [user, setUser] = useState(localStorage.getItem('user'))
  const [geCourses, setGeCourses] = useState(undefined)
  const [majorCourses, setMajorCourses] = useState(undefined)
  const [majorRemainingUnits, setMajorRemainingUnits] = useState(0)
  const [geRemainingUnits, setGeRemainingUnits] = useState(0)
  const [percentCompleted, setPercentCompleted] = useState(undefined)
  const [state, dispatch] = useReducer(AppReducer, initialState)

  // actions
  // Auth
  const handleLogin = () => {
    window.location.href =
      'https://academic-dashboard-server.herokuapp.com/auth/google'
  }
  const handleLogout = () => {
    api.googleLogout().then((res) => {
      if (res.data === 'done') {
        localStorage.clear()
        window.location.href =
          'https://student-academic-dashboard.web.app/login'
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

  useEffect(() => {
    if (user) {
      const userID = JSON.parse(user).googleId

      setGeCourses(
        state.completedCourses
          .filter((course) => {
            return course.type === 'ge' && course.designation !== ''
          })
          .map((course) => {
            return {
              userID: userID,
              type: course.type,
              course: course.dept + ' ' + course.number + ' - ' + course.title,
              grade: course.grade,
              units: course.units,
              designation: course.designation,
              additionalReq: course.additionalReq,
              termYear: course.term + ' ' + course.year.toString(),
            }
          })
      )

      setMajorCourses(
        state.completedCourses
          .filter((course) => {
            return course.type === 'major' && course.designation !== ''
          })
          .map((course) => {
            return {
              userID: userID,
              type: course.type,
              course: course.dept + ' ' + course.number + ' - ' + course.title,
              grade: course.grade,
              units: course.units,
              designation: course.designation,
              additionalReq: course.additionalReq,
              termYear: course.term + ' ' + course.year.toString(),
            }
          })
      )
    }
  }, [user, state.completedCourses])

  useEffect(() => {
    let majorUnitsRemaining = 0
    let geUnitsRemaining = 0

    if (geCourses && majorCourses) {
      const {
        geRemaining,
        CAT_E,
        CAT_F,
        geEUnitCount,
        geFUnitCount,
      } = getGeRemaining(geCourses, majorCourses)

      const {
        lowerDivUnitCount,
        approvedScienceUnitCount,
        upperDivUnitCount,
        writingIntensiveUnitCount,
        coreElectiveUnitCount,
        appliedElectiveUnitCount,
        LOWER_DIV_UNITS,
        APPROVED_SCIENCE_UNITS,
        UPPER_DIV_UNITS,
        WRITING_INTENSIVE_UNITS,
        CORE_ELECTIVE_UNITS,
        APPLIED_ELECTIVE_UNITS,
      } = getMajorRemaining(majorCourses)

      majorUnitsRemaining += LOWER_DIV_UNITS - lowerDivUnitCount
      majorUnitsRemaining += APPROVED_SCIENCE_UNITS - approvedScienceUnitCount
      majorUnitsRemaining += UPPER_DIV_UNITS - upperDivUnitCount
      majorUnitsRemaining += WRITING_INTENSIVE_UNITS - writingIntensiveUnitCount
      majorUnitsRemaining += CORE_ELECTIVE_UNITS - coreElectiveUnitCount
      majorUnitsRemaining += APPLIED_ELECTIVE_UNITS - appliedElectiveUnitCount

      geUnitsRemaining += CAT_E - geEUnitCount
      geUnitsRemaining += CAT_F - geFUnitCount

      for (const remainingCategory of geRemaining) {
        if (
          remainingCategory.course === 'Human Diversity' ||
          remainingCategory.course === 'Global Issues' ||
          remainingCategory.course === 'E' ||
          remainingCategory.course === 'F'
        ) {
          continue
        } else {
          geUnitsRemaining += remainingCategory.units
        }
      }
    }

    setGeRemainingUnits(geUnitsRemaining)
    setMajorRemainingUnits(majorUnitsRemaining)
  }, [geCourses, majorCourses])

  useEffect(() => {
    const calculatePercentageCompleted = () => {
      if (geRemainingUnits && majorRemainingUnits) {
        const GE_TOTAL_UNITS_REQUIRED = 50
        const MAJOR_TOTAL_UNITS_REQUIRED = 94
        const TOTAL_UNITS_REQUIRED =
          GE_TOTAL_UNITS_REQUIRED + MAJOR_TOTAL_UNITS_REQUIRED

        const totalRemainingUnits = geRemainingUnits + majorRemainingUnits

        setPercentCompleted(
          (
            ((TOTAL_UNITS_REQUIRED - totalRemainingUnits) /
              TOTAL_UNITS_REQUIRED) *
            100
          ).toFixed(2)
        )
      }
    }
    calculatePercentageCompleted()
  }, [geRemainingUnits, majorRemainingUnits])

  const updateUserAfterTranscriptUpload = async () => {
    localStorage.clear()
    await api.fetchUser().then((res) => {
      if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data))
        setUser(localStorage.getItem('user'))
      }
    })
  }

  const handleGeRemainingUnits = (units) => {
    setGeRemainingUnits(units)
  }

  const handleMajorRemainingUnits = (units) => {
    setMajorRemainingUnits(units)
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
        percentCompleted,
        geCourses,
        majorCourses,
        currentCourses: state.currentCourses,
        completedCourses: state.completedCourses,
        loading: state.loading,
        handleLogin,
        handleLogout,
        handleMajorRemainingUnits,
        handleGeRemainingUnits,
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
