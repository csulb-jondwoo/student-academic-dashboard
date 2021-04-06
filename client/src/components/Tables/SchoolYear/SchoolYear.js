import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'

const SchoolYear = ({handleAddTerm, handleTermChange, handleYearChange, validated}) => {

  return (
    <Card className="text-center">
      <Card.Body>
        <Form noValidate
              validated={validated}
              onSubmit={handleAddTerm}>
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
              Please select a term.
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
              Please select a year.
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            className="mt-3"
            variant="primary"
            type="submit"
          >
            Create New Term
          </Button>
        </Form>
      </Card.Body>
    </Card>
  )
}

export default SchoolYear
