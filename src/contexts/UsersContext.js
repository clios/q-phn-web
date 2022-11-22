import React from 'react'

const users = {
  total: 5,
  users: [
    {
      id: 1,
      name: 'Dakila Carlo E. Cua',
      office_name: 'Office of the Governor',
      inactive: false,
      vicinity_barangay: null,
      vicinity_municipal: null,
      vicinity_province: 'Quirino'
    },
    {
      id: 2,
      name: 'Luningning P. Rhodes',
      office_name: 'Provincial Government of Quirino',
      inactive: false,
      vicinity_barangay: null,
      vicinity_municipal: null,
      vicinity_province: 'Quirino'
    },
    {
      id: 3,
      name: 'Milagros J. Villar',
      office_name: 'Provincial Government of Quirino',
      inactive: false,
      vicinity_barangay: null,
      vicinity_municipal: null,
      vicinity_province: 'Quirino'
    },
    {
      id: 4,
      name: 'Mario G. Lothbrok',
      office_name: 'Barangay Magsaysay Health Center',
      inactive: true,
      vicinity_barangay: 'Magsaysay',
      vicinity_municipal: 'Saguday',
      vicinity_province: 'Quirino'
    },
    {
      id: 5,
      name: 'Jessa May. Caoile',
      office_name: 'Barangay Magsaysay Health Center',
      inactive: false,
      vicinity_barangay: 'Magsaysay',
      vicinity_municipal: 'Saguday',
      vicinity_province: 'Quirino'
    }
  ]
}

const UsersContext = React.createContext(users)

export default UsersContext
