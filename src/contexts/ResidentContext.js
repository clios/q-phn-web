import React from 'react'

const resident = {
  census_year: 2022,
  census_visit: 1,
  name: 'Margarita S. Pacun',
  sex: 'Female',
  birthday: '1978-03-03T00:00:00.926268Z',
  age: 44,
  place_of_birth: 'Magsaysay, Saguday, Quirino',
  nationality: 'Filipino',
  marital_status: 'Single',
  ethnicity: 'Ilokano',
  blood_type: 'A+',
  occupation: 'Video Editor',
  family_head: false,
  household_head: false,
  address_region: '02',
  address_province: 'Quirino',
  address_municipal: 'Saguday',
  address_barangay: 'Magsaysay',
  address_purok: '02',
  address_street: 'Mapalad',
  address_latitude: '16.523765',
  address_longitude: '121.516721',
  solo_parent: true,
  disability: false,
  member_of_4ps: false,
  member_of_ips: false,
  educational_attainment: 'College Graduate',
  enrolled: false,
  health_cases: ['anemia'],
  pregnant: true,
  lactating: false,
  deceased: false,
  reason_of_death: null,
  created_at: '2021-11-05T06:11:56.926268Z',
  updated_at: '2021-11-05T06:11:56.926268Z',
  last_updated_by: 'Cliemtor B. Fabros'
}

const ResidentContext = React.createContext(resident)

export default ResidentContext
