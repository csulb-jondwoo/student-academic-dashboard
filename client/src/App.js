import React, { useContext, useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Login from './pages/Login/Login';
import Navigation from './components/Navigation/Navigation';
import Dashboard from './pages/Dashboard/Dashboard';
import CourseHistory from './pages/CourseHistory/CourseHistory';
import AddCourse from './pages/AddCourse/AddCourse';
import NewStudent from './pages/NewStudent/NewStudent';
import Roadmap from './pages/Roadmap/Roadmap';
import PrivateRoute from './utility/components/PrivateRoute';
import { myContext } from './context/Context';

import './App.css';

const App = () => {
  const { isAuth } = useContext(myContext);
  console.log(isAuth);

  return (
    <>
      <Router>
        <Navigation />
        <Container>
          <Switch>
            <Route path="/login" component={Login} />

            <PrivateRoute
              path="/dashboard"
              component={Dashboard}
              isAuth={isAuth}
            />
            <PrivateRoute path="/roadmap" component={Roadmap} isAuth={isAuth} />
            <PrivateRoute
              path="/add-course"
              component={AddCourse}
              isAuth={isAuth}
            />
            <PrivateRoute
              path="/history"
              component={CourseHistory}
              isAuth={isAuth}
            />
            {/* <Route path="/new-student" component={NewStudent} /> */}
            <Redirect to="/login" />
          </Switch>
        </Container>
      </Router>
    </>
  );
};

export default App;
