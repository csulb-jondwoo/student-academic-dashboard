import React from 'react';
import Container from 'react-bootstrap/Container';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import Dashboard from './pages/Dashboard/Dashboard';
import Login from './pages/Login/Login';
import CourseHistory from './pages/CourseHistory/CourseHistory';
import Register from './pages/Register/Register';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import AddCourse from './pages/AddCourse/AddCourse';

import './App.css';

function App() {
  return (
    <>
      <Router>
        <Navigation />
        <Container>
          <Switch>
            <Route path="/dashboard" exact component={Dashboard} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/forgotpassword" exact component={ForgotPassword} />
            <Route path="/history" exact component={CourseHistory} />
            <Route path="/add-course" exact component={AddCourse} />
            {/* <Route path="/about" component={About} /> */}
            {/* if you want to pass props to route, render the component */}
            {/* <Route path="/new" render={() => <NewEntry />} /> */}
            {/* <Route path="/new" component={NewEntry} /> */}
            <Redirect to="/dashboard" />
          </Switch>
        </Container>
      </Router>
    </>
  );
}

export default App;
