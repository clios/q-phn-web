import React from 'react'

const residents = {
  total: 5,
  residents: [
    {
      id: 1,
      name: 'Margarita S. Pacun',
      sex: 'Female',
      marital_status: 'Married',
      age: 44,
      address_purok: '2',
      census_year: 2002,
      census_visit: 1
    },
    {
      id: 2,
      name: 'Mario D. Batoon',
      sex: 'Male',
      marital_status: 'Married',
      age: 59,
      address_purok: '2',
      census_year: 2002,
      census_visit: 1
    },
    {
      id: 3,
      name: 'Alden T. Agapito',
      sex: 'Male',
      marital_status: 'Single',
      age: 21,
      address_purok: '3',
      census_year: 2002,
      census_visit: 1
    },
    {
      id: 4,
      name: 'Ferdinand G. Guzman',
      sex: 'Male',
      marital_status: 'Married',
      age: 30,
      address_purok: '1',
      census_year: 2002,
      census_visit: 1
    },
    {
      id: 5,
      name: 'Angelica B. Laitan',
      sex: 'Female',
      marital_status: 'Married',
      age: 38,
      address_purok: '5',
      census_year: 2002,
      census_visit: 1
    }
  ]
}

const ResidentsContext = React.createContext(residents)

export default ResidentsContext
