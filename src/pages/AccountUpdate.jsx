import { Redirect, navigate } from '@reach/router'

import Button from '../components/Button'
import ButtonIcon from '../components/ButtonIcon'
import { Close20 } from '@carbon/icons-react'
import FadeAnimation from '../components/FadeAnimation'
import Field from '../components/Field'
import Form from '../components/Form'
import FormFooter from '../components/FormFooter'
import FormRow from '../components/FormRow'
import Input from '../components/Input'
import PageSubtitle from '../components/PageSubtitle'
import PageTitle from '../components/PageTitle'
import React from 'react'
import SectionHeader from '../components/SectionHeader'
import axios from 'axios'
import swrAccount from '../swr/swrAccount'
import { toast } from 'react-toastify'

function AccountUpdate() {
  // SEND GET ACCOUNT REQUEST
  const has_token = localStorage.getItem('q-phn-token') ? true : false
  const A = swrAccount(has_token)
  if (!has_token) return <Redirect to="/" noThrow replace />

  // INFORMATION STATE
  const [status, setStatus] = React.useState('loading')
  const [helper, setHelper] = React.useState({})
  const [password, setPassword] = React.useState(null)

  // INPUT STATE: ACCOUNT
  const [name, setName] = React.useState(A.data.name)
  const [email, setEmail] = React.useState(A.data.email)
  const [new_password, setNewPassword] = React.useState('')
  const [confirm_password, setConfirmPassword] = React.useState('')

  React.useEffect(() => {
    if (has_token && A.loading) setStatus('loading')
    if (A.error) setStatus('error')

    if (A.data) {
      setStatus('success')
      setName(A.data.name)
      setEmail(A.data.email)
    }

    return () => setStatus('loading')
  }, [A.data, A.loading, A.error])

  // SEND PATCH ACCOUNT REQUEST
  function submitForm(e) {
    e.preventDefault()

    if (new_password !== confirm_password) {
      toast.error('Password mismatched')
      return
    }

    setStatus('loading')

    const URL = process.env.BASE_URL + '/account'
    const DATA = { email: email, name: name, password: password }
    const CONFIG = { headers: { Authorization: `Bearer ${localStorage.getItem('q-phn-token')}` } }

    axios
      .patch(URL, DATA, CONFIG)
      .then((response) => {
        if (response.status === 201) {
          setStatus('success') // SUCCESSFUL OPERATION
          toast.success('Your account updated successfully')
          navigate('/account')
        }
      })
      .catch((error) => {
        setNewPassword('')
        setConfirmPassword('')
        setPassword(null)
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
    <FadeAnimation>
      <Form status={status}>
        <PageTitle title="Edit Your Account" description="Modify your account name, email or password." />
        <PageSubtitle status={status}>{name}</PageSubtitle>
        <SectionHeader title="Account">
          <ButtonIcon onClick={() => navigate(-1)} title="Close this form">
            <Close20 />
          </ButtonIcon>
        </SectionHeader>
        <FormRow>
          <Field error={helper.name} label="Name" status={status}>
            <Input className="uppercase" onChange={(e) => setName(e.target.value)} size={20} type="text" value={name} />
          </Field>
          <Field error={helper.email} label="Email" status={status}>
            <Input onChange={(e) => setEmail(e.target.value)} size={30} type="email" value={email} />
          </Field>
        </FormRow>
        <SectionHeader title="Password" subtitle="If you do not wish to change your password, just leave it blank." />
        <FormRow>
          <Field error={helper.new_password} label="New password" status={status}>
            <Input
              maxLength={255}
              minLength={8}
              onChange={(e) => {
                setNewPassword(e.target.value)
                setConfirmPassword('')
                setPassword(null)
              }}
              onKeyUp={(e) => {
                e.getModifierState('CapsLock') ? setHelper({ new_password: '⚠️ Caps Lock is on' }) : setHelper({})
              }}
              size={35}
              type="password"
              value={new_password}
            />
          </Field>
          <Field error={helper.confirm_password} label="Confirm password" status={status}>
            <Input
              maxLength={255}
              minLength={8}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                if (new_password === e.target.value) {
                  toast.info('Password matched')
                  setPassword(e.target.value)
                }
              }}
              onKeyUp={(e) => {
                e.getModifierState('CapsLock') ? setHelper({ confirm_password: '⚠️ Caps Lock is on' }) : setHelper({})
              }}
              required={new_password ? true : false}
              size={35}
              type="password"
              value={confirm_password}
            />
          </Field>
        </FormRow>
        <FormRow>
          <Field error={helper.password} />
        </FormRow>
        <FormFooter>
          <Button
            disabled={status === 'loading'}
            loadingText="Updating..."
            onClick={submitForm}
            status={status}
            title="Update your account"
            type="submit">
            Update
          </Button>
        </FormFooter>
      </Form>
    </FadeAnimation>
  )
}

export default AccountUpdate
