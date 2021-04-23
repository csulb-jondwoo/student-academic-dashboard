import React, { useContext } from 'react'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Tooltip from 'react-bootstrap/Tooltip'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'

import './Progress.css'
import { myContext } from '../../context/Context'

const Progress = () => {
  const { percentCompleted } = useContext(myContext)
  console.log(percentCompleted)
  const renderOverallProgress = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Degree Completion: {percentCompleted}%
    </Tooltip>
  )

  return (
    <OverlayTrigger
      placement="bottom"
      delay={{ show: 250, hide: 400 }}
      overlay={renderOverallProgress}
    >
      <ProgressBar now={percentCompleted} />
    </OverlayTrigger>
  )
}

export default Progress
