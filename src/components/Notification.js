import React from 'react'

const Notification = ({ message, errorMessage }) => {
  if (message === null && errorMessage === null) {
    return null
  }

  return message === null
    ?   <div className="errorMessage">
      {errorMessage}
    </div>
    :   <div className="message">
      {message}
    </div>

}

export default Notification