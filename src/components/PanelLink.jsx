import './PanelLink.css'

import * as Utils from '../Utils'

import { Link } from '@reach/router'
import PropTypes from 'prop-types'
import React from 'react'

export default function PanelLink(props) {
  const isPartiallyActive = ({ isPartiallyCurrent }) => {
    return isPartiallyCurrent ? { className: 'panel-link active' } : {}
  }

  const no_permission_required = Boolean(!props.permissions) && Boolean(!props.permission)
  const isPermitted = Utils.hasPermission(props.permissions, props.permission)

  if (no_permission_required || isPermitted)
    return (
      <Link className="panel-link" to={props.to} getProps={isPartiallyActive}>
        {props.children}
      </Link>
    )

  if (!isPermitted) return null
}

PanelLink.propTypes = {
  children: PropTypes.node,
  permission: PropTypes.string,
  permissions: PropTypes.array,
  to: PropTypes.string
}
