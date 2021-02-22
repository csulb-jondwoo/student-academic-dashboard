import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const myContext = createContext({});

export default function Context(props) {
  const [user, setUser] = useState(localStorage.getItem('user'));

  useEffect(() => {
    axios
      .get('http://localhost:5000/user', { withCredentials: true })
      .then((res) => {
        if (res.data) {
          localStorage.setItem('user', res.data);
          setUser(localStorage.getItem('user'));
        }
      });
  }, []);

  const clearUser = () => {
    localStorage.clear();
    // setUser(null);
  };

  return (
    <myContext.Provider value={{ user, clearUser }}>
      {props.children}
    </myContext.Provider>
  );
}
