import React from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import { geHistoryData } from './GeHistoryData';

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
              <th>COMMUNICATION & CRITICAL THINKING</th>
              <th>Units</th>
              <th>Term</th>
              <th>Grade</th>
              <th>Requirement Designation</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {geHistoryData.map((course, idx) => {
              if (course.designation.startsWith('A')) {
                return (
                  <tr key={idx}>
                    <td>
                      {course.course} - {course.title}
                    </td>
                    <td>{course.units}</td>
                    <td>{course.term}</td>
                    <td>{course.grade}</td>
                    <td>{course.designation}</td>
                    <td>{course.status}</td>
                  </tr>
                );
              } else {
                return null;
              }
            })}
          </tbody>
          <thead>
            <tr>
              <th>SCIENCE & MATH</th>
              <th>Units</th>
              <th>Term</th>
              <th>Grade</th>
              <th>Requirement Designation</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {geHistoryData.map((course, idx) => {
              if (course.designation.startsWith('B')) {
                return (
                  <tr key={idx}>
                    <td>
                      {course.course} - {course.title}
                    </td>
                    <td>{course.units}</td>
                    <td>{course.term}</td>
                    <td>{course.grade}</td>
                    <td>{course.designation}</td>
                    <td>{course.status}</td>
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
              <th>Term</th>
              <th>Grade</th>
              <th>Requirement Designation</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {geHistoryData.map((course, idx) => {
              if (course.designation.startsWith('C')) {
                return (
                  <tr key={idx}>
                    <td>
                      {course.course} - {course.title}
                    </td>
                    <td>{course.units}</td>
                    <td>{course.term}</td>
                    <td>{course.grade}</td>
                    <td>{course.designation}</td>
                    <td>{course.status}</td>
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
              <th>Term</th>
              <th>Grade</th>
              <th>Requirement Designation</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {geHistoryData.map((course, idx) => {
              if (course.designation.startsWith('D')) {
                return (
                  <tr key={idx}>
                    <td>
                      {course.course} - {course.title}
                    </td>
                    <td>{course.units}</td>
                    <td>{course.term}</td>
                    <td>{course.grade}</td>
                    <td>{course.designation}</td>
                    <td>{course.status}</td>
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
              <th>Term</th>
              <th>Grade</th>
              <th>Requirement Designation</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {geHistoryData.map((course, idx) => {
              if (course.designation.startsWith('E')) {
                return (
                  <tr key={idx}>
                    <td>
                      {course.course} - {course.title}
                    </td>
                    <td>{course.units}</td>
                    <td>{course.term}</td>
                    <td>{course.grade}</td>
                    <td>{course.designation}</td>
                    <td>{course.status}</td>
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
              <th>Term</th>
              <th>Grade</th>
              <th>Requirement Designation</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {geHistoryData.map((course, idx) => {
              if (course.designation.startsWith('F')) {
                return (
                  <tr key={idx}>
                    <td>
                      {course.course} - {course.title}
                    </td>
                    <td>{course.units}</td>
                    <td>{course.term}</td>
                    <td>{course.grade}</td>
                    <td>{course.designation}</td>
                    <td>{course.status}</td>
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
              <th>Term</th>
              <th>Grade</th>
              <th>Requirement Designation</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <em>GLOBAL ISSUES</em>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {geHistoryData.map((course, idx) => {
              if (course.additionalReq === 'Global Issues') {
                return (
                  <tr key={idx}>
                    <td>
                      {course.course} - {course.title}
                    </td>
                    <td>{course.units}</td>
                    <td>{course.term}</td>
                    <td>{course.grade}</td>
                    <td>{course.designation}</td>
                    <td>{course.status}</td>
                  </tr>
                );
              } else {
                return null;
              }
            })}
            <tr>
              <td>
                <em>HUMAN DIVERSITY</em>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {geHistoryData.map((course, idx) => {
              if (course.additionalReq === 'Human Diversity') {
                return (
                  <tr key={idx}>
                    <td>
                      {course.course} - {course.title}
                    </td>
                    <td>{course.units}</td>
                    <td>{course.term}</td>
                    <td>{course.grade}</td>
                    <td>{course.designation}</td>
                    <td>{course.status}</td>
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

export default GeHistory;
