import React, { useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';

import '../../../utility/css/table-fixed-height.css';
import { BiEdit } from 'react-icons/bi';
//import { BiPlusCircle } from 'react-icons/bi';

//import { Context } from "../../../context/Context"

const CurrentSchedule = () => {

  /*
  // grab the users courses from context
  const { userCourses } = useContext(Context);
  // get a list of courses by checking which are current
  const currentCourses = userCourses.filter(course => course.isCurrent)
  // create a new currentCourse component for Dashboard to replace hardcoded data.
  const currentCourseList = currentCourses.map(course => (<currentCourse key={course.id} course={course} />))
  */

  return (
    <>
      <div className="shadow-sm">
        <Card>
          <Row>
            <Col>
              <Card.Body>
                <Card.Title>
                  Current Schedule (Fall 2020) - 7 Units -{' '}
                  <button>
                    <Link to="/add-course">
                      <BiEdit />
                    </Link>
                  </button>
                </Card.Title>
              </Card.Body>
            </Col>
            {/* <Col className="py-3 d-flex justify-content-end mr-3">
            <Button size="sm">Add Course</Button>
          </Col> */}
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
              <tr>
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
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default CurrentSchedule;
