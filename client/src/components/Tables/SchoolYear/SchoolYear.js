import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Table from 'react-bootstrap/Table'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'

const SchoolYear = () => {
  const [term, setTerm] = useState()
  const [year, setYear] = useState()

  const handleYearChange = event => {
    setYear(event.target.value)
    console.log(year)
  }
  const handleTermChange = (event) => {
    setTerm(event.target.value)
    console.log(term)
  }

  return (
    <>
      <div className="shadow-sm">
        <Card className="text-center">
          <Card.Body>
            <Form>
              <Form.Group controlId="term">
                <Form.Label>Term</Form.Label>
                <Form.Control
                  as="select"
                  name="term"
                  onChange={handleTermChange}
                  required
                >
                  <option value=""></option>
                  <option value="Fall">Fall</option>
                  <option value="Spring">Spring</option>
                  <option value="Summer">Summer</option>
                  <option value="Winter">Winter</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please enter a course section number.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="year">
                <Form.Label>Year</Form.Label>
                <Form.Control
                  as="select"
                  name="year"
                  onChange={handleYearChange}
                  required
                >
                  <option value=""></option>
                  <option value="2021">2021</option>
                  <option value="2022">2022</option>
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  Please enter a course section number.
                </Form.Control.Feedback>
              </Form.Group>
            </Form>
        <div className="table-wrapper mb-5">
          <Table className="mb-3" striped hover bordered responsive="sm">
            <thead>
              <tr>
                <th>
                  <Row>
                    <Col>
                      Course
                    </Col>
                  </Row>
                </th>
                <th>Units</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </Table>
        </div>
        </Card.Body>
        </Card>
      </div>
    </>
  )
}

export default SchoolYear
