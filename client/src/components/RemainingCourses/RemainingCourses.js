import React from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

const RemainingCourses = () => {
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Remaining Courses</Card.Title>
        </Card.Body>
      </Card>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Course</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CECS 378 - Intro to Computer Security</td>
          </tr>
          <tr>
            <td>EE 381 - Probability and Statistics</td>
          </tr>
          <tr>
            <td>CECS 491B - Senior Project II</td>
          </tr>
          <tr>
            <td>ENGR 361 - Scientific Research Communication </td>
          </tr>
          <tr>
            <td>CECS 327 - Intro Networks & Dist Comput</td>
          </tr>
          <tr>
            <td>CECS 491B - Senior Project II </td>
          </tr>
          <tr>
            <td>CECS 491B - Senior Project II </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default RemainingCourses;
