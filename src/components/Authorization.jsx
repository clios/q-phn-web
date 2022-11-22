import * as Utils from '../Utils'

import FadeAnimation from './FadeAnimation'
import React from 'react'
import { Redirect } from '@reach/router'

function Authorization(props) {
  return (
    <React.Fragment>
      {!Utils.hasPermission(props.permissions, props.permission) ? (
        <Redirect to="/account" noThrow replace />
      ) : (
        <FadeAnimation>{props.children}</FadeAnimation>
      )}
    </React.Fragment>
  )
}

export default Authorization
