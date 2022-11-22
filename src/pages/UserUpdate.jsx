import * as Address from '../address/getAddress'
import * as Utils from '../Utils'

import { navigate, useParams } from '@reach/router'

import AccountContext from '../contexts/AccountContext'
import Authorization from '../components/Authorization'
import Button from '../components/Button'
import ButtonIcon from '../components/ButtonIcon'
import Checkbox from '../components/Checkbox'
import { Close20 } from '@carbon/icons-react'
import Field from '../components/Field'
import Form from '../components/Form'
import FormFooter from '../components/FormFooter'
import FormRow from '../components/FormRow'
import FormUtils from '../utils/FormUtils'
import Input from '../components/Input'
import PageTitle from '../components/PageTitle'
import React from 'react'
import SectionHeader from '../components/SectionHeader'
import Select from '../components/Select'
import axios from 'axios'
import swrUser from '../swr/swrUser'
import { toast } from 'react-toastify'

function UserUpdate() {
  // SEND GET USER REQUEST
  const ROUTE = useParams()
  const U = swrUser(ROUTE.user_id)

  // INFORMATIONAL STATE
  const ACCOUNT = React.useContext(AccountContext)
  const [status, setStatus] = React.useState('success')
  const [helper, setHelper] = React.useState({})

  // INPUT STATE: ACCOUNT
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [deactivated, setDeactivated] = React.useState(false)

  // INPUT STATE: OFFICE
  const [office, setOffice] = React.useState('')
  const [position, setPosition] = React.useState('')

  // INPUT STATE: AREA OF RESPONSIBILITY
  const [vicinity_barangay, setVicinityBarangay] = React.useState('')
  const [vicinity_municipal, setVicinityMunicipal] = React.useState('')
  const [vicinity_province, setVicinityProvince] = React.useState('QUIRINO')

  // INPUT STATE: PERMISSIONS
  const [read_dashboard, setReadDashboard] = React.useState(false)
  const [read_location, setReadLocation] = React.useState(false)
  const [read_census, setReadCensus] = React.useState(false)
  const [read_resident, setReadResidents] = React.useState(false)
  const [write_resident, setWriteResidents] = React.useState(false)
  const [read_body_mass, setReadBodyMasses] = React.useState(false)
  const [write_body_mass, setWriteBodyMasses] = React.useState(false)
  const [read_family, setReadFamilies] = React.useState(false)
  const [write_family, setWriteFamilies] = React.useState(false)
  const [read_user, setReadUsers] = React.useState(false)
  const [write_user, setWriteUsers] = React.useState(false)

  // ON FETCH USER
  React.useEffect(() => {
    if (U.loading) setStatus('loading')
    if (U.error) setStatus('error')

    if (U.data) {
      setStatus('success')

      // CURRENT ACCOUNT STATE
      setName(U.data.name)
      setEmail(U.data.email)
      setDeactivated(FormUtils.factualOrEmpty(U.data.deactivated))

      // CURRENT OFFICE STATE
      setOffice(U.data.office)
      setPosition(U.data.position)

      // CURRENT AREA OF RESPONSIBILITY STATE
      setVicinityProvince(U.data.vicinity_province)
      setVicinityMunicipal(U.data.vicinity_municipal)
      setVicinityBarangay(U.data.vicinity_barangay)

      // CURRENT PERMISSION STATE
      setReadDashboard(Utils.hasPermission(U.data.permissions, 'read_dashboard'))
      setReadLocation(Utils.hasPermission(U.data.permissions, 'read_location'))
      setReadCensus(Utils.hasPermission(U.data.permissions, 'read_census'))
      setReadResidents(Utils.hasPermission(U.data.permissions, 'read_resident'))
      setWriteResidents(Utils.hasPermission(U.data.permissions, 'write_resident'))
      setReadBodyMasses(Utils.hasPermission(U.data.permissions, 'read_body_mass'))
      setWriteBodyMasses(Utils.hasPermission(U.data.permissions, 'write_body_mass'))
      setReadFamilies(Utils.hasPermission(U.data.permissions, 'read_family'))
      setWriteFamilies(Utils.hasPermission(U.data.permissions, 'write_family'))
      setReadUsers(Utils.hasPermission(U.data.permissions, 'read_user'))
      setWriteUsers(Utils.hasPermission(U.data.permissions, 'write_user'))
    }

    return () => setStatus('loading')
  }, [U.loading, U.error, U.data])

  // SEND PATCH USER REQUEST
  function submitForm(e) {
    e.preventDefault()
    setStatus('loading')

    const URL = process.env.BASE_URL + '/users/' + ROUTE.user_id
    const DATA = {
      email: email,
      name: name?.toUpperCase(),
      office: office?.toUpperCase(),
      deactivated: FormUtils.booleanAndNullable(deactivated),
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
      .patch(URL, DATA, CONFIG)
      .then((response) => {
        if (response.status === 201) {
          setStatus('success') // SUCCESSFUL OPERATION
          toast.success('User updated successfully')
          navigate('/users/' + ROUTE.user_id, { replace: true })
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

  return (
    <Authorization permissions={ACCOUNT.permissions} permission="write_user">
      <Form status={status}>
        <PageTitle title="Edit User" description="Modify user account." />
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
          <Field label="Deactivated" status={status}>
            <Select onChange={(e) => setDeactivated(e.target.value)} value={deactivated}>
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </Select>
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
        <FormFooter>
          <Button
            disabled={status === 'loading'}
            loadingText="Updating..."
            onClick={submitForm}
            status={status}
            title="Update user account"
            type="submit">
            Update
          </Button>
        </FormFooter>
      </Form>
    </Authorization>
  )
}

export default UserUpdate
