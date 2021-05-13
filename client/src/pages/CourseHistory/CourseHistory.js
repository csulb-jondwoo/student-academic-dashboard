import React from 'react'
import { useHistory } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

import MajorHistory from '../../components/Tables/History/MajorHistory/MajorHistory'
import GeHistory from '../../components/Tables/History/GeHistory/GeHistory'
import OtherHistory from '../../components/Tables/History/OtherHistory/OtherHistory'

import '../../utility/css/table-fixed-height.css'

const CourseHistory = () => {
  const history = useHistory()

  const handleAddCompletedCourse = () => {
    history.push('add-completed-course')
  }

  return (
    <>
      <Card className="mt-5 text-center shadow-sm">
        <Row>
          <Col>
            <Card.Body>
              <Card.Title>Course History</Card.Title>
              <Button onClick={handleAddCompletedCourse} size="sm">
                Add Completed Course
              </Button>
            </Card.Body>
          </Col>
        </Row>
      </Card>

      {/* TODO: make one table component and pass each data as props */}
      <div className="shadow-sm mb-5">
        <MajorHistory />
      </div>
      <div className="shadow-sm mb-5">
        <GeHistory />
      </div>
      <div className="shadow-sm mb-5">
        <OtherHistory />
      </div>
    </>
  )
}

export default CourseHistory
