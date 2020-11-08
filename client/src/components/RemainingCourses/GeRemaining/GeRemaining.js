import React from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import getGeRemaining from './GeRemainingData/geRemainingData';

import '../../../utility/css/table-fixed-height.css';

const GeRemaining = () => {
  const {
    geAUnitCount,
    geBUnitCount,
    geCUnitCount,
    geDUnitCount,
    geEUnitCount,
    geFUnitCount,
    geAdditionalReqUnitCount,
    geRemaining,
    CAT_A,
    CAT_B,
    CAT_C,
    CAT_D,
    CAT_E,
    CAT_F,
    CAT_ADDITIONAL_REQ,
  } = getGeRemaining();

  console.log(geBUnitCount);
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
              <th>
                COMMUNICATION & CRITICAL THINKING ({CAT_A - geAUnitCount}{' '}
                unit(s) remaining)
              </th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            {geRemaining.map((course, idx) => {
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
              <th>SCIENCE & MATH ({CAT_B - geBUnitCount} unit(s) remaining)</th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            {geRemaining.map((course, idx) => {
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
              <th>
                ARTS & HUMANITIES ({CAT_C - geCUnitCount} unit(s) remaining)
              </th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            {geRemaining.map((course, idx) => {
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
              <th>
                SOCIAL SCIENCES & CITIZENSHIP ({CAT_D - geDUnitCount} unit(s)
                remaining)
              </th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            {geRemaining.map((course, idx) => {
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
              <th>
                LIFELONG LEARNING & SELF DEVELOPMENT ({CAT_E - geEUnitCount}{' '}
                unit(s) remaining)
              </th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            {geRemaining.map((course, idx) => {
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
              <th>CAPSTONE ({CAT_F - geFUnitCount} unit(s) remaining)</th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            {geRemaining.map((course, idx) => {
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
              <th>
                ADDITIONAL REQUIREMENTS (
                {CAT_ADDITIONAL_REQ - geAdditionalReqUnitCount} unit(s)
                remaining)
              </th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            {geRemaining.map((course, idx) => {
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
            {geRemaining.map((course, idx) => {
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
