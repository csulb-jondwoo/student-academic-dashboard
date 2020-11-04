import React from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

const RemainingCourses = () => {
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Remaining CECS Courses</Card.Title>
        </Card.Body>
      </Card>
      <Table striped hover bordered responsive="sm">
        <thead>
          <tr>
            <th>Lower Division (Take all of the following)</th>
            <th>Units</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
          <tr>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
          <tr>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th>Approved Science (Min. 8 Units)</th>
            <th>Units</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
          <tr>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
          <tr>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th>Upper Division (Take all of the following)</th>
            <th>Units</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
          <tr>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
          <tr>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th>Writing Intensive (Min. 3 Units)</th>
            <th>Units</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
          <tr>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
          <tr>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th>Core Elective (Min. 6 Units)</th>
            <th>Units</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
          <tr>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
          <tr>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
        </tbody>
        <thead>
          <tr>
            <th>Applied Elective (Min. 3 Units)</th>
            <th>Units</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
          <tr>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
          <tr>
            <td>Table cell</td>
            <td>Table cell</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default RemainingCourses;
