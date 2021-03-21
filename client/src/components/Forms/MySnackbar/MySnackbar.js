import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#2a9d8f',
  },
}))

const MySnackbar = ({ open, severity, error, success, handleClose }) => {
  const classes = useStyles()

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        // className={classes.root}
        onClose={handleClose}
        severity={severity}
      >
        {success ? 'Successfully Added!' : error}
      </Alert>
    </Snackbar>
  )
}

export default MySnackbar
