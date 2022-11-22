import * as Address from '../address/getAddress'

import { Add20, Download20, Filter20, Reset20 } from '@carbon/icons-react'

import AccountContext from '../contexts/AccountContext'
import Authorization from '../components/Authorization'
import ButtonIcon from '../components/ButtonIcon'
import { CSVLink } from 'react-csv'
import Cleave from 'cleave.js/react'
import FamiliesSpreadsheet from '../spreadsheets/FamiliesSpreadsheet'
import Field from '../components/Field'
import FormRow from '../components/FormRow'
import Input from '../components/Input'
import PageTitle from '../components/PageTitle'
import React from 'react'
import SearchBox from '../components/SearchBox'
import Select from '../components/Select'
import Table from '../components/Table'
import TableFooter from '../components/TableFooter'
import TableToolbar from '../components/TableToolbar'
import ViewUtils from '../utils/ViewUtils'
import { navigate } from '@reach/router'
import swrFamilies from '../swr/swrFamilies'

function FamilyList() {
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
  const [name_of_head, setNameOfHead] = React.useState('')
  const [total_members, setTotalMembers] = React.useState('')
  const [total_children, setTotalChilren] = React.useState('')
  const [address_province, setAddressProvince] = React.useState(ACCOUNT.vicinity_province)
  const [address_municipal, setAddressMunicipal] = React.useState(ACCOUNT.vicinity_municipal)
  const [address_barangay, setAddressBarangay] = React.useState(ACCOUNT.vicinity_barangay)
  const [address_purok, setAddressPurok] = React.useState('')
  const [address_street, setAddressStreet] = React.useState('')
  const [params, setParams] = React.useState({ limit, page, orders })

  // SEND GET FAMILIES REQUEST
  const F = swrFamilies(params)

  // ON DELAYED UPDATE OF PARAMS
  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => updateParams() && setPage(1), 1000)
    return () => clearTimeout(delayDebounceFn)
  }, [census_year, census_visit, name_of_head, total_members, total_children, address_purok, address_street])

  // ON QUICK UPDATE OF PARAMS
  React.useEffect(() => updateParams(), [limit, page, orders, address_municipal, address_barangay])

  // ON FETCH RESIDENTS
  React.useEffect(() => {
    if (F.loading) setStatus('loading')
    if (F.error) setStatus('error')
    if (F.data) setStatus('success')
    return () => setStatus('loading')
  }, [F.loading, F.error, F.data])

  // UPDATE URL SEARCH PARAMETERS
  function updateParams() {
    let newParams = {}
    if (limit !== '') newParams.limit = limit
    if (page !== '') newParams.page = page
    if (orders !== '') newParams.orders = orders
    if (census_year !== '') newParams.census_year = census_year
    if (census_visit !== '') newParams.census_visit = census_visit
    if (name_of_head !== '') newParams.name_of_head = name_of_head
    if (total_members !== '') newParams.total_members = total_members
    if (total_children !== '') newParams.total_children = total_children
    if (address_province !== '') newParams.address_province = address_province
    if (address_municipal !== '') newParams.address_municipal = address_municipal
    if (address_barangay !== '') newParams.address_barangay = address_barangay
    if (address_purok !== '') newParams.address_purok = address_purok
    if (address_street !== '') newParams.address_street = address_street
    setParams(newParams)
  }

  // REFRESH AND RESET TABLE
  function refreshTable() {
    setLimit(50)
    setPage(1)
    setOrders('updated_at:desc')
    setCensusYear('')
    setCensusVisit('')
    setNameOfHead('')
    setTotalMembers('')
    setTotalChilren('')
    setAddressProvince(ACCOUNT.vicinity_province)
    setAddressMunicipal(ACCOUNT.vicinity_municipal)
    setAddressBarangay(ACCOUNT.vicinity_barangay)
    setAddressPurok('')
    setAddressStreet('')
    F.mutate()
  }

  return (
    <Authorization permissions={ACCOUNT.permissions} permission="read_family">
      <PageTitle
        title="Families"
        description="List of a group of two or more persons related by birth, marriage, or adoption who live together."
      />
      <TableToolbar>
        <Input
          className="table-toolbar-search"
          onChange={(e) => setNameOfHead(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && updateParams()}
          placeholder="Searcy by family head name"
          value={name_of_head}
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
          filename={`Q-PHN MIS - FAMILIES - ${ViewUtils.dateCapsOrNotFound(Date())}.csv`}
          data={F.data?.families || []}
          headers={FamiliesSpreadsheet}>
          <ButtonIcon className="is-gray" title="Download current table">
            <Download20 />
          </ButtonIcon>
        </CSVLink>
        <ButtonIcon
          onClick={() => navigate('/families/new')}
          permission="write_family"
          permissions={ACCOUNT.permissions}
          label="Add New Family Profile">
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
          <Field label="Total Members">
            <Cleave
              className="input"
              onChange={(e) => setTotalMembers(e.target.value)}
              size={10}
              type="text"
              options={{ numeral: true, numeralIntegerScale: 3, numeralDecimalScale: 0, numeralPositiveOnly: true }}
              value={total_members}
            />
          </Field>
          <Field label="Total Childrens">
            <Cleave
              className="input"
              onChange={(e) => setTotalChilren(e.target.value)}
              size={10}
              type="text"
              options={{ numeral: true, numeralIntegerScale: 3, numeralDecimalScale: 0, numeralPositiveOnly: true }}
              value={total_children}
            />
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
          <Field label="Order By">
            <Select onChange={(e) => setOrders(e.target.value)} value={orders}>
              <option value="name_of_head:asc">NAME OF HEAD (ASC)</option>
              <option value="name_of_head:desc">NAME OF HEAD (DESC)</option>
              <option value="total_members:asc">TOTAL MEMBERS (ASC)</option>
              <option value="total_members:desc">TOTAL MEMBERS (DESC)</option>
              <option value="total_children:asc">TOTAL CHILDREN (ASC)</option>
              <option value="total_children:desc">TOTAL CHILDREN (DESC)</option>
              <option value="created_at:asc">CREATED AT (ASC)</option>
              <option value="created_at:desc">CREATED AT (DESC)</option>
              <option value="updated_at:asc">UPDATED AT (ASC)</option>
              <option value="updated_at:desc">UPDATED AT (DESC)</option>
            </Select>
          </Field>
        </FormRow>
      </SearchBox>
      <Table
        emptyLabel="No families found"
        headers={[
          'Index',
          'Year - Visit No.',
          'Name of Family Head',
          !ACCOUNT.vicinity_municipal && 'Municipal',
          !ACCOUNT.vicinity_barangay && 'Barangay',
          'Purok'
        ].filter(Boolean)}
        status={status}
        total={F.data?.total}>
        {status === 'success' &&
          F.data?.families.map((item, index) => (
            <tr key={index} onClick={() => navigate(`/families/${item.id}`)} title="Click to view more details">
              <td>{ViewUtils.tableIndex(limit, page, index)}</td>
              <td>{`${item.census_year} - ${item.census_visit}`}</td>
              <td>{item.name_of_head?.toUpperCase()}</td>
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
        total={F.data?.total}
        onUpdatePage={(data) => setPage(data)}
        onUpdateLimit={(data) => setLimit(data)}
      />
    </Authorization>
  )
}

export default FamilyList
