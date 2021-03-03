import React, { createContext, useEffect, useState, useReducer } from 'react';
import AppReducer from './AppReducer';
import * as api from '../api';

const initialState = {
  courses: [],
  error: null,
  loading: true,
  //needs user name?
};

export const myContext = createContext({ initialState });
//export const myContext = createContext({});

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

  async function getCourses() {
    try {
      const res = await api.getCourses();

      dispatch({
        type: 'GET_COURSES',
        payload: res.data.data,
      });
    } catch (err) {
      dispatch({
        type: 'COURSE_ERROR',
        payload: err.response.data.error,
      });
    }
  }

  async function deleteCourse(id) {
    try {
      await api.deleteCourse();

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

  async function addNewCourse(course) {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      const res = await api.addNewCourse(course, config);

      dispatch({
        type: 'ADD_COURSE',
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
        handleLogin,
        handleLogout,
        courses: state.courses,
        getCourses,
        addNewCourse,
        deleteCourse,
        //updateCourse
      }}
    >
      {props.children}
    </myContext.Provider>
  );
}
