import './SignIn.css'

import { Redirect, navigate } from '@reach/router'

import Button from '../components/Button'
import FadeAnimation from '../components/FadeAnimation'
import Field from '../components/Field'
import Form from '../components/Form'
import Input from '../components/Input'
import React from 'react'
import axios from 'axios'
import swrAccount from '../swr/swrAccount'
import { toast } from 'react-toastify'

function SignIn() {
  // SEND GET ACCOUNT REQUEST
  const has_token = localStorage.getItem('q-phn-token') ? true : false
  const A = swrAccount(has_token)

  // INFORMATION STATE
  const [status, setStatus] = React.useState('success')
  const [helper, setHelper] = React.useState('')

  // INPUT STATE
  const [email, setEmail] = React.useState('cliemtor@devhaus.ph')
  const [password, setPassword] = React.useState('admin123')

  // ON FETCH ACCOUNT
  React.useEffect(() => {
    if (has_token && A.loading) setStatus('loading')
    if (A.error) setStatus('error')
    if (A.data) setStatus('success')
    return () => setStatus('loading')
  }, [A.loading, A.error, A.data])

  // SEND POST LOGIN REQUEST
  function submitForm(e) {
    e.preventDefault()
    setStatus('loading')

    const URL = process.env.BASE_URL + '/login'
    const DATA = { email: email, password: password }

    axios
      .post(URL, DATA)
      .then((response) => {
        setStatus('success') // SUCCESSFUL OPERATION
        if (response.status === 201) {
          localStorage.setItem('q-phn-token', response.headers.token)
          toast.success('Welcome ' + response?.data?.name)
          navigate('/dashboard/residents', { replace: true })
        }
      })
      .catch((error) => {
        setStatus('success')
        if (error.response) {
          if (error.response?.status === 400) {
            toast.error('Form input is invalid') // FORM INPUT IS INVALID
          } else if (error.response?.status === 401) {
            toast.error('Email and/or password is incorrect') // AUTHENTICATION FAILED
          } else if (error.response?.status === 403) {
            toast.error('Your account was deactivated') // USER ACCOUNT IS DEACTIVATED
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
      <div className="sign-in-container">
        {A.data && <Redirect to="/dashboard/residents" noThrow replace />}
        <div className="sign-in-content bg-gray">
          <img className="sign-in-image" src={require('../assets/sign_in_bg.png')} alt="quirino_logo_medicine" />
          <Form className="sign-in-form" onSubmit={submitForm} status={status}>
            <div className="sign-in-title">Q-PHN MIS v2</div>
            <p className="sign-in-note">By signing in, you agree to our Terms of Use and Privacy Policy.</p>
            <Field label="Email">
              <Input className="sign-in-email" onChange={(e) => setEmail(e.target.value)} required size="35" type="email" value={email} />
            </Field>
            <Field label="Password" error={helper}>
              <Input
                className="sign-in-password"
                onChange={(e) => setPassword(e.target.value)}
                onKeyUp={(e) => {
                  e.getModifierState('CapsLock') ? setHelper('⚠️ Caps Lock is on') : setHelper('')
                }}
                required
                size="35"
                type="password"
                value={password}
              />
            </Field>
            <Button className="sign-in-button" disabled={status === 'loading'} loadingText="Signing in..." type="submit" status={status}>
              Sign in
            </Button>
          </Form>
        </div>
      </div>
    </FadeAnimation>
  )
}

export default SignIn
