import './TotalFamilyProfile.css'

import Box from './Box'
import React from 'react'
import Text from './Text'

function TotalFamilyProfile(props) {
  return (
    <div className="total-family-profile">
      <Box>
        <Text orange>Total Families</Text>
        <Text two>{props.total?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Small Families</Text>
        <Text two>{props.totalSmall?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Large Families</Text>
        <Text two>{props.totalLarge?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>3 and below children</Text>
        <Text two>{props.totalThreeAndBelowChildren?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>More than 3 children</Text>
        <Text two>{props.totalMoreThanThreeChildren?.toLocaleString()}</Text>
      </Box>
    </div>
  )
}

export default TotalFamilyProfile
