import './Tabs.css'

import { Cloudy24, PedestrianFamily24, UserMultiple24, Workspace32 } from '@carbon/icons-react'

import { Link } from '@reach/router'
import PageTitle from '../components/PageTitle'
import React from 'react'

function Tabs(props) {
  const isPartiallyActive = ({ isPartiallyCurrent }) => {
    return isPartiallyCurrent ? { className: 'tabs-item active' } : {}
  }

  return (
    <div className="tabs">
      <PageTitle title="Dashboard" description="A dashboard is a visual display of all of your data." />
      <div className="tabs-content">
        <Link className="tabs-item" to="/dashboard/residents" getProps={isPartiallyActive}>
          <UserMultiple24 /> Residents
        </Link>
        <Link className="tabs-item" to="/dashboard/families" getProps={isPartiallyActive}>
          <PedestrianFamily24 /> Families
        </Link>
      </div>
      <div>{props.children}</div>
    </div>
  )
}

export default Tabs
