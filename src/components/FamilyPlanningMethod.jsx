import './FamilyPlanningMethod.css'

import Box from './Box'
import React from 'react'
import Text from './Text'

function FamilyPlanningMethod(props) {
  return (
    <div className="family-planning-method">
      <Box>
        <Text orange>Pills</Text>
        <Text two>{props.totalPlanningMethodPills?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Condom</Text>
        <Text two>{props.totalPlanningMethodCondom?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Intrauterine Device</Text>
        <Text two>{props.totalPlanningMethodIntrauterineDevice?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>DMPA Injection</Text>
        <Text two>{props.totalPlanningMethodDmpaInjection?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Vasectomy</Text>
        <Text two>{props.totalPlanningMethodVasectomy?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Tubal Ligation</Text>
        <Text two>{props.totalPlanningMethodTubalLigation?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Basal Body Temperature</Text>
        <Text two>{props.totalPlanningMethodBasalBodyTemperature?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Cervical Mucus or Billing Method</Text>
        <Text two>{props.totalPlanningMethodCervicalMucus?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Sympho-Thermal Method</Text>
        <Text two>{props.totalPlanningMethodSymptoThermal?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Lactation Amenorrhea</Text>
        <Text two>{props.totalPlanningMethodLactationAmenorrhea?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Standard Days Method</Text>
        <Text two>{props.totalPlanningMethodStandardDays?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Two-Day Method</Text>
        <Text two>{props.totalPlanningMethodTwoDay?.toLocaleString()}</Text>
      </Box>
    </div>
  )
}

export default FamilyPlanningMethod
