import React, { useCallback, useContext, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

import CurrentCourse from './Course/Course';
import { myContext } from '../../../context/Context';

import '../../../utility/css/table-fixed-height.css';

const CurrentSchedule = () => {
  const {
    getCurrentCourses,
    getCompletedCourses,
    currentCourses,
    completedCourses,
    user,
  } = useContext(myContext);
  const userID = JSON.parse(user).googleId;

  useEffect(() => {
    getCurrentCourses(userID);
    // getCompletedCourses(userID);
  }, [getCurrentCourses, userID]);

  // accumulate total number of units
  const totalUnits = currentCourses.reduce((sum, obj) => {
    return sum + obj.units;
  }, 0);

  return (
    <>
      <div className="shadow-sm">
        <Card>
          <Row>
            <Col>
              <Card.Body>
                <Card.Title>
                  {/* TODO: make term and year dynamic */}
                  Current Schedule (Spring 2021) - {totalUnits} Units
                </Card.Title>
              </Card.Body>
            </Col>
          </Row>
        </Card>
        <div className="table-wrapper">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Course</th>
                <th>Section</th>
                <th>Units</th>
                <th>Time (Day)</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              {/* <tr>
                <td>BIOL 200</td>
                <td>2</td>
                <td>4</td>
                <td>9:30am-10:45am (Tues/Thurs)</td>
                <td>online</td>
              </tr>
              <tr>
                <td>BIOL 200 Lab</td>
                <td>14</td>
                <td>0</td>
                <td>7:00pm-9:45pm (Tues)</td>
                <td>online</td>
              </tr>
              <tr>
                <td>CECS 491A</td>
                <td>1</td>
                <td>3</td>
                <td>11:00am-11:50am (Tues/Thurs)</td>
                <td>online</td>
              </tr>
              <tr>
                <td>CECS 491A Lab</td>
                <td>2</td>
                <td>0</td>
                <td>12:00pm-1:15pm (Tues/Thurs)</td>
                <td>online</td>
              </tr> */}
              {currentCourses.map((course, idx) => (
                <CurrentCourse
                  key={idx}
                  number={course.number}
                  dept={course.dept}
                  title={course.title}
                  section={course.section}
                  units={course.units}
                  startTime={course.startTime}
                  endTime={course.endTime}
                  days={course.days}
                  location={course.location}
                />
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default CurrentSchedule;
