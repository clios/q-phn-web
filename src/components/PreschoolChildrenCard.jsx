import './PreschoolChildrenCard.css'
import React from 'react'
import CustomSkeleton from './CustomSkeleton'

function PreschoolChildrenCard(props) {
  const total = props.male + props.female

  if (props.status === 'loading') return <CustomSkeleton w="100%" h="8rem" />

  return (
    <div className="dashboard-preschool">
      <div className="dashboard-preschool-content bg-dark">
        <p className="dashboard-preschool-title title-5">Preschool Children</p>
        <p className="dashboard-preschool-total subtitle-2 text-orange">{total}</p>
        <p className="dashboard-preschool-male text-blue">{props.male} male</p>
        <hr />
        <p className="dashboard-preschool-female text-yellow">{props.female} female</p>
      </div>
      <progress className="dashboard-preschool-progress" max={total} value={props.male} />
    </div>
  )
}

export default PreschoolChildrenCard
