import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';

export const myContext = createContext({});

export default function Context(props) {
  const [userObj, setUserObj] = useState();

  useEffect(() => {
    axios
      .get('http://localhost:5000/user', { withCredentials: true })
      .then((res) => {
        if (res.data) {
          setUserObj(res.data);
        }
      });
  }, []);

  return (
    <myContext.Provider value={userObj}>{props.children}</myContext.Provider>
  );
}
