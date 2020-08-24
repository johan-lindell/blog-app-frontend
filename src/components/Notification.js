import React from 'react'
import { useSelector } from 'react-redux'
import { Alert, AlertTitle } from '@material-ui/lab'
const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification.type === null) return null
  return notification.type === 'error'
    ?   <Alert severity='error'>
      <AlertTitle>Error</AlertTitle>
      {notification.message}
    </Alert>
    :   <Alert severity='success'>
      <AlertTitle>Success</AlertTitle>
      {notification.message}
    </Alert>

}

export default Notification