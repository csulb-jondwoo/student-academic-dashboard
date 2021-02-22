import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Login from '../../pages/Login/Login';
import Dashboard from '../../pages/Dashboard/Dashboard';
import CourseHistory from '../../pages/CourseHistory/CourseHistory';
import AddCourse from '../../pages/AddCourse/AddCourse';
import Roadmap from '../../pages/Roadmap/Roadmap';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import { myContext } from '../../context/Context';

const AppRoutes = () => {
  const { auth } = useContext(myContext);

  return (
    <>
      <Route exact path="/login" comp={Login} />

      <PrivateRoute
        exact
        path="/dashboard"
        isLoggedIn={auth.isLoggedIn}
        component={Dashboard}
      />
      <PrivateRoute
        exact
        path="/roadmap"
        isLoggedIn={auth.isLoggedIn}
        component={Roadmap}
      />
      <PrivateRoute
        exact
        path="/history"
        isLoggedIn={auth.isLoggedIn}
        component={CourseHistory}
      />
      <PrivateRoute
        exact
        path="/add-course"
        isLoggedIn={auth.isLoggedIn}
        component={AddCourse}
      />
    </>
  );
};

export default AppRoutes;
