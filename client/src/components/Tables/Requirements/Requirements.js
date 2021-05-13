import React from 'react'
import Col from 'react-bootstrap/Col'

import MajorRequirements from '../Requirements/MajorRequirements/MajorRequirements'
import GeRequirements from '../Requirements/GeRequirements/GeRequirements'

const Requirements = ({ type }) => {
  return <Col>{type === 'ge' ? <GeRequirements /> : <MajorRequirements />}</Col>
}

export default Requirements
