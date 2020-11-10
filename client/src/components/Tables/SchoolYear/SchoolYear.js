import React from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

const SchoolYear = () => {
  return (
    <>
      <div className="shadow-sm">
        <Card className="text-center">
          <Card.Body>
            <Card.Title>2019-2020</Card.Title>
            <Button size="sm">Add Term</Button>
          </Card.Body>
        </Card>
        <div className="table-wrapper mb-5">
          <Table className="mb-3" striped hover bordered responsive="sm">
            <thead>
              <tr>
                <th colSpan="2">FALL 2019</th>
              </tr>
              <tr>
                <th>Course</th>
                <th>Units</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CECS 326 - OS</td>
                <td>3</td>
              </tr>
              <tr>
                <td>CECS 343 - SWE</td>
                <td>3</td>
              </tr>
              <tr>
                <td>CECS 229 - Discrete Math</td>
                <td>3</td>
              </tr>
              <tr>
                <td>ENGR 350 - Discrete Math</td>
                <td>3</td>
              </tr>
            </tbody>
            <thead>
              <tr>
                <th colSpan="2">SPRING 2020</th>
              </tr>
              <tr>
                <th>Course</th>
                <th>Units</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CECS 323 - Database</td>
                <td>3</td>
              </tr>
              <tr>
                <td>CECS 474 - Network Interop</td>
                <td>3</td>
              </tr>
              <tr>
                <td>CECS 476 - network/sys admin</td>
                <td>3</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>

      <div className="shadow-sm">
        <Card className="text-center">
          <Card.Body>
            <Card.Title>2020-2021</Card.Title>
            <Button size="sm">Add Term</Button>
          </Card.Body>
        </Card>
        <div className="table-wrapper">
          <Table maxHeight="100px" striped hover bordered responsive="sm">
            <thead>
              <tr>
                <th colSpan="2">FALL 2020</th>
              </tr>
              <tr>
                <th>Course</th>
                <th>Units</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CECS 491A - Senior Project</td>
                <td>3</td>
              </tr>
              <tr>
                <td>BIOL 200 - General Biology</td>
                <td>3</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default SchoolYear;
