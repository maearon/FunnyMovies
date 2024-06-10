import React from 'react'

const errorMessage = (errorMessage: string[]) => {
  return (
    <div id="error_explanation">
      <div className="alert alert-danger">
        The form contains {errorMessage.length} error{errorMessage.length !== 1 ? 's' : ''}.
      </div>
      <ul>
        { errorMessage.map((error, i) => {
           return (<li key={i}>{error}</li>)
        })}
      </ul>
    </div>
  )
}

export default errorMessage
