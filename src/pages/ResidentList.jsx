import * as Address from '../address/getAddress'

import { Add20, Download20, Filter20, Reset20 } from '@carbon/icons-react'

import AccountContext from '../contexts/AccountContext'
import Authorization from '../components/Authorization'
import ButtonIcon from '../components/ButtonIcon'
import { CSVLink } from 'react-csv'
import Cleave from 'cleave.js/react'
import Field from '../components/Field'
import FormRow from '../components/FormRow'
import Input from '../components/Input'
import PageTitle from '../components/PageTitle'
import React from 'react'
import ResidentsSpreadsheet from '../spreadsheets/ResidentsSpreadsheet'
import SearchBox from '../components/SearchBox'
import Select from '../components/Select'
import Table from '../components/Table'
import TableFooter from '../components/TableFooter'
import TableToolbar from '../components/TableToolbar'
import ViewUtils from '../utils/ViewUtils'
import { navigate } from '@reach/router'
import swrResidents from '../swr/swrResidents'

function ResidentList() {
  // INFORMATION STATE
  const ACCOUNT = React.useContext(AccountContext)
  const [status, setStatus] = React.useState('loading')
  const [display, setDisplay] = React.useState(false)

  // INPUT STATE
  const [limit, setLimit] = React.useState(50)
  const [page, setPage] = React.useState(1)
  const [orders, setOrders] = React.useState('updated_at:desc')
  const [census_year, setCensusYear] = React.useState('')
  const [census_visit, setCensusVisit] = React.useState('')
  const [name, setName] = React.useState('')
  const [age, setAge] = React.useState('')
  const [age_from, setAgeFrom] = React.useState('')
  const [age_to, setAgeTo] = React.useState('')
  const [sex, setSex] = React.useState('')
  const [blood_type, setBloodType] = React.useState('')
  const [marital_status, setMaritalStatus] = React.useState('')
  const [address_province, setAddressProvince] = React.useState(ACCOUNT.vicinity_province)
  const [address_municipal, setAddressMunicipal] = React.useState(ACCOUNT.vicinity_municipal)
  const [address_barangay, setAddressBarangay] = React.useState(ACCOUNT.vicinity_barangay)
  const [address_purok, setAddressPurok] = React.useState('')
  const [address_street, setAddressStreet] = React.useState('')
  const [family_head, setFamilyHead] = React.useState('')
  const [disability, setDisability] = React.useState('')
  const [pregnant, setPregnant] = React.useState('')
  const [params, setParams] = React.useState({ limit, page, orders })

  // SEND GET RESIDENTS REQUEST
  const R = swrResidents(params)

  // UPDATE URL SEARCH PARAMETERS
  function updateParams() {
    let newParams = {}
    if (limit !== '') newParams.limit = limit
    if (page !== '') newParams.page = page
    if (orders !== '') newParams.orders = orders
    if (census_year !== '') newParams.census_year = census_year
    if (census_visit !== '') newParams.census_visit = census_visit
    if (name !== '') newParams.name = name
    if (age !== '') newParams.age = age
    if (age_from !== '') newParams.age_from = age_from
    if (age_to !== '') newParams.age_to = age_to
    if (sex !== '') newParams.sex = sex
    if (blood_type !== '') newParams.blood_type = blood_type
    if (marital_status !== '') newParams.marital_status = marital_status
    if (address_province !== '') newParams.address_province = address_province
    if (address_municipal !== '') newParams.address_municipal = address_municipal
    if (address_barangay !== '') newParams.address_barangay = address_barangay
    if (address_purok !== '') newParams.address_purok = address_purok
    if (address_street !== '') newParams.address_street = address_street
    if (family_head !== '') newParams.family_head = family_head
    if (disability !== '') newParams.disability = disability
    if (pregnant !== '') newParams.pregnant = pregnant
    setParams(newParams)
  }

  // ON DELAYED UPDATE OF PARAMS
  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => updateParams() && setPage(1), 1000)
    return () => clearTimeout(delayDebounceFn)
  }, [census_year, census_visit, name, age, age_from, age_to, address_purok, address_street])

  // ON QUICK UPDATE OF PARAMS
  React.useEffect(() => updateParams(), [limit, page, orders, sex, blood_type, marital_status])
  React.useEffect(() => updateParams(), [address_municipal, address_barangay, family_head, disability, pregnant])

  // ON FETCH RESIDENTS
  React.useEffect(() => {
    if (R.loading) setStatus('loading')
    if (R.error) setStatus('error')
    if (R.data) setStatus('success')
    return () => setStatus('loading')
  }, [R.loading, R.error, R.data])

  // REFRESH AND RESET TABLE
  function refreshTable() {
    setOrders('updated_at:desc')
    setCensusYear('')
    setCensusVisit('')
    setName('')
    setAge('')
    setAgeFrom('')
    setAgeTo('')
    setSex('')
    setBloodType('')
    setMaritalStatus('')
    setAddressProvince(ACCOUNT.vicinity_province)
    setAddressMunicipal(ACCOUNT.vicinity_municipal)
    setAddressBarangay(ACCOUNT.vicinity_barangay)
    setAddressPurok('')
    setAddressStreet('')
    setFamilyHead('')
    setDisability('')
    setPregnant('')
    setPage(1)
    R.mutate()
  }

  return (
    <Authorization permissions={ACCOUNT.permissions} permission="read_resident">
      <PageTitle
        title="Residents"
        description="List of people who lives somewhere permanently or on a long-term basis."
      />

      <TableToolbar>
        <Input
          className="table-toolbar-search"
          onChange={(e) => setName(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && updateParams()}
          placeholder="Searcy by resident name"
          value={name}
        />
        <ButtonIcon
          className="is-gray"
          onClick={() => setDisplay(!display)}
          title={display ? 'Hide filter options' : 'Display more filter options'}>
          <Filter20 />
        </ButtonIcon>
        <ButtonIcon className="is-gray" onClick={refreshTable} title="Refresh and reset table">
          <Reset20 />
        </ButtonIcon>
        <CSVLink
          filename={`Q-PHN MIS - RESIDENTS - ${ViewUtils.dateCapsOrNotFound(Date())}.csv`}
          data={R.data?.residents || []}
          headers={ResidentsSpreadsheet}>
          <ButtonIcon className="is-gray" title="Download current table">
            <Download20 />
          </ButtonIcon>
        </CSVLink>
        <ButtonIcon
          onClick={() => navigate('/residents/new')}
          permission="write_resident"
          permissions={ACCOUNT.permissions}
          label="Add New Residencial Record">
          <Add20 />
        </ButtonIcon>
      </TableToolbar>
      <SearchBox className={display ? 'display' : 'hidden'}>
        <FormRow>
          <Field label="Year">
            <Cleave
              className="input"
              onChange={(e) => {
                e.target.value.length === 4 ? setCensusYear(e.target.value) : setCensusYear('')
              }}
              required
              size={10}
              options={{
                date: true,
                datePattern: ['Y']
              }}
              value={census_year}
            />
          </Field>
          <Field label="Visit No.">
            <Select onChange={(e) => setCensusVisit(e.target.value)} value={census_visit}>
              <option value="">ALL</option>
              <option value="1">FIRST</option>
              <option value="2">SECOND</option>
            </Select>
          </Field>
          <Field label="Age">
            <Cleave
              className="input"
              onChange={(e) => {
                setAge(e.target.value)
                setAgeFrom('')
                setAgeTo('')
              }}
              size={5}
              type="text"
              options={{ numeral: true, numeralIntegerScale: 3, numeralDecimalScale: 0, numeralPositiveOnly: true }}
              value={age}
            />
          </Field>
          <Field label="Age Range">
            <Cleave
              className="input"
              onChange={(e) => {
                setAgeFrom(e.target.value)
                setAge('')
              }}
              options={{ numeral: true, numeralIntegerScale: 3, numeralDecimalScale: 0, numeralPositiveOnly: true }}
              placeholder="From"
              size={6}
              type="text"
              value={age_from}
            />
          </Field>
          <Field label="ㅤ">
            <Cleave
              className="input"
              onChange={(e) => {
                setAgeTo(e.target.value)
                setAge('')
              }}
              options={{ numeral: true, numeralIntegerScale: 3, numeralDecimalScale: 0, numeralPositiveOnly: true }}
              placeholder="To"
              size={6}
              type="text"
              value={age_to}
            />
          </Field>
          <Field label="Sex">
            <Select onChange={(e) => setSex(e.target.value)} value={sex}>
              <option value="">ALL</option>
              <option value="male">MALE</option>
              <option value="female">FEMALE</option>
            </Select>
          </Field>
          <Field label="Blood Type">
            <Select onChange={(e) => setBloodType(e.target.value)} value={blood_type}>
              <option value="">ALL TYPES</option>
              <option value="a+">A+</option>
              <option value="a-">A-</option>
              <option value="b+">B+</option>
              <option value="b-">B-</option>
              <option value="o+">O+</option>
              <option value="o-">O-</option>
              <option value="ab+">AB+</option>
              <option value="ab-">AB-</option>
            </Select>
          </Field>
          <Field label="Marital Status">
            <Select onChange={(e) => setMaritalStatus(e.target.value)} value={marital_status}>
              <option value="">ALL STATUS</option>
              <option value="single">SINGLE</option>
              <option value="married">MARRIED</option>
              <option value="living-in">LIVING-IN</option>
              <option value="widowed">WIDOWED</option>
              <option value="separated">SEPARATED</option>
              <option value="divorced">DIVORCED</option>
            </Select>
          </Field>
          {ACCOUNT.vicinity_municipal === '' && (
            <Field label="Municipality" status={status}>
              <Select
                onChange={(e) => {
                  setAddressBarangay('')
                  setAddressMunicipal(e.target.value)
                }}
                value={address_municipal}>
                <option value="">ALL MUNICIPALS</option>
                {Address.getMunicipalityList('02', 'QUIRINO').map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Field>
          )}
          {ACCOUNT.vicinity_barangay === '' && (
            <Field label="Barangay" status={status}>
              <Select onChange={(e) => setAddressBarangay(e.target.value)} value={address_barangay}>
                <option value="">ALL BARANGAYS</option>
                {Address.getBarangayList('02', 'QUIRINO', address_municipal).map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </Select>
            </Field>
          )}
          <Field label="Purok">
            <Input onChange={(e) => setAddressPurok(e.target.value)} size={5} type="text" value={address_purok} />
          </Field>
          <Field label="Street">
            <Input onChange={(e) => setAddressStreet(e.target.value)} size={15} type="text" value={address_street} />
          </Field>
          <Field label="Family Head">
            <Select onChange={(e) => setFamilyHead(e.target.value)} value={family_head}>
              <option value=""></option>
              <option value={true}>YES</option>
              <option value={false}>NO</option>
            </Select>
          </Field>
          <Field label="With Disability">
            <Select onChange={(e) => setDisability(e.target.value)} value={disability}>
              <option value=""></option>
              <option value={true}>YES</option>
              <option value={false}>NO</option>
            </Select>
          </Field>
          <Field label="Pregnant">
            <Select onChange={(e) => setPregnant(e.target.value)} value={pregnant}>
              <option value=""></option>
              <option value={true}>YES</option>
              <option value={false}>NO</option>
            </Select>
          </Field>
          <Field label="Order By">
            <Select onChange={(e) => setOrders(e.target.value)} value={orders}>
              <option value="updated_at:desc">DATE UPDATED (DESC)</option>
              <option value="updated_at:asc">DATE UPDATED (ASC)</option>
              <option value="name:desc">RESIDENT NAME (DESC)</option>
              <option value="name:asc">RESIDENT NAME (ASC)</option>
              <option value="age:desc">AGE (DESC)</option>
              <option value="age:asc">AGE (ASC)</option>
            </Select>
          </Field>
        </FormRow>
      </SearchBox>
      <Table
        emptyLabel="No residents found"
        headers={[
          'Index',
          'Year - Visit No.',
          'Resident Name',
          'Age',
          !ACCOUNT.vicinity_municipal && 'Municipal',
          !ACCOUNT.vicinity_barangay && 'Barangay',
          'Purok'
        ].filter(Boolean)}
        status={status}
        total={R.data?.total}>
        {status === 'success' &&
          R.data?.residents.map((item, index) => (
            <tr key={index} onClick={() => navigate(`/residents/${item.id}`)} title="Click to view more details">
              <td>{ViewUtils.tableIndex(limit, page, index)}</td>
              <td>{`${item.census_year} - ${item.census_visit}`}</td>
              <td>{item.name?.toUpperCase()}</td>
              <td>{item.age || 'N/A'}</td>
              {!ACCOUNT.vicinity_municipal && <td>{item.address_municipal}</td>}
              {!ACCOUNT.vicinity_barangay && <td>{item.address_barangay}</td>}
              <td>{item.address_purok?.toUpperCase() || 'N/A'}</td>
            </tr>
          ))}
      </Table>
      <TableFooter
        status={status}
        page={page}
        limit={limit}
        total={R.data?.total}
        onUpdatePage={(data) => setPage(data)}
        onUpdateLimit={(data) => setLimit(data)}
      />
    </Authorization>
  )
}

export default ResidentList
