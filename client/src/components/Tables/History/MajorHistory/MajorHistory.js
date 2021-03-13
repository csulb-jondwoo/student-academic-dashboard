import React, { useContext, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
// improt cecsCatalog =

import { myContext } from '../../../../context/Context';

import '../../../../utility/css/table-fixed-height.css';

// TODO: fetch real data
const MajorHistory = () => {
  const { getCompletedCourses, completedCourses, user } = useContext(myContext);
  const userID = JSON.parse(user).googleId;

  useEffect(() => {
    getCompletedCourses(userID);
  }, [getCompletedCourses, userID]);

  console.log(completedCourses);
  // courseData = {
  //   ...courseData,
  //   year,
  //   term,
  //   number,
  //   dept,
  //   title,
  //   units,
  //   grade,
  //   //designation
  //   //additionalReq
  // };
  return (
    <>
      <Card className="mt-3">
        <Card.Body>
          <Card.Title>CECS History</Card.Title>
        </Card.Body>
      </Card>

      <div className="table-wrapper">
        <Table striped hover bordered responsive="sm">
          <thead>
            <tr>
              <th>Course</th>
              <th>Units</th>
              <th>Term</th>
              <th>Grade</th>
              <th>Designation</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {completedCourses.map((course, idx) => {
              if (course.type === 'major') {
                return (
                  <tr key={idx}>
                    <td>
                      {course.dept} {course.number} - {course.title}
                    </td>
                    <td>{course.units}</td>
                    <td>{course.term}</td>
                    <td>{course.grade}</td>
                    <td>{course.designation}</td>
                    <td>{course.status}</td>
                  </tr>
                );
              }
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default MajorHistory;
