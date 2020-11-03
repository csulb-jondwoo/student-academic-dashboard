import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';

import './CurrentSchedule.css';

const CurrentSchedule = () => {
  return (
    <>
      <Card>
        <Row>
          <Col>
            <Card.Body>
              <Card.Title>Current Schedule</Card.Title>
            </Card.Body>
          </Col>
          <Col className="py-3 d-flex justify-content-end mr-3">
            <Button size="sm">Add Course</Button>
          </Col>
        </Row>
      </Card>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Course</th>
            <th>Section</th>
            <th>Time (Day)</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>BIOL 200</td>
            <td>2</td>
            <td>9:30am-10:45am (Tues/Thurs)</td>
            <td>online</td>
          </tr>
          <tr>
            <td>BIOL 200 Lab</td>
            <td>14</td>
            <td>7:00pm-9:45pm (Tues)</td>
            <td>online</td>
          </tr>
          <tr>
            <td>CECS 491A</td>
            <td>1</td>
            <td>11:00am-11:50am (Tues/Thurs)</td>
            <td>online</td>
          </tr>
          <tr>
            <td>CECS 491A Lab</td>
            <td>2</td>
            <td>12:00pm-1:15pm (Tues/Thurs)</td>
            <td>online</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default CurrentSchedule;
