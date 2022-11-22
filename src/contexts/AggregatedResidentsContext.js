import React from 'react'

const aggregated_residents = {
  actual_population_male: 1495,
  actual_population_female: 1505,
  pregnant_all_age: 9,
  pregnant_productive_age: 6,
  pregnant_risk: 2,
  pregnant_teenage: 1,
  lactating_all_age: 14,
  elderly_male: 40,
  elderly_female: 50,
  pwd_male: 7,
  pwd_female: 3,
  out_of_school_youth_male: 0,
  out_of_school_youth_female: 0,
  in_school_youth_male: 197,
  in_school_youth_female: 204,
  preschool_children_male: 147,
  preschool_children_female: 179,
  nutrition_normal: 323,
  nutrition_wasted: 1,
  nutrition_severly_wasted: 0,
  nutrition_overweight: 2,
  nutrition_obese: 0,
  ip_male: 7,
  ip_female: 16,
  ip_preschool_male: 5,
  ip_preschool_female: 13,
  ip_school_male: 2,
  ip_school_female: 2,
  ip_elderly_male: 0,
  ip_elderly_female: 1,
  case_goiter: 4,
  case_anemia_preschool: 0,
  case_anemia_school: 0,
  case_anemia_pregnant: 0,
  case_anemia_lactating: 0,
  case_vit_a_def_preschool: 0,
  case_vit_a_def_school: 0,
  case_vit_a_def_pregnant: 0,
  case_vit_a_def_lactating: 0
}

const AggregatedResidentsContext = React.createContext(aggregated_residents)

export default AggregatedResidentsContext
