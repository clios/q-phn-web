import * as Address from '../address/getAddress'

import { navigate, useParams } from '@reach/router'

import AccountContext from '../contexts/AccountContext'
import Authorization from '../components/Authorization'
import Button from '../components/Button'
import ButtonIcon from '../components/ButtonIcon'
import Checkbox from '../components/Checkbox'
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
import swrResident from '../swr/swrResident'
import { toast } from 'react-toastify'

function ResidentUpdate() {
  // SEND GET RESIDENT REQUEST
  const ROUTE = useParams()
  const R = swrResident(ROUTE.resident_id)

  // INFORMATION STATE
  const ACCOUNT = React.useContext(AccountContext)
  const [status, setStatus] = React.useState('loading')
  const [helper, setHelper] = React.useState({})

  // INPUT STATE: INTERVIEW
  const [recorded_at, setRecordedAt] = React.useState('')

  // INPUT STATE: PERSONAL
  const [name, setName] = React.useState('')
  const [birthday, setBirthday] = React.useState('')
  const [sex, setSex] = React.useState('')
  const [place_of_birth, setPlaceOfBirth] = React.useState('')
  const [nationality, setNationality] = React.useState('')
  const [ethnicity, setEthnicity] = React.useState('')
  const [blood_type, setBloodType] = React.useState('')
  const [marital_status, setMaritalStatus] = React.useState('')
  const [occupation, setOccupation] = React.useState('UNEMPLOYED')
  const [family_head, setFamilyHead] = React.useState('')
  const [household_head, setHouseholdHead] = React.useState('')

  // INPUT STATE: ADDRESS
  const [address_municipal, setAddressMunicipal] = React.useState(ACCOUNT.vicinity_municipal)
  const [address_barangay, setAddressBarangay] = React.useState(ACCOUNT.vicinity_barangay)
  const [address_purok, setAddressPurok] = React.useState('')
  const [address_street, setAddressStreet] = React.useState('')
  const [address_latitude, setAddressLatitude] = React.useState('')
  const [address_longitude, setAddressLongitude] = React.useState('')

  // INPUT STATE: SOCIO-CIVIC
  const [solo_parent, setSoloParent] = React.useState('')
  const [disability, setDisability] = React.useState('')
  const [member_of_4ps, setMemberOf4ps] = React.useState('')
  const [member_of_ips, setMemberOfIps] = React.useState('')

  // INPUT STATE: EDUCATIONAL BACKGROUND
  const [educational_attainment, setEducationalAttaintment] = React.useState('')
  const [enrolled, setEnrolled] = React.useState('')

  // INPUT STATE: HEALTH CASES
  const [goiter, setGoiter] = React.useState(false)
  const [anemia, setAnemia] = React.useState(false)
  const [vad, setVad] = React.useState(false)

  // INPUT STATE: PREGNANCY
  const [pregnant, setPregnant] = React.useState('')
  const [lactating, setLactating] = React.useState('')

  // INPUT STATE: MORTALITY
  const [deceased, setDeceased] = React.useState('')
  const [reason_of_death, setReasonOfDeath] = React.useState('')

  // ON FETCH RESIDENT
  React.useEffect(() => {
    if (R.loading) setStatus('loading')
    if (R.error) setStatus('error')

    if (R.data) {
      setStatus('success')
      setRecordedAt(FormUtils.dateOrEmpty(R.data.recorded_at))
      setName(FormUtils.valOrEmpty(R.data.name))
      setBirthday(FormUtils.dateOrEmpty(R.data.birthday))
      setSex(FormUtils.valOrEmpty(R.data.sex))
      setPlaceOfBirth(FormUtils.valOrEmpty(R.data.place_of_birth))
      setNationality(FormUtils.valOrEmpty(R.data.nationality))
      setEthnicity(FormUtils.valOrEmpty(R.data.ethnicity))
      setBloodType(FormUtils.valOrEmpty(R.data.blood_type))
      setMaritalStatus(FormUtils.valOrEmpty(R.data.marital_status))
      setOccupation(FormUtils.valOrEmpty(R.data.occupation))
      setFamilyHead(FormUtils.factualOrEmpty(R.data.family_head))
      setHouseholdHead(FormUtils.factualOrEmpty(R.data.household_head))
      setAddressMunicipal(FormUtils.valOrEmpty(R.data.address_municipal))
      setAddressBarangay(FormUtils.valOrEmpty(R.data.address_barangay))
      setAddressPurok(FormUtils.valOrEmpty(R.data.address_purok))
      setAddressStreet(FormUtils.valOrEmpty(R.data.address_street))
      setAddressLatitude(FormUtils.valOrEmpty(R.data.address_latitude))
      setAddressLongitude(FormUtils.valOrEmpty(R.data.address_longitude))
      setSoloParent(FormUtils.factualOrEmpty(R.data.solo_parent))
      setDisability(FormUtils.factualOrEmpty(R.data.disability))
      setMemberOf4ps(FormUtils.factualOrEmpty(R.data.member_of_4ps))
      setMemberOfIps(FormUtils.factualOrEmpty(R.data.member_of_ips))
      setEducationalAttaintment(FormUtils.valOrEmpty(R.data.educational_attainment))
      setEnrolled(FormUtils.factualOrEmpty(R.data.enrolled))
      setGoiter(FormUtils.onArrayOrFalse(R.data.health_cases, 'goiter'))
      setAnemia(FormUtils.onArrayOrFalse(R.data.health_cases, 'anemia'))
      setVad(FormUtils.onArrayOrFalse(R.data.health_cases, 'vad'))
      setPregnant(FormUtils.factualOrEmpty(R.data.pregnant))
      setLactating(FormUtils.factualOrEmpty(R.data.lactating))
      setDeceased(FormUtils.factualOrEmpty(R.data.deceased))
      setReasonOfDeath(FormUtils.valOrEmpty(R.data.reason_of_death))
    }

    return () => setStatus('loading')
  }, [R.loading, R.error, R.data])

  // SEND PATCH RESIDENT REQUEST
  function submitForm(e) {
    e.preventDefault()
    setStatus('loading')

    const URL = process.env.BASE_URL + '/residents/' + ROUTE.resident_id
    const DATA = {
      recorded_at: FormUtils.dateAndNullable(recorded_at),
      name: name?.toUpperCase(),
      birthday: FormUtils.dateAndNullable(birthday),
      sex: FormUtils.emptyStringIsNull(sex),
      place_of_birth: FormUtils.nullable(place_of_birth)?.toUpperCase(),
      nationality: FormUtils.nullable(nationality)?.toUpperCase(),
      ethnicity: FormUtils.nullable(ethnicity)?.toUpperCase(),
      blood_type: FormUtils.emptyStringIsNull(blood_type),
      marital_status: FormUtils.emptyStringIsNull(marital_status),
      occupation: FormUtils.emptyStringIsNull(occupation)?.toUpperCase(),
      family_head: FormUtils.booleanAndNullable(family_head),
      household_head: FormUtils.booleanAndNullable(household_head),
      address_province: 'QUIRINO',
      address_municipal: address_municipal,
      address_barangay: address_barangay,
      address_purok: FormUtils.emptyStringIsNull(address_purok),
      address_street: FormUtils.emptyStringIsNull(address_street),
      address_latitude: FormUtils.zeroIsNull(address_latitude),
      address_longitude: FormUtils.zeroIsNull(address_longitude),
      solo_parent: FormUtils.booleanAndNullable(solo_parent),
      disability: FormUtils.booleanAndNullable(disability),
      member_of_4ps: FormUtils.booleanAndNullable(member_of_4ps),
      member_of_ips: FormUtils.booleanAndNullable(member_of_ips),
      educational_attainment: FormUtils.emptyStringIsNull(educational_attainment),
      enrolled: FormUtils.booleanAndNullable(enrolled),
      health_cases: [goiter && 'goiter', anemia && 'anemia', vad && 'vad'].filter(Boolean),
      pregnant: FormUtils.booleanAndNullable(pregnant),
      lactating: FormUtils.booleanAndNullable(lactating),
      deceased: FormUtils.booleanAndNullable(deceased),
      reason_of_death: FormUtils.emptyStringIsNull(reason_of_death)?.toUpperCase()
    }
    const CONFIG = { headers: { Authorization: `Bearer ${localStorage.getItem('q-phn-token')}` } }

    axios
      .patch(URL, DATA, CONFIG)
      .then((response) => {
        setStatus('success')
        if (response.status === 201) {
          toast.success('Resident updated successfully') // SUCCESSFUL OPERATION
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
    <Authorization permissions={ACCOUNT.permissions} permission="write_resident">
      {status === 'success' && (
        <VicinityChecker
          accountVicinity={ViewUtils.arrayTextCapsOrNotFound([ACCOUNT.vicinity_province, ACCOUNT.vicinity_municipal, ACCOUNT.vicinity_barangay])}
          recordAddress={ViewUtils.arrayTextCapsOrNotFound([R.data?.address_province, R.data?.address_municipal, R.data?.address_barangay])}
        />
      )}
      <Form status={status}>
        <PageTitle
          title="Edit Resident"
          description="Modify resident record. For unknown answers, please leave it blank. For date visited, January to June will be considered as first visit and July to December as second visit."
        />
        <SectionHeader title="Interview">
          <ButtonIcon onClick={() => navigate(-1)} title="Close this form">
            <Close20 />
          </ButtonIcon>
        </SectionHeader>
        <FormRow>
          <Field error={helper.recorded_at} label="Date Visited" status={status}>
            <Input onChange={(e) => setRecordedAt(e.target.value)} size={35} type="date" value={recorded_at} />
          </Field>
        </FormRow>
        <SectionHeader title="Personal" />
        <FormRow>
          <Field error={helper.name} label="Full Name" status={status}>
            <Input className="uppercase" onChange={(e) => setName(e.target.value)} required size={35} type="text" value={name} />
          </Field>
          <Field error={helper.birthday} label="Birthday" status={status}>
            <Input onChange={(e) => setBirthday(e.target.value)} size={35} type="date" value={birthday} />
          </Field>
          <Field error={helper.sex} label="Sex" status={status}>
            <Select onChange={(e) => setSex(e.target.value)} value={sex}>
              <option value="">NO ANSWER</option>
              <option value="male">MALE</option>
              <option value="female">FEMALE</option>
            </Select>
          </Field>
          <Field error={helper.place_of_birth} label="Place of Birth" status={status}>
            <Input className="uppercase" onChange={(e) => setPlaceOfBirth(e.target.value)} size={45} type="text" value={place_of_birth} />
          </Field>
          <Field error={helper.nationality} label="Nationality" status={status}>
            <Input className="uppercase" onChange={(e) => setNationality(e.target.value)} size={20} type="text" value={nationality} />
          </Field>
          <Field error={helper.ethnicity} label="Ethnicity" status={status}>
            <Input className="uppercase" onChange={(e) => setEthnicity(e.target.value)} size={20} type="text" value={ethnicity} />
          </Field>
          <Field error={helper.blood_type} label="Blood Type" status={status}>
            <Select onChange={(e) => setBloodType(e.target.value)} value={blood_type}>
              <option value="">NO ANSWER</option>
              <option value="a+">A+</option>
              <option value="a-">A-</option>
              <option value="b+">B+</option>
              <option value="b-">B-</option>
              <option value="ab+">AB+</option>
              <option value="ab-">AB-</option>
              <option value="o+">O+</option>
              <option value="o-">O-</option>
            </Select>
          </Field>
          <Field error={helper.marital_status} label="Marital Status" status={status}>
            <Select onChange={(e) => setMaritalStatus(e.target.value)} value={marital_status}>
              <option value="">NO ANSWER</option>
              <option value="single">SINGLE</option>
              <option value="married">MARRIED</option>
              <option value="living-in">LIVING-IN</option>
              <option value="widowed">WIDOWED</option>
              <option value="separated">SEPARATED</option>
              <option value="divorced">DIVORCED</option>
            </Select>
          </Field>
          <Field error={helper.occupation} label="Occupation" status={status}>
            <Input className="uppercase" list="occupation" onChange={(e) => setOccupation(e.target.value)} size={20} type="text" value={occupation} />
            <datalist id="occupation">
              <option value="RETIRED">RETIRED</option>
              <option value="STUDENT">STUDENT</option>
              <option value="HOMEMAKER">HOMEMAKER</option>
              <option value="UNEMPLOYED">UNEMPLOYED</option>
            </datalist>
          </Field>
          <Field error={helper.family_head} label="Family Head" status={status}>
            <Select onChange={(e) => setFamilyHead(e.target.value)} value={family_head}>
              <option value="">NO ANSWER</option>
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </Select>
          </Field>
          <Field error={helper.household_head} label="Household Head" status={status}>
            <Select onChange={(e) => setHouseholdHead(e.target.value)} value={household_head}>
              <option value="">NO ANSWER</option>
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </Select>
          </Field>
        </FormRow>
        <SectionHeader title="Address" />
        <FormRow>
          {ACCOUNT.vicinity_municipal === '' && (
            <Field error={helper.address_municipal} label="Municipality" status={status}>
              <Select
                onChange={(e) => {
                  setAddressBarangay('')
                  setAddressMunicipal(e.target.value)
                }}
                required
                value={address_municipal}>
                <option value=""></option>
                {Address.getMunicipalityList('02', 'QUIRINO').map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Field>
          )}
          {ACCOUNT.vicinity_barangay === '' && (
            <Field error={helper.address_barangay} label="Barangay" status={status}>
              <Select onChange={(e) => setAddressBarangay(e.target.value)} required value={address_barangay}>
                <option value=""></option>
                {Address.getBarangayList('02', 'QUIRINO', address_municipal).map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Field>
          )}
          <Field error={helper.address_purok} label="Purok" status={status}>
            <Input className="uppercase" onChange={(e) => setAddressPurok(e.target.value)} size={5} type="text" value={address_purok} />
          </Field>
          <Field error={helper.address_street} label="Street" status={status}>
            <Input className="uppercase" onChange={(e) => setAddressStreet(e.target.value)} size={20} type="text" value={address_street} />
          </Field>
          <Field error={helper.address_latitude} label="Latitude" status={status}>
            <Cleave
              className="input"
              onChange={(e) => setAddressLatitude(e.target.value)}
              size={20}
              type="text"
              options={{
                numeral: true,
                numeralIntegerScale: 3,
                numeralDecimalScale: 15,
                numeralThousandsGroupStyle: 'none'
              }}
              value={address_latitude}
            />
          </Field>
          <Field error={helper.address_longitude} label="Longitude" status={status}>
            <Cleave
              className="input"
              onChange={(e) => setAddressLongitude(e.target.value)}
              size={20}
              type="text"
              options={{
                numeral: true,
                numeralIntegerScale: 3,
                numeralDecimalScale: 15,
                numeralThousandsGroupStyle: 'none'
              }}
              value={address_longitude}
            />
          </Field>
        </FormRow>
        <SectionHeader title="Socio-Civic" />
        <FormRow>
          <Field error={helper.solo_parent} label="Solo parent" status={status}>
            <Select onChange={(e) => setSoloParent(e.target.value)} value={solo_parent}>
              <option value="">NO ANSWER</option>
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </Select>
          </Field>
          <Field error={helper.disability} label="PWD" status={status}>
            <Select onChange={(e) => setDisability(e.target.value)} value={disability}>
              <option value="">NO ANSWER</option>
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </Select>
          </Field>
          <Field error={helper.member_of_4ps} label="4Ps" status={status}>
            <Select onChange={(e) => setMemberOf4ps(e.target.value)} value={member_of_4ps}>
              <option value="">NO ANSWER</option>
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </Select>
          </Field>
          <Field error={helper.member_of_ips} label="IPs" status={status}>
            <Select onChange={(e) => setMemberOfIps(e.target.value)} value={member_of_ips}>
              <option value="">NO ANSWER</option>
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </Select>
          </Field>
        </FormRow>
        <SectionHeader title="Educational Background" />
        <FormRow>
          <Field error={helper.educational_attainment} label="Highest School Level" status={status}>
            <Select onChange={(e) => setEducationalAttaintment(e.target.value)} value={educational_attainment}>
              <option value="">NO ANSWER</option>
              <option value="uneducated">UNEDUCATED</option>
              <option value="preschool">PRESCHOOL</option>
              <option value="elementary level">ELEMENTARY LEVEL</option>
              <option value="elementary graduate">ELEMENTARY GRADUATE</option>
              <option value="highschool level">HIGHSCHOOL LEVEL</option>
              <option value="highschool graduate">HIGHSCHOOL GRADUATE</option>
              <option value="junior highschool level">JUNIOR HS LEVEL</option>
              <option value="junior highschool graduate">JUNIOR HS GRADUATE</option>
              <option value="senior highschool level">SENIOR HS LEVEL</option>
              <option value="senior highschool graduate">SENIOR HS GRADUATE</option>
              <option value="vocational">VOCATIONAL/TECH</option>
              <option value="college level">COLLEGE LEVEL</option>
              <option value="college graduate">COLLEGE GRADUATE</option>
              <option value="postgraduate">POSTGRADUTE</option>
            </Select>
          </Field>
          <Field error={helper.enrolled} label="Enrolled" status={status}>
            <Select onChange={(e) => setEnrolled(e.target.value)} value={enrolled}>
              <option value="">NO ANSWER</option>
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </Select>
          </Field>
        </FormRow>
        <SectionHeader error={helper.health_cases} title="Health Cases" />
        <FormRow status={status}>
          <Checkbox onChange={(e) => setGoiter(e.target.checked)} checked={goiter}>
            GOITER
          </Checkbox>
          <Checkbox onChange={(e) => setAnemia(e.target.checked)} checked={anemia}>
            ANEMIA
          </Checkbox>
          <Checkbox onChange={(e) => setVad(e.target.checked)} checked={vad}>
            VIT. A DEFICIENCY
          </Checkbox>
        </FormRow>
        <SectionHeader title="Pregnancy" />
        <FormRow>
          <Field error={helper.pregnant} label="Pregnant" status={status}>
            <Select onChange={(e) => setPregnant(e.target.value)} value={pregnant}>
              <option value="">NO ANSWER</option>
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </Select>
          </Field>
          <Field error={helper.lactating} label="Lactating" status={status}>
            <Select onChange={(e) => setLactating(e.target.value)} value={lactating}>
              <option value="">NO ANSWER</option>
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </Select>
          </Field>
        </FormRow>
        <SectionHeader title="Mortality" />
        <FormRow>
          <Field error={helper.deceased} label="Deceased" status={status}>
            <Select onChange={(e) => setDeceased(e.target.value)} value={deceased}>
              <option value="">NO ANSWER</option>
              <option value="YES">YES</option>
              <option value="NO">NO</option>
            </Select>
          </Field>
          <Field error={helper.reason_of_death} label="Reason" status={status}>
            <Input className="uppercase" onChange={(e) => setReasonOfDeath(e.target.value)} size={35} type="text" value={reason_of_death} />
          </Field>
        </FormRow>
        <FormFooter>
          <Button
            disabled={status === 'loading'}
            loadingText="Updating..."
            onClick={submitForm}
            status={status}
            title="Update resident record"
            type="submit">
            Update
          </Button>
        </FormFooter>
      </Form>
    </Authorization>
  )
}

export default ResidentUpdate
