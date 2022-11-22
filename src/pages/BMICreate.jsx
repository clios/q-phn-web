import { navigate, useParams } from '@reach/router'

import AccountContext from '../contexts/AccountContext'
import Authorization from '../components/Authorization'
import Button from '../components/Button'
import ButtonIcon from '../components/ButtonIcon'
import Cleave from 'cleave.js/react'
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
import { toast } from 'react-toastify'

function BMICreate() {
  // GET ROUTE PARAMS
  const ROUTE = useParams()

  // INFORMATION STATE
  const ACCOUNT = React.useContext(AccountContext)
  const [status, setStatus] = React.useState('success')
  const [helper, setHelper] = React.useState({})

  // INPUT STATE: INTERVIEW
  const [recorded_at, setRecordedAt] = React.useState('')
  const [height, setHeight] = React.useState('')
  const [weight, setWeight] = React.useState('')
  const [bmi, setBmi] = React.useState('')
  const [bmi_status, setBmiStatus] = React.useState('normal weight')

  // SEND POST BODE MASS REQUEST
  function submitForm(e) {
    e.preventDefault()
    setStatus('loading')

    const URL = process.env.BASE_URL + '/bodyMasses'
    const DATA = {
      bmi: FormUtils.number(bmi),
      height: FormUtils.number(height),
      weight: FormUtils.number(weight),
      recorded_at: FormUtils.dateAndNullable(recorded_at),
      resident_id: FormUtils.number(ROUTE.resident_id),
      status: FormUtils.emptyStringIsNull(bmi_status)
    }
    const CONFIG = { headers: { Authorization: `Bearer ${localStorage.getItem('q-phn-token')}` } }

    axios
      .post(URL, DATA, CONFIG)
      .then((response) => {
        setStatus('success')
        if (response.status === 201) {
          toast.success('Added a new BMI record') // SUCCESSFUL OPERATION
          navigate('/residents/' + response.data.resident_id, { replace: true })
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
    <Authorization permissions={ACCOUNT.permissions} permission="write_body_mass">
      <Form status={status}>
        <PageTitle title="New BMI" description="Create a new BMI record." />
        <SectionHeader title="Body Mass">
          <ButtonIcon onClick={() => navigate(-1)} title="Close this form">
            <Close20 />
          </ButtonIcon>
        </SectionHeader>
        <FormRow>
          <Field error={helper.recorded_at} label="Date Recorded" status={status}>
            <Input onChange={(e) => setRecordedAt(e.target.value)} size={35} type="date" value={recorded_at} />
          </Field>
          <Field error={helper.height} label="Height (cm)" status={status}>
            <Cleave
              className="input"
              onChange={(e) => setHeight(e.target.value)}
              size={10}
              type="text"
              options={{ numeral: true, numeralIntegerScale: 3, numeralDecimalScale: 2 }}
              value={height}
            />
          </Field>
          <Field error={helper.weight} label="Weight (kg)" status={status}>
            <Cleave
              className="input"
              onChange={(e) => setWeight(e.target.value)}
              size={10}
              type="text"
              options={{ numeral: true, numeralIntegerScale: 3, numeralDecimalScale: 2 }}
              value={weight}
            />
          </Field>
          <Field error={helper.weight} label="BMI" status={status}>
            <Cleave
              className="input"
              onChange={(e) => setBmi(e.target.value)}
              size={10}
              type="text"
              options={{ numeral: true, numeralIntegerScale: 3, numeralDecimalScale: 2 }}
              value={bmi}
            />
          </Field>
          <Field error={helper.bmi_status} label="Status" status={status}>
            <Select onChange={(e) => setBmiStatus(e.target.value)} value={bmi_status}>
              <option value="severly underweight">SEVERLY UNDERWEIGHT</option>
              <option value="underweight">UNDERWEIGHT</option>
              <option value="normal weight">NORMAL WEIGHT</option>
              <option value="overweight">OVERWEIGHT</option>
              <option value="obesity">OBESITY</option>
            </Select>
          </Field>
        </FormRow>
        <FormFooter>
          <Button
            disabled={status === 'loading'}
            loadingText="Creating..."
            onClick={submitForm}
            status={status}
            title="Create new BMI record"
            type="submit">
            Create
          </Button>
        </FormFooter>
      </Form>
    </Authorization>
  )
}

export default BMICreate
