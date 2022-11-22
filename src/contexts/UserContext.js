import React from 'react'

const user = {
  name: 'Dakila Carlo E. Cua',
  email: 'dakilamail@sample.com',
  position: 'Governor',
  inactive: false,
  confirmed: true,
  office_name: 'Office of the Governor',
  vicinity_barangay: null,
  vicinity_municipal: null,
  vicinity_province: 'Quirino',
  permissions: ['read_user', 'write_user', 'read_resident', 'write_resident', 'read_family', 'write_family', 'read_dashboard', 'read_location'],
  created_at: '2021-11-05T06:11:56.926268Z',
  updated_at: '2021-11-05T06:11:56.926268Z'
}

const UserContext = React.createContext(user)

export default UserContext
