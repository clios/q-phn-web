import './TableToolbar.css'
import React from 'react'
import CustomSkeleton from './CustomSkeleton'

function TableToolbar(props) {
  if (props.status === 'loading') return <CustomSkeleton w="100%" h="2rem" />
  return <div className="table-toolbar">{props.children}</div>
}

export default TableToolbar
