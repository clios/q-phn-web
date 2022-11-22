import './FamilyHead.css'

import Box from './Box'
import React from 'react'
import Text from './Text'

function FamilyHead(props) {
  return (
    <div className="family-head">
      <Box>
        <Text orange>Total Residents</Text>
        <Text three>{props.familyHead?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Male</Text>
        <Text two blue>
          {props.familyHeadMale?.toLocaleString()}
        </Text>
        <Text>Out of {props.familyHead?.toLocaleString()} Family Head</Text>
      </Box>
      <Box>
        <Text orange>Female</Text>
        <Text two green>
          {props.familyHeadFemale?.toLocaleString()}
        </Text>
        <Text>Out of {props.familyHead?.toLocaleString()} Family Head</Text>
      </Box>
      <Box>
        <Text orange>Not Sure</Text>
        <Text two>{(props.familyHead - (props.familyHeadMale + props.familyHeadFemale))?.toLocaleString()}</Text>
        <Text>Out of {props.familyHead?.toLocaleString()} Family Head</Text>
      </Box>
    </div>
  )
}

export default FamilyHead
