import React from 'react'
import Loader from './Loader'

function Form(props) {
  return (
    <form className={props.className} onSubmit={props.onSubmit}>
      {props.status === 'loading' && <Loader />}
      {props.children}
    </form>
  )
}

export default Form
