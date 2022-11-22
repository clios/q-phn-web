import './HouseholdHead.css'

import Box from './Box'
import React from 'react'
import Text from './Text'

function HouseholdHead(props) {
  return (
    <div className="household-head">
      <Box>
        <Text orange>Total Residents</Text>
        <Text three>{props.householdHead?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Male</Text>
        <Text two blue>
          {props.householdHeadMale?.toLocaleString()}
        </Text>
        <Text>Out of {props.householdHead?.toLocaleString()} Household Head</Text>
      </Box>
      <Box>
        <Text orange>Female</Text>
        <Text two green>
          {props.householdHeadFemale?.toLocaleString()}
        </Text>
        <Text>Out of {props.householdHead?.toLocaleString()} Household Head</Text>
      </Box>
      <Box>
        <Text orange>Not Sure</Text>
        <Text two>
          {(props.householdHead - (props.householdHeadMale + props.householdHeadFemale))?.toLocaleString()}
        </Text>
        <Text>Out of {props.householdHead?.toLocaleString()} Household Head</Text>
      </Box>
    </div>
  )
}

export default HouseholdHead
