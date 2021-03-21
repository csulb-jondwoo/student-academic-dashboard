import React from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

import './Progress.css'

const Progress = () => {
  const renderOverallProgress = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Degree Completion: 60%
    </Tooltip>
  )

  return (
    <OverlayTrigger
      placement="bottom"
      delay={{ show: 250, hide: 400 }}
      overlay={renderOverallProgress}
    >
      <ProgressBar now={60} />
    </OverlayTrigger>
  )
}

export default Progress
