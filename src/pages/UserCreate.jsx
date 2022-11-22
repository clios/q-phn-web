import * as Address from '../address/getAddress'

import AccountContext from '../contexts/AccountContext'
import Authorization from '../components/Authorization'
import Button from '../components/Button'
import ButtonIcon from '../components/ButtonIcon'
import Checkbox from '../components/Checkbox'
import { Close20 } from '@carbon/icons-react'
import { Entropy } from 'entropy-string'
import Field from '../components/Field'
import Form from '../components/Form'
import FormFooter from '../components/FormFooter'
import FormRow from '../components/FormRow'
import Input from '../components/Input'
import PageTitle from '../components/PageTitle'
import React from 'react'
import SectionHeader from '../components/SectionHeader'
import Select from '../components/Select'
import axios from 'axios'
import { confirmAlert } from 'react-confirm-alert'
import { navigate } from '@reach/router'
import { toJpeg } from 'html-to-image'
import { toast } from 'react-toastify'

function UserCreate() {
  // INFORMATIONAL STATE
  const ACCOUNT = React.useContext(AccountContext)
  const [status, setStatus] = React.useState('success')
  const [helper, setHelper] = React.useState({})
  const [password, setPassword] = React.useState('')

  // INPUT STATE: ACCOUNT
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')

  // INPUT STATE: OFFICE
  const [office, setOffice] = React.useState('')
  const [position, setPosition] = React.useState('')

  // INPUT STATE: AREA OF RESPONSIBILITY
  const [vicinity_barangay, setVicinityBarangay] = React.useState('')
  const [vicinity_municipal, setVicinityMunicipal] = React.useState('')
  const [vicinity_province, setVicinityProvince] = React.useState('QUIRINO')

  // INPUT STATE: PERMISSIONS
  const [read_dashboard, setReadDashboard] = React.useState(true)
  const [read_location, setReadLocation] = React.useState(true)
  const [read_census, setReadCensus] = React.useState(true)
  const [read_resident, setReadResidents] = React.useState(true)
  const [write_resident, setWriteResidents] = React.useState(true)
  const [read_body_mass, setReadBodyMasses] = React.useState(true)
  const [write_body_mass, setWriteBodyMasses] = React.useState(true)
  const [read_family, setReadFamilies] = React.useState(true)
  const [write_family, setWriteFamilies] = React.useState(true)
  const [read_user, setReadUsers] = React.useState(false)
  const [write_user, setWriteUsers] = React.useState(false)

  React.useState(() => {
    let entropy = new Entropy({ total: 1e6, risk: 1e9 }).string()
    let pass = entropy.substring(0, 8)
    setPassword(pass)
    return () => setPassword('')
  }, [])

  // DOWNLOAD USER ACCESS TICKET
  function downloadUAT(data) {
    toJpeg(document.getElementById('UserAccessTicket'))
      .then((dataUrl) => {
        var link = document.createElement('a')
        link.download = `Q-PHN MIS: ${data.name}.jpeg`
        link.href = dataUrl
        link.click()
      })
      .then(() => {
        toast.success('UAT Downloaded')
        successAlert()
      })
      .catch(() => {
        toast.error('Download failed')
      })
  }

  // DISPLAY DELETE ALERT
  function successAlert() {
    confirmAlert({
      title: 'User Created',
      message: 'Return to users table',
      buttons: [{ label: 'Yes', onClick: () => navigate(-1, { replace: true }) }]
    })
  }

  // SEND POST USER REQUEST
  function submitForm(e) {
    e.preventDefault()
    setStatus('loading')

    const URL = process.env.BASE_URL + '/users'
    const DATA = {
      email: email,
      name: name?.toUpperCase(),
      office: office?.toUpperCase(),
      password: password,
      permissions: [
        read_dashboard && 'read_dashboard',
        read_location && 'read_location',
        read_census && 'read_census',
        read_resident && 'read_resident',
        write_resident && 'write_resident',
        read_body_mass && 'read_body_mass',
        write_body_mass && 'write_body_mass',
        read_family && 'read_family',
        write_family && 'write_family',
        read_user && 'read_user',
        write_user && 'write_user'
      ].filter(Boolean),
      position: position?.toUpperCase(),
      vicinity_barangay: vicinity_barangay,
      vicinity_municipal: vicinity_municipal,
      vicinity_province: vicinity_province
    }
    const CONFIG = { headers: { Authorization: `Bearer ${localStorage.getItem('q-phn-token')}` } }

    axios
      .post(URL, DATA, CONFIG)
      .then((response) => {
        if (response.status === 201) {
          setStatus('success') // SUCCESSFUL OPERATION
          toast.success('New user created successfully')
          downloadUAT(response.data)
        }
      })
      .catch((error) => {
        setStatus('success')
        if (error.response) {
          if (error.response?.status === 400) {
            setHelper(error.response.data) // FORM INPUT IS INVALID
            toast.error('Form input is invalid')
          } else if (error.response?.status === 403) {
            toast.error('User credential is forbidden') // USER CREDENTIAL IS FORBIDDEN
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

  return (
    <Authorization permissions={ACCOUNT.permissions} permission="write_user">
      <Form status={status}>
        <PageTitle title="New User" description="Create a new user account." />
        <SectionHeader title="Account">
          <ButtonIcon onClick={() => navigate(-1)} title="Close this form">
            <Close20 />
          </ButtonIcon>
        </SectionHeader>
        <FormRow>
          <Field error={helper.name} label="Full Name" status={status}>
            <Input className="uppercase" onChange={(e) => setName(e.target.value)} required size={30} type="text" value={name} />
          </Field>
          <Field error={helper.email} label="Email" status={status}>
            <Input onChange={(e) => setEmail(e.target.value)} required size={30} type="email" value={email} />
          </Field>
        </FormRow>
        <SectionHeader title="Office" />
        <FormRow>
          <Field label="Office Name" status={status}>
            <Input className="uppercase" onChange={(e) => setOffice(e.target.value)} required size={30} type="text" value={office} />
          </Field>
          <Field label="Position" status={status}>
            <Input className="uppercase" onChange={(e) => setPosition(e.target.value)} required size={30} type="text" value={position} />
          </Field>
        </FormRow>
        <SectionHeader title="Area of Responsibility" />
        <FormRow>
          <Field label="Region" status={status}>
            <Input disabled defaultValue="02" size={5} type="text" />
          </Field>
          <Field label="Province" status={status}>
            <Input disabled onChange={(e) => setVicinityProvince(e.target.value)} required size={10} type="text" value={vicinity_province} />
          </Field>
          <Field label="Municipality" status={status}>
            <Select
              onChange={(e) => {
                setVicinityBarangay('')
                setVicinityMunicipal(e.target.value)
              }}
              value={vicinity_municipal}>
              <option value="">ALL MUNICIPALITIES</option>
              {Address.getMunicipalityList('02', vicinity_province).map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </Field>
          <Field label="Barangay" status={status}>
            <Select onChange={(e) => setVicinityBarangay(e.target.value)} value={vicinity_barangay}>
              <option value="">ALL BARANGAYS</option>
              {Address.getBarangayList('02', vicinity_province, vicinity_municipal).map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </Select>
          </Field>
        </FormRow>
        <SectionHeader title="Permissions" error={helper.permissions} />
        <FormRow status={status}>
          <Checkbox checked={read_dashboard} onChange={(e) => setReadDashboard(e.target.checked)} text="Read Dashboard" />
          <Checkbox checked={read_location} onChange={(e) => setReadLocation(e.target.checked)} text="Read Location" />
          <Checkbox checked={read_census} onChange={(e) => setReadCensus(e.target.checked)} text="Read Census" />
        </FormRow>
        <FormRow status={status}>
          <Checkbox checked={read_resident} onChange={(e) => setReadResidents(e.target.checked)} text="Read Residents" />
          <Checkbox checked={write_resident} onChange={(e) => setWriteResidents(e.target.checked)} text="Write Residents" />
        </FormRow>
        <FormRow status={status}>
          <Checkbox checked={read_body_mass} onChange={(e) => setReadBodyMasses(e.target.checked)} text="Read Body Masses" />
          <Checkbox checked={write_body_mass} onChange={(e) => setWriteBodyMasses(e.target.checked)} text="Write Body Masses" />
        </FormRow>
        <FormRow status={status}>
          <Checkbox checked={read_family} onChange={(e) => setReadFamilies(e.target.checked)} text="Read Families" />
          <Checkbox checked={write_family} onChange={(e) => setWriteFamilies(e.target.checked)} text="Write Families" />
        </FormRow>
        <FormRow status={status}>
          <Checkbox checked={read_user} onChange={(e) => setReadUsers(e.target.checked)} text="Read Users" />
          <Checkbox checked={write_user} onChange={(e) => setWriteUsers(e.target.checked)} text="Write Users" />
        </FormRow>
        <SectionHeader title="User Access Ticket" />
        <FormRow>
          <div id="UserAccessTicket" className="user-account-ticket">
            <p className="user-account-ticket-title">User Access Ticket</p>
            <p className="user-account-ticket-subtitle">Q-PHN MIS</p>
            <p className="user-account-ticket-item">Name: {name?.toUpperCase() || 'N/A'}</p>
            <p className="user-account-ticket-item">Email: {email || 'N/A'}</p>
            <p className="user-account-ticket-item">Password: {password}</p>
            <p className="user-account-ticket-item">Office: {office?.toUpperCase() || 'N/A'}</p>
            <p className="user-account-ticket-item">Position: {position?.toUpperCase() || 'N/A'}</p>
            <p className="user-account-ticket-note">
              Upon receipt of this ticket, use it immediately and change your password. Please refrain from sharing your password, thanks.
            </p>
          </div>
        </FormRow>
        <FormFooter>
          <Button
            disabled={status === 'loading'}
            loadingText="Creating..."
            onClick={submitForm}
            status={status}
            title="Create new user"
            type="submit">
            Create
          </Button>
        </FormFooter>
      </Form>
    </Authorization>
  )
}

export default UserCreate
