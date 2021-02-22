import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const myContext = createContext({});

export default function Context(props) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5000/user', { withCredentials: true })
      .then((res) => {
        if (res.data) {
          // setUser(res.data);
          localStorage.setItem('user', res.data);
        }
      });
  }, []);

  const clearUser = () => {
    setUser(null);
  };

  return (
    <myContext.Provider value={{ user, clearUser }}>
      {props.children}
    </myContext.Provider>
  );
}

// use isLoggedIn from context
