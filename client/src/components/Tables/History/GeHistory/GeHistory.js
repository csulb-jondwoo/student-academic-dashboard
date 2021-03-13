import React from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import '../../../../utility/css/table-fixed-height.css';

const GeHistory = () => {
  return (
    <>
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>GE History</Card.Title>
        </Card.Body>
      </Card>
      <div className="table-wrapper">
        <Table className="mb-3" striped hover bordered responsive="sm">
          <thead>
            <tr>
              <th>Course</th>
              <th>Units</th>
              <th>Term</th>
              <th>Grade</th>
              <th>Designation</th>
              <th>Additional Requisites</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <td>placeholder</td>
            <td>placeholder</td>
            <td>placeholder</td>
            <td>placeholder</td>
            <td>placeholder</td>
            <td>placeholder</td>
            <td>placeholder</td>

            {/* {geHistoryData.map((course, idx) => {
              return (
                <tr key={idx}>
                  <td>
                    {course.course} - {course.title}
                  </td>
                  <td>{course.units}</td>
                  <td>{course.term}</td>
                  <td>{course.grade}</td>
                  <td>{course.designation}</td>
                  <td>{course.additionalReq}</td>
                  <td>{course.status}</td>
                </tr>
              );
            })} */}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default GeHistory;
