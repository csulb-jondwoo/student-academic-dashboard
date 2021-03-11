import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Login from '../../pages/Login/Login';
import Dashboard from '../../pages/Dashboard/Dashboard';
import CourseHistory from '../../pages/CourseHistory/CourseHistory';
//import AddCourse from '../../pages/AddCourse/AddCourse';
import CompletedCourseForm from '../Forms/CompletedCourseForm/CompletedCourseForm';
import CurrentCourseForm from '../Forms/CurrentCourseForm/CurrentCourseForm';
import Roadmap from '../../pages/Roadmap/Roadmap';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import { myContext } from '../../context/Context';

const AppRoutes = () => {
  const { user, handleLogin } = useContext(myContext);
  /*
  May need to add the userID as a parameter appended to all routes.
  const userID = JSON.parse(user).googleId
  */

  return (
    <Switch>
      <PrivateRoute path="/dashboard" user={user} component={Dashboard} />
      <PrivateRoute path="/roadmap" user={user} component={Roadmap} />
      <PrivateRoute path="/history" user={user} component={CourseHistory} />
      <PrivateRoute
        path="/add-completed-course"
        user={user}
        component={CompletedCourseForm}
      />
      <PrivateRoute
        path="/add-current-course"
        user={user}
        component={CurrentCourseForm}
      />

      {user ? (
        <Redirect from="/login" to="/dashboard" />
      ) : (
        <Route exact path="/login">
          <Login handleLogin={handleLogin} />
        </Route>
      )}

      <Redirect from="/" to="/login" />
    </Switch>
  );
};

export default AppRoutes;
