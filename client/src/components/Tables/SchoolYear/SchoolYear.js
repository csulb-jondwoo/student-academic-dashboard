import React from 'react';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const SchoolYear = () => {
  return (
    <>
      <div className="shadow-sm">
        <Card className="text-center">
          <Card.Body>
            <Card.Title>2019-2020</Card.Title>
          </Card.Body>
        </Card>
        <div className="table-wrapper mb-5">
          <Table className="mb-3" striped hover bordered responsive="sm">
            <thead>
              <tr>
                <th colSpan="2">
                  <Row>
                    <Col>FALL 2019</Col>
                    <Col className="d-flex justify-content-end">
                      <Button size="sm">Add Course</Button>
                    </Col>
                  </Row>
                </th>
              </tr>
              <tr>
                <th>Course</th>
                <th>Units</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CECS 326 - Operating Systems</td>
                <td>3</td>
              </tr>
              <tr>
                <td>CECS 343 - Introduction to Software Engineering</td>
                <td>3</td>
              </tr>
              <tr>
                <td>
                  CECS 229 - Discrete Structures with Computing Applications II
                </td>
                <td>3</td>
              </tr>
              <tr>
                <td>ENGR 350 - Computers, Ethics and Society</td>
                <td>3</td>
              </tr>
            </tbody>
            <thead>
              <tr>
                <th colSpan="2">
                  <Row>
                    <Col>SPRING 2020</Col>
                    <Col className="d-flex justify-content-end">
                      <Button size="sm">Add Course</Button>
                    </Col>
                  </Row>
                </th>
              </tr>
              <tr>
                <th>Course</th>
                <th>Units</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CECS 323 - Database Fundamentals</td>
                <td>3</td>
              </tr>
              <tr>
                <td>CECS 474 - Computer Network Interoperability</td>
                <td>3</td>
              </tr>
              <tr>
                <td>CECS 476 - System and Network Administration</td>
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
          </Card.Body>
        </Card>
        <div className="table-wrapper">
          <Table maxHeight="100px" striped hover bordered responsive="sm">
            <thead>
              <tr>
                <th colSpan="2">
                  <Row>
                    <Col>FALL 2020</Col>
                    <Col className="d-flex justify-content-end">
                      <Button size="sm">Add Course</Button>
                    </Col>
                  </Row>
                </th>
              </tr>
              <tr>
                <th>Course</th>
                <th>Units</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CECS 491A - Computer Science Senior Project I</td>
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
