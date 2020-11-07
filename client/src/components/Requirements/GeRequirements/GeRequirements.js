import React from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';

import '../../../utility/css/table-fixed-height.css';

const GeRequirements = () => {
  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>GE Requirements</Card.Title>
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
              <td>A1 - Oral Communication</td>
              <td>3</td>
            </tr>
            <tr>
              <td>A2 - Written Communication</td>
              <td>3</td>
            </tr>
            <tr>
              <td>A3 - Critical Thinking</td>
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
              <td>B1 - Physical Science</td>
              <td>3</td>
            </tr>
            <tr>
              <td>B2 - Life Science</td>
              <td>3-4</td>
            </tr>
            <tr>
              <td>B3 - Laboratory Experience</td>
              <td>0</td>
            </tr>
            <tr>
              <td>B4 - Mathematics/Quantitative Reasoning</td>
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
              <td>C1 - Arts</td>
              <td>3</td>
            </tr>
            <tr>
              <td>C2 - Humanities</td>
              <td>3</td>
            </tr>
            <tr>
              <td>C3 - Arts / Humanities</td>
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
              <td>D1 - US History</td>
              <td>3</td>
            </tr>
            <tr>
              <td>D2 - Constitution and American Ideals</td>
              <td>3</td>
            </tr>
            <tr>
              <td>D3 - Social Sciences and Citizenship</td>
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
              <td>E x3</td>
              <td>3</td>
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
              <td>F x3</td>
              <td>9</td>
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

export default GeRequirements;
