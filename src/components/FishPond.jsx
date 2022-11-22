import './FishPond.css'

import Box from './Box'
import React from 'react'
import Text from './Text'

function FishPond(props) {
  return (
    <div className="fish-pond">
      <Box>
        <Text orange>Pond Area</Text>
        <Text two>{props.totalFishpondArea?.toLocaleString()}</Text>
        <Text>Square meter</Text>
      </Box>
    </div>
  )
}

export default FishPond
