import React from 'react'

const aggregated_families = {
  household: 728,
  family: 888,
  above_three_children: 38,
  above_five_members: 52,
  family_head_occupation: 'Farming',
  using_iodized_salt: 853,
  segragating_garbage: 734,
  family_planning_method: 'Pills',
  family_planning_method_count: 51,
  toilet_type: 'Water-sealed, other depository, exclusive',
  toilet_type_count: 728,
  source_of_drinking_water: 'Own use, tubed / piped deep well',
  source_of_drinking_water_count: 554,
  kitchen_garbage_disposal: 'Burning',
  kitchen_garbage_disposal_count: 716,
  type_of_house: 'Single House',
  type_of_house_count: 694,
  fuel_for_lighting: 'Electricity',
  fuel_for_lighting_count: 578
}

const AggregatedFamiliesContext = React.createContext(aggregated_families)

export default AggregatedFamiliesContext
