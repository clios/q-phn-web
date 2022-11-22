import './FormRow.css'
import React from 'react'
import CustomSkeleton from './CustomSkeleton'

function FormRow(props) {
  if (props.status === 'loading')
    return (
      <div className="form-row-loading bg-dark">
        <CustomSkeleton w="100%" h="5rem" />
      </div>
    )

  return <div className="form-row bg-dark">{props.children}</div>
}

export default FormRow
