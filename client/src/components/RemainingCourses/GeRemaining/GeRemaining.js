import React from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import '../../../utility/css/table-fixed-height.css';

const GeRemaining = () => {
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
              <th>COMMUNICATION & CRITICAL THINKING - 9 Units</th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>A.1</td>
              <td>3</td>
            </tr>
            <tr>
              <td>A.2</td>
              <td>3</td>
            </tr>
            <tr>
              <td>A.3</td>
              <td>3</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>SCIENCE & MATH - 9-10 Units</th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>B.1</td>
              <td>3</td>
            </tr>
            <tr>
              <td>B.2</td>
              <td>3-4</td>
            </tr>
            <tr>
              <td>B.3</td>
              <td>3</td>
            </tr>
            <tr>
              <td>B.4</td>
              <td>3</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>ARTS & HUMANITIES - 9 Units</th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>C.1</td>
              <td>3</td>
            </tr>
            <tr>
              <td>C.2</td>
              <td>3</td>
            </tr>
            <tr>
              <td>C.3</td>
              <td>3</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>SOCIAL SCIENCES & CITIZENSHIP - 9 Units</th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>D.1</td>
              <td>3</td>
            </tr>
            <tr>
              <td>D.2</td>
              <td>3</td>
            </tr>
            <tr>
              <td>D.3</td>
              <td>3</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>LIFELONG LEARNING & SELF DEVELOPMENT - 3 Units</th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>E</td>
              <td>1</td>
            </tr>
            <tr>
              <td>E</td>
              <td>1</td>
            </tr>
            <tr>
              <td>E</td>
              <td>1</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>CAPSTONE - 9 Units</th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>F</td>
              <td>3</td>
            </tr>
            <tr>
              <td>F</td>
              <td>3</td>
            </tr>
            <tr>
              <td>F</td>
              <td>3</td>
            </tr>
          </tbody>
          <thead>
            <tr>
              <th>ADDITIONAL REQUIREMENTS</th>
              <th>Units</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Global Issues</td>
              <td>3</td>
            </tr>
            <tr>
              <td>Human Diversity</td>
              <td>3</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default GeRemaining;
