import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const myContext = createContext({});

export default function Context(props) {
  const [userObj, setUserObj] = useState();
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    axios
      .get('http://localhost:5000/user', { withCredentials: true })
      .then((res) => {
        if (res.data) {
          setUserObj(res.data);
        }
      });
  }, []);

  useEffect(() => {
    if (userObj) {
      setIsAuth(true);
    } else {
      setIsAuth(false);
    }
  }, [userObj]);

  return (
    <myContext.Provider value={{ isAuth, setIsAuth }}>
      {props.children}
    </myContext.Provider>
  );
}
