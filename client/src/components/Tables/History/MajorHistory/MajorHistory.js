import React from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import { majorHistoryData } from './MajorHistoryData';

import '../../../../utility/css/table-fixed-height.css';

const MajorHistory = () => {
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
              <th>Lower Division</th>
              <th>Units</th>
              <th>Term</th>
              <th>Grade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {majorHistoryData.map((course, idx) => {
              if (course.designation === 'Lower Div') {
                return (
                  <tr key={idx}>
                    <td>
                      {course.course} - {course.title}
                    </td>
                    <td>{course.units}</td>
                    <td>{course.term}</td>
                    <td>{course.grade}</td>
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
              <th>Approved Science</th>
              <th>Units</th>
              <th>Term</th>
              <th>Grade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <em>PHYSICAL SCIENCE</em>
              </td>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
            {majorHistoryData.map((course, idx) => {
              if (course.designation === 'Physical Science') {
                return (
                  <tr key={idx}>
                    <td>
                      {course.course} - {course.title}
                    </td>
                    <td>{course.units}</td>
                    <td>{course.term}</td>
                    <td>{course.grade}</td>
                    <td>{course.status}</td>
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
              <th></th>
              <th></th>
              <th></th>
            </tr>
            {majorHistoryData.map((course, idx) => {
              if (course.designation === 'Life Science') {
                return (
                  <tr key={idx}>
                    <td>
                      {course.course} - {course.title}
                    </td>
                    <td>{course.units}</td>
                    <td>{course.term}</td>
                    <td>{course.grade}</td>
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
              <th>Upper Division</th>
              <th>Units</th>
              <th>Term</th>
              <th>Grade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {majorHistoryData.map((course, idx) => {
              if (course.designation === 'Upper Div') {
                return (
                  <tr key={idx}>
                    <td>
                      {course.course} - {course.title}
                    </td>
                    <td>{course.units}</td>
                    <td>{course.term}</td>
                    <td>{course.grade}</td>
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
              <th>Writing Intensive</th>
              <th>Units</th>
              <th>Term</th>
              <th>Grade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {majorHistoryData.map((course, idx) => {
              if (course.designation === 'Writing Intensive') {
                return (
                  <tr key={idx}>
                    <td>
                      {course.course} - {course.title}
                    </td>
                    <td>{course.units}</td>
                    <td>{course.term}</td>
                    <td>{course.grade}</td>
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
              <th>Core Elective</th>
              <th>Units</th>
              <th>Term</th>
              <th>Grade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {majorHistoryData.map((course, idx) => {
              if (course.designation === 'Core Elective') {
                return (
                  <tr key={idx}>
                    <td>
                      {course.course} - {course.title}
                    </td>
                    <td>{course.units}</td>
                    <td>{course.term}</td>
                    <td>{course.grade}</td>
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
              <th>Applied Elective</th>
              <th>Units</th>
              <th>Term</th>
              <th>Grade</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {majorHistoryData.map((course, idx) => {
              if (course.designation === 'Applied Elective') {
                return (
                  <tr key={idx}>
                    <td>
                      {course.course} - {course.title}
                    </td>
                    <td>{course.units}</td>
                    <td>{course.term}</td>
                    <td>{course.grade}</td>
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

export default MajorHistory;
