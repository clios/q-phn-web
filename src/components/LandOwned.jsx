import './LandOwned.css'

import Box from './Box'
import React from 'react'
import Text from './Text'

function LandOwned(props) {
  return (
    <div className="land-owned">
      <Box>
        <Text orange>Rice Fields Area</Text>
        <Text two>{props.totalOwnedRiceFieldArea?.toLocaleString()}</Text>
        <Text>Square meter</Text>
      </Box>
      <Box>
        <Text orange>Corn Fields Area</Text>
        <Text two>{props.totalOwnedCornFieldArea?.toLocaleString()}</Text>
        <Text>Square meter</Text>
      </Box>
    </div>
  )
}

export default LandOwned
