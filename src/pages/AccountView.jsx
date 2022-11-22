import * as Utils from '../Utils'

import ButtonIcon from '../components/ButtonIcon'
import { Edit20 } from '@carbon/icons-react'
import FadeAnimation from '../components/FadeAnimation'
import Field from '../components/Field'
import PageSubtitle from '../components/PageSubtitle'
import PageTitle from '../components/PageTitle'
import React from 'react'
import SectionBody from '../components/SectionBody'
import SectionFooter from '../components/SectionFooter'
import SectionHeader from '../components/SectionHeader'
import { navigate } from '@reach/router'
import swrAccount from '../swr/swrAccount'

function AccountView() {
  // SEND GET ACCOUNT REQUEST
  const has_token = localStorage.getItem('q-phn-token') ? true : false
  const A = swrAccount(has_token)
  if (!has_token) return <Redirect to="/" noThrow replace />

  // INFORMATION STATE
  const [status, setStatus] = React.useState('loading')
  const [name, setName] = React.useState('')
  const [email, setEmail] = React.useState('')
  const [office, setOffice] = React.useState('')
  const [position, setPosition] = React.useState('')
  const [area_of_responsibility, setAreaOfResponsibility] = React.useState('')
  const [permissions, setPermissions] = React.useState('')
  const [updated_at, setUpdatedAt] = React.useState('')

  // ON FETCH ACCOUNT
  React.useEffect(() => {
    if (has_token && A.loading) setStatus('loading')
    if (A.error) setStatus('error')

    if (A.data) {
      setStatus('success')
      setName(A.data.name?.toUpperCase())
      setEmail(A.data.email)
      setOffice(A.data.office?.toUpperCase() || 'NOT FOUND')
      setPosition(A.data.position?.toUpperCase() || 'NOT FOUND')
      setAreaOfResponsibility(() => {
        return Utils.commaSeparated([A.data?.vicinity_barangay, A.data?.vicinity_municipal, A.data?.vicinity_province])
      })
      setPermissions(() => {
        return A.data?.permissions?.length
          ? `This account can ${Utils.commaSeparated(A.data?.permissions || [''])
              .replace(/_/g, ' ')
              .replace(/,(?=[^,]*$)/, ' and')}.`
          : 'NO PERMISSION FOUND'
      })
      setUpdatedAt(Utils.formatDate(A.data?.updated_at))
    }

    return () => setStatus('loading')
  }, [A.data, A.loading, A.error])

  return (
    <FadeAnimation>
      <PageTitle title="Your Account" description="Your account gives you an access to use the system." />
      <PageSubtitle status={status} text={A.data.name} />
      <SectionHeader title="Account">
        <ButtonIcon onClick={() => navigate('/account/edit')} status={status} title="Edit your account">
          <Edit20 />
        </ButtonIcon>
      </SectionHeader>
      <SectionBody>
        <Field label="Email" status={status} text={email} />
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
      <SectionFooter status={status}>Last Update: {updated_at}</SectionFooter>
    </FadeAnimation>
  )
}

export default AccountView
