import React, { createContext, useEffect, useState } from 'react';
import * as api from '../api';

export const myContext = createContext({});

export default function Context(props) {
  const [user, setUser] = useState(localStorage.getItem('user'));

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
      }
    });
  }, []);

  return (
    <myContext.Provider value={{ user, handleLogin, handleLogout }}>
      {props.children}
    </myContext.Provider>
  );
}
