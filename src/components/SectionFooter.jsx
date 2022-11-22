import './SectionFooter.css'
import React from 'react'
import CustomSkeleton from './CustomSkeleton'

function SectionFooter(props) {
  return (
    <div className="section-footer">
      {props.status === 'loading' ? <CustomSkeleton w="17rem" h="1rem" /> : props.children}
    </div>
  )
}

export default SectionFooter
