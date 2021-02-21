import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const myContext = createContext({});

export default function Context(props) {
  const [auth, setAuth] = useState({
    user: null,
    isLoggedIn: false,
  });
  console.log(auth);

  useEffect(() => {
    axios
      .get('http://localhost:5000/user', { withCredentials: true })
      .then((res) => {
        if (res.data) {
          setAuth({
            user: res.data,
            isLoggedIn: true,
          });
        }
      });
  }, []);

  const clearAuth = () => {
    setAuth({
      user: null,
      isLoggedIn: false,
    });
  };

  return (
    <myContext.Provider value={{ auth, clearAuth }}>
      {props.children}
    </myContext.Provider>
  );
}
