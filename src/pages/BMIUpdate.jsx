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
import VicinityChecker from '../components/VicinityChecker'
import ViewUtils from '../utils/ViewUtils'
import axios from 'axios'
import swrBodyMass from '../swr/swrBodyMass'
import swrResident from '../swr/swrResident'
import { toast } from 'react-toastify'

function BMIUpdate() {
  // SEND GET RESIDENT REQUEST
  const ROUTE = useParams()
  const R = swrResident(ROUTE.resident_id)
  const BM = swrBodyMass(ROUTE.bmi_id)

  // INFORMATION STATE
  const ACCOUNT = React.useContext(AccountContext)
  const [status, setStatus] = React.useState('loading')
  const [helper, setHelper] = React.useState({})

  // INPUT STATE: INTERVIEW
  const [recorded_at, setRecordedAt] = React.useState('')
  const [height, setHeight] = React.useState('')
  const [weight, setWeight] = React.useState('')
  const [bmi, setBmi] = React.useState('')
  const [bmi_status, setBmiStatus] = React.useState('normal weight')

  // ON FETCH BMI
  React.useEffect(() => {
    if (BM.loading) setStatus('loading')
    if (BM.error) setStatus('error')

    if (BM.data) {
      setStatus('success')
      setRecordedAt(FormUtils.dateOrEmpty(BM.data.recorded_at))
      setHeight(FormUtils.valOrEmpty(BM.data.height))
      setWeight(FormUtils.valOrEmpty(BM.data.weight))
      setBmi(FormUtils.valOrEmpty(BM.data.bmi))
      setBmiStatus(FormUtils.valOrEmpty(BM.data.status))
    }

    return () => setStatus('loading')
  }, [BM.loading, BM.error, BM.data])

  // SEND PATCH BMI REQUEST
  function submitForm(e) {
    e.preventDefault()
    setStatus('loading')

    const URL = process.env.BASE_URL + '/bodyMasses/' + ROUTE.bmi_id
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
      .patch(URL, DATA, CONFIG)
      .then((response) => {
        setStatus('success')
        if (response.status === 201) {
          toast.success('BMI updated successfully') // SUCCESSFUL OPERATION
          navigate('/residents/' + ROUTE.resident_id, { replace: true })
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
    <Authorization permissions={ACCOUNT.permissions} permission="write_body_mass">
      {status === 'success' && (
        <VicinityChecker
          accountVicinity={ViewUtils.arrayTextCapsOrNotFound([ACCOUNT.vicinity_province, ACCOUNT.vicinity_municipal, ACCOUNT.vicinity_barangay])}
          recordAddress={ViewUtils.arrayTextCapsOrNotFound([R.data?.address_province, R.data?.address_municipal, R.data?.address_barangay])}
        />
      )}
      <Form status={status}>
        <PageTitle title="Edit BMI" description="Modify BMI record." />
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
            loadingText="Updating..."
            onClick={submitForm}
            status={status}
            title="Update BMI record"
            type="submit">
            Update
          </Button>
        </FormFooter>
      </Form>
    </Authorization>
  )
}

export default BMIUpdate
