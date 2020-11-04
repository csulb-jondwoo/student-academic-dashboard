import React from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import {
  lowerDiv,
  physicalSciences,
  lifeSciences,
  upperDiv,
  writingIntensive,
  coreElectives,
  appliedElectives,
} from './CECS';

import '../../../utility/css/table-fixed-height.css';

const MajorRequirements = () => {
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>CECS Requirements (2020-2021)</Card.Title>
        </Card.Body>
      </Card>
      <div className="table-wrapper">
        <Table maxHeight="100px" striped hover bordered responsive="sm">
          <thead>
            <tr>
              <th>Lower Division (Take all of the following)</th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            {lowerDiv.map((course, idx) => {
              return (
                <tr key={idx}>
                  <td>{course.course}</td>
                  <td>{course.units}</td>
                </tr>
              );
            })}
          </tbody>
          <thead>
            <tr>
              <th>Approved Science (1 from each, Min. 8 Units)</th>
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
            {physicalSciences.map((course, idx) => {
              return (
                <tr key={idx}>
                  <td>{course.course}</td>
                  <td>{course.units}</td>
                </tr>
              );
            })}
            <tr>
              <td>
                <em>LIFE SCIENCE</em>
              </td>
              <th></th>
            </tr>
            {lifeSciences.map((course, idx) => {
              return (
                <tr key={idx}>
                  <td>{course.course}</td>
                  <td>{course.units}</td>
                </tr>
              );
            })}
          </tbody>
          <thead>
            <tr>
              <th>Upper Division (Take all of the following)</th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            {upperDiv.map((course, idx) => {
              return (
                <tr key={idx}>
                  <td>{course.course}</td>
                  <td>{course.units}</td>
                </tr>
              );
            })}
          </tbody>
          <thead>
            <tr>
              <th>Writing Intensive (Min. 3 Units)</th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            {writingIntensive.map((course, idx) => {
              return (
                <tr key={idx}>
                  <td>{course.course}</td>
                  <td>{course.units}</td>
                </tr>
              );
            })}
          </tbody>
          <thead>
            <tr>
              <th>Core Elective (Min. 6 Units)</th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            {coreElectives.map((course, idx) => {
              return (
                <tr key={idx}>
                  <td>{course.course}</td>
                  <td>{course.units}</td>
                </tr>
              );
            })}
          </tbody>
          <thead>
            <tr>
              <th>Applied Elective (Min. 3 Units)</th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            {appliedElectives.map((course, idx) => {
              return (
                <tr key={idx}>
                  <td>{course.course}</td>
                  <td>{course.units}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default MajorRequirements;
