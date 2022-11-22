import './Sider.css'

import { Help16, Identification16, Logout16, Map16 } from '@carbon/icons-react'
import { Meter16, PedestrianFamily16, UserMultiple16 } from '@carbon/icons-react'

import AccountContext from '../contexts/AccountContext'
import Panel from '../components/Panel'
import PanelHeader from '../components/PanelHeader'
import PanelLink from '../components/PanelLink'
import PanelSection from '../components/PanelSection'
import React from 'react'
import SiderSkeleton from '../components/SiderSkeleton'
import axios from 'axios'
import { navigate } from '@reach/router'
import swrAccount from '../swr/swrAccount'
import { toast } from 'react-toastify'

function Sider({ children }) {
  // SEND GET ACCOUNT REQUEST
  const has_token = localStorage.getItem('q-phn-token') ? true : false
  const A = swrAccount(has_token, { refreshInterval: 300000 })

  // INFORMATION STATE
  const [status, setStatus] = React.useState('loading')

  // ON FETCH ACCOUNT
  React.useEffect(() => {
    if (has_token && A.loading) setStatus('loading')
    if (A.error) setStatus('error')
    if (A.data) setStatus('success')
  }, [A.loading, A.error, A.data])

  // SEND POST LOGOUT REQUEST
  function signOut() {
    const URL = process.env.BASE_URL + '/logout'
    const CONFIG = { headers: { Authorization: `Bearer ${localStorage.getItem('q-phn-token')}` } }

    axios
      .post(URL, null, CONFIG)
      .then((response) => {
        if (response.status === 204) {
          localStorage.removeItem('q-phn-token') // SUCCESSFUL OPERATION
          navigate('/', { replace: true })
        } else if (response.status === 403) {
          toast.error('User credential is forbidden') // USER CREDENTIAL IS FORBIDDEN
        } else if (response.status === 500) {
          toast.error('Unexpected server error occurs') // UNEXPECTED SERVER ERROR
        }
      })
      .catch((error) => console.log(error))
  }

  // NO TOKEN NO ACCESS
  if (!has_token) {
    navigate('/', { replace: true })
    location.reload()
  }

  // NO ACCOUNT SESSION NO ACCESS
  if (A.error?.response?.status === 403) {
    localStorage.removeItem('q-phn-token')
    navigate('/', { replace: true })
    location.reload()
  }

  return (
    <div className="sider">
      {status === 'loading' && <SiderSkeleton />}
      {status === 'success' && (
        <Panel label="Q-PHN MIS v2">
          <PanelHeader label={A.data.position}>
            <PanelLink to="/account">{A.data.name}</PanelLink>
          </PanelHeader>
          <PanelSection label="Management">
            <PanelLink permissions={A.data.permissions} permission="read_dashboard" to="/dashboard">
              <Meter16 /> Dashboard
            </PanelLink>
            <PanelLink permissions={A.data.permissions} permission="read_location" to="/map">
              <Map16 /> Map
            </PanelLink>
            <PanelLink permissions={A.data.permissions} permission="read_resident" to="/residents">
              <UserMultiple16 /> Residents
            </PanelLink>
            <PanelLink permissions={A.data.permissions} permission="read_family" to="/families">
              <PedestrianFamily16 /> Families
            </PanelLink>
          </PanelSection>
          <PanelSection label="System">
            <PanelLink permissions={A.data.permissions} permission="read_user" to="/users">
              <Identification16 /> Users
            </PanelLink>
            <PanelLink to="/about">
              <Help16 /> About
            </PanelLink>
            <div className="panel-link" onClick={signOut}>
              <Logout16 /> Sign out
            </div>
          </PanelSection>
        </Panel>
      )}
      <div className="sider-content">{A.data && <AccountContext.Provider value={A.data}>{children}</AccountContext.Provider>}</div>
      <img className="logo-seal" src={require('../assets/pgq_logo.png')} alt="quirino_logo_medicine" />
    </div>
  )
}

export default Sider
