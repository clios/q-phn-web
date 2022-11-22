import './LandUnowned.css'

import Box from './Box'
import React from 'react'
import Text from './Text'

function LandUnowned(props) {
  return (
    <div className="land-unowned">
      <Box>
        <Text orange>Rice Fields Area</Text>
        <Text two>{props.totalUnownedRiceFieldArea?.toLocaleString()}</Text>
        <Text>Square meter</Text>
      </Box>
      <Box>
        <Text orange>Corn Fields Area</Text>
        <Text two>{props.totalUnownedCornFieldArea?.toLocaleString()}</Text>
        <Text>Square meter</Text>
      </Box>
    </div>
  )
}

export default LandUnowned
