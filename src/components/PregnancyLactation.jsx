import './PregnancyLactation.css'

import Box from './Box'
import React from 'react'
import Text from './Text'

function PregnancyLactation(props) {
  return (
    <div className="pregnancy-lactation">
      <Box>
        <Text orange>Total of Pregnant</Text>
        <Text>All Age</Text>
        <Text two>{props.pregnant?.toLocaleString()}</Text>
        <Text>Mortality: {props.pregnantMortality?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Teenage Pregnancy</Text>
        <Text>13-19 yrs old</Text>
        <Text two>{props.pregnantTeen?.toLocaleString()}</Text>
        <Text>Mortality: {props.pregnantTeenMortality?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Productive Pregnancy</Text>
        <Text>25-35 yrs old</Text>
        <Text two>{props.pregnantProduct?.toLocaleString()}</Text>
        <Text>Mortality: {props.pregnantProductMortality?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>High Risk Pregnancy</Text>
        <Text>Above 35 yrs old</Text>
        <Text two>{props.pregnantHighRisk?.toLocaleString()}</Text>
        <Text>Mortality: {props.pregnantHighRiskMortality?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Lactation</Text>
        <Text>All Age</Text>
        <Text two>{props.lactating?.toLocaleString()}</Text>
        <Text>Mortality: {props.lactatingMortality?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Total Infants</Text>
        <Text>Below 1 yr old</Text>
        <Text two>{props.infant?.toLocaleString()}</Text>
        <Text>Mortality: {props.infantMortality?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Infant 0-3 months</Text>
        <Text two>{props.infantZeroToThree?.toLocaleString()}</Text>
        <Text>Mortality: {props.infantZeroToThreeMortality?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Infant 4-6 months</Text>
        <Text two>{props.infantFourToSix?.toLocaleString()}</Text>
        <Text>Mortality: {props.infantFourToSixMortality?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Infant 7-9 months</Text>
        <Text two>{props.infantSevenToNine?.toLocaleString()}</Text>
        <Text>Mortality: {props.infantSevenToNineMortality?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Infant 10 months to 1 yr old</Text>
        <Text two>{props.infantTenToTwelve?.toLocaleString()}</Text>
        <Text>Mortality: {props.infantTenToTwelveMortality?.toLocaleString()}</Text>
      </Box>
    </div>
  )
}

export default PregnancyLactation
