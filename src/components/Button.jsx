import React from 'react'
import * as Utils from '../Utils'

function Button(props) {
  const no_permission_required = Boolean(!props.permissions) && Boolean(!props.permission)
  const isPermitted = Utils.hasPermission(props.permissions, props.permission)

  if (no_permission_required || isPermitted)
    return (
      <button className={`button ${props.className}`} onClick={props.onClick} disabled={props.disabled}>
        {props.status === 'loading' ? props.loadingText : props.children}
      </button>
    )

  if (!isPermitted) return null
}

export default Button
