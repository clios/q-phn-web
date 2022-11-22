import * as Utils from '../Utils'

import { Close20, Edit20, Password20, TrashCan20 } from '@carbon/icons-react'
import { navigate, useParams } from '@reach/router'

import AccountContext from '../contexts/AccountContext'
import Authorization from '../components/Authorization'
import ButtonIcon from '../components/ButtonIcon'
import { Entropy } from 'entropy-string'
import Field from '../components/Field'
import PageSubtitle from '../components/PageSubtitle'
import PageTitle from '../components/PageTitle'
import React from 'react'
import SectionBody from '../components/SectionBody'
import SectionFooter from '../components/SectionFooter'
import SectionHeader from '../components/SectionHeader'
import axios from 'axios'
import { confirmAlert } from 'react-confirm-alert'
import swrUser from '../swr/swrUser'
import { toJpeg } from 'html-to-image'
import { toast } from 'react-toastify'

function UserView() {
  // SEND GET USER REQUEST
  const ROUTE = useParams()
  const U = swrUser(ROUTE.user_id)

  // INFORMATION STATE
  const ACCOUNT = React.useContext(AccountContext)
  const [status, setStatus] = React.useState('loading')
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [deactivated, setDeactivated] = React.useState('')
  const [office, setOffice] = React.useState('')
  const [position, setPosition] = React.useState('')
  const [area_of_responsibility, setAreaOfResponsibility] = React.useState('')
  const [permissions, setPermissions] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [updated_at, setUpdatedAt] = React.useState('')

  // ON FETCH USER
  React.useEffect(() => {
    if (U.loading) setStatus('loading')
    if (U.error) setStatus('error')

    if (U.data) {
      setStatus('success')
      setName(U.data.name?.toUpperCase())
      setEmail(U.data.email)
      setDeactivated(U.data.deactivated ? 'YES' : 'NO')
      setOffice(U.data.office?.toUpperCase() || 'NOT FOUND')
      setPosition(U.data.position?.toUpperCase() || 'NOT FOUND')
      setAreaOfResponsibility(() => {
        return Utils.commaSeparated([U.data?.vicinity_barangay, U.data?.vicinity_municipal, U.data?.vicinity_province])
      })
      setPermissions(() => {
        return U.data?.permissions?.length
          ? `This account can ${Utils.commaSeparated(U.data?.permissions || [''])
              .replace(/_/g, ' ')
              .replace(/,(?=[^,]*$)/, ' and')}.`
          : 'NO PERMISSION FOUND'
      })
      setUpdatedAt(Utils.formatDate(U.data?.updated_at))

      let entropy = new Entropy({ total: 1e6, risk: 1e9 }).string()
      let pass = entropy.substring(0, 8)
      setPassword(pass)
    }

    return () => setStatus('loading')
  }, [U.loading, U.error, U.data])

  // SEND DELETE USER REQUEST
  function deleteUser() {
    const URL = process.env.BASE_URL + '/users/' + ROUTE.user_id
    const CONFIG = { headers: { Authorization: `Bearer ${localStorage.getItem('q-phn-token')}` } }

    axios
      .delete(URL, CONFIG)
      .then((response) => {
        if (response.status === 204) {
          setStatus('success') // SUCCESSFUL OPERATION
          toast.success('User deleted successfully')
          navigate('/users')
        }
      })
      .catch((error) => {
        setStatus('success')
        if (error.response) {
          if (error.response?.status === 403) {
            toast.error('User credential is forbidden') // USER CREDENTIAL IS FORBIDDEN
          } else if (error.response?.status === 403) {
            toast.error('User was not found') // USER WAS NOT FOUND
          } else if (error.response?.status === 500) {
            toast.error('Unexpected server error') // UNEXPECTED SERVER ERROR
          }
        } else if (error.request) {
          console.error(error.request)
        } else {
          console.error('Error', error.message)
        }
      })
  }

  // DISPLAY DELETE ALERT
  function deleteAlert() {
    confirmAlert({
      title: 'Delete Permanently',
      message: 'This user will be permanently lost and you will not be able to recover it',
      buttons: [{ label: 'Yes', onClick: () => deleteUser() }, { label: 'No' }]
    })
  }

  // DOWNLOAD USER ACCESS TICKET
  function downloadUAT(data) {
    toast.info('Downloading User Access Ticket')
    toJpeg(document.getElementById('UserAccessTicket'))
      .then((dataUrl) => {
        var link = document.createElement('a')
        link.download = `Q-PHN MIS: ${data.name}.jpeg`
        link.href = dataUrl
        link.click()
      })
      .then(() => {
        toast.success('Downloaded successfully')
      })
      .catch(() => {
        toast.error('Download failed')
      })
  }

  // SEND PATCH RESET PASSWORD REQUEST
  function resetPassword() {
    setStatus('loading')

    const URL = process.env.BASE_URL + '/users/' + ROUTE.user_id
    const DATA = { password: password }
    const CONFIG = { headers: { Authorization: `Bearer ${localStorage.getItem('q-phn-token')}` } }

    axios
      .patch(URL, DATA, CONFIG)
      .then((response) => {
        if (response.status === 201) {
          setStatus('success') // SUCCESSFUL OPERATION
          toast.success('Password has been reset successfully')
          downloadUAT(response.data)
        }
      })
      .catch((error) => {
        setStatus('success')
        if (error.response) {
          if (error.response?.status === 400) {
            toast.error('Form input is invalid') // FORM INPUT IS INVALID
          } else if (error.response?.status === 403) {
            toast.error('User credential is forbidden') // USER CREDENTIAL IS FORBIDDEN
          } else if (error.response?.status === 404) {
            toast.error('User was not found') // USER WAS NOT FOUND
          } else if (error.response?.status === 500) {
            toast.error('Unexpected server error') // UNEXPECTED SERVER ERROR
          }
        } else if (error.request) {
          console.error(error.request)
        } else {
          console.error('Error', error.message)
        }
      })
  }

  // DISPLAY RESET PASSWORD ALERT
  function resetPasswordAlert() {
    confirmAlert({
      title: 'Reset Password',
      message: 'Reset password and download new User Access Ticket',
      buttons: [{ label: 'Reset', onClick: () => resetPassword() }, { label: 'Cancel' }]
    })
  }

  return (
    <Authorization permissions={ACCOUNT.permissions} permission="read_user">
      <PageTitle title="User Account" description="Person with an account to use the Q-PHN MIS." />
      <PageSubtitle status={status} text={name} />
      <SectionHeader title="Account">
        <ButtonIcon
          onClick={() => navigate('/users/' + ROUTE.user_id + '/edit')}
          permission="write_user"
          permissions={ACCOUNT.permissions}
          status={status}
          title="Edit user account">
          <Edit20 />
        </ButtonIcon>
        <ButtonIcon onClick={deleteAlert} permission="write_user" permissions={ACCOUNT.permissions} status={status} title="Delete user account">
          <TrashCan20 />
        </ButtonIcon>
        <ButtonIcon onClick={() => navigate('/users')} status={status} title="Close">
          <Close20 />
        </ButtonIcon>
      </SectionHeader>
      <SectionBody>
        <Field label="Email" status={status} text={email} />
        <Field label="Deactivated" status={status} text={deactivated} />
      </SectionBody>
      <SectionHeader title="Office" />
      <SectionBody>
        <Field label="Office Name" status={status} text={office || 'NOT FOUND'} />
        <Field label="Position" status={status} text={position || 'NOT FOUND'} />
      </SectionBody>
      <SectionHeader title="Area of Responsibility" />
      <SectionBody status={status} text={area_of_responsibility} />
      <SectionHeader title="Permissions" />
      <SectionBody status={status} text={permissions} />
      <SectionFooter />
      <SectionHeader title="Reset Password">
        <ButtonIcon onClick={resetPasswordAlert} permission="write_user" permissions={ACCOUNT.permissions} status={status} title="Reset password">
          <Password20 />
        </ButtonIcon>
      </SectionHeader>
      <SectionBody>
        <div id="UserAccessTicket" className="user-account-ticket">
          <p className="user-account-ticket-title">User Access Ticket</p>
          <p className="user-account-ticket-subtitle">Q-PHN MIS</p>
          <p className="user-account-ticket-item">Name: {name}</p>
          <p className="user-account-ticket-item">Email: {email}</p>
          <p className="user-account-ticket-item">Password: {password}</p>
          <p className="user-account-ticket-item">Office: {office}</p>
          <p className="user-account-ticket-item">Position: {position}</p>
          <p className="user-account-ticket-note">
            Upon receipt of this ticket, use it immediately and change your password. Please refrain from sharing your password, thanks.
          </p>
        </div>
      </SectionBody>
      <SectionFooter status={status}>Last Update: {updated_at}</SectionFooter>
    </Authorization>
  )
}

export default UserView
