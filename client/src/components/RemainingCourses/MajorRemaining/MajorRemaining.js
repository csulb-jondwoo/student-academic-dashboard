import React from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import getMajorRemaining from './MajorRemainingData/majorRemainingData';
import '../../../utility/css/table-fixed-height.css';

const RemainingCourses = () => {
  const {
    majorRemaining,
    lowerDivUnitCount,
    approvedScienceUnitCount,
    upperDivUnitCount,
    writingIntensiveUnitCount,
    coreElectiveUnitCount,
    appliedElectiveUnitCount,
    LOWER_DIV_UNITS,
    APPROVED_SCIENCE_UNITS,
    UPPER_DIV_UNITS,
    WRITING_INTENSIVE_UNITS,
    CORE_ELECTIVE_UNITS,
    APPLIED_ELECTIVE_UNITS,
  } = getMajorRemaining();
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>Remaining CECS Courses</Card.Title>
        </Card.Body>
      </Card>
      <div className="table-wrapper">
        <Table striped hover bordered responsive="sm">
          <thead>
            <tr>
              <th>
                Lower Division ({LOWER_DIV_UNITS - lowerDivUnitCount} unit(s)
                remaining)
              </th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            {majorRemaining.map((course, idx) => {
              if (course.designation === 'Lower Div') {
                return (
                  <tr key={idx}>
                    <td>
                      {course.course} - {course.title}
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
                Approved Science (
                {APPROVED_SCIENCE_UNITS - approvedScienceUnitCount} unit(s)
                remaining)
              </th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <em>PHYSICAL SCIENCE</em>
              </td>
              <th></th>
            </tr>
            {majorRemaining.map((course, idx) => {
              if (course.designation === 'Physical Science') {
                return (
                  <tr key={idx}>
                    <td>
                      {course.course} - {course.title}
                    </td>
                    <td>{course.units}</td>
                  </tr>
                );
              } else {
                return null;
              }
            })}
            <tr>
              <td>
                <em>LIFE SCIENCE</em>
              </td>
              <th></th>
            </tr>
            {majorRemaining.map((course, idx) => {
              if (course.designation === 'Life Science') {
                return (
                  <tr key={idx}>
                    <td>
                      {course.course} - {course.title}
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
                Upper Division ({UPPER_DIV_UNITS - upperDivUnitCount} unit(s)
                remaining)
              </th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            {majorRemaining.map((course, idx) => {
              if (course.designation === 'Upper Div') {
                return (
                  <tr key={idx}>
                    <td>
                      {course.course} - {course.title}
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
                Writing Intensive (
                {WRITING_INTENSIVE_UNITS - writingIntensiveUnitCount} unit(s)
                remaining)
              </th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            {majorRemaining.map((course, idx) => {
              if (course.designation === 'Writing Intensive') {
                return (
                  <tr key={idx}>
                    <td>
                      {course.course} - {course.title}
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
                Core Elective ({CORE_ELECTIVE_UNITS - coreElectiveUnitCount}{' '}
                unit(s) remaining)
              </th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            {majorRemaining.map((course, idx) => {
              if (course.designation === 'Core Elective') {
                return (
                  <tr key={idx}>
                    <td>
                      {course.course} - {course.title}
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
                Applied Elective (
                {APPLIED_ELECTIVE_UNITS - appliedElectiveUnitCount} unit(s)
                remaining)
              </th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            {majorRemaining.map((course, idx) => {
              if (course.designation === 'Applied Elective') {
                return (
                  <tr key={idx}>
                    <td>
                      {course.course} - {course.title}
                    </td>
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

export default RemainingCourses;
