import React from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import getGeRemaining from './GeRemainingData/geRemainingData';

import '../../../utility/css/table-fixed-height.css';

const GeRemaining = () => {
  const { geRemaining, geEUnitCount, geFUnitCount } = getGeRemaining();
  let updatedRemaining = [];

  // create new course object for E and F ge's with updated unit count
  for (const course of geRemaining) {
    if (course.designation === 'E') {
      const courseObj = {
        course: course.course,
        designation: course.designation,
        units: course.units - geEUnitCount,
      };
      updatedRemaining.push(courseObj);
    } else if (course.designation === 'F') {
      const courseObj = {
        course: course.course,
        designation: course.designation,
        units: course.units - geFUnitCount,
      };
      updatedRemaining.push(courseObj);
    } else {
      updatedRemaining.push(course);
    }
  }

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Remaining GE Courses</Card.Title>
        </Card.Body>
      </Card>
      <div className="table-wrapper">
        <Table striped hover bordered responsive="sm">
          <thead>
            <tr>
              <th>COMMUNICATION & CRITICAL THINKING</th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            {updatedRemaining.map((course, idx) => {
              if (course.designation.startsWith('A')) {
                return (
                  <tr key={idx}>
                    <td>
                      {course.designation} - {course.course}
                    </td>
                    <td>{course.units}</td>
                  </tr>
                );
              } else {
                return null;
              }
            })}
          </tbody>
          <thead>
            <tr>
              <th>SCIENCE & MATH - 9-10 Units</th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            {updatedRemaining.map((course, idx) => {
              if (course.designation.startsWith('B')) {
                return (
                  <tr key={idx}>
                    <td>
                      {course.designation} - {course.course}
                    </td>
                    <td>{course.units}</td>
                  </tr>
                );
              } else {
                return null;
              }
            })}
          </tbody>
          <thead>
            <tr>
              <th>ARTS & HUMANITIES</th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            {updatedRemaining.map((course, idx) => {
              if (course.designation.startsWith('C')) {
                return (
                  <tr key={idx}>
                    <td>
                      {course.designation} - {course.course}
                    </td>
                    <td>{course.units}</td>
                  </tr>
                );
              } else {
                return null;
              }
            })}
          </tbody>
          <thead>
            <tr>
              <th>SOCIAL SCIENCES & CITIZENSHIP</th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            {updatedRemaining.map((course, idx) => {
              if (course.designation.startsWith('D')) {
                return (
                  <tr key={idx}>
                    <td>
                      {course.designation} - {course.course}
                    </td>
                    <td>{course.units}</td>
                  </tr>
                );
              } else {
                return null;
              }
            })}
          </tbody>
          <thead>
            <tr>
              <th>LIFELONG LEARNING & SELF DEVELOPMENT</th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            {updatedRemaining.map((course, idx) => {
              if (course.designation.startsWith('E')) {
                return (
                  <tr key={idx}>
                    <td>{course.course}</td>
                    <td>{course.units}</td>
                  </tr>
                );
              } else {
                return null;
              }
            })}
          </tbody>
          <thead>
            <tr>
              <th>CAPSTONE</th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            {updatedRemaining.map((course, idx) => {
              if (course.designation.startsWith('F')) {
                return (
                  <tr key={idx}>
                    <td>{course.course}</td>
                    <td>{course.units}</td>
                  </tr>
                );
              } else {
                return null;
              }
            })}
          </tbody>
          <thead>
            <tr>
              <th>ADDITIONAL REQUIREMENTS</th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            {updatedRemaining.map((course, idx) => {
              if (course.designation === 'Global Issues') {
                return (
                  <tr key={idx}>
                    <td>{course.course}</td>
                    <td>{course.units}</td>
                  </tr>
                );
              } else {
                return null;
              }
            })}
            {updatedRemaining.map((course, idx) => {
              if (course.designation === 'Human Diversity') {
                return (
                  <tr key={idx}>
                    <td>{course.course}</td>
                    <td>{course.units}</td>
                  </tr>
                );
              } else {
                return null;
              }
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default GeRemaining;
