import React from 'react'

const aggregated_mortalities = {
  pregnant_all_age: 9,
  pregnant_productive_age: 6,
  pregnant_risk: 2,
  pregnant_teenage: 1,
  lactating_all_age: 14,
  below_one_year_old_male: 0,
  below_one_year_old_female: 0,
  one_year_old_male: 0,
  one_year_old_female: 0,
  two_years_old_male: 0,
  two_years_old_female: 0,
  three_years_old_male: 0,
  three_years_old_female: 0
}

const AggregatedMortalitiesContext = React.createContext(aggregated_mortalities)

export default AggregatedMortalitiesContext
