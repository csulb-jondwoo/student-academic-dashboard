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
  const { isAuth } = useContext(myContext);

  return (
    <>
      <Route exact path="/login" component={Login} />

      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute exact path="/roadmap" component={Roadmap} />
      <PrivateRoute exact path="/history" component={CourseHistory} />
      <PrivateRoute exact path="/add-course" component={AddCourse} />
    </>
  );
};

export default AppRoutes;
