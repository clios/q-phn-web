import * as Utils from '../Utils'

import { Add20, FilterRemove20 } from '@carbon/icons-react'

import AccountContext from '../contexts/AccountContext'
import Authorization from '../components/Authorization'
import ButtonIcon from '../components/ButtonIcon'
import EmptyTable from '../components/EmptyTable'
import Input from '../components/Input'
import PageTitle from '../components/PageTitle'
import React from 'react'
import Table from '../components/Table'
import TableFooter from '../components/TableFooter'
import TableToolbar from '../components/TableToolbar'
import { motion } from 'framer-motion'
import { navigate } from '@reach/router'
import swrUsers from '../swr/swrUsers'

function UserList() {
  // INFORMATION STATE
  const ACCOUNT = React.useContext(AccountContext)
  const [status, setStatus] = React.useState('loading')

  // INPUT STATE
  const [limit, setLimit] = React.useState(50)
  const [page, setPage] = React.useState(1)
  const [name, setName] = React.useState('')
  const [params, setParams] = React.useState({ limit, page })

  // SEND GET USERS REQUEST
  const U = swrUsers(params)

  // UPDATE URL SEARCH PARAMETERS
  function updateParams() {
    let newParams = {}
    if (limit !== '') newParams.limit = limit
    if (page !== '') newParams.page = page
    if (name !== '') newParams.name = name
    setParams(newParams)
  }

  // ON DELAYED UPDATE OF PARAMS
  React.useEffect(() => {
    const delayDebounceFn = setTimeout(() => updateParams() && setPage(1), 1000)
    return () => clearTimeout(delayDebounceFn)
  }, [name])

  // ON QUICK UPDATE OF PARAMS
  React.useEffect(() => {
    updateParams()
  }, [limit, page])

  // ON FETCH USER
  React.useEffect(() => {
    if (U.loading) setStatus('loading')
    if (U.error) setStatus('error')
    if (U.data) setStatus('success')
    return () => setStatus('loading')
  }, [U.loading, U.error, U.data])

  // CLEAR ALL FILTERS AND SET TO PAGE 1
  function clearAllFilters() {
    setName('')
    setPage(1)
  }

  return (
    <Authorization permissions={ACCOUNT.permissions} permission="read_user">
      <PageTitle title="Users" description="List of people who use or operate Q-PHN MIS." />
      <TableToolbar status={status}>
        <Input
          className="table-toolbar-search"
          onChange={(e) => setName(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && updateParams()}
          placeholder="Name"
          value={name}
        />
        <ButtonIcon className="is-gray" onClick={clearAllFilters} title="Clear all filters">
          <FilterRemove20 />
        </ButtonIcon>
        <ButtonIcon
          onClick={() => navigate('/users/new')}
          permission="write_user"
          permissions={ACCOUNT.permissions}
          title="Add new user account">
          <Add20 />
        </ButtonIcon>
      </TableToolbar>
      <Table status={status} headers={['Index', 'Name', 'Office', 'Deactivated', 'Area of Responsibility']}>
        {status === 'success' &&
          U.data?.users.map((item, index) => {
            return (
              <tr key={index} onClick={() => navigate(`/users/${item.id}`)} title="Click to view more details">
                <td>{Utils.tableIndex(limit, page, index)}</td>
                <td>{item.name}</td>
                <td>{item.office || 'NOT FOUND'}</td>
                <td>{item.deactivated ? 'YES' : 'NO'}</td>
                <td>
                  {Utils.commaSeparated([item.vicinity_province, item.vicinity_municipal, item.vicinity_barangay])}
                </td>
              </tr>
            )
          })}
      </Table>
      {status === 'success' && U.data?.total === 0 && <EmptyTable label="No users found" />}
      <TableFooter
        status={status}
        page={page}
        limit={limit}
        total={U.data?.total}
        onUpdatePage={(data) => setPage(data)}
        onUpdateLimit={(data) => setLimit(data)}
      />
    </Authorization>
  )
}

export default UserList
