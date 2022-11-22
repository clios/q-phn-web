import './Toilet.css'

import Box from './Box'
import React from 'react'
import Text from './Text'

function Toilet(props) {
  return (
    <div className="toilet">
      <Box>
        <Text orange>Water-sealed, exclusive</Text>
        <Text two>{props.totalToiletWaterSealedExclusive?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Water-sealed, shared</Text>
        <Text two>{props.totalToiletWaterSealedShared?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Closed Pit</Text>
        <Text two>{props.totalToiletClosedPit?.toLocaleString()}</Text>
      </Box>
      <Box>
        <Text orange>Open Pit</Text>
        <Text two>{props.totalToiletOpenedPit?.toLocaleString()}</Text>
      </Box>
    </div>
  )
}

export default Toilet
