import React from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import { geReqData } from './GeReqData';

import '../../../../utility/css/table-fixed-height.css';

const GeRequirements = () => {
  return (
    <>
      <div className="shadow">
        <Card>
          <Card.Body>
            <Card.Title>GE Requirements</Card.Title>
          </Card.Body>
        </Card>
        <div className="table-wrapper">
          <Table striped hover bordered responsive="sm">
            <thead>
              <tr>
                <th>COMMUNICATION & CRITICAL THINKING (9 Units Req.)</th>
                <th>Units</th>
              </tr>
            </thead>
            <tbody>
              {geReqData.map((course, idx) => {
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
                <th>SCIENCE & MATH (11 Units Req.)</th>
                <th>Units</th>
              </tr>
            </thead>
            <tbody>
              {geReqData.map((course, idx) => {
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
                <th>ARTS & HUMANITIES (9 Units Req.)</th>
                <th>Units</th>
              </tr>
            </thead>
            <tbody>
              {geReqData.map((course, idx) => {
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
                <th>SOCIAL SCIENCES & CITIZENSHIP (9 Units Req.)</th>
                <th>Units</th>
              </tr>
            </thead>
            <tbody>
              {geReqData.map((course, idx) => {
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
                <th>LIFELONG LEARNING & SELF DEVELOPMENT (3 Units Req.)</th>
                <th>Units</th>
              </tr>
            </thead>
            <tbody>
              {geReqData.map((course, idx) => {
                if (course.designation.startsWith('E')) {
                  return (
                    <tr key={idx}>
                      <td>{course.designation}</td>
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
                <th>CAPSTONE (9 Units Req.)</th>
                <th>Units</th>
              </tr>
            </thead>
            <tbody>
              {geReqData.map((course, idx) => {
                if (course.designation.startsWith('F')) {
                  return (
                    <tr key={idx}>
                      <td>{course.designation}</td>
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
                <th>ADDITIONAL REQUIREMENTS (6 Units Req.)</th>
                <th>Units</th>
              </tr>
            </thead>
            <tbody>
              {geReqData.map((course, idx) => {
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
              {geReqData.map((course, idx) => {
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
      </div>
    </>
  );
};

export default GeRequirements;
