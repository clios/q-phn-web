import { Add20, Close20, Download20, Edit20, TrashCan20 } from '@carbon/icons-react'
import { navigate, useParams } from '@reach/router'

import AccountContext from '../contexts/AccountContext'
import Authorization from '../components/Authorization'
import BodyMassesSpreadsheet from '../spreadsheets/BodyMassesSpreadsheet'
import ButtonIcon from '../components/ButtonIcon'
import { CSVLink } from 'react-csv'
import Field from '../components/Field'
import PageSubtitle from '../components/PageSubtitle'
import PageTitle from '../components/PageTitle'
import React from 'react'
import ResidentSpreadsheet from '../spreadsheets/ResidentSpreadsheet'
import SectionBody from '../components/SectionBody'
import SectionFooter from '../components/SectionFooter'
import SectionHeader from '../components/SectionHeader'
import Table from '../components/Table'
import VicinityChecker from '../components/VicinityChecker'
import ViewUtils from '../utils/ViewUtils'
import axios from 'axios'
import { confirmAlert } from 'react-confirm-alert'
import { mutate } from 'swr'
import swrBodyMasses from '../swr/swrBodyMasses'
import swrResident from '../swr/swrResident'
import { toast } from 'react-toastify'

function ResidentView() {
  // SEND GET RESIDENT AND BODY MASS REQUEST
  const ROUTE = useParams()
  const R = swrResident(ROUTE.resident_id)
  const BM = swrBodyMasses({ resident_id: ROUTE.resident_id, orders: 'recorded_at:asc' })

  // INFORMATION STATE
  const ACCOUNT = React.useContext(AccountContext)
  const [r_status, setRStatus] = React.useState('loading')
  const [bmi_status, setBMIStatus] = React.useState('loading')

  // ON RENDER REVALIDATE RESIDENT
  React.useEffect(() => mutate('/residents/' + ROUTE.resident_id), [])

  // ON FETCH RESIDENT
  React.useEffect(() => {
    if (R.loading) setRStatus('loading')
    if (R.error) setRStatus('error')
    if (R.data) setRStatus('success')
    return () => setRStatus('loading')
  }, [R.loading, R.error, R.data])

  // ON FETCH BODY MASSES
  React.useEffect(() => {
    if (BM.loading) setBMIStatus('loading')
    if (BM.error) setBMIStatus('error')
    if (BM.data) setBMIStatus('success')
    return () => setBMIStatus('loading')
  }, [BM.loading, BM.error, BM.data])

  // SEND DELETE RESIDENT REQUEST
  function deleteResident() {
    const URL = process.env.BASE_URL + '/residents/' + ROUTE.resident_id
    const CONFIG = { headers: { Authorization: `Bearer ${localStorage.getItem('q-phn-token')}` } }

    axios
      .delete(URL, CONFIG)
      .then((response) => {
        setRStatus('success')
        if (response.status === 204) {
          toast.success('Resident deleted successfully') // SUCCESSFUL OPERATION
          navigate('/residents', { replace: true })
        }
      })
      .catch((error) => {
        setRStatus('success')
        if (error.response) {
          if (error.response?.status === 403) {
            toast.error('User credential is forbidden') // USER CREDENTIAL IS FORBIDDEN
          } else if (error.response?.status === 403) {
            toast.error('Resident was not found') // RESIDENT WAS NOT FOUND
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

  // SEND DELETE BMI REQUEST
  function deleteBMI(bmi_id) {
    const URL = process.env.BASE_URL + '/bodyMasses/' + bmi_id
    const CONFIG = { headers: { Authorization: `Bearer ${localStorage.getItem('q-phn-token')}` } }

    axios
      .delete(URL, CONFIG)
      .then((response) => {
        setBMIStatus('success')
        if (response.status === 204) {
          toast.success('BMI deleted successfully') // SUCCESSFUL OPERATION
          BM.mutate()
        }
      })
      .catch((error) => {
        setBMIStatus('success')
        if (error.response) {
          if (error.response?.status === 403) {
            toast.error('User credential is forbidden') // USER CREDENTIAL IS FORBIDDEN
          } else if (error.response?.status === 403) {
            toast.error('Resident was not found') // RESIDENT WAS NOT FOUND
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

  // DISPLAY DELETE RESIDENT ALERT
  function deleteResidentAlert() {
    confirmAlert({
      title: 'Delete Permanently',
      message: 'This resident record will be permanently lost and you will not be able to recover it',
      buttons: [{ label: 'Delete', onClick: () => deleteResident() }, { label: 'Cancel' }]
    })
  }

  // DISPLAY DELETE BMI ALERT
  function deleteBMIAlert(bmi_id) {
    confirmAlert({
      title: 'Delete Permanently',
      message: 'This BMI record will be permanently lost and you will not be able to recover it',
      buttons: [{ label: 'Delete', onClick: () => deleteBMI(bmi_id) }, { label: 'Cancel' }]
    })
  }

  return (
    <Authorization permissions={ACCOUNT.permissions} permission="read_resident">
      {r_status === 'success' && (
        <VicinityChecker
          accountVicinity={ViewUtils.arrayTextCapsOrNotFound([ACCOUNT.vicinity_province, ACCOUNT.vicinity_municipal, ACCOUNT.vicinity_barangay])}
          recordAddress={ViewUtils.arrayTextCapsOrNotFound([R.data?.address_province, R.data?.address_municipal, R.data?.address_barangay])}
        />
      )}
      <PageTitle title="Resident" description="A person who lives somewhere permanently or on a long-term basis." />
      <PageSubtitle status={r_status}>{R.data?.name?.toUpperCase()}</PageSubtitle>
      <SectionHeader title="Interview">
        <CSVLink
          filename={`Q-PHN MIS - RESIDENT - ${ViewUtils.dateCapsOrNotFound(Date())}.csv`}
          data={[{ ...R.data }] || []}
          headers={ResidentSpreadsheet}>
          <ButtonIcon status={r_status} title="Download Resident Info">
            <Download20 />
          </ButtonIcon>
        </CSVLink>
        <ButtonIcon
          onClick={() => navigate('/residents/' + ROUTE.resident_id + '/edit')}
          permission="write_resident"
          permissions={ACCOUNT.permissions}
          status={r_status}
          title="Edit resident">
          <Edit20 />
        </ButtonIcon>
        <ButtonIcon
          status={r_status}
          permissions={ACCOUNT.permissions}
          permission="write_resident"
          onClick={deleteResidentAlert}
          title="Delete resident">
          <TrashCan20 />
        </ButtonIcon>
        <ButtonIcon onClick={() => navigate('/residents')} status={r_status} title="Close">
          <Close20 />
        </ButtonIcon>
      </SectionHeader>
      <SectionBody>
        <Field label="Date Visited" status={r_status} text={ViewUtils.dateCapsOrNotFound(R.data?.recorded_at)} />
        <Field label="Year" status={r_status} text={R.data?.census_year} />
        <Field label="Visit No." status={r_status} text={R.data?.census_visit} />
      </SectionBody>
      <SectionHeader title="Personal" />
      <SectionBody>
        <Field label="Sex" status={r_status} text={ViewUtils.valCapsOrNotFound(R.data?.sex)} />
        <Field label="Birthday" status={r_status} text={ViewUtils.dateCapsOrNotFound(R.data?.birthday)} />
        <Field label="Age" status={r_status} text={ViewUtils.numOrNotFound(R.data?.age)} />
        <Field label="Place of Birth" status={r_status} text={ViewUtils.valCapsOrNotFound(R.data?.place_of_birth)} />
        <Field label="Nationality" status={r_status} text={ViewUtils.valCapsOrNotFound(R.data?.nationality)} />
        <Field label="Marital Status" status={r_status} text={ViewUtils.valCapsOrNotFound(R.data?.marital_status)} />
        <Field label="Ethnicity" status={r_status} text={ViewUtils.valCapsOrNotFound(R.data?.ethnicity)} />
        <Field label="Blood Type" status={r_status} text={ViewUtils.valCapsOrNotFound(R.data?.blood_type)} />
        <Field label="Occupation" status={r_status} text={ViewUtils.valCapsOrNotFound(R.data?.occupation)} />
        <Field label="Family Head" status={r_status} text={ViewUtils.yesNoOrNotFound(R.data?.family_head)} />
        <Field label="Household Head" status={r_status} text={ViewUtils.yesNoOrNotFound(R.data?.household_head)} />
      </SectionBody>
      <SectionHeader title="Address" />
      <SectionBody>
        <Field label="Region" status={r_status} text="02" />
        <Field label="Province" status={r_status} text={R.data?.address_province} />
        <Field label="Municipal" status={r_status} text={R.data?.address_municipal} />
        <Field label="Barangay" status={r_status} text={R.data?.address_barangay} />
        <Field label="Purok" status={r_status} text={ViewUtils.valCapsOrNotFound(R.data?.address_purok)} />
        <Field label="Street" status={r_status} text={ViewUtils.valCapsOrNotFound(R.data?.address_street)} />
        <Field label="Latitude" status={r_status} text={ViewUtils.numOrNotFound(R.data?.address_latitude)} />
        <Field label="Longitude" status={r_status} text={ViewUtils.numOrNotFound(R.data?.address_longitude)} />
      </SectionBody>
      <SectionHeader title="Socio-Civic" />
      <SectionBody>
        <Field label="Solo Parent" status={r_status} text={ViewUtils.yesNoOrNotFound(R.data?.solo_parent)} />
        <Field label="PWD" status={r_status} text={ViewUtils.yesNoOrNotFound(R.data?.disability)} />
        <Field label="4Ps" status={r_status} text={ViewUtils.yesNoOrNotFound(R.data?.member_of_4ps)} />
        <Field label="IPs" status={r_status} text={ViewUtils.yesNoOrNotFound(R.data?.member_of_ips)} />
      </SectionBody>
      <SectionHeader title="Educational Background" />
      <SectionBody>
        <Field label="Highest School Level" status={r_status}>
          {ViewUtils.valCapsOrNotFound(R.data?.educational_attainment)}
        </Field>
        <Field label="Currently Enrolled" status={r_status}>
          {ViewUtils.yesNoOrNotFound(R.data?.enrolled)}
        </Field>
      </SectionBody>
      <SectionHeader title="Health Case" />
      <SectionBody status={r_status} text={ViewUtils.arrayTextCapsOrNotFound(R.data?.health_cases).replace('VAD', 'VITAMIN A DEFICIENCY')} />
      <SectionHeader title="Pregnancy" />
      <SectionBody>
        <Field label="Pregnant" status={r_status} text={ViewUtils.yesNoOrNotFound(R.data?.pregnant)} />
        <Field label="Lactating" status={r_status} text={ViewUtils.yesNoOrNotFound(R.data?.lactating)} />
      </SectionBody>
      <SectionHeader title="Mortality" />
      <SectionBody>
        <Field label="Deceased" status={r_status} text={ViewUtils.yesNoOrNotFound(R.data?.deceased)} />
        <Field label="Reason" status={r_status} text={ViewUtils.valCapsOrNotFound(R.data?.reason_of_death)} />
      </SectionBody>
      <SectionFooter status={r_status}>
        Updated by {ViewUtils.valCapsOrNotFound(R.data?.last_updated_by)} | {ViewUtils.dayDateTimeOrNotFound(R.data?.updated_at)}
      </SectionFooter>
      <SectionHeader title="Body Mass Index Card">
        {bmi_status === 'success' && BM.data?.body_masses.length > 0 && (
          <CSVLink
            filename={`Q-PHN MIS - BMI - ${ViewUtils.dateCapsOrNotFound(Date())}.csv`}
            data={BM.data?.body_masses || []}
            headers={BodyMassesSpreadsheet}>
            <ButtonIcon status={bmi_status} title="Download BMI Table">
              <Download20 />
            </ButtonIcon>
          </CSVLink>
        )}
        <ButtonIcon
          onClick={() => navigate(`residents/${ROUTE.resident_id}/bmis/new`)}
          permission="write_resident"
          permissions={ACCOUNT.permissions}
          status={bmi_status}
          title="Add new body mass index record">
          <Add20 />
        </ButtonIcon>
      </SectionHeader>
      <Table
        className="table-custom-off-hover"
        emptyLabel="No BMI found"
        headers={['Date Recorded', 'Height (cm)', 'Weight(kg)', 'BMI', 'Status', 'Recorded By', 'Actions']}
        status={bmi_status}
        total={BM.data?.total}>
        {bmi_status === 'success' &&
          BM.data?.body_masses.map((item, index) => (
            <tr key={index}>
              <td>{ViewUtils.dateCapsOrNotFound(item.recorded_at)}</td>
              <td>{item.height || 'N/A'}</td>
              <td>{item.weight || 'N/A'}</td>
              <td>{item.bmi || 'N/A'}</td>
              <td>{item.status?.toUpperCase() || 'N/A'}</td>
              <td>{item.last_updated_by || 'N/A'}</td>
              <td className="flex justify-content-center">
                <ButtonIcon
                  className="is-gray"
                  onClick={() => navigate(`residents/${ROUTE.resident_id}/bmis/${item.id}/edit`)}
                  permission="write_resident"
                  permissions={ACCOUNT.permissions}
                  status={bmi_status}
                  title="Edit body mass index">
                  <Edit20 />
                </ButtonIcon>
                <ButtonIcon
                  className="is-gray"
                  onClick={() => deleteBMIAlert(item.id)}
                  permission="write_resident"
                  permissions={ACCOUNT.permissions}
                  status={bmi_status}
                  title="Delete body mass index">
                  <TrashCan20 />
                </ButtonIcon>
              </td>
            </tr>
          ))}
      </Table>
      <SectionFooter />
    </Authorization>
  )
}

export default ResidentView
