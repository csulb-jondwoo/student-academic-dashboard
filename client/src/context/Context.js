import React, { createContext, useEffect, useState, useReducer } from 'react';
import AppReducer from './AppReducer';
import * as api from '../api';

const initialState = {
  completedCourses: [],
  currentCourses: [],
  error: null,
  loading: true,
  //needs user name?
};

// Create Context
export const myContext = createContext(initialState);

// Provider Component
export default function Context(props) {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // actions
  const handleLogout = () => {
    api.googleLogout().then((res) => {
      if (res.data === 'done') {
        localStorage.clear();
        window.location.href = 'http://localhost:3000/login';
      }
    });
  };

  const handleLogin = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  useEffect(() => {
    api.fetchUser().then((res) => {
      if (res.data) {
        localStorage.setItem('user', JSON.stringify(res.data));
        setUser(localStorage.getItem('user'));
      }
    });
  }, []);

  async function getCurrentCourses(userID) {
    try {
      const res = await api.getCurrentCourses(userID);

      dispatch({
        type: 'GET_CURRENT_COURSES',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'COURSE_ERROR',
        payload: err.response.data.error
      });
    }
  }

  async function getCompletedCourses(userID) {
    try {
      const res = await api.getCompletedCourses(userID);

      dispatch({
        type: 'GET_COMPLETED_COURSES',
        payload: res.data.data
      });
    } catch (err) {
      dispatch({
        type: 'COURSE_ERROR',
        payload: err.response.data.error
      });
    }
  }

  async function deleteCurrentCourse(id) {
    try {
      await api.deleteCurrentCourse();

      dispatch({
        type: 'DELETE_COURSE',
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: 'COURSE_ERROR',
        payload: error.response.data.error,
      });
    }
  }

  async function deleteCompletedCourse(id) {
    try {
      await api.deleteCompletedCourse();

      dispatch({
        type: 'DELETE_COURSE',
        payload: id,
      });
    } catch (error) {
      dispatch({
        type: 'COURSE_ERROR',
        payload: error.response.data.error,
      });
    }
  }

  async function addCurrentCourse(course) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await api.addCurrentCourse(course, config);

      dispatch({
        type: 'ADD_CURRENT_COURSE',
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: 'COURSE_ERROR',
        payload: error.response.data.error,
      });
    }
  }

  async function addCompletedCourse(course) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await api.addCompletedCourse(course, config);

      dispatch({
        type: 'ADD_COMPLETED_COURSE',
        payload: res.data.data,
      });
    } catch (error) {
      dispatch({
        type: 'COURSE_ERROR',
        payload: error.response.data.error,
      });
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
        //updateCourse
      }}
    >
      {props.children}
    </myContext.Provider>
  );
}
