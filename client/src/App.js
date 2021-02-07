import React, { useContext } from 'react';
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
import { myContext } from './context/Context';

import './App.css';

function App() {
  const userObj = useContext(myContext);

  return (
    <>
      <Router>
        <Navigation />
        <Container>
          <Switch>
            <Route path="/dashboard" exact component={Dashboard} />
            {userObj ? (
              <Redirect to="/dashboard" />
            ) : (
              <Route path="/login" component={Login} />
            )}
            <Route path="/history" exact component={CourseHistory} />
            <Route path="/add-course" exact component={AddCourse} />
            <Route path="/new-student" exact component={NewStudent} />
            <Route path="/roadmap" exact component={Roadmap} />
            {userObj ? <Redirect to="/dashboard" /> : <Redirect to="/login" />}
          </Switch>
        </Container>
      </Router>
    </>
  );
}

export default App;
