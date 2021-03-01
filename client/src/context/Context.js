import React, { createContext, useEffect, useState } from 'react';
//import AppReducer from "./AppReducer";
import * as api from '../api';

/*
const initialState = {
  userCourses: []
  //needs user name?
}
*/

// export const myContext = createContext({initialState});
export const myContext = createContext({});

export default function Context(props) {
  const [user, setUser] = useState(localStorage.getItem('user'));
  // const [state, dispatch] = useReducer(AppReducer, initialState);

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
        localStorage.setItem('user', res.data);
        setUser(localStorage.getItem('user'));
      }
    });
  }, []);

  /*
  function addCourse(course) {
    dispatch({
      type: 'ADD_COURSE',
      payload: course
    })
  }

  function deleteCourse(courseID) {
    dispatch({
      type: 'DELETE_COURSE',
      payload: courseID
    })
  }

  function updateCourse(courseID) {
    dispatch({
      type: 'UPDATE_COURSE',
      payload: courseID
    })
  }
  */

  return (
    <myContext.Provider
      value={{ 
        user, 
        handleLogin, 
        handleLogout,
        //userCourses: state.userCourses,
        //addCourse,
        //deleteCourse,
        //updateCourse
      }}>
      {props.children}
    </myContext.Provider>
  );
}
