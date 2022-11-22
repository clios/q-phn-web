import './Confirmation.css'

import { Redirect, navigate } from '@reach/router'

import Button from '../components/Button'
import Field from '../components/Field'
import Form from '../components/Form'
import Input from '../components/Input'
import React from 'react'
import axios from 'axios'
import swrAccount from '../swr/swrAccount'
import { toast } from 'react-toastify'

function Confirmation() {
  const has_token = localStorage.getItem('q-phn-token') ? true : false
  const { account, account_is_loading, account_is_error } = swrAccount(has_token)
  if (!has_token) return <Redirect to="/" noThrow replace />

  const [status, setStatus] = React.useState('loading')
  const [error_helper, setErrorHelper] = React.useState({})

  const [new_password, setNewPassword] = React.useState('')
  const [confirm_password, setConfirmPassword] = React.useState('')
  const [password, setPassword] = React.useState(null)

  React.useEffect(() => {
    if (has_token && account_is_loading) setStatus('loading')
    if (account_is_error) setStatus('error')
    if (account) setStatus('success')

    return () => {
      setStatus('loading')
    }
  }, [account, account_is_loading, account_is_error])

  function enterNewPassword(e) {
    setNewPassword(e.target.value)
    setConfirmPassword('')
    setPassword(null)
  }

  function enterConfirmPassword(e) {
    setConfirmPassword(e.target.value)
    if (new_password === e.target.value) {
      toast.info('Password matched')
      setPassword(e.target.value)
    }
  }

  function detectCapsLock(e) {
    const capsLockOn = e.getModifierState('CapsLock')
    if (capsLockOn) setErrorHelper({ password: '⚠️ Caps Lock is on' })
  }

  function submitForm(e) {
    e.preventDefault()

    if (!new_password || !confirm_password) {
      toast.error('Please update your password')
      return
    }

    if (new_password !== confirm_password) {
      toast.error('Password mismatched')
      return
    }

    setStatus('loading')

    axios
      .patch(
        process.env.BASE_URL + '/account',
        { password: password },
        { headers: { Authorization: `Bearer ${localStorage.getItem('q-phn-token')}` } }
      )
      .then((response) => {
        // Successful operation
        if (response.status === 201) {
          toast.success('Thank you!')
          navigate('/account')
        }

        setStatus('success')
      })
      .catch((error) => {
        setNewPassword('')
        setConfirmPassword('')
        setPassword(null)

        if (error.response) {
          // Form input is invalid
          if (error.response?.status === 400) {
            setErrorHelper(error.response.data)
            toast.error('Form input is invalid')
          }
          // User credential is forbidden
          if (error.response?.status === 403) {
            toast.error('User credential is forbidden')
          }
          // Unexpected server error occurs
          if (error.response?.status === 500) {
            toast.error('Unexpected server error')
          }
        } else if (error.request) {
          console.error(error.request)
        } else {
          console.error('Error', error.message)
        }

        setStatus('success')
      })
  }

  return (
    <div className="confirmation-container">
      <section className="bg-gray">
        <h1>Greetings My Friend</h1>
        <img className="image" src={require('../assets/hello.svg')} alt="hello" />
        <p>Q-PHN MIS is a software to manage health and nutrition related data.</p>
        <p>
          If you have queries on how to use the software, simply approach us at Community Forestry Foundation Quirino Incorporated (CFFQI) and we are
          happy to help you.
        </p>
      </section>
      <section className="bg-dark">
        <h1>Simplified Terms and Conditions</h1>
        <h2>So please read</h2>
        <img className="image" src={require('../assets/pizza.svg')} alt="hello" />
        <p>My friend, please make sure that the data you enter into the system has the permission of its owners.</p>
        <p>In addition, you will only enter real data into the system.</p>
        <p>Do not simply provide information to outsiders without the permission of your superiors.</p>
        <p>Do not use the data for personal interest.</p>
        <p>Don't talk about sensitive information outside just for fun.</p>
        <p>Q-PHN MIS strictly follows the Data Privacy Act of 2012 (Republic Act No. 10173).</p>
      </section>
      <section className="bg-gray">
        <h1>Our Agreement</h1>
        <img className="image" src={require('../assets/agreement.svg')} alt="hello" />
        <p>By updating your password, you also accept our terms and conditions.</p>
        <p>You are also giving us consent to collect, process and use your personal data in accordance with the Data Privacy Act of 2012.</p>
      </section>
      <section className="form bg-dark">
        <h1>Confirm By Updating Your Password</h1>
        <Form className="confirmation-form" status={status}>
          <Field status={status} label="New password">
            <Input
              maxLength={255}
              minLength={8}
              onChange={enterNewPassword}
              onKeyUp={detectCapsLock}
              required
              size={35}
              type="password"
              value={new_password}
            />
          </Field>
          <Field status={status} label="Confirm password">
            <Input
              maxLength={255}
              minLength={8}
              onChange={enterConfirmPassword}
              onKeyUp={detectCapsLock}
              required
              size={35}
              type="password"
              value={confirm_password}
            />
          </Field>
          <Button
            disabled={status === 'loading'}
            loadingText="Confirming..."
            onClick={submitForm}
            status={status}
            title="Confirm your account"
            type="submit">
            Confirm
          </Button>
        </Form>
      </section>
    </div>
  )
}

export default Confirmation
